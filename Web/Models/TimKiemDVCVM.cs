using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Models
{
    public class TimKiemDVCVM : Controller
    {
        public string query { get; set; }
        public string MaHoSo { get; set; }
        public string TenDVC { get; set; }
        public long? TrangThai { get; set; }
        public bool IsKetThuc { get; set; }
    }
}