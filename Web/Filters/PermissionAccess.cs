using Model.Entities;
using Service.AppUserService.Dto;
using Service.Common;
using Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;


namespace Web.Filters
{
    public class PermissionAccess : ActionFilterAttribute, IActionFilter
    {
        //public List<string> lstCode { get; set; }
        public string Code { get; set; }
        void IActionFilter.OnActionExecuting(ActionExecutingContext filterContext)
        {
            return;

            if (false)
            {

                if (((ReflectedActionDescriptor)filterContext.ActionDescriptor).MethodInfo.ReturnType == typeof(JsonResult))
                {
                    var rs = new JsonResultBO(false);
                    rs.Message = "Bạn không có quyền truy cập";
                    var jsresult = new JsonResult();
                    jsresult.ContentType = "json";
                    //jsresult.Data = JsonConvert.SerializeObject(rs);
                    jsresult.Data = rs;
                    filterContext.Result = jsresult;
                }
                else if (((ReflectedActionDescriptor)filterContext.ActionDescriptor).MethodInfo.ReturnType == typeof(PartialViewResult))
                {
                    filterContext.Result = new RedirectToRouteResult(new
                     RouteValueDictionary(new { controller = "Home", action = "UnAuthorPartial", area = "" }));
                }
                else
                {
                    filterContext.Result = new RedirectToRouteResult(new
                     RouteValueDictionary(new { controller = "Home", action = "UnAuthor", area = "" }));
                }

            }


        }

    }
}