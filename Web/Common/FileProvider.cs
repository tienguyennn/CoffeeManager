using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace Web.Common
{
    public class FileProvider
    {
        public static void SetFilePathEditor(string path)
        {
            try
            {
                if (!string.IsNullOrEmpty(path))
                {
                    var getPhysicPath = HostingEnvironment.MapPath(path);
                    if (!Directory.Exists(getPhysicPath))
                    {
                        Directory.CreateDirectory(getPhysicPath);
                    }
                    SessionManager.SetValue("PathFileUser", path);
                }
            }
            catch (Exception)
            {


            }

        }
    }
}