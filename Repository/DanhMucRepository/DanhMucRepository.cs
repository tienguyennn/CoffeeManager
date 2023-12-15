using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.DanhMucRepository
{
    public class DanhMucRepository : GenericRepository<DanhMuc>, IDanhMucRepository
    {
        public DanhMucRepository(DbContext context)
            : base(context)
        {

        }
        public DanhMuc GetById(long id)
        {
            return FindBy(x => x.Id == id).FirstOrDefault();
        }
        
    }
}
