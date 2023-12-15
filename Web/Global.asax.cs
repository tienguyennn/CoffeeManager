using Autofac;
using Autofac.Integration.Mvc;
using log4net;
using Modules;
using Web.App_Start;
using Web.Filters;
using Web.Modules;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Reflection;
using Web.HubControl;
using Microsoft.AspNet.SignalR;
using System.Web.Hosting;
using Web.Core;
using Service.AppUserService.Dto;
using System.Threading;
using Microsoft.Win32;
using System.Diagnostics;
using System.Web.Configuration;
using Service.Common;

namespace Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            ModelBinders.Binders.Add(typeof(decimal), new DecimalModelBinder());
            ModelBinders.Binders.Add(typeof(decimal?), new DecimalModelBinder());
            ModelBinders.Binders.Add(typeof(long?), new LongModelBinder());
            ModelBinders.Binders.Add(typeof(long), new LongModelBinder());

            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);

            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            var builder = new Autofac.ContainerBuilder();

            builder.RegisterControllers(typeof(MvcApplication).Assembly);
            builder.RegisterModelBinders(typeof(MvcApplication).Assembly);
            builder.RegisterModelBinderProvider();
            builder.RegisterModule(new RepositoryModule());

            builder.RegisterModule(new ServiceModule());
            builder.RegisterModule(new EFModule());
            builder.RegisterModule(new LoggingModule());
            builder.RegisterModule(new AutoMapperModule());
            builder.RegisterModule(new WebModule());

            builder.RegisterType<XinChaoHub>().ExternallyOwned();
            //builder.RegisterModule(new RedisModule());

            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            log4net.Config.XmlConfigurator.Configure(new FileInfo(Server.MapPath("~/Web.config")));
            var pathConfig = Server.MapPath("~/App_Data/ConfigStatus.json");
            StatusProvider.loadData(pathConfig);
            OCRProvider.Init(WebConfigurationManager.AppSettings["TessData"]);
        }

        protected void Application_Error(Object sender, EventArgs e)
        {
            ILog log = LogManager.GetLogger("RollingLogFileAppender");

            var exception = Server.GetLastError();
            log.Error("Lỗi hệ thống", exception);
            if (exception is HttpUnhandledException)
            {
                log.Error("Lỗi hệ thống", exception);
            }

        }
        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies["Language"];
            if (cookie != null && cookie.Value != null)
            {
                System.Threading.Thread.CurrentThread.CurrentCulture =
                    new System.Globalization.CultureInfo(cookie.Value);
                System.Threading.Thread.CurrentThread.CurrentUICulture =
                    new System.Globalization.CultureInfo(cookie.Value);
            }
            else
            {
                System.Threading.Thread.CurrentThread.CurrentCulture =
                    new System.Globalization.CultureInfo("vi");
                System.Threading.Thread.CurrentThread.CurrentUICulture =
                    new System.Globalization.CultureInfo("vi");
            }

            //cấu hình cors
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                //These headers are handling the "pre-flight" OPTIONS call sent by the browser
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
                HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000");
                HttpContext.Current.Response.End();
            }
        }

        protected void Session_Start(Object sender, EventArgs e)
        {
            //Session.Timeout = 5;
        }
        //Tự động LogOff khi hết session
        protected void Session_End(object sender, EventArgs e)
        {

            UserDto user = (UserDto)Session[SessionManager.USER_INFO] ?? new UserDto();
            //NotificationProvider.SessionTimeOut(user.Id);
        }


    }
}
