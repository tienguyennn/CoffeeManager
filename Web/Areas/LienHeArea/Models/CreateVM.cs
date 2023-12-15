using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.LienHeArea.Models
{
    public class CreateVM
    {
		public string HoTen { get; set; }
		public string Email { get; set; }
		public string TieuDe { get; set; }
		public string NoiDung { get; set; }

        
    }
}