using Model.IdentityEntities;
using Model.Entities;
using Service.OrderDetailService.Dto;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.OrderDetailService
{
    public interface IOrderDetailService : IEntityService<OrderDetail>
    {
        PageListResultBO<OrderDetailDto> GetDaTaByPage(OrderDetailSearchDto searchModel, int pageIndex = 1, int pageSize = 20);
        OrderDetail GetById(long id);
        OrderDetailDto GetDtoById(long id);
        List<OrderDetailDto> GetByOrder(long orderId);
    }
}
