using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.Common;
using Service.Constant;
using Service.OrderDetailService.Dto;

namespace Service.OrderService.Dto
{
    public class OrderDto : Order
    {
        public List<OrderDetailDto> OrderDetails { get; set; }
    }
}