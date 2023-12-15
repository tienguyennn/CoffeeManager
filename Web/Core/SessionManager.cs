using Model.IdentityEntities;
using Service.AppUserService.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web
{
    public class SessionManager
    {
        public const string USER_INFO = "UserInfo";
        public const string USER_FRONTEND_INFO = "userfrontend";
        public const string USER_FRONTEND_BUSINESS_INFO = "userfrontendbusiness";
        public const string HI_USER_ID = "hiuserid";
        public const string COMPANY_INFOMATION = "CompanyInfomationDto";
        public const string LIST_PERMISSTION = "LIST_PERMISSTION";
        public const string HOST_COMPLAIN = "HOST_COMPLAIN";
        public const string HOST_REPORT = "HOST_REPORT";
        public const string USER_ROLE = "USER_ROLE";
        public const string TRANGTHAI_TINBAI = "TRANGTHAI_TINBAI";
        public const string TRANGTHAI_ANPHAM = "TRANGTHAI_ANPHAM";

        public static void ResetValue(string Key)
        {
            HttpContext context = HttpContext.Current;
            context.Session[Key] = null;
        }

        public static void SetValue(string Key, object Value = null)
        {
            HttpContext context = HttpContext.Current;
            context.Session[Key] = Value;
        }

        public static void SetValue(Dictionary<string, object> setData)
        {
            HttpContext context = HttpContext.Current;
            foreach (KeyValuePair<string, object> item in setData)
            {
                context.Session[item.Key] = item.Value;
            }
        }

        public static object GetValue(string Key)
        {
            HttpContext context = HttpContext.Current;
            return context.Session[Key];
        }

        public static T GetValue<T>(string key)
        {
            HttpContext context = HttpContext.Current;
            var data = (T)context.Session[key];
            if (data == null)
            {
                data = (T)Activator.CreateInstance(typeof(T));
            }
            return data;
        }

        public static void Remove(string Key)
        {
            HttpContext context = HttpContext.Current;
            context.Session.Remove(Key);
        }

        public static void Clear()
        {
            HttpContext context = HttpContext.Current;
            context.Session.RemoveAll();
        }

        public static bool HasValue(string Key)
        {
            HttpContext context = HttpContext.Current;
            return context.Session[Key] != null;
        }

        public static object GetUserInfo()
        {
            HttpContext context = HttpContext.Current;
            var result = context.Session[USER_INFO];
            return result;
        }
        public static object GetCompanyOWNInfo()
        {
            HttpContext context = HttpContext.Current;
            return context.Session[COMPANY_INFOMATION];
        }

        public static object GetHostComplain()
        {
            HttpContext context = HttpContext.Current;
            return context.Session[HOST_COMPLAIN];
        }
        public static object GetHostReport()
        {
            HttpContext context = HttpContext.Current;
            return context.Session[HOST_REPORT];
        }
        public static object GetListPermission()
        {
            HttpContext context = HttpContext.Current;
            return context.Session[LIST_PERMISSTION];
        }

        public static object GetListTrangThaiTinBai()
        {
            HttpContext context = HttpContext.Current;
            return context.Session[TRANGTHAI_TINBAI];
        }

        public static object GetListTrangThaiAnPham()
        {
            HttpContext context = HttpContext.Current;
            return context.Session[TRANGTHAI_ANPHAM];
        }
        public static object GetUserFrontEnd()
        {
            HttpContext context = HttpContext.Current;
            return context.Session[USER_FRONTEND_INFO];
        }
        public static object GetUserFrontEndBusiness()
        {
            HttpContext context = HttpContext.Current;
            return context.Session[USER_FRONTEND_BUSINESS_INFO];
        }
        
    }
}