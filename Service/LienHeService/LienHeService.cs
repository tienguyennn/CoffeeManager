using log4net;
using Model.IdentityEntities;
using Model.Entities;
using Repository;
using Repository.LienHeRepository;
using Service.LienHeService.Dto;
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




namespace Service.LienHeService
{
    public class LienHeService : EntityService<LienHe>, ILienHeService
    {
        IUnitOfWork _unitOfWork;
        ILienHeRepository _LienHeRepository;
	ILog _loger;
        IMapper _mapper;


        
        public LienHeService(IUnitOfWork unitOfWork, 
		ILienHeRepository LienHeRepository, 
		ILog loger,

            	IMapper mapper	
            )
            : base(unitOfWork, LienHeRepository)
        {
            _unitOfWork = unitOfWork;
            _LienHeRepository = LienHeRepository;
            _loger = loger;
            _mapper = mapper;



        }

        public PageListResultBO<LienHeDto> GetDaTaByPage(LienHeSearchDto searchModel, int pageIndex = 1, int pageSize = 20)
        {
            var query = from LienHetbl in _LienHeRepository.GetAllAsQueryable()

                        select new LienHeDto
                        {
							Id = LienHetbl.Id,
							CreatedDate = LienHetbl.CreatedDate,
							CreatedBy = LienHetbl.CreatedBy,
							CreatedID = LienHetbl.CreatedID,
							UpdatedDate = LienHetbl.UpdatedDate,
							UpdatedBy = LienHetbl.UpdatedBy,
							UpdatedID = LienHetbl.UpdatedID,
							IsDelete = LienHetbl.IsDelete,
							DeleteTime = LienHetbl.DeleteTime,
							DeleteId = LienHetbl.DeleteId,
							HoTen = LienHetbl.HoTen,
							Email = LienHetbl.Email,
							TieuDe = LienHetbl.TieuDe,
							NoiDung = LienHetbl.NoiDung
                            
                        };

            if (searchModel != null)
            {
		if (!string.IsNullOrEmpty(searchModel.HoTenFilter))
		{
			query = query.Where(x => x.HoTen.Contains(searchModel.HoTenFilter));
		}
		if (!string.IsNullOrEmpty(searchModel.EmailFilter))
		{
			query = query.Where(x => x.Email.Contains(searchModel.EmailFilter));
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
            var resultmodel = new PageListResultBO<LienHeDto>();
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

        public LienHe GetById(long id)
        {
            return _LienHeRepository.GetById(id);
        }

public LienHeDto GetDtoById(long id)
        {
            var query = from LienHetbl in _LienHeRepository.GetAllAsQueryable().Where(x=>x.Id==id)

                        select new LienHeDto
                        {
							Id = LienHetbl.Id,
							CreatedDate = LienHetbl.CreatedDate,
							CreatedBy = LienHetbl.CreatedBy,
							CreatedID = LienHetbl.CreatedID,
							UpdatedDate = LienHetbl.UpdatedDate,
							UpdatedBy = LienHetbl.UpdatedBy,
							UpdatedID = LienHetbl.UpdatedID,
							IsDelete = LienHetbl.IsDelete,
							DeleteTime = LienHetbl.DeleteTime,
							DeleteId = LienHetbl.DeleteId,
							HoTen = LienHetbl.HoTen,
							Email = LienHetbl.Email,
							TieuDe = LienHetbl.TieuDe,
							NoiDung = LienHetbl.NoiDung
                            
                        };

            
            return query.FirstOrDefault();
        }
    

    }
}
