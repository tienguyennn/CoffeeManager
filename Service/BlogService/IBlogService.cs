using Model.IdentityEntities;
using Model.Entities;
using Service.BlogService.Dto;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.BlogService
{
    public interface IBlogService:IEntityService<Blog>
    {
        PageListResultBO<BlogDto> GetDaTaByPage(BlogSearchDto searchModel, int pageIndex = 1, int pageSize = 20);
        Blog GetById(long id);
        BlogDto GetDtoById(long id);
    }
}
