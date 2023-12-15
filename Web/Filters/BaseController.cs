using log4net;
using Microsoft.AspNet.Identity;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Service.AppUserService.Dto;
using Service.AppUserService;
using Autofac;
//using Moit.SingleWindow.ClientLib;
using System.Web.Configuration;
using System.IO;
using Model.IdentityEntities;

namespace Web.Filters
{
    [Authorize]
    public class BaseController : Controller
    {
        ILog _loger;
        //protected MoitUserInfo userFrontend;
        //protected MoitBusinessInfo userBusinessInfo;

        protected long? CurrentUserId = null;
        protected AppUser CurrentUserInfo;
        protected int CurrentIdDonVi;

        private readonly IAppUserService _AppUserService;


        public static string GETTOKENLINK = WebConfigurationManager.AppSettings["GETTOKENLINK"];
        private static IContainer Container;
        public BaseController()
        {
            _loger = LogManager.GetLogger("RollingLogFileAppender");
            _AppUserService = DependencyResolver.Current.GetService<IAppUserService>();
            CurrentUserInfo = SessionManager.GetUserInfo() as Model.IdentityEntities.AppUser;
            if (CurrentUserInfo != null)
            {
                CurrentUserId = CurrentUserInfo.Id;
                CurrentIdDonVi = CurrentUserInfo.DonViId.GetValueOrDefault();
            }
            else
            {
                RedirectToAction("login", "AccountAdmin");
            }
        }
        /// <summary>
        /// Kiểm tra xem user hiện tại có quyền không
        /// </summary>
        /// <param name="permission"></param>
        /// <returns></returns>

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            return;
            if (filterContext.HttpContext.Session != null)
            {
                var skipAuthorize = filterContext.ActionDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true)
               || filterContext.ActionDescriptor.ControllerDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true);
                if (!skipAuthorize)
                {
                    var authorizeUser = SessionManager.GetUserInfo() as Model.IdentityEntities.AppUser;
                    if (filterContext.HttpContext.Session.IsNewSession || authorizeUser == null)
                    {
                        if (filterContext.HttpContext.Request.IsAjaxRequest())
                        {

                            if (((ReflectedActionDescriptor)filterContext.ActionDescriptor).MethodInfo.ReturnType == typeof(JsonResult))
                            {
                                var rs = new JsonResultBO(false);
                                rs.Message = "Phiên làm việc của bạn đã hết";
                                filterContext.Result = Json(rs);
                            }
                            else if (((ReflectedActionDescriptor)filterContext.ActionDescriptor).MethodInfo.ReturnType == typeof(PartialViewResult))
                            {
                                filterContext.Result =
                                RedirectToAction("TimeOutSession", "Errors", new { area = "" });
                            }
                        }
                        else
                        {
                            // var dataCauHinh = _DM_DulieuDanhmucService.GetThongTinCauHinhHeThong();
                            // var domainSSO = dataCauHinh.SsoDomain;
                            // if (!string.IsNullOrEmpty(domainSSO))
                            // {
                            //     filterContext.Result =
                            //Redirect(domainSSO);
                            //     return;
                            // }
                            filterContext.Result = RedirectToAction("login", "accountadmin", new { area = "", returnUrl = Request.RawUrl });
                        }
                        return;
                    }

                    //if (authorizeUser != null && authorizeUser.IsUserSS0 && (authorizeUser.DonViId == null || authorizeUser.ListRoles.Any() == false))
                    //{
                    //    filterContext.Result = RedirectToAction("ErrorSSO", "DashboardSSO", new { area = "DashboardArea" });
                    //    return;
                    //}

                    if (authorizeUser != null && !authorizeUser.IsUpdateNewPass)
                    {
                        filterContext.Result = RedirectToAction("ChangePassword", "Manage", new { area = "" });
                        return;
                    }
                }
            }

         
        }
        protected override void OnException(ExceptionContext filterContext)
        {
            _loger.Error("Lỗi hệ thống", filterContext.Exception);
            TempData["filterContext"] = filterContext;
            //filterContext.ExceptionHandled = true;

            //// Redirect on error:
            //filterContext.Result = RedirectToAction("Index", "Errors", filterContext.Exception);

            // OR set the result without redirection:
            //filterContext.Result = new ViewResult
            //{
            //    ViewName = "~/Views/Errors/Index.cshtml"
            //};
        }
        //protected void AssignUserInfo()
        //{
        //    if (!MoitIdSession.IsConnected)
        //    {
        //        MoitIdAuthen.Login(GETTOKENLINK);
        //    }
        //    else
        //    {
        //        userFrontend = MoitIdAuthen.GetUserInfo();
        //        userFrontend.Email = _MoitUserFrontEndInfoService.GetByMoitUserId(userFrontend.Id).Email;
        //        userBusinessInfo = MoitIdAuthen.GetBusinessInfo();

        //    }
        //}



        protected void AssignUserInfo()
        {
            //userFrontend = SessionManager.GetUserFrontEnd() as MoitUserInfo;
            //userBusinessInfo = SessionManager.GetUserFrontEndBusiness() as MoitBusinessInfo;
        }
    }
}