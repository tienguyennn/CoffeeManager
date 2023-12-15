using Moit.SingleWindow.ClientLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;

namespace Hinet.Web.Common
{
    public class ConnectMoitLib
    {
        public static string MOITSERVER = WebConfigurationManager.AppSettings["MOITSERVER"];
        public static string SECRETKEY = WebConfigurationManager.AppSettings["SECRETKEY"];
        public async Task<MoitUserInfo>  GetUserInfo(string token)
        {
            var apiUrl = MOITSERVER+"api/authen/userInfo/data.moit?clientkey=" + SECRETKEY + "&token="+ token;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(apiUrl);
                client.DefaultRequestHeaders.Clear();
                //Define request data format  
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //Sending request to find web api REST service resource GetAllEmployees using HttpClient  
                try
                {
                    HttpResponseMessage Res = await client.GetAsync(apiUrl);
                    var contentRes = await Res.Content.ReadAsStringAsync();
                    var ResultReport = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<MoitUserInfo>(contentRes);
                    return ResultReport;
                }
                catch (Exception ex)
                {
                    var mes = ex.Message;
                }
            }
            return new MoitUserInfo();
        }
    }
}