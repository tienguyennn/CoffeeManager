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
    public class LoginProvider
    {
        public static async Task<long?> getUserInfo(string code)
        {
            try
            {
                var pathGetInfoHOST = WebConfigurationManager.AppSettings["PathGetInfoUserHost"];
                var pathGetInfo = WebConfigurationManager.AppSettings["PathGetInfoUser"];
                var param = new objParam()
                {
                    code = code
                };
                long? resultData = null;
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(pathGetInfoHOST);
                    var content = new StringContent(JsonConvert.SerializeObject(param), Encoding.UTF8, "application/json");
                    var response = client.PostAsync(pathGetInfo, content).Result;
                 
                    response.EnsureSuccessStatusCode();
                     var resultDa2ta =await response.Content.ReadAsAsync<objOut>();
                    return resultDa2ta.UserId;
                }

                return resultData;
            }
            catch (Exception ex)
            {
                return null;
            }
            return null;
        }

        public class objParam
        {
            public string code { get; set; }
        }

        public class objOut
        {
            public long UserId { get; set; }
            public string LoginName { get; set; }
            public string FullName { get; set; }
            public string Email { get; set; }
            public string Address { get; set; }
            public string Brithday { get; set; }
        }

    }
}