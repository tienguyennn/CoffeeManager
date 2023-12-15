using CommonHelper.ObjectExtention;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Service.Common
{
    public static class ConstantExtension
    {
        /// <summary>
        /// Lấy danh sách dropdownlist constant theo class
        /// </summary>
        /// <typeparam name="TConst"></typeparam>
        /// <param name="selectedItem"></param>
        /// <returns></returns>
        public static List<SelectListItem> GetDropdownData<TConst>(string selectedItem = null)
        {
            var result = new List<SelectListItem>();
            var listProperty = typeof(TConst).GetProperties();
            if (listProperty != null)
            {
                foreach (var item in listProperty)
                {
                    if (item.GetGetMethod().IsStatic)
                    {
                        var val = item.GetValue(null).ToString();
                        var name = item.GetAttribute<DisplayNameAttribute>(true).DisplayName;
                        result.Add(new SelectListItem()
                        {
                            Text = name,
                            Value = val,
                            Selected = !string.IsNullOrEmpty(selectedItem) ? val.Equals(selectedItem) : false
                        });
                    }
                }
            }
            return result;
        }
        public static List<SelectListItem> GetDropdownData<TConst>(IEnumerable<string> selectedItem)
        {
            var result = new List<SelectListItem>();
            var listProperty = typeof(TConst).GetProperties();
            if (listProperty != null)
            {
                foreach (var item in listProperty)
                {
                    if (item.GetGetMethod().IsStatic)
                    {
                        var val = item.GetValue(null).ToString();
                        var name = item.GetAttribute<DisplayNameAttribute>(true).DisplayName;
                        result.Add(new SelectListItem()
                        {
                            Text = name,
                            Value = val,
                            Selected = selectedItem != null && selectedItem.Any() && selectedItem.Contains(val)
                        });
                    }
                }
            }
            return result;
        }



        public static SelectListItem GetItemByValue<TConst>(string value)
        {
            var groupItems = new List<SelectListItem>();
            var listProperty = typeof(TConst).GetProperties();
            if (listProperty != null)
            {
                foreach (var item in listProperty)
                {
                    if (item.GetGetMethod().IsStatic)
                    {
                        var val = item.GetValue(null).ToString();
                        var name = item.GetAttribute<DisplayNameAttribute>(true).DisplayName;
                        groupItems.Add(new SelectListItem()
                        {
                            Text = name,
                            Value = val,
                        });
                    }
                }
            }
            var result = groupItems.Where(x => x.Value == value).FirstOrEmpty();
            return result;
        }

        //demo
        public static List<SelectListItem> GetCustomDisplayDropdownData<TConst>(string selectedItem = null)
        {
            var result = new List<SelectListItem>();
            var listProperty = typeof(TConst).GetProperties();
            if (listProperty != null)
            {
                foreach (var item in listProperty)
                {
                    if (item.GetGetMethod().IsStatic)
                    {
                        var val = item.GetValue(null).ToString();
                        var name = item.GetAttribute<CustomDisplayNameAttribute>(true).Text;
                        result.Add(new SelectListItem()
                        {
                            Text = name,
                            Value = val,
                            Selected = !string.IsNullOrEmpty(selectedItem) ? val == selectedItem : false
                        });
                    }
                }
            }
            return result;
        }

        /// <summary>
        /// Lấy danh sách value constant theo class
        /// </summary>
        /// <typeparam name="TConst"></typeparam>
        /// <param name="selectedItem"></param>
        /// <returns></returns>
        public static List<string> GetListData<TConst>()
        {
            var result = new List<string>();
            var listProperty = typeof(TConst).GetProperties();
            if (listProperty != null)
            {
                foreach (var item in listProperty)
                {
                    if (item.GetGetMethod().IsStatic)
                    {
                        var val = item.GetValue(null).ToString();
                        var name = item.GetAttribute<DisplayNameAttribute>(true).DisplayName;
                        result.Add(val);
                    }
                }
            }
            return result;
        }
        /// <summary>
        /// Lấy Tên của constant đề hiển thị
        /// </summary>
        /// <typeparam name="TConst"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>

        public static string GetName<TConst>(string value)
        {
            var listProperty = typeof(TConst).GetProperties();
            if (listProperty != null)
            {
                foreach (var item in listProperty)
                {
                    if (item.GetGetMethod().IsStatic)
                    {
                        var val = item.GetValue(null).ToString();
                        var name = item.GetAttribute<DisplayNameAttribute>(true).DisplayName;
                        if (val == value)
                        {
                            return name;
                        }
                    }
                }
            }
            return string.Empty;
        }
        public static string GetColor<TConst>(string value)
        {
            var listProperty = typeof(TConst).GetProperties();
            if (listProperty != null)
            {
                foreach (var item in listProperty)
                {
                    if (item.GetGetMethod().IsStatic)
                    {
                        var val = item.GetValue(null).ToString();
                        var getObj = item.GetAttribute<ColorAttribute>(false);
                        if (val == value && getObj != null)
                        {
                            return getObj.Color;
                        }
                    }
                }
            }
            return string.Empty;
        }

        public static string GetBackgroundColor<TConst>(string value)
        {
            var listProperty = typeof(TConst).GetProperties();
            if (listProperty != null)
            {
                foreach (var item in listProperty)
                {
                    if (item.GetGetMethod().IsStatic)
                    {
                        var val = item.GetValue(null).ToString();
                        var getObj = item.GetAttribute<ColorAttribute>(false);
                        if (val == value && getObj != null)
                        {
                            return getObj.BgColor;
                        }
                    }
                }
            }
            return string.Empty;
        }

        public static string GetDisplayNameById<TConst>(string value)
        {
            var listProperty = typeof(TConst).GetProperties();
            if (listProperty != null)
            {
                foreach (var item in listProperty)
                {
                    if (item.GetGetMethod().IsStatic)
                    {
                        var val = item.GetValue(null).ToString();
                        var name = item.GetAttribute<DisplayNameAttribute>(true).DisplayName;
                        if (val == value)
                        {
                            return name;
                        }
                    }
                }
            }
            return string.Empty;
        }

        public static string GetConstantName<TConst>(string value)
        {
            var listProperty = typeof(TConst).GetProperties();
            if (listProperty != null)
            {
                foreach (var item in listProperty)
                {
                    if (item.GetGetMethod().IsStatic)
                    {
                        var val = item.GetValue(null).ToString();
                        var getObj = item.GetMethod.Name;
                        if (val == value && getObj != null)
                        {
                            getObj = getObj.Replace("get_", "");
                            return getObj;
                        }
                    }
                }
            }
            return string.Empty;
        }

        internal static object GetName<T>()
        {
            throw new NotImplementedException();
        }


        public static int ToInt<T>(this T soure) where T : IConvertible//enum
        {
            if (!typeof(T).IsEnum)
                throw new ArgumentException("T must be an enumerated type");
            return (int)(IConvertible)soure;
        }
    }
}
