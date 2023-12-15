using Model.IdentityEntities;
using Model.Entities;
using Service.OrderService.Dto;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.OrderService
{
    public interface IOrderService:IEntityService<Order>
    {
        PageListResultBO<OrderDto> GetDaTaByPage(OrderSearchDto searchModel, int pageIndex = 1, int pageSize = 20);
        Order GetById(long id);
        OrderDto GetDtoById(long id);
    }
}
