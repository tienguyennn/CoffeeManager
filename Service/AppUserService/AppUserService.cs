using AutoMapper;
using Model.Entities;
using Model.IdentityEntities;

using Repository;
using Repository.AppUserRepository;

using log4net;
using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Web.Mvc;
using static Service.Common.Constant;
using System.Data.Entity;
using Model;
using System.Data.Entity.Core.Objects;
using Service.AppUserService.Dto;
using Service.Common;

namespace Service.AppUserService
{
    public class AppUserService : EntityService<AppUser>, IAppUserService
    {
        IUnitOfWork _unitOfWork;
        IAppUserRepository _appUserRepository;
     
        ILog _loger;
        IMapper _mapper;

        readonly string CODE_VAITRO_CHUYENVIEN = VAITRO_CONSTANT.CHUYENVIEN;


        public AppUserService(IUnitOfWork unitOfWork, IAppUserRepository appUserRepository, ILog loger,
          
            IMapper mapper
          )
            : base(unitOfWork, appUserRepository)
        {
       
            _unitOfWork = unitOfWork;
            _appUserRepository = appUserRepository;
            _loger = loger;
            _mapper = mapper;
        }


        
    }
}
