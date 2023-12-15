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
    public class PermissionStatusAccess : ActionFilterAttribute, IActionFilter
    {
        /// <summary>
        /// HoSoThuongNhan_12
        /// Code=HoSoThuongNhan_
        /// Param=12
        /// </summary>
        public string Code { get; set; }
        public string ParamValid { get; set; }
        void IActionFilter.OnActionExecuting(ActionExecutingContext filterContext)
        {
            return;
        }
    }
}