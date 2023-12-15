using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model.IdentityEntities;
using Model.Entities;
using Service.SanPhamService.Dto;

namespace Web.Areas.SanPhamArea.Models
{
    public class DetailVM
    {
       public SanPhamDto objInfo { get; set; }
    }
}