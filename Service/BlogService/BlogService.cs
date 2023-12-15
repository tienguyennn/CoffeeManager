using log4net;
using Model.IdentityEntities;
using Model.Entities;
using Repository;
using Repository.BlogRepository;
using Service.BlogService.Dto;
using Service.Common;
using System.Linq.Dynamic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PagedList;
using AutoMapper;
using Service.Constant;




namespace Service.BlogService
{
    public class BlogService : EntityService<Blog>, IBlogService
    {
        IUnitOfWork _unitOfWork;
        IBlogRepository _BlogRepository;
        ILog _loger;
        IMapper _mapper;



        public BlogService(IUnitOfWork unitOfWork,
        IBlogRepository BlogRepository,
        ILog loger,

                IMapper mapper
            )
            : base(unitOfWork, BlogRepository)
        {
            _unitOfWork = unitOfWork;
            _BlogRepository = BlogRepository;
            _loger = loger;
            _mapper = mapper;



        }

        public PageListResultBO<BlogDto> GetDaTaByPage(BlogSearchDto searchModel, int pageIndex = 1, int pageSize = 20)
        {
            var query = from Blogtbl in _BlogRepository.GetAllAsQueryable()

                        select new BlogDto
                        {
                            Id = Blogtbl.Id,
                            CreatedDate = Blogtbl.CreatedDate,
                            CreatedBy = Blogtbl.CreatedBy,
                            CreatedID = Blogtbl.CreatedID,
                            UpdatedDate = Blogtbl.UpdatedDate,
                            UpdatedBy = Blogtbl.UpdatedBy,
                            UpdatedID = Blogtbl.UpdatedID,
                            IsDelete = Blogtbl.IsDelete,
                            DeleteTime = Blogtbl.DeleteTime,
                            DeleteId = Blogtbl.DeleteId,
                            TieuDe = Blogtbl.TieuDe,
                            NoiDung = Blogtbl.NoiDung,
                            MoTa = Blogtbl.MoTa,
                            IsPhatHanh = Blogtbl.IsPhatHanh,
                            HinhAnh = Blogtbl.HinhAnh
                        };


            if (searchModel != null)
            {
                if (!string.IsNullOrEmpty(searchModel.TieuDeFilter))
                {
                    query = query.Where(x => x.TieuDe.Contains(searchModel.TieuDeFilter));
                }


                if (!string.IsNullOrEmpty(searchModel.sortQuery))
                {
                    query = query.OrderBy(searchModel.sortQuery);
                }
                else
                {
                    query = query.OrderByDescending(x => x.Id);
                }
            }
            else
            {
                query = query.OrderByDescending(x => x.Id);
            }
            var resultmodel = new PageListResultBO<BlogDto>();
            if (pageSize == -1)
            {
                var dataPageList = query.ToList();
                resultmodel.Count = dataPageList.Count;
                resultmodel.TotalPage = 1;
                resultmodel.ListItem = dataPageList;
            }
            else
            {
                var dataPageList = query.ToPagedList(pageIndex, pageSize);
                resultmodel.Count = dataPageList.TotalItemCount;
                resultmodel.TotalPage = dataPageList.PageCount;
                resultmodel.ListItem = dataPageList.ToList();
            }
            return resultmodel;
        }

        public Blog GetById(long id)
        {
            return _BlogRepository.GetById(id);
        }

        public BlogDto GetDtoById(long id)
        {
            var query = from Blogtbl in _BlogRepository.GetAllAsQueryable().Where(x => x.Id == id)

                        select new BlogDto
                        {
                            Id = Blogtbl.Id,
                            CreatedDate = Blogtbl.CreatedDate,
                            CreatedBy = Blogtbl.CreatedBy,
                            CreatedID = Blogtbl.CreatedID,
                            UpdatedDate = Blogtbl.UpdatedDate,
                            UpdatedBy = Blogtbl.UpdatedBy,
                            UpdatedID = Blogtbl.UpdatedID,
                            IsDelete = Blogtbl.IsDelete,
                            DeleteTime = Blogtbl.DeleteTime,
                            DeleteId = Blogtbl.DeleteId,
                            TieuDe = Blogtbl.TieuDe,
                            NoiDung = Blogtbl.NoiDung,
                            HinhAnh = Blogtbl.HinhAnh,
                            IsPhatHanh = Blogtbl.IsPhatHanh,
                            MoTa = Blogtbl.MoTa

                        };


            return query.FirstOrDefault();
        }


    }
}
