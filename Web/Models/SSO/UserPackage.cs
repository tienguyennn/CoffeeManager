using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models.SSO
{
    public class UserPackage
    {
        public string sub { get; set; }
        public string groups { get; set; }
        public string family_name { get; set; }
        public string email { get; set; }
    }
}