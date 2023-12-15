using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Hinet.Web.Common
{
    public class MoitIdCustomizeCallbackHandler:HttpTaskAsyncHandler
    {
        public override Task ProcessRequestAsync(HttpContext context)
        {
            var test = 1;
            throw new NotImplementedException();
        }
    }
}