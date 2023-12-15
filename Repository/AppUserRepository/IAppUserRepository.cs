using Model.IdentityEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.AppUserRepository
{
    public interface IAppUserRepository : IGenericRepository<AppUser>
    {
        AppUser GetById(long id);

    }

}
