using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.OrderDetailRepository
{
    public class OrderDetailRepository : GenericRepository<OrderDetail>, IOrderDetailRepository
    {
        public OrderDetailRepository(DbContext context)
            : base(context)
        {

        }
        public OrderDetail GetById(long id)
        {
            return FindBy(x => x.Id == id).FirstOrDefault();
        }
        
    }
}
