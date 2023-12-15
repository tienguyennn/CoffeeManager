//using Moit.SingleWindow.ClientLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.moitid");
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            // BotDetect requests must not be routed 
            routes.IgnoreRoute("{*botdetect}",
            new { botdetect = @"(.*)BotDetectCaptcha\.ashx" });


            routes.MapRoute(
                     name: "Default",
                     url: "{controller}/{action}/{id}",
                     defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
                 );
            routes.MapRoute(
                name: "DefaultArea",
                url: "{area}/{controller}/{action}/{id}",
                defaults: new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
