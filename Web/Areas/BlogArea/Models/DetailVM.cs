using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model.IdentityEntities;
using Model.Entities;
using Service.BlogService.Dto;

namespace Web.Areas.BlogArea.Models
{
    public class DetailVM
    {
       public BlogDto objInfo { get; set; }
    }
}