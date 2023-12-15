using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq.Expressions;
using System.Reflection;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Routing;

namespace CommonHelper.HtmlTagHelper
{
    public static partial class HtmlTagHelper
    {
        private static FormCol FormColDefault = new FormCol(Col.sm, 4, 8);
        #region helper
        private static MvcHtmlString ToMvcHtmlString(this TagBuilder tagBuilder, TagRenderMode renderMode)
        {
            return MvcHtmlString.Create(tagBuilder.ToString(renderMode));
        }
        private static RouteValueDictionary AddFormControlClass(object controlAttributes)
        {
            if (controlAttributes == null)
                return new RouteValueDictionary() { ["class"] = "form-control" };

            var controlAttributesDictionary = HtmlHelper.AnonymousObjectToHtmlAttributes(controlAttributes);
            var controlClass = controlAttributesDictionary["class"].ToString();
            if (!controlClass.Contains("form-control"))
            {
                controlAttributesDictionary["class"] = "form-control " + controlClass;
            }
            return controlAttributesDictionary;
        }
        public static CultureInfo GetCurrentCulture()
        {
            try
            {
                // Get the globalization section under system.web in Web.Config.
                var section = System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration("/").GetSection("system.web/globalization") as System.Web.Configuration.GlobalizationSection;

                // If the section doesn't exist in the Web.Config, returns null.
                if (string.IsNullOrEmpty(section.Culture))
                {
                    return null;
                }

                return new CultureInfo(section.Culture);
            }
            catch (NullReferenceException)
            {
                return null;
            }
        }
        private static string MemberName<T, V>(this Expression<Func<T, V>> expression)
        {
            var memberExpression = expression.Body as MemberExpression;
            if (memberExpression == null)
                throw new InvalidOperationException("Expression must be a member expression");

            return memberExpression.Member.Name;
        }
        private static T GetAttribute<T>(this ICustomAttributeProvider provider)
            where T : Attribute
        {
            var attributes = provider.GetCustomAttributes(typeof(T), true);
            return attributes.Length > 0 ? attributes[0] as T : null;
        }
        private static bool IsRequired<T, V>(this Expression<Func<T, V>> expression)
        {
            var memberExpression = expression.Body as MemberExpression;
            if (memberExpression == null)
                throw new InvalidOperationException("Expression must be a member expression");

            return memberExpression.Member.GetAttribute<RequiredAttribute>() != null;
        }

        private static string GetDisplayName<T, V>(this Expression<Func<T, V>> expression)
        {
            var memberExpression = expression.Body as MemberExpression;
            if (memberExpression == null)
                throw new InvalidOperationException("Expression must be a member expression");
            var displayNameAttr = memberExpression.Member.GetAttribute<DisplayNameAttribute>();
            if (displayNameAttr != null)
            {
                return displayNameAttr.DisplayName;
            }
            return string.Empty;
        }
        private static MvcHtmlString FormFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, string labelText, MvcHtmlString innerControl)
        {
            var formGroup = new TagBuilder("div");

            formGroup.MergeAttribute("class", "form-group");
            var label = new TagBuilder("label");
            label.MergeAttribute("class", $"control-label col-{formCol.Col}-{formCol.LabelCol}");

            if (string.IsNullOrEmpty(labelText))
            {
                labelText = GetDisplayName(expression);
            }

            label.InnerHtml = $"{labelText}";
            if (IsRequired(expression))
            {
                label.InnerHtml += " <span class=\"red\">*</span>";
            }

            var controlGroup = new TagBuilder("div");
            controlGroup.MergeAttribute("class", $"col-{formCol.Col}-{formCol.ControlCol}");
            controlGroup.InnerHtml = innerControl.ToString() + htmlHelper.ValidationMessageFor(expression, "", new { @class = "text-danger" });

            formGroup.InnerHtml = label.ToString(TagRenderMode.Normal) + controlGroup.ToString(TagRenderMode.Normal);
            return formGroup.ToMvcHtmlString(TagRenderMode.Normal);
        }

        private static MvcHtmlString Form(this HtmlHelper htmlHelper, string name, FormCol formCol, string labelText, bool required, MvcHtmlString innerControl)
        {
            var formGroup = new TagBuilder("div");

            formGroup.MergeAttribute("class", "form-group");
            var label = new TagBuilder("label");
            label.MergeAttribute("class", $"control-label col-{formCol.Col}-{formCol.LabelCol}");

            //if (string.IsNullOrEmpty(labelText))
            //{
            //    labelText = GetDisplayName(expression);
            //}

            label.InnerHtml = $"{labelText}";
            if (required)
            {
                label.InnerHtml += " <span class=\"red\">*</span>";
            }

            var controlGroup = new TagBuilder("div");
            controlGroup.MergeAttribute("class", $"col-{formCol.Col}-{formCol.ControlCol}");
            controlGroup.InnerHtml = innerControl.ToString() + htmlHelper.ValidationMessage(name, new { @class = "text-danger" });

            formGroup.InnerHtml = label.ToString(TagRenderMode.Normal) + controlGroup.ToString(TagRenderMode.Normal);
            return formGroup.ToMvcHtmlString(TagRenderMode.Normal);
        }

        public static MvcHtmlString DatePickerFor<TModel, TProperty>
           (this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, IDictionary<string, object> htmlAttributes)
        {
            // Get the Metadata from Model's DataAnnotations.
            var metadata = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);

            // Main input.
            var input = new TagBuilder("input");

            // Setting attributes.
            input.Attributes.Add("id", metadata.PropertyName);
            input.Attributes.Add("name", metadata.PropertyName);
            input.Attributes.Add("autocomplete", "off");
            input.Attributes.Add("type", "text");
            input.Attributes.Add("data-provide", "datepicker"); // Bootstrap Markup API.
            foreach (var htmlAttribute in htmlAttributes)
            {
                input.Attributes.Add(htmlAttribute.Key, htmlAttribute.Value.ToString());
            }
            input.AddCssClass("form-control"); // Bootstrap's 3.1.1 input CSS class.

            // Set Date's format according to the current culture from the HelperMethods.HTMLHelper package.
            if (GetCurrentCulture() != null)
            {
                input.Attributes.Add("data-date-language", GetCurrentCulture().ToString());
                input.Attributes.Add("data-date-format", GetCurrentCulture().DateTimeFormat.ShortDatePattern.ToLower());
            }

            // Set the maxlength to 10.
            input.Attributes.Add("maxlength", "10");

            // Adds a mask in the ##/##/#### pattern.
            input.Attributes.Add("onkeypress", "format('##/##/####', this); function format(mascara, documento) { var i = documento.value.length; var saida = mascara.substring(0, 1); var texto = mascara.substring(i); if (texto.substring(0, 1) != saida) { documento.value += texto.substring(0, 1); } }");

            // Script to allow the user input only numbers. Will be loaded when DOM is ready.
            var allowOnlyNumbersScript = new TagBuilder("script");

            allowOnlyNumbersScript.InnerHtml = "$(document).ready(function() { onlyNumbers($('#" + metadata.PropertyName + "') ) }); function onlyNumbers(e) { e.keydown(function (e) { if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || e.keyCode == 65 && e.ctrlKey === true || e.keyCode >= 35 && e.keyCode <= 39) { return } if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) { e.preventDefault() } }) }";

            // If the current Model's value is not null, set the input's value to correspond the call. If it is, set to the current date.
            if (metadata.Model != null)
            {
                input.Attributes.Add("value", ((DateTime)metadata.Model).ToShortDateString());
            }
            else
            {
                //input.Attributes.Add("value", DateTime.Now.ToShortDateString());
                input.Attributes.Add("value", "");
            }

            // Datepicker API custom parameters specified optionally by the user.
            //foreach (var p in htmlAttributes)
            //{
            //    input.Attributes.Add("data-date-" + p.Split('=')[0], p.Split('=')[1]);
            //}

            return new MvcHtmlString(input.ToString() + allowOnlyNumbersScript.ToString());
        }

        #endregion


        #region Text
        public static MvcHtmlString FormTextFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, string labelText, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, labelText, htmlHelper.TextBoxFor(expression, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, string labelText, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, FormColDefault, labelText, htmlHelper.TextBoxFor(expression, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, string labelText, string format, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, labelText, htmlHelper.TextBoxFor(expression, format, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, string labelText, string format, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, FormColDefault, labelText, htmlHelper.TextBoxFor(expression, format, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, "", htmlHelper.TextBoxFor(expression, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, FormColDefault, "", htmlHelper.TextBoxFor(expression, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormText(this HtmlHelper htmlHelper, string name, FormCol formCol, string labelText, bool required, object value, string format, object controlAttributes = null)
        {
            return Form(htmlHelper, name, formCol, labelText, required, htmlHelper.TextBox(name, value, format, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormText(this HtmlHelper htmlHelper, string name, string labelText, bool required, object value, string format, object controlAttributes = null)
        {
            return Form(htmlHelper, name, FormColDefault, labelText, required, htmlHelper.TextBox(name, value, format, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormText(this HtmlHelper htmlHelper, string name, FormCol formCol, string labelText, object value, string format, object controlAttributes = null)
        {
            return Form(htmlHelper, name, formCol, labelText, false, htmlHelper.TextBox(name, value, format, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormText(this HtmlHelper htmlHelper, string name, string labelText, object value, string format, object controlAttributes = null)
        {
            return Form(htmlHelper, name, FormColDefault, labelText, false, htmlHelper.TextBox(name, value, format, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormText(this HtmlHelper htmlHelper, string name, FormCol formCol, string labelText, object value, object controlAttributes = null)
        {
            return Form(htmlHelper, name, formCol, labelText, false, htmlHelper.TextBox(name, value, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormText(this HtmlHelper htmlHelper, string name, string labelText, object value, object controlAttributes = null)
        {
            return Form(htmlHelper, name, FormColDefault, labelText, false, htmlHelper.TextBox(name, value, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormText(this HtmlHelper htmlHelper, string name, FormCol formCol, string labelText, object controlAttributes = null)
        {
            return Form(htmlHelper, name, formCol, labelText, false, htmlHelper.TextBox(name, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormText(this HtmlHelper htmlHelper, string name, string labelText, object controlAttributes = null)
        {
            return Form(htmlHelper, name, FormColDefault, labelText, false, htmlHelper.TextBox(name, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormText(this HtmlHelper htmlHelper, string name, FormCol formCol, bool required, string labelText, object value, object controlAttributes = null)
        {
            return Form(htmlHelper, name, formCol, labelText, required, htmlHelper.TextBox(name, value, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormText(this HtmlHelper htmlHelper, string name, string labelText, bool required, object value, object controlAttributes = null)
        {
            return Form(htmlHelper, name, FormColDefault, labelText, required, htmlHelper.TextBox(name, value, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormText(this HtmlHelper htmlHelper, string name, FormCol formCol, string labelText, bool required, object controlAttributes = null)
        {
            return Form(htmlHelper, name, formCol, labelText, required, htmlHelper.TextBox(name, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormText(this HtmlHelper htmlHelper, string name, string labelText, bool required, object controlAttributes = null)
        {
            return Form(htmlHelper, name, FormColDefault, labelText, required, htmlHelper.TextBox(name, AddFormControlClass(controlAttributes)));
        }
        #endregion

        #region Text box
        public static MvcHtmlString FormTextBoxFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, string labelText, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, labelText, htmlHelper.TextBoxFor(expression, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBoxFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, string labelText, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, FormColDefault, labelText, htmlHelper.TextBoxFor(expression, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBoxFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, string labelText, string format, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, labelText, htmlHelper.TextBoxFor(expression, format, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBoxFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, string labelText, string format, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, FormColDefault, labelText, htmlHelper.TextBoxFor(expression, format, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBoxFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, "", htmlHelper.TextBoxFor(expression, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBoxFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, FormColDefault, "", htmlHelper.TextBoxFor(expression, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBox(this HtmlHelper htmlHelper, string name, FormCol formCol, string labelText, bool required, object value, string format, object controlAttributes = null)
        {
            return Form(htmlHelper, name, formCol, labelText, required, htmlHelper.TextBox(name, value, format, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBox(this HtmlHelper htmlHelper, string name, string labelText, bool required, object value, string format, object controlAttributes = null)
        {
            return Form(htmlHelper, name, FormColDefault, labelText, required, htmlHelper.TextBox(name, value, format, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBox(this HtmlHelper htmlHelper, string name, FormCol formCol, string labelText, object value, string format, object controlAttributes = null)
        {
            return Form(htmlHelper, name, formCol, labelText, false, htmlHelper.TextBox(name, value, format, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBox(this HtmlHelper htmlHelper, string name, string labelText, object value, string format, object controlAttributes = null)
        {
            return Form(htmlHelper, name, FormColDefault, labelText, false, htmlHelper.TextBox(name, value, format, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBox(this HtmlHelper htmlHelper, string name, FormCol formCol, string labelText, object value, object controlAttributes = null)
        {
            return Form(htmlHelper, name, formCol, labelText, false, htmlHelper.TextBox(name, value, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBox(this HtmlHelper htmlHelper, string name, string labelText, object value, object controlAttributes = null)
        {
            return Form(htmlHelper, name, FormColDefault, labelText, false, htmlHelper.TextBox(name, value, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBox(this HtmlHelper htmlHelper, string name, FormCol formCol, string labelText, object controlAttributes = null)
        {
            return Form(htmlHelper, name, formCol, labelText, false, htmlHelper.TextBox(name, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBox(this HtmlHelper htmlHelper, string name, string labelText, object controlAttributes = null)
        {
            return Form(htmlHelper, name, FormColDefault, labelText, false, htmlHelper.TextBox(name, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBox(this HtmlHelper htmlHelper, string name, FormCol formCol, bool required, string labelText, object value, object controlAttributes = null)
        {
            return Form(htmlHelper, name, formCol, labelText, required, htmlHelper.TextBox(name, value, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBox(this HtmlHelper htmlHelper, string name, string labelText, bool required, object value, object controlAttributes = null)
        {
            return Form(htmlHelper, name, FormColDefault, labelText, required, htmlHelper.TextBox(name, value, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBox(this HtmlHelper htmlHelper, string name, FormCol formCol, string labelText, bool required, object controlAttributes = null)
        {
            return Form(htmlHelper, name, formCol, labelText, required, htmlHelper.TextBox(name, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextBox(this HtmlHelper htmlHelper, string name, string labelText, bool required, object controlAttributes = null)
        {
            return Form(htmlHelper, name, FormColDefault, labelText, required, htmlHelper.TextBox(name, AddFormControlClass(controlAttributes)));
        }

        #endregion

        #region Textarea

        public static MvcHtmlString FormTextAreaFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, string labelText, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, labelText, htmlHelper.TextAreaFor(expression, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextAreaFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, string labelText, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, FormColDefault, labelText, htmlHelper.TextAreaFor(expression, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextAreaFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, string labelText, int rows, int cols, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, labelText, htmlHelper.TextAreaFor(expression, rows, cols, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextAreaFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, string labelText, int rows, int cols, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, FormColDefault, labelText, htmlHelper.TextAreaFor(expression, rows, cols, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextAreaFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, "", htmlHelper.TextAreaFor(expression, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextAreaFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, FormColDefault, string.Empty, htmlHelper.TextAreaFor(expression, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextAreaFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, int rows, int cols, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, string.Empty, htmlHelper.TextAreaFor(expression, rows, cols, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormTextAreaFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, int rows, int cols, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, FormColDefault, string.Empty, htmlHelper.TextAreaFor(expression, rows, cols, AddFormControlClass(controlAttributes)));
        }
        #endregion

        #region Date picker
        public static MvcHtmlString FormDatePickerFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, string labelText, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, labelText, htmlHelper.DatePickerFor(expression, AddFormControlClass(controlAttributes)));
        }

        #endregion

        #region Dropdown
        public static MvcHtmlString FormDropdownFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, string labelText, List<SelectListItem> selectListItems, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, labelText, htmlHelper.DropDownListFor(expression, selectListItems, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormDropdownFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, string labelText, List<SelectListItem> selectListItems, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, FormColDefault, labelText, htmlHelper.DropDownListFor(expression, selectListItems, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormDropdownFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, string labelText, List<SelectListItem> selectListItems, string optionLabel, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, labelText, htmlHelper.DropDownListFor(expression, selectListItems, optionLabel, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormDropdownFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, string labelText, List<SelectListItem> selectListItems, string optionLabel, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, FormColDefault, labelText, htmlHelper.DropDownListFor(expression, selectListItems, optionLabel, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormDropdownFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, List<SelectListItem> selectListItems, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, string.Empty, htmlHelper.DropDownListFor(expression, selectListItems, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormDropdownFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, List<SelectListItem> selectListItems, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, FormColDefault, string.Empty, htmlHelper.DropDownListFor(expression, selectListItems, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormDropdownFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, FormCol formCol, List<SelectListItem> selectListItems, string optionLabel, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, formCol, string.Empty, htmlHelper.DropDownListFor(expression, selectListItems, optionLabel, AddFormControlClass(controlAttributes)));
        }
        public static MvcHtmlString FormDropdownFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, List<SelectListItem> selectListItems, string optionLabel, object controlAttributes = null)
        {
            return FormFor(htmlHelper, expression, FormColDefault, string.Empty, htmlHelper.DropDownListFor(expression, selectListItems, optionLabel, AddFormControlClass(controlAttributes)));
        }
        #endregion

    }

    public class FormCol
    {
        public FormCol(string col, int labelCol, int controlCol)
        {
            Col = col;
            LabelCol = labelCol;
            ControlCol = controlCol;
        }

        public string Col { get; set; }
        public int LabelCol { get; set; }
        public int ControlCol { get; set; }
    }

    public class Col
    {
        public static string xs = "xs";
        public static string sm = "sm";
        public static string md = "md";
        public static string lg = "lg";
    }
}
