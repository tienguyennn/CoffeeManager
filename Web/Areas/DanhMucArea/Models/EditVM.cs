using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.DanhMucArea.Models
{
    public class EditVM
    {
	public long Id { get; set; }
		public string TenDanhMuc { get; set; }
		public string MaDanhMuc { get; set; }
		public int ThuTu { get; set; }
		public string GhiChu { get; set; }

        
    }
}