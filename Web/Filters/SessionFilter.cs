﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Web.Filters
{
    public class SessionFilter : ActionFilterAttribute
    {
        public string Key { get; set; }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var session = SessionManager.GetValue(Key);
            if(session != null)
            {
                SessionManager.ResetValue(Key);
            }
        }
    }
}