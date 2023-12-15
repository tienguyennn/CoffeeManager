using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;

namespace CommonHelper.Upload
{
    public static class FileUploadHelper
    {
        public static bool isFileSupported(string mimeType)
        {
            var check = false;
            //file hỗ trợ upload
            var supportedTypes = WebConfigurationManager.AppSettings["AllowMimeType"];

            if (supportedTypes.Contains(mimeType))
            {
                check = true;
            }
            return check;
        }


        public static bool isExcelSupported(string mimeType)
        {
            var check = false;
            //file hỗ trợ upload
            var supportedTypes = WebConfigurationManager.AppSettings["AllowExcelMimeType"];

            if (supportedTypes.Contains(mimeType))
            {
                check = true;
            }
            return check;
        }
    }
}
