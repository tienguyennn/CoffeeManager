using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Configuration;
using Model.Entities;

namespace Web.Models
{
    public class EmailViewModel
    {
        public string Address { get; set; }
        public string GhiChu { get; set; }
        public string AccessLink { get; set; }
        public string Content { get; set; }
        public string TenBaoCao { get; set; }
        public string DonViName { get; set; }
        public string CountDonViDaKeKhai { get; set; }
        public DateTime ThoiGianGui { get; set; }

        public string DiaChiDomain { get; set; }
        public string TenDonViChuTri { get; set; }
        public string NamSanXuat { get; set; }
        public string HoTen { get; set; }
    }
}
