using log4net;
using Model.IdentityEntities;
using Model.Entities;
using Repository;
using Repository.DanhMucRepository;
using Service.DanhMucService.Dto;
using Service.Common;
using System.Linq.Dynamic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PagedList;
using AutoMapper;
using Repository.SanPhamRepository;

namespace Service.DanhMucService
{
    public class DanhMucService : EntityService<DanhMuc>, IDanhMucService
    {
        IUnitOfWork _unitOfWork;
        IDanhMucRepository _DanhMucRepository;
        private readonly ISanPhamRepository _sanPhamRepository;
        ILog _loger;
        IMapper _mapper;



        public DanhMucService(IUnitOfWork unitOfWork,
        IDanhMucRepository DanhMucRepository,
        ISanPhamRepository sanPhamRepository,
        ILog loger,

                IMapper mapper
            )
            : base(unitOfWork, DanhMucRepository)
        {
            _unitOfWork = unitOfWork;
            _DanhMucRepository = DanhMucRepository;
            this._sanPhamRepository = sanPhamRepository;
            _loger = loger;
            _mapper = mapper;



        }

        public PageListResultBO<DanhMucDto> GetDaTaByPage(DanhMucSearchDto searchModel, int pageIndex = 1, int pageSize = 20)
        {
            var query = from DanhMuctbl in _DanhMucRepository.GetAllAsQueryable()

                        select new DanhMucDto
                        {
                            Id = DanhMuctbl.Id,
                            CreatedDate = DanhMuctbl.CreatedDate,
                            CreatedBy = DanhMuctbl.CreatedBy,
                            CreatedID = DanhMuctbl.CreatedID,
                            UpdatedDate = DanhMuctbl.UpdatedDate,
                            UpdatedBy = DanhMuctbl.UpdatedBy,
                            UpdatedID = DanhMuctbl.UpdatedID,
                            IsDelete = DanhMuctbl.IsDelete,
                            DeleteTime = DanhMuctbl.DeleteTime,
                            DeleteId = DanhMuctbl.DeleteId,
                            TenDanhMuc = DanhMuctbl.TenDanhMuc,
                            MaDanhMuc = DanhMuctbl.MaDanhMuc,
                            ThuTu = DanhMuctbl.ThuTu,
                            GhiChu = DanhMuctbl.GhiChu

                        };

            if (searchModel != null)
            {
                if (!string.IsNullOrEmpty(searchModel.TenDanhMucFilter))
                {
                    query = query.Where(x => x.TenDanhMuc.Contains(searchModel.TenDanhMucFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.MaDanhMucFilter))
                {
                    query = query.Where(x => x.MaDanhMuc.Contains(searchModel.MaDanhMucFilter));
                }
                if (searchModel.ThuTuFilter != null)
                {
                    query = query.Where(x => x.ThuTu == searchModel.ThuTuFilter);
                }
                if (!string.IsNullOrEmpty(searchModel.GhiChuFilter))
                {
                    query = query.Where(x => x.GhiChu.Contains(searchModel.GhiChuFilter));
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
            var resultmodel = new PageListResultBO<DanhMucDto>();
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

        public DanhMuc GetById(long id)
        {
            return _DanhMucRepository.GetById(id);
        }

        public DanhMucDto GetDtoById(long id)
        {
            var query = from DanhMuctbl in _DanhMucRepository.GetAllAsQueryable().Where(x => x.Id == id)

                        select new DanhMucDto
                        {
                            Id = DanhMuctbl.Id,
                            CreatedDate = DanhMuctbl.CreatedDate,
                            CreatedBy = DanhMuctbl.CreatedBy,
                            CreatedID = DanhMuctbl.CreatedID,
                            UpdatedDate = DanhMuctbl.UpdatedDate,
                            UpdatedBy = DanhMuctbl.UpdatedBy,
                            UpdatedID = DanhMuctbl.UpdatedID,
                            IsDelete = DanhMuctbl.IsDelete,
                            DeleteTime = DanhMuctbl.DeleteTime,
                            DeleteId = DanhMuctbl.DeleteId,
                            TenDanhMuc = DanhMuctbl.TenDanhMuc,
                            MaDanhMuc = DanhMuctbl.MaDanhMuc,
                            ThuTu = DanhMuctbl.ThuTu,
                            GhiChu = DanhMuctbl.GhiChu

                        };


            return query.FirstOrDefault();
        }

        public List<DanhMucDto> GetDanhMucSanPham()
        {
            var result = (from DanhMuctbl in _DanhMucRepository.GetAllAsQueryable()
                          select new DanhMucDto
                          {
                              Id = DanhMuctbl.Id,
                              CreatedDate = DanhMuctbl.CreatedDate,
                              CreatedBy = DanhMuctbl.CreatedBy,
                              CreatedID = DanhMuctbl.CreatedID,
                              UpdatedDate = DanhMuctbl.UpdatedDate,
                              UpdatedBy = DanhMuctbl.UpdatedBy,
                              UpdatedID = DanhMuctbl.UpdatedID,
                              IsDelete = DanhMuctbl.IsDelete,
                              DeleteTime = DanhMuctbl.DeleteTime,
                              DeleteId = DanhMuctbl.DeleteId,
                              TenDanhMuc = DanhMuctbl.TenDanhMuc,
                              MaDanhMuc = DanhMuctbl.MaDanhMuc,
                              ThuTu = DanhMuctbl.ThuTu,
                              GhiChu = DanhMuctbl.GhiChu

                          }).ToList();
            foreach (var item in result)
            {
                item.SanPhams = _sanPhamRepository.GetQueryable().Where(x => x.DanhMucId == item.Id).ToList();
            }
            return result;
        }
    }
}
