using System.Web.Mvc;

namespace Web.Areas.DanhMucArea
{
    public class DanhMucAreaAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "DanhMucArea";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "DanhMucArea_default",
                "DanhMucArea/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}