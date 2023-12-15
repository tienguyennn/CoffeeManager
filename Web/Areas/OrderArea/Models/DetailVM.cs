using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model.IdentityEntities;
using Model.Entities;
using Service.OrderService.Dto;

namespace Web.Areas.OrderArea.Models
{
    public class DetailVM
    {
       public OrderDto objInfo { get; set; }
    }
}