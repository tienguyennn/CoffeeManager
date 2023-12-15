using Model.IdentityEntities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;

namespace Web.Core
{
    public class CreateUserProvider
    {

        public class objParam
        {
            public string LoginName { get; set; }
            public string FullName { get; set; }
            public string Email { get; set; }
            public string Address { get; set; }
            public string Password { get; set; }
        }


        public class objOut
        {
            public long Data { get; set; }
        }
    }
}