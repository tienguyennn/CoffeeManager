using AutoMapper;
using CommonHelper;
using CommonHelper.Excel;
using CommonHelper.String;
using CommonHelper.Upload;
using Model.Entities;
using Model.IdentityEntities;
using Service.AppUserService;
using Service.AppUserService.Dto;
using Service.Common;
using Web.Areas.UserArea.Models;
using Web.Common;
using Web.Filters;
using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Hosting;
using System.Web.Mvc;
using Web.Common;
using Model;
using OfficeOpenXml.Style;
using OfficeOpenXml;

namespace Web.Areas.UserArea.Controllers
{
    public class UserController : BaseController
    {
        readonly IAppUserService _appUserService;
   
        readonly ILog _Ilog;
        readonly IMapper _mapper;
        const string permissionIndex = "QLTaiKhoan";



        string searchUserKey = "SearchUser";
        string searchUserActiveKey = "SearchUserActive";
        string searchUserAccess = "searchUserAccess";
        public UserController(IAppUserService appUserService, ILog Ilog,
 
            IMapper mapper
            )

        {
          
            _appUserService = appUserService;
            _Ilog = Ilog;
            _mapper = mapper;
        }
        // GET: UserArea/User
        public ActionResult Index(int vaitroid = 0)
        {
            ViewBag.vaitroid = vaitroid;
            if (vaitroid == 0)
            {
                SessionManager.SetValue(searchUserKey, null);
                var viewModel = new UserListViewModel()
                {
  
                };
                return View(viewModel);
            }
            else
            {

                var searchModel = SessionManager.GetValue(searchUserKey) as AppUserSearchDto;
                if (searchModel == null)
                {
                    searchModel = new AppUserSearchDto();
                    searchModel.pageSize = 20;
                }
                searchModel.VaiTroIdFilter = new List<int>();
                searchModel.VaiTroIdFilter.Add(vaitroid);
                SessionManager.SetValue(searchUserKey, searchModel);
                var viewModel = new UserListViewModel()
                {
 
                };
                return View(viewModel);
            }


        }
    }
}