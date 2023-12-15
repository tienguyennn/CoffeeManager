using Model.Entities;
using Model.IdentityEntities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.AppUserRepository
{
    public class AppUserRepository : GenericRepository<AppUser>, IAppUserRepository
    {

        public AppUserRepository(DbContext context)
            : base(context)
        {

        }
        public AppUser GetById(long id)
        {
            return FindBy(x => x.Id == id).FirstOrDefault();
        }


    }
}
