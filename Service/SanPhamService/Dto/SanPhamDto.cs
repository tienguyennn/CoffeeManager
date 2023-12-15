using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.Common;


namespace Service.SanPhamService.Dto
{
    public class SanPhamDto : SanPham
    {
		public DanhMuc DanhMucId_DanhMucObj { get; set; }

        public int SoLuong { get;set; }
        public decimal GiaTong { get;set; }
    }
}