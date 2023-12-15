using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.SanPhamRepository
{
    public interface ISanPhamRepository:IGenericRepository<SanPham>
    {
        SanPham GetById(long id);

    }
   
}
