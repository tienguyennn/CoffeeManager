using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model.IdentityEntities;
using Model.Entities;
using Service.LienHeService.Dto;

namespace Web.Areas.LienHeArea.Models
{
    public class DetailVM
    {
       public LienHeDto objInfo { get; set; }
    }
}