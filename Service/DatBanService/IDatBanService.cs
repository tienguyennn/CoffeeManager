using Model.IdentityEntities;
using Model.Entities;
using Service.DatBanService.Dto;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.DatBanService
{
    public interface IDatBanService:IEntityService<DatBan>
    {
        PageListResultBO<DatBanDto> GetDaTaByPage(DatBanSearchDto searchModel, int pageIndex = 1, int pageSize = 20);
        DatBan GetById(long id);
        DatBanDto GetDtoById(long id);
    }
}
