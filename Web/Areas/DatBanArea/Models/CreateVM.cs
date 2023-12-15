using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.DatBanArea.Models
{
    public class CreateVM
    {
		public string Ho { get; set; }
		public string Ten { get; set; }
		public DateTime ThoiGian { get; set; }
		public string Ngay { get; set; }
		public string Gio { get; set; }
		public string DienThoai { get; set; }
		public string NoiDung { get; set; }
		public string TrangThai { get; set; }

        
    }
}