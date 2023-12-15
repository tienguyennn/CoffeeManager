using CommonHelper.Excel;
using CommonHelper.ObjectExtention;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CommonHelper.String;

namespace Web.Common
{
    public class ExcelImportExtention
    {
        public static List<ConfigModule> GetConfigCol<T>(FormCollection collection)
        {
            var result = new List<ConfigModule>();
            var listProperty = typeof(T).GetProperties();
            for (int i = 0; i < listProperty.Count(); i++)
            {
                var p = listProperty[i];
                var cog = new ConfigModule();
                cog.columnName = p.Name;
                if (Nullable.GetUnderlyingType(p.PropertyType)!=null)
                {
                    cog.TypeValue = Nullable.GetUnderlyingType(p.PropertyType).FullName;
                }
                else
                {
                    cog.TypeValue = p.PropertyType.FullName;
                }
                
                var requiredObj = p.GetAttribute<RequiredAttribute>(false);
                cog.require = requiredObj != null;
                var displayNameObj = p.GetAttribute<DisplayNameAttribute>(false);
                cog.ColumnTitle = displayNameObj != null ? displayNameObj.DisplayName : listProperty[i].Name;
                cog.NumberColumn = collection[p.Name].ToIntOrZero();
                result.Add(cog);
            }
            return result;
        }

        public static List<string> GetErrMess<T>(T obj,string mess)
        {
            var listStrErr = new List<string>();
            listStrErr.Add("0");
            var listProperty = typeof(T).GetProperties();
            for (int i = 0; i < listProperty.Count(); i++)
            {
                var p = listProperty[i];
                var vluePro = p.GetValue(obj);
                if (vluePro!=null)
                {
                    listStrErr.Add(vluePro.ToString());
                }
                else
                {
                    listStrErr.Add(string.Empty);
                }
            }
            listStrErr.Add(mess);
            return listStrErr;
        }
    }
}