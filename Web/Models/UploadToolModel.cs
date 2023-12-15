using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class UploadToolVM
    {
        public UploadToolVM()
        {
            LoaiTaiLieu = "Unknown";
        }
        public UploadToolVM(string loaiTaiLieu)
        {
            LoaiTaiLieu = loaiTaiLieu;
        }
        public string LoaiTaiLieu { get; set; }
        public string Value { get; set; }
        //public string DBValue { get; set; }
    }
}