using log4net;
using Model.IdentityEntities;
using Model.Entities;
using Repository;
using Repository.SanPhamRepository;
using Service.SanPhamService.Dto;
using Service.Common;
using System.Linq.Dynamic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PagedList;
using AutoMapper;


using Repository.DanhMucRepository;



namespace Service.SanPhamService
{
    public class SanPhamService : EntityService<SanPham>, ISanPhamService
    {
        IUnitOfWork _unitOfWork;
        ISanPhamRepository _SanPhamRepository;
        ILog _loger;
        IMapper _mapper;
        IDanhMucRepository _DanhMucRepository;



        public SanPhamService(IUnitOfWork unitOfWork,
        ISanPhamRepository SanPhamRepository,
        ILog loger,
                IDanhMucRepository DanhMucRepository,

                IMapper mapper
            )
            : base(unitOfWork, SanPhamRepository)
        {
            _unitOfWork = unitOfWork;
            _SanPhamRepository = SanPhamRepository;
            _loger = loger;
            _mapper = mapper;
            _DanhMucRepository = DanhMucRepository;



        }

        public PageListResultBO<SanPhamDto> GetDaTaByPage(SanPhamSearchDto searchModel, int pageIndex = 1, int pageSize = 20)
        {
            var query = from SanPhamtbl in _SanPhamRepository.GetAllAsQueryable()

                        join DanhMucId_DanhMuctbl in _DanhMucRepository.GetAllAsQueryable()
                        on SanPhamtbl.DanhMucId equals DanhMucId_DanhMuctbl.Id into jDanhMucId_DanhMuc
                        from DanhMucId_DanhMucInfo in jDanhMucId_DanhMuc.DefaultIfEmpty()


                        select new SanPhamDto
                        {
                            Id = SanPhamtbl.Id,
                            CreatedDate = SanPhamtbl.CreatedDate,
                            CreatedBy = SanPhamtbl.CreatedBy,
                            CreatedID = SanPhamtbl.CreatedID,
                            UpdatedDate = SanPhamtbl.UpdatedDate,
                            UpdatedBy = SanPhamtbl.UpdatedBy,
                            UpdatedID = SanPhamtbl.UpdatedID,
                            IsDelete = SanPhamtbl.IsDelete,
                            DeleteTime = SanPhamtbl.DeleteTime,
                            DeleteId = SanPhamtbl.DeleteId,
                            DanhMucId = SanPhamtbl.DanhMucId,
                            DanhMucId_DanhMucObj = DanhMucId_DanhMucInfo,
                            Ten = SanPhamtbl.Ten,
                            HinhAnh = SanPhamtbl.HinhAnh,
                            MoTa = SanPhamtbl.MoTa,
                            Gia = SanPhamtbl.Gia,
                            ThuTu = SanPhamtbl.ThuTu

                        };

            if (searchModel != null)
            {
                if (searchModel.DanhMucIdFilter.HasValue)
                {
                    query = query.Where(x => x.DanhMucId == searchModel.DanhMucIdFilter);
                }
                if (!string.IsNullOrEmpty(searchModel.TenFilter))
                {
                    query = query.Where(x => x.Ten.Contains(searchModel.TenFilter));
                }
                if (searchModel.GiaFilter != null)
                {
                    query = query.Where(x => x.Gia == searchModel.GiaFilter);
                }
                if (searchModel.ThuTuFilter != null)
                {
                    query = query.Where(x => x.ThuTu == searchModel.ThuTuFilter);
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
            var resultmodel = new PageListResultBO<SanPhamDto>();
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

        public SanPham GetById(long id)
        {
            return _SanPhamRepository.GetById(id);
        }

        public SanPhamDto GetDtoById(long id)
        {
            var query = from SanPhamtbl in _SanPhamRepository.GetAllAsQueryable().Where(x => x.Id == id)

                        join DanhMucId_DanhMuctbl in _DanhMucRepository.GetAllAsQueryable()
                        on SanPhamtbl.DanhMucId equals DanhMucId_DanhMuctbl.Id into jDanhMucId_DanhMuc
                        from DanhMucId_DanhMucInfo in jDanhMucId_DanhMuc.DefaultIfEmpty()


                        select new SanPhamDto
                        {
                            Id = SanPhamtbl.Id,
                            CreatedDate = SanPhamtbl.CreatedDate,
                            CreatedBy = SanPhamtbl.CreatedBy,
                            CreatedID = SanPhamtbl.CreatedID,
                            UpdatedDate = SanPhamtbl.UpdatedDate,
                            UpdatedBy = SanPhamtbl.UpdatedBy,
                            UpdatedID = SanPhamtbl.UpdatedID,
                            IsDelete = SanPhamtbl.IsDelete,
                            DeleteTime = SanPhamtbl.DeleteTime,
                            DeleteId = SanPhamtbl.DeleteId,
                            DanhMucId = SanPhamtbl.DanhMucId,
                            DanhMucId_DanhMucObj = DanhMucId_DanhMucInfo,
                            Ten = SanPhamtbl.Ten,
                            HinhAnh = SanPhamtbl.HinhAnh,
                            MoTa = SanPhamtbl.MoTa,
                            Gia = SanPhamtbl.Gia,
                            ThuTu = SanPhamtbl.ThuTu

                        };


            return query.FirstOrDefault();
        }

        public List<SanPhamDto> GetByIds(List<long> ids)
        {
            var query = (from SanPhamtbl in _SanPhamRepository.GetAllAsQueryable()
                        join DanhMucId_DanhMuctbl in _DanhMucRepository.GetAllAsQueryable()
                        on SanPhamtbl.DanhMucId equals DanhMucId_DanhMuctbl.Id into jDanhMucId_DanhMuc
                        from DanhMucId_DanhMucInfo in jDanhMucId_DanhMuc.DefaultIfEmpty()
                        where ids.Contains(SanPhamtbl.Id)
                        select new SanPhamDto
                        {
                            Id = SanPhamtbl.Id,
                            CreatedDate = SanPhamtbl.CreatedDate,
                            CreatedBy = SanPhamtbl.CreatedBy,
                            CreatedID = SanPhamtbl.CreatedID,
                            UpdatedDate = SanPhamtbl.UpdatedDate,
                            UpdatedBy = SanPhamtbl.UpdatedBy,
                            UpdatedID = SanPhamtbl.UpdatedID,
                            IsDelete = SanPhamtbl.IsDelete,
                            DeleteTime = SanPhamtbl.DeleteTime,
                            DeleteId = SanPhamtbl.DeleteId,
                            DanhMucId = SanPhamtbl.DanhMucId,
                            DanhMucId_DanhMucObj = DanhMucId_DanhMucInfo,
                            Ten = SanPhamtbl.Ten,
                            HinhAnh = SanPhamtbl.HinhAnh,
                            MoTa = SanPhamtbl.MoTa,
                            Gia = SanPhamtbl.Gia,
                            ThuTu = SanPhamtbl.ThuTu
                        });
            var result = query.ToList();
            return result;
        }
    }
}
