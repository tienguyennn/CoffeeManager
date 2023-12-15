using Model.IdentityEntities;
using Model.Entities;
using Service.DanhMucService.Dto;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.DanhMucService
{
    public interface IDanhMucService:IEntityService<DanhMuc>
    {
        PageListResultBO<DanhMucDto> GetDaTaByPage(DanhMucSearchDto searchModel, int pageIndex = 1, int pageSize = 20);
        DanhMuc GetById(long id);
        DanhMucDto GetDtoById(long id);

        List<DanhMucDto> GetDanhMucSanPham();
    }
}
