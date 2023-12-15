using log4net;
using Model.IdentityEntities;
using Model.Entities;
using Repository;
using Repository.DatBanRepository;
using Service.DatBanService.Dto;
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




namespace Service.DatBanService
{
    public class DatBanService : EntityService<DatBan>, IDatBanService
    {
        IUnitOfWork _unitOfWork;
        IDatBanRepository _DatBanRepository;
        ILog _loger;
        IMapper _mapper;



        public DatBanService(IUnitOfWork unitOfWork,
        IDatBanRepository DatBanRepository,
        ILog loger,

                IMapper mapper
            )
            : base(unitOfWork, DatBanRepository)
        {
            _unitOfWork = unitOfWork;
            _DatBanRepository = DatBanRepository;
            _loger = loger;
            _mapper = mapper;



        }

        public PageListResultBO<DatBanDto> GetDaTaByPage(DatBanSearchDto searchModel, int pageIndex = 1, int pageSize = 20)
        {
            var query = from DatBantbl in _DatBanRepository.GetAllAsQueryable()

                        select new DatBanDto
                        {
                            Id = DatBantbl.Id,
                            CreatedDate = DatBantbl.CreatedDate,
                            CreatedBy = DatBantbl.CreatedBy,
                            CreatedID = DatBantbl.CreatedID,
                            UpdatedDate = DatBantbl.UpdatedDate,
                            UpdatedBy = DatBantbl.UpdatedBy,
                            UpdatedID = DatBantbl.UpdatedID,
                            IsDelete = DatBantbl.IsDelete,
                            DeleteTime = DatBantbl.DeleteTime,
                            DeleteId = DatBantbl.DeleteId,
                            Ho = DatBantbl.Ho,
                            Ten = DatBantbl.Ten,
                            ThoiGian = DatBantbl.ThoiGian,
                            DienThoai = DatBantbl.DienThoai,
                            NoiDung = DatBantbl.NoiDung,
                            TrangThai = DatBantbl.TrangThai

                        };

            if (searchModel != null)
            {
                if (!string.IsNullOrEmpty(searchModel.HoFilter))
                {
                    query = query.Where(x => x.Ho.Contains(searchModel.HoFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.TenFilter))
                {
                    query = query.Where(x => x.Ten.Contains(searchModel.TenFilter));
                }
                if (searchModel.ThoiGianFromFilter != null)
                {
                    query = query.Where(x => x.ThoiGian >= searchModel.ThoiGianFromFilter);
                }
                if (searchModel.ThoiGianToFilter != null)
                {
                    query = query.Where(x => x.ThoiGian <= searchModel.ThoiGianToFilter);
                }
                if (!string.IsNullOrEmpty(searchModel.DienThoaiFilter))
                {
                    query = query.Where(x => x.DienThoai.Contains(searchModel.DienThoaiFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.TrangThaiFilter))
                {
                    query = query.Where(x => x.TrangThai.Contains(searchModel.TrangThaiFilter));
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
            var resultmodel = new PageListResultBO<DatBanDto>();
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

        public DatBan GetById(long id)
        {
            return _DatBanRepository.GetById(id);
        }

        public DatBanDto GetDtoById(long id)
        {
            var query = from DatBantbl in _DatBanRepository.GetAllAsQueryable().Where(x => x.Id == id)

                        select new DatBanDto
                        {
                            Id = DatBantbl.Id,
                            CreatedDate = DatBantbl.CreatedDate,
                            CreatedBy = DatBantbl.CreatedBy,
                            CreatedID = DatBantbl.CreatedID,
                            UpdatedDate = DatBantbl.UpdatedDate,
                            UpdatedBy = DatBantbl.UpdatedBy,
                            UpdatedID = DatBantbl.UpdatedID,
                            IsDelete = DatBantbl.IsDelete,
                            DeleteTime = DatBantbl.DeleteTime,
                            DeleteId = DatBantbl.DeleteId,
                            Ho = DatBantbl.Ho,
                            Ten = DatBantbl.Ten,
                            ThoiGian = DatBantbl.ThoiGian,
                            DienThoai = DatBantbl.DienThoai,
                            NoiDung = DatBantbl.NoiDung,
                            TrangThai = DatBantbl.TrangThai

                        };


            return query.FirstOrDefault();
        }


    }
}
