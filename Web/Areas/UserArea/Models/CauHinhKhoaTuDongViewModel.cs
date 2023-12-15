using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.UserArea.Models
{
    public class CauHinhKhoaTuDongViewModel
    {
        public long IdUser { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        public DateTime? NgayBatDau { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        public DateTime? NgayKetThuc { get; set; }
    }
}