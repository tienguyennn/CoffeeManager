using DocumentFormat.OpenXml.Wordprocessing;
using OpenXmlPowerTools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Web.Core
{
    public class AllowCrossSiteIFrameAttribute : ActionFilterAttribute
    {
        public override void OnResultExecuted(ResultExecutedContext filterContext)
        {

            filterContext.HttpContext.Response.Headers.Remove("X Frame Options");


            base.OnResultExecuted(filterContext);

        }

    }
}
