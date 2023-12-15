using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Web.Core
{
    public class StatusProvider
    {
        private static List<StatusObj> factorys { get; set; }
        public static void loadData(string path)
        {
            factorys = JsonConvert.DeserializeObject<List<StatusObj>>(File.ReadAllText(path));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="StatusObj"></typeparam>
        /// <param name=""></param>
        /// <param name=""></param>
        /// <returns></returns>
        public static List<StatusObj> getConfigByTypeItem(string type)
        {
            return factorys.Where(x => x.Type == type).ToList();
        }
        public static StatusObj getConfigByStaus(string type, string status)
        {
            return factorys.Where(x => x.Type == type && x.Status == status).FirstOrDefault();
        }
    }
    public class StatusObj
    {
        public string Type { get; set; }
        public string Status { get; set; }
        public List<StatusRefer> statusRefers { get; set; }
    }
    public class StatusRefer
    {
        public string Status { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Icon { get; set; }
        public string LinkPattern { get; set; }
        /// <summary>
        /// 1: Link; 2: Popup; 3:ajax
        /// </summary>
        public int Type { get; set; }

    }
}