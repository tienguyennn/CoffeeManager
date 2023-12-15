using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Routing;

namespace CommonHelper.UIHelper
{
    public static class FontAwesomeRenderer
    {
        public static MvcHtmlString IconSave(this HtmlHelper helper, object htmlAttributes = null, string innerText = null)
        {
            //    var builder = new TagBuilder("i");
            //    builder.AddCssClass("fa fa-save");


            //    if(innerText == null)
            //    {
            //        var messageTag = new TagBuilder("strong");
            //        messageTag.SetInnerText("(*)");

            //        builder. = messageTag.ToString(TagRenderMode.Normal);
            //    }

            //    return MvcHtmlString.Create(builder.ToString(TagRenderMode.Normal));
            return null;

        }



        public static MvcHtmlString IconClose(this HtmlHelper helper, object htmlAttributes = null, string innerText = null)
        {
            //var builder = new TagBuilder("i");
            //builder.AddCssClass("fa fa-times");
            //return MvcHtmlString.Create(builder.ToString(TagRenderMode.Normal));
            return null;
        }
        public static MvcHtmlString ImportantSpan(this HtmlHelper helper, object htmlAttributes = null)
        {
            var builder = new TagBuilder("span");
            builder.AddCssClass("red");

            var messageTag = new TagBuilder("strong");
            messageTag.SetInnerText("(*)");

            builder.InnerHtml = messageTag.ToString(TagRenderMode.Normal);
            if (htmlAttributes != null)
            {
                builder.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            }

            return MvcHtmlString.Create(builder.ToString(TagRenderMode.Normal));
        }
    }
}