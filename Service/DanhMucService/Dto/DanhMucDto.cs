using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.Common;


namespace Service.DanhMucService.Dto
{
    public class DanhMucDto : DanhMuc
    {
        public List<SanPham> SanPhams { get; set; }
    }
}