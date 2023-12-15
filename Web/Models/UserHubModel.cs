using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class UserHubModel
    {
        public long IdUser { get; set; }
        public List<string> GroupConnection { get; set; }
    }
}