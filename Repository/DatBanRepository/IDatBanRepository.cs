using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.DatBanRepository
{
    public interface IDatBanRepository:IGenericRepository<DatBan>
    {
        DatBan GetById(long id);

    }
   
}
