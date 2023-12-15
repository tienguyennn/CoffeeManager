using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model.IdentityEntities;
using Model.Entities;
using Service.DatBanService.Dto;

namespace Web.Areas.DatBanArea.Models
{
    public class DetailVM
    {
       public DatBanDto objInfo { get; set; }
    }
}