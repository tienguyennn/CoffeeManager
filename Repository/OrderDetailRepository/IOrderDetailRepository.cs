using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.OrderDetailRepository
{
    public interface IOrderDetailRepository:IGenericRepository<OrderDetail>
    {
        OrderDetail GetById(long id);

    }
   
}
