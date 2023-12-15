using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.BlogRepository
{
    public interface IBlogRepository:IGenericRepository<Blog>
    {
        Blog GetById(long id);

    }
   
}
