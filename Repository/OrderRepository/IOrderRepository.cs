using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.OrderRepository
{
    public interface IOrderRepository:IGenericRepository<Order>
    {
        Order GetById(long id);

    }
   
}
