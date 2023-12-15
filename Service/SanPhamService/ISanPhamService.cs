using Model.IdentityEntities;
using Model.Entities;
using Service.SanPhamService.Dto;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.SanPhamService
{
    public interface ISanPhamService:IEntityService<SanPham>
    {
        PageListResultBO<SanPhamDto> GetDaTaByPage(SanPhamSearchDto searchModel, int pageIndex = 1, int pageSize = 20);
        SanPham GetById(long id);
        SanPhamDto GetDtoById(long id);
        List<SanPhamDto> GetByIds(List<long> ids);
    }
}
