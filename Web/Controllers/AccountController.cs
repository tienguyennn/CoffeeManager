using AutoMapper;
using BotDetect.Web.Mvc;
using CommonHelper.Upload;
using Model.Entities;
using Model.IdentityEntities;
using Service.AppUserService;
using Web.Core;
using Web.Filters;
using Web.Models;
using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Hosting;
using System.Web.Mvc;
using Web.Common;
using CommonHelper.String;
//using Moit.SingleWindow.ClientLib;
using System.Configuration;
using Service.Common;

namespace Web.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private IAppUserService _appUserService;
        private readonly ILog _Ilog;
        private readonly IMapper _mapper;

        public AccountController(


                ILog Ilog,

             IMapper mapper,
        IAppUserService appUserService)
        {

            _mapper = mapper;

            _appUserService = appUserService;

            _Ilog = Ilog;
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
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

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }
        [AllowAnonymous]
        public ActionResult OldUser(long id)
        {
            var appuser = _appUserService.GetById(id);
            if (appuser == null)
            {
                return new HttpNotFoundResult();
            }
            return View(appuser);
        }

        [AllowAnonymous]
        public PartialViewResult LoginHeader(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return PartialView();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        [Audit(ActionName = "Đăng nhập")]
        public async Task<ActionResult> Login(LoginViewModelFE model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var user = await UserManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                ModelState.AddModelError("", "Thông tin đăng nhập không tồn tại");
                return View(model);
            }


            var result = await SignInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, shouldLockout: false);

            switch (result)
            {
                case SignInStatus.Success:
                    //return RedirectToLocal(returnUrl);
                    var userId = SignInManager.AuthenticationManager.AuthenticationResponseGrant.Identity.GetUserId<long>();
                    var userDto = _appUserService.GetById(userId);
                    SessionManager.SetValue(SessionManager.USER_INFO, userDto);
                    return RedirectToAction("Index", "Dashboard", new { area = "DashboardArea" });
                case SignInStatus.LockedOut:
                    ViewBag.TimeAutoUnlock = UserManager.GetLockoutEndDate(user.Id).AddHours(7);
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
                case SignInStatus.Failure:
                    if (user != null)
                    {
                        await UserManager.AccessFailedAsync(user.Id);
                        var message = string.Empty;
                        if (UserManager.GetAccessFailedCount(user.Id) < UserManager.MaxFailedAccessAttemptsBeforeLockout)
                        {
                            message = "Bạn đã nhập sai thông tin tài khoản " + UserManager.GetAccessFailedCount(user.Id) + "/" + UserManager.MaxFailedAccessAttemptsBeforeLockout;
                        }
                        else
                        {
                            message = "Tài khoản của bạn đã bị khóa. Sẽ tự động mở lúc " + UserManager.GetLockoutEndDate(user.Id).AddHours(7);
                        }
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


        /// <summary>
        /// @author:duynn
        /// @since: 07/11/2021
        /// </summary>
        /// <param name="model"></param>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        [Audit(ActionName = "Đăng nhập")]

        public async Task<JsonResult> LoginPopUp(LoginViewModelFE model, string returnUrl)
        {
            var loginResult = new JsonResultBO(true);
            if (!ModelState.IsValid)
            {
                loginResult.Status = false;
                loginResult.Message = ModelState.GetErrors();
                return Json(loginResult);
            }

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var user = await UserManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                loginResult.Status = false;
                loginResult.Message = "Thông tin đăng nhập không tồn tại";
                return Json(loginResult);
            }


            var result = await SignInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, shouldLockout: false);

            switch (result)
            {
                case SignInStatus.Success:
                    //return RedirectToLocal(returnUrl);
                    var userId = SignInManager.AuthenticationManager.AuthenticationResponseGrant.Identity.GetUserId<long>();
                    var userDto = _appUserService.GetById(userId);

                    SessionManager.SetValue(SessionManager.USER_INFO, userDto);

                    loginResult.Message = "Đăng nhập thành công";
                    return Json(loginResult);
                case SignInStatus.LockedOut:
                    ViewBag.TimeAutoUnlock = UserManager.GetLockoutEndDate(user.Id).AddHours(7);
                    loginResult.Status = false;
                    loginResult.Message = "Tài khoản của bạn bị khóa";
                    return Json(loginResult);
                case SignInStatus.RequiresVerification:
                    loginResult.Status = false;
                    loginResult.Message = "Tài khoản của bạn bị chưa được xác thực";
                    return Json(result);
                case SignInStatus.Failure:
                    if (user != null)
                    {
                        await UserManager.AccessFailedAsync(user.Id);
                        var message = "Thông tin đăng nhập không đúng";
                        ModelState.AddModelError("", message);
                        loginResult.Status = false;
                        loginResult.Message = message;
                        return Json(loginResult);
                    }
                    loginResult.Status = false;
                    loginResult.Message = "Thông tin đăng nhập không đúng";
                    return Json(loginResult);
                default:
                    loginResult.Status = false;
                    loginResult.Message = "Thông tin đăng nhập không đúng";
                    return Json(loginResult);
            }
        }

        //
        // GET: /Account/VerifyCode
        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        {
            // Require that the user has already logged in via username/password or external login
            if (!await SignInManager.HasBeenVerifiedAsync())
            {
                return View("Error");
            }
            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // The following code protects for brute force attacks against the two factor codes.
            // If a user enters incorrect codes for a specified amount of time then the user account
            // will be locked out for a specified amount of time.
            // You can configure the account lockout settings in IdentityConfig
            var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent: model.RememberMe, rememberBrowser: model.RememberBrowser);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(model.ReturnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid code.");
                    return View(model);
            }
        }

        ////
        //// GET: /Account/Register
        //[AllowAnonymous]
        //public ActionResult Register()
        //{
        //    var CreateEndUserModel = new CreateEndUserModel();
        //    CreateEndUserModel.dropdownListQuocGia = _iDM_DuLieuDanhMucService.GetDropdownlist(DanhMucConstant.QuocGia, string.Empty).OrderBy(x => x.Text).ToList();
        //    CreateEndUserModel.dropdownListTinh = _iTINHService.GetDropdown("TenTinh", "Id", string.Empty).OrderBy(x => x.Text).ToList();
        //    return View(CreateEndUserModel);
        //}

        ////
        //// POST: /Account/Register
        //[HttpPost]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public async Task<ActionResult> Register(RegisterViewModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var user = new AppUser { UserName = model.UserName };
        //        var result = await UserManager.CreateAsync(user, model.Password);
        //        if (result.Succeeded)
        //        {
        //            await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);

        //            // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
        //            // Send an email with this link
        //            // string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
        //            // var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
        //            // await UserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");

        //            return RedirectToAction("Index", "Dashboard", new { area = "DashboardArea" });
        //        }
        //        AddErrors(result);
        //    }

        //    // If we got this far, something failed, redisplay form
        //    return View(model);
        //}

        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(long userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        //
        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string username, string code)
        {
            ResetPasswordViewModel model = new ResetPasswordViewModel();
            model.UserName = username;
            model.Code = code;
            return code == null ? View("Error") : View(model);
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await UserManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
            if (result.Succeeded)
            {
                if (user.IsUpdateNewPass == false)
                {
                    var userChange = _appUserService.GetById(user.Id);
                    userChange.IsUpdateNewPass = true;
                    _appUserService.Update(userChange);
                }
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            AddErrors(result);
            return View();
        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        ////
        //// POST: /Account/ExternalLogin
        //[HttpPost]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public ActionResult ExternalLogin(string provider, string returnUrl)
        //{
        //    // Request a redirect to the external login provider
        //    return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        //}

        //
        // GET: /Account/SendCode
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
        {
            var userId = await SignInManager.GetVerifiedUserIdAsync();
            if (userId == null)
            {
                return View("Error");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            // Generate the token and send it
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
            {
                return View("Error");
            }
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }


        #region command
        ////
        //// GET: /Account/ExternalLoginCallback
        //[AllowAnonymous]
        //public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        //{
        //    var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
        //    if (loginInfo == null)
        //    {
        //        return RedirectToAction("Login");
        //    }

        //    // Sign in the user with this external login provider if the user already has a login
        //    var result = await SignInManager.ExternalSignInAsync(loginInfo, isPersistent: false);
        //    switch (result)
        //    {
        //        case SignInStatus.Success:
        //            return RedirectToLocal(returnUrl);
        //        case SignInStatus.LockedOut:
        //            return View("Lockout");
        //        case SignInStatus.RequiresVerification:
        //            return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
        //        case SignInStatus.Failure:
        //        default:
        //            // If the user does not have an account, then prompt the user to create an account
        //            ViewBag.ReturnUrl = returnUrl;
        //            ViewBag.LoginProvider = loginInfo.Login.LoginProvider;
        //            return View("ExternalLoginConfirmation", new ExternalLoginConfirmationViewModel { Email = loginInfo.Email });
        //    }
        //}

        ////
        //// POST: /Account/ExternalLoginConfirmation
        //[HttpPost]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        //{
        //    if (User.Identity.IsAuthenticated)
        //    {
        //        return RedirectToAction("Index", "Manage");
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        // Get the information about the user from the external login provider
        //        var info = await AuthenticationManager.GetExternalLoginInfoAsync();
        //        if (info == null)
        //        {
        //            return View("ExternalLoginFailure");
        //        }
        //        var user = new AppUser { UserName = model.Email, Email = model.Email };
        //        var result = await UserManager.CreateAsync(user);
        //        if (result.Succeeded)
        //        {
        //            result = await UserManager.AddLoginAsync(user.Id, info.Login);
        //            if (result.Succeeded)
        //            {
        //                await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
        //                return RedirectToLocal(returnUrl);
        //            }
        //        }
        //        AddErrors(result);
        //    }

        //    ViewBag.ReturnUrl = returnUrl;
        //    return View(model);
        //}

        //
        // POST: /Account/LogOff
        #endregion
        [AllowAnonymous]

        [HttpGet]
        //[ValidateAntiForgeryToken]
        [Audit(ActionName = "Đăng xuất")]
        public ActionResult LogOff()
        {
            SessionManager.SetValue(SessionManager.USER_INFO, null);
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return RedirectToAction("login");
        }

        ////
        //// GET: /Account/ExternalLoginFailure
        //[AllowAnonymous]
        //public ActionResult ExternalLoginFailure()
        //{
        //    return View();
        //}

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



    }

}