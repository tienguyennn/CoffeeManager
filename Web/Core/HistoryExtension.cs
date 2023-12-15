using CommonHelper.ObjectExtention;
using Service.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace Web.Core
{
    public class HistoryExtension
    {

        public static string GetChange<Told, Tnew>(object oldObject, object newObject)
        {
            var resultChange = string.Empty;
            var ListProperty = typeof(Tnew).GetProperties();
            foreach (var item in ListProperty)
            {
                var isCheckModify = item.GetCustomAttributes(typeof(CheckModifyAttribute), false).FirstOrDefault();

                if (isCheckModify != null)
                {
                    var strName = item.Name;
                    var NameProperty = item.GetAttribute<DisplayNameAttribute>(false);
                    if (NameProperty != null)
                    {
                        strName = NameProperty.DisplayName;
                    }
                    //Kiểm tra dữ liệu
                    var oldProperty = typeof(Told).GetProperty(item.Name);
                    var valueOld = string.Empty;
                    if (oldProperty != null && oldProperty.GetValue(oldObject) != null)
                    {
                        valueOld = oldProperty.GetValue(oldObject).ToString();
                    }

                    var valueNew = string.Empty;
                    if (item.GetValue(newObject) != null)
                    {
                        valueNew = item.GetValue(newObject).ToString();
                    }
                    if (!string.IsNullOrEmpty(valueNew) && string.IsNullOrEmpty(valueOld))
                    {
                        resultChange += string.Format("- Đã bổ sung {0} : \"{1}\";<br/>", strName, valueNew);
                    }
                    else if (string.IsNullOrEmpty(valueNew) && !string.IsNullOrEmpty(valueOld))
                    {
                        resultChange += string.Format("- Đã loại bỏ {0} : \"{1}\";<br/>", strName, valueOld);
                    }
                    else if (!string.IsNullOrEmpty(valueNew) && !string.IsNullOrEmpty(valueOld) && valueNew!=valueOld)
                    {
                        resultChange += string.Format("- Đã cập nhật {0} từ \"{1}\" thành \"{2}\";<br/>", strName, valueOld, valueNew);
                    }
                }
            }
            return resultChange;
        }
    }
}