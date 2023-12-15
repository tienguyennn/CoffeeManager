using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.SanPhamRepository
{
    public class SanPhamRepository : GenericRepository<SanPham>, ISanPhamRepository
    {
        public SanPhamRepository(DbContext context)
            : base(context)
        {

        }
        public SanPham GetById(long id)
        {
            return FindBy(x => x.Id == id).FirstOrDefault();
        }
        
    }
}
