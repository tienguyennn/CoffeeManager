using Model.IdentityEntities;
using Model.Entities;
using Service.LienHeService.Dto;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.LienHeService
{
    public interface ILienHeService:IEntityService<LienHe>
    {
        PageListResultBO<LienHeDto> GetDaTaByPage(LienHeSearchDto searchModel, int pageIndex = 1, int pageSize = 20);
        LienHe GetById(long id);
        LienHeDto GetDtoById(long id);
    }
}
