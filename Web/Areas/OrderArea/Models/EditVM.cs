using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.OrderArea.Models
{
    public class EditVM
    {
	public long Id { get; set; }
		public string Ho { get; set; }
		public string Ten { get; set; }
		public string DiaChi { get; set; }
		public string DiaChiChiTiet { get; set; }
		public string DienThoai { get; set; }
		public string Email { get; set; }
		public string SanPhamIds { get; set; }
		public string TrangThai { get; set; }

        
    }
}