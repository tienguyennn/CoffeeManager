using log4net;
using Model.IdentityEntities;
using Model.Entities;
using Repository;
using Repository.OrderRepository;
using Service.OrderService.Dto;
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
using Service.OrderDetailService;

namespace Service.OrderService
{
    public class OrderService : EntityService<Order>, IOrderService
    {
        IUnitOfWork _unitOfWork;
        IOrderRepository _OrderRepository;
        private readonly IOrderDetailService _orderDetailService;
        ILog _loger;
        IMapper _mapper;



        public OrderService(IUnitOfWork unitOfWork,
        IOrderRepository OrderRepository,
        IOrderDetailService orderDetailService,
        ILog loger,

                IMapper mapper
            )
            : base(unitOfWork, OrderRepository)
        {
            _unitOfWork = unitOfWork;
            _OrderRepository = OrderRepository;
            this._orderDetailService = orderDetailService;
            _loger = loger;
            _mapper = mapper;



        }

        public PageListResultBO<OrderDto> GetDaTaByPage(OrderSearchDto searchModel, int pageIndex = 1, int pageSize = 20)
        {
            var query = from Ordertbl in _OrderRepository.GetAllAsQueryable()

                        select new OrderDto
                        {
                            Id = Ordertbl.Id,
                            CreatedDate = Ordertbl.CreatedDate,
                            CreatedBy = Ordertbl.CreatedBy,
                            CreatedID = Ordertbl.CreatedID,
                            UpdatedDate = Ordertbl.UpdatedDate,
                            UpdatedBy = Ordertbl.UpdatedBy,
                            UpdatedID = Ordertbl.UpdatedID,
                            IsDelete = Ordertbl.IsDelete,
                            DeleteTime = Ordertbl.DeleteTime,
                            DeleteId = Ordertbl.DeleteId,
                            Ho = Ordertbl.Ho,
                            Ten = Ordertbl.Ten,
                            DiaChi = Ordertbl.DiaChi,
                            DiaChiChiTiet = Ordertbl.DiaChiChiTiet,
                            DienThoai = Ordertbl.DienThoai,
                            Email = Ordertbl.Email,
                            SanPhamIds = Ordertbl.SanPhamIds,
                            TrangThai = Ordertbl.TrangThai

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
                if (!string.IsNullOrEmpty(searchModel.DiaChiFilter))
                {
                    query = query.Where(x => x.DiaChi.Contains(searchModel.DiaChiFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.DiaChiChiTietFilter))
                {
                    query = query.Where(x => x.DiaChiChiTiet.Contains(searchModel.DiaChiChiTietFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.DienThoaiFilter))
                {
                    query = query.Where(x => x.DienThoai.Contains(searchModel.DienThoaiFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.EmailFilter))
                {
                    query = query.Where(x => x.Email.Contains(searchModel.EmailFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.SanPhamIdsFilter))
                {
                    query = query.Where(x => x.SanPhamIds.Contains(searchModel.SanPhamIdsFilter));
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
            var resultmodel = new PageListResultBO<OrderDto>();
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

        public Order GetById(long id)
        {
            return _OrderRepository.GetById(id);
        }

        public OrderDto GetDtoById(long id)
        {
            var query = from Ordertbl in _OrderRepository.GetAllAsQueryable().Where(x => x.Id == id)
                        select new OrderDto
                        {
                            Id = Ordertbl.Id,
                            CreatedDate = Ordertbl.CreatedDate,
                            CreatedBy = Ordertbl.CreatedBy,
                            CreatedID = Ordertbl.CreatedID,
                            UpdatedDate = Ordertbl.UpdatedDate,
                            UpdatedBy = Ordertbl.UpdatedBy,
                            UpdatedID = Ordertbl.UpdatedID,
                            IsDelete = Ordertbl.IsDelete,
                            DeleteTime = Ordertbl.DeleteTime,
                            DeleteId = Ordertbl.DeleteId,
                            Ho = Ordertbl.Ho,
                            Ten = Ordertbl.Ten,
                            DiaChi = Ordertbl.DiaChi,
                            DiaChiChiTiet = Ordertbl.DiaChiChiTiet,
                            DienThoai = Ordertbl.DienThoai,
                            Email = Ordertbl.Email,
                            SanPhamIds = Ordertbl.SanPhamIds,
                            TrangThai = Ordertbl.TrangThai

                        };

            var result = query.FirstOrDefault();
            result.OrderDetails = _orderDetailService.GetByOrder(result.Id);
            return result;
        }


    }
}
