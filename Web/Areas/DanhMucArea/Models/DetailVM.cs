using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model.IdentityEntities;
using Model.Entities;
using Service.DanhMucService.Dto;

namespace Web.Areas.DanhMucArea.Models
{
    public class DetailVM
    {
       public DanhMucDto objInfo { get; set; }
    }
}