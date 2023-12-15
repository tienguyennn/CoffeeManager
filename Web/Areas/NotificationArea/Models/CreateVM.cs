using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.NotificationArea.Models
{
    public class CreateVM
    {
		[Required(ErrorMessage = "Vui lòng nhập thông tin này")]
		public bool IsRead { get; set; }
		public long? FromUser { get; set; }
		public long? ToUser { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập thông tin này")]
		public string Message { get; set; }
		public string Link { get; set; }
		public string Type { get; set; }

        
    }
}