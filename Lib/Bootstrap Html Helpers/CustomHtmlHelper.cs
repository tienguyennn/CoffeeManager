using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Hinet.Web.Bootstrap_Html_Helpers
{
    public static class CustomHtmlHelper
    {
        public static MvcHtmlString InfoLabel(this HtmlHelper helper, string textToDisplay = null, object htmlAttributes = null)
        {
            //tạo tag
            var builder = new TagBuilder("label");
            //tạo các attribute
            if (string.IsNullOrEmpty(textToDisplay))
            {
                builder.MergeAttribute("style", "color: red !important;font-style:italic");
            }

            var messageTag = new TagBuilder("strong");
            messageTag.SetInnerText(textToDisplay ?? "Không có dữ liệu");

            builder.InnerHtml = messageTag.ToString(TagRenderMode.Normal);
            if (htmlAttributes != null)
            {
                builder.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            }
            //render tage
            return MvcHtmlString.Create(builder.ToString(TagRenderMode.Normal));
        }
    }
}