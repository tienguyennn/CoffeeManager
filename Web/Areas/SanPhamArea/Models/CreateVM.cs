using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.SanPhamArea.Models
{
    public class CreateVM
    {
		[Required(ErrorMessage = "Vui lòng nhập thông tin này")]
		public string DanhMucId { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập thông tin này")]
		public string Ten { get; set; }
		public HttpPostedFileBase HinhAnhInpFile { get; set; }
		public string MoTa { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập thông tin này")]
		public decimal Gia { get; set; }
		public int ThuTu { get; set; }

        
    }
}