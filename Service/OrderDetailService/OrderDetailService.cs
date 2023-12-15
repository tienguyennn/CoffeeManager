using log4net;
using Model.IdentityEntities;
using Model.Entities;
using Repository;
using Repository.OrderDetailRepository;
using Service.OrderDetailService.Dto;
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
using Repository.SanPhamRepository;

namespace Service.OrderDetailService
{
    public class OrderDetailService : EntityService<OrderDetail>, IOrderDetailService
    {
        IUnitOfWork _unitOfWork;
        IOrderDetailRepository _OrderDetailRepository;
        private readonly ISanPhamRepository _sanPhamRepository;
        ILog _loger;
        IMapper _mapper;



        public OrderDetailService(IUnitOfWork unitOfWork,
        IOrderDetailRepository OrderDetailRepository,
        ISanPhamRepository sanPhamRepository,
        ILog loger,

                IMapper mapper
            )
            : base(unitOfWork, OrderDetailRepository)
        {
            _unitOfWork = unitOfWork;
            _OrderDetailRepository = OrderDetailRepository;
            this._sanPhamRepository = sanPhamRepository;
            _loger = loger;
            _mapper = mapper;



        }

        public PageListResultBO<OrderDetailDto> GetDaTaByPage(OrderDetailSearchDto searchModel, int pageIndex = 1, int pageSize = 20)
        {
            var query = from OrderDetailtbl in _OrderDetailRepository.GetAllAsQueryable()

                        select new OrderDetailDto
                        {
                            Id = OrderDetailtbl.Id,
                            CreatedDate = OrderDetailtbl.CreatedDate,
                            CreatedBy = OrderDetailtbl.CreatedBy,
                            CreatedID = OrderDetailtbl.CreatedID,
                            UpdatedDate = OrderDetailtbl.UpdatedDate,
                            UpdatedBy = OrderDetailtbl.UpdatedBy,
                            UpdatedID = OrderDetailtbl.UpdatedID,
                            IsDelete = OrderDetailtbl.IsDelete,
                            DeleteTime = OrderDetailtbl.DeleteTime,
                            DeleteId = OrderDetailtbl.DeleteId,
                            OrderId = OrderDetailtbl.OrderId,
                            SanPhamId = OrderDetailtbl.SanPhamId,
                            SoLuong = OrderDetailtbl.SoLuong,
                            GiaTien = OrderDetailtbl.GiaTien

                        };

            if (searchModel != null)
            {
                if (searchModel.OrderIdFilter != null)
                {
                    query = query.Where(x => x.OrderId == searchModel.OrderIdFilter);
                }
                if (searchModel.SanPhamIdFilter != null)
                {
                    query = query.Where(x => x.SanPhamId == searchModel.SanPhamIdFilter);
                }
                if (searchModel.SoLuongFilter != null)
                {
                    query = query.Where(x => x.SoLuong == searchModel.SoLuongFilter);
                }
                if (searchModel.GiaTienFilter != null)
                {
                    query = query.Where(x => x.GiaTien == searchModel.GiaTienFilter);
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
            var resultmodel = new PageListResultBO<OrderDetailDto>();
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

        public OrderDetail GetById(long id)
        {
            return _OrderDetailRepository.GetById(id);
        }

        public OrderDetailDto GetDtoById(long id)
        {
            var query = from OrderDetailtbl in _OrderDetailRepository.GetAllAsQueryable().Where(x => x.Id == id)

                        select new OrderDetailDto
                        {
                            Id = OrderDetailtbl.Id,
                            CreatedDate = OrderDetailtbl.CreatedDate,
                            CreatedBy = OrderDetailtbl.CreatedBy,
                            CreatedID = OrderDetailtbl.CreatedID,
                            UpdatedDate = OrderDetailtbl.UpdatedDate,
                            UpdatedBy = OrderDetailtbl.UpdatedBy,
                            UpdatedID = OrderDetailtbl.UpdatedID,
                            IsDelete = OrderDetailtbl.IsDelete,
                            DeleteTime = OrderDetailtbl.DeleteTime,
                            DeleteId = OrderDetailtbl.DeleteId,
                            OrderId = OrderDetailtbl.OrderId,
                            SanPhamId = OrderDetailtbl.SanPhamId,
                            SoLuong = OrderDetailtbl.SoLuong,
                            GiaTien = OrderDetailtbl.GiaTien

                        };


            return query.FirstOrDefault();
        }

        public List<OrderDetailDto> GetByOrder(long orderId)
        {
            var query = from OrderDetailtbl in _OrderDetailRepository.GetAllAsQueryable().Where(x => x.OrderId == orderId)
                        select new OrderDetailDto
                        {
                            Id = OrderDetailtbl.Id,
                            CreatedDate = OrderDetailtbl.CreatedDate,
                            CreatedBy = OrderDetailtbl.CreatedBy,
                            CreatedID = OrderDetailtbl.CreatedID,
                            UpdatedDate = OrderDetailtbl.UpdatedDate,
                            UpdatedBy = OrderDetailtbl.UpdatedBy,
                            UpdatedID = OrderDetailtbl.UpdatedID,
                            IsDelete = OrderDetailtbl.IsDelete,
                            DeleteTime = OrderDetailtbl.DeleteTime,
                            DeleteId = OrderDetailtbl.DeleteId,
                            OrderId = OrderDetailtbl.OrderId,
                            SanPhamId = OrderDetailtbl.SanPhamId,
                            SoLuong = OrderDetailtbl.SoLuong,
                            GiaTien = OrderDetailtbl.GiaTien

                        };
            var result = query.ToList();
            foreach (var item in result)
            {
                item.SanPham = _sanPhamRepository.GetById(item.SanPhamId);
            }
            return result;

        }
    }
}
