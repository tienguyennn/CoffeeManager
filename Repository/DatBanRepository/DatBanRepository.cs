using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.DatBanRepository
{
    public class DatBanRepository : GenericRepository<DatBan>, IDatBanRepository
    {
        public DatBanRepository(DbContext context)
            : base(context)
        {

        }
        public DatBan GetById(long id)
        {
            return FindBy(x => x.Id == id).FirstOrDefault();
        }
        
    }
}
