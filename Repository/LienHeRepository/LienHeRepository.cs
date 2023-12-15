using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.LienHeRepository
{
    public class LienHeRepository : GenericRepository<LienHe>, ILienHeRepository
    {
        public LienHeRepository(DbContext context)
            : base(context)
        {

        }
        public LienHe GetById(long id)
        {
            return FindBy(x => x.Id == id).FirstOrDefault();
        }
        
    }
}
