using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.BlogArea.Models
{
    public class CreateVM
    {
		[Required(ErrorMessage = "Vui lòng nhập thông tin này")]
		public string TieuDe { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập thông tin này")]
		public string NoiDung { get; set; }
		public string MoTa { get; set; }
		public HttpPostedFileBase HinhAnhInpFile { get; set; }

        
    }
}