using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.DanhMucRepository
{
    public interface IDanhMucRepository:IGenericRepository<DanhMuc>
    {
        DanhMuc GetById(long id);

    }
   
}
