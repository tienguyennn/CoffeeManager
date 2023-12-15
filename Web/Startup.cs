using Hangfire;
using Model;
using Microsoft.Owin;
using Owin;
using System;
using System.Web.Configuration;

[assembly: OwinStartupAttribute(typeof(Web.Startup))]
namespace Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {

            ConfigureAuth(app);
            app.MapSignalR();
            //var configDB = WebConfigurationManager.AppSettings["HangFireDB"];
            //if (!string.IsNullOrEmpty(configDB))
            //{
            //    GlobalConfiguration.Configuration.UseSqlServerStorage(configDB);


            //    app.UseHangfireDashboard();
            //    app.UseHangfireServer();

            //    // Bắt đầu Hangfire Server
            //    var backgroundJobServer = new BackgroundJobServer();
            //    BackgroundJob.Enqueue(() => Console.Write("Hello Hinet"));

            //}


        }
    }
}
