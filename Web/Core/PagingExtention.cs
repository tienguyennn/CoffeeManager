using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Service.AppUserService.Dto;
using Newtonsoft.Json;

namespace Web.Core
{
    public static class PagingExtention
    {
        public static MvcHtmlString GenPage(this HtmlHelper helper, int pageIndex, int totalPage, string FuncReload)
        {
            var builder = new TagBuilder("ul");
            builder.AddCssClass("pager");


            var strPage = "";
            strPage += "<li class=\"pager__item\"><a href=\"javascript:void(0)\" onclick=\"" + FuncReload + "(1)\" class=\"pager__link\">Trang đầu</a></li>";
            if (pageIndex > 3)
            {
                strPage += "<li class=\"disabled pager__item\"><a class=\"pager__link\" href=\"javascript:void(0);\">...</a></li>";
            }
            for (var i = -3; i <= 3; i++)
            {
                var page = i + pageIndex;
                if (i == 0)
                {
                    strPage += "<li class=\" pager__item active\" ><a href=\"javascript:void(0)\" class=\"pager__link\">" + page + "</a></li>";
                }
                else
                {
                    if (page > 0 && page <= totalPage)
                    {
                        
                        strPage += "<li class = \"pager__item\">" +
                            "<a href=\"javascript:void(0)\" class=\"pager__link\" onclick=\"" + FuncReload +"("+page+")\" > " + page + "</a>" +
                            "</li>";
                    }

                }
            }
            if (pageIndex + 3 < totalPage)
            {
                strPage += "<li class=\"disabled pager__item\"><a href=\"javascript:void(0);\" class=\"pager__link\">...</a></li>";
            }
            strPage += "<li class=\"pager__item\"><a href=\"javascript:void(0)\" class=\"pager__link\" onclick=\"" + FuncReload + "("+ totalPage + ")\" > Trang cuối </a></li>";
            builder.InnerHtml = strPage;
            return new MvcHtmlString(builder.ToString());

        }
       
    }
}
