using System.Web.Mvc;

namespace Web.Areas.SanPhamArea
{
    public class SanPhamAreaAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "SanPhamArea";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "SanPhamArea_default",
                "SanPhamArea/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}