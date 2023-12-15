using CommonHelper.ObjectExtention;
using Model.Entities;
using Web.Core.CustomAttribute;
using Web.Models;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq.Expressions;
using System.Reflection;
namespace System.Web.Mvc.Html
{
    public static partial class HtmlTagHelper
    {

        private static T GetAttribute<T>(this ICustomAttributeProvider provider)
            where T : Attribute
        {
            var attributes = provider.GetCustomAttributes(typeof(T), true);
            return attributes.Length > 0 ? attributes[0] as T : null;
        }
       

        public static MvcHtmlString UploadFileFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression,
                  bool multiple, params string[] fileTypes) where TProperty : UploadToolVM
        {

            var metadata = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);
            var model = metadata.Model as UploadToolVM;
            //var memberExpression = expression.Body as MemberExpression;
            var inputName = expression.Body.GetPropertyPathFromExpression();
            //var itemType = memberExpression.Member.GetAttribute<UploadFileAttribute>()?.Type ?? "Unknown";
            var allowTypes = string.Join(",", fileTypes);
            return htmlHelper.Partial("_UploadFileFor", model, new ViewDataDictionary {
                    { "ITEM_TYPE",model.LoaiTaiLieu },
                    { "InputName", inputName },
                    {"IS_SINGLE",multiple ? "0" : "1"},
                    {"ALLOWED_TYPE", allowTypes }
            });

        }

        public static MvcHtmlString DropDownListMultiFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, IEnumerable<SelectListItem> selectList, object htmlAttributes)
        {
            var metadata = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);
            var values = metadata.Model as IList;
            var value = "";
            if (values != null)
            {
                foreach (var item in values)
                {
                    value += item.ToString() + ",";
                }
            }

            htmlAttributes = new { @class = "form-control select2", multiple = "multiple", value = value };
            var a = htmlHelper.DropDownListFor(expression, selectList, null, htmlAttributes);
            return a;
        }


        public static IHtmlString NDisplayFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression)
        {
            var metadata = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);
            var value = "<span class='chua-cap-nhat'>Chưa cập nhật</span>";
            if (metadata.Model != null)
            {
                var type = metadata.Model.GetType();
                if (type == typeof(DateTime) || type == typeof(DateTime?))
                {
                    value = ((DateTime)metadata.Model).ToString("dd/MM/yyyy");
                }
                else
                {
                    value = metadata.Model.ToString();
                }

            }


            return htmlHelper.Raw(value);
        }
        public static object CombineObjects(this object item, object add)
        {
            var ret = new ExpandoObject() as IDictionary<string, Object>;

            var props = item.GetType().GetProperties();
            foreach (var property in props)
            {
                if (property.CanRead)
                {
                    ret[property.Name] = property.GetValue(item);
                }
            }

            props = add.GetType().GetProperties();
            foreach (var property in props)
            {
                if (property.CanRead)
                {
                    ret[property.Name] = property.GetValue(add);
                }
            }

            return ret;
        }


    }
}