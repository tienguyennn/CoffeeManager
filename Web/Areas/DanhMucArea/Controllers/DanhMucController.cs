using AutoMapper;
using CommonHelper.String;
using CommonHelper.Upload;
using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Model.IdentityEntities;
using Model.Entities;
using Service.Common;

using Web.Areas.DanhMucArea.Models;
using Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using Web.Filters;
using Service.DanhMucService;
using Service.DanhMucService.Dto;
using CommonHelper.Excel;
using CommonHelper.ObjectExtention;
using Web.Common;
using System.IO;
using System.Web.Configuration;
using CommonHelper;




namespace Web.Areas.DanhMucArea.Controllers
{
    public class DanhMucController : BaseController
    {
        private readonly ILog _Ilog;
        private readonly IMapper _mapper;
        public const string permissionIndex = "DanhMuc_index";
        public const string permissionCreate = "DanhMuc_create";
        public const string permissionEdit = "DanhMuc_edit";
        public const string permissionDelete = "DanhMuc_delete";
        public const string permissionImport = "DanhMuc_import";
        public const string permissionExport = "DanhMuc_export";
        public const string searchKey = "DanhMucPageSearchModel";
        private readonly IDanhMucService _DanhMucService;


        public DanhMucController(IDanhMucService DanhMucService, ILog Ilog,

            IMapper mapper
            )
        {
            _DanhMucService = DanhMucService;
            _Ilog = Ilog;
            _mapper = mapper;

        }
        // GET: DanhMucArea/DanhMuc
        [PermissionAccess(Code = permissionIndex)]
        public ActionResult Index()
        {

            var listData = _DanhMucService.GetDaTaByPage(null);
            SessionManager.SetValue(searchKey, null);
            return View(listData);
        }

        [HttpPost]
        public JsonResult getData(int indexPage, string sortQuery, int pageSize)
        {
            var searchModel = SessionManager.GetValue(searchKey) as DanhMucSearchDto;
            if (!string.IsNullOrEmpty(sortQuery))
            {
                if (searchModel == null)
                {
                    searchModel = new DanhMucSearchDto();
                }
                searchModel.sortQuery = sortQuery;
                if (pageSize > 0)
                {
                    searchModel.pageSize = pageSize;
                }
                SessionManager.SetValue(searchKey, searchModel);
            }
            var data = _DanhMucService.GetDaTaByPage(searchModel, indexPage, pageSize);
            return Json(data);
        }
	[PermissionAccess(Code = permissionCreate)]
        public PartialViewResult Create()
        {
            var myModel = new CreateVM();

            return PartialView("_CreatePartial", myModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]

        public JsonResult Create(CreateVM model)
        {
            var result = new JsonResultBO(true, "Tạo Danh mục sản phẩm thành công");
            try
            {
                if (ModelState.IsValid)
                {
                    var EntityModel = _mapper.Map<DanhMuc>(model);

                    _DanhMucService.Create(EntityModel);

                }

            }
            catch (Exception ex)
            {
                result.MessageFail(ex.Message);
                _Ilog.Error("Lỗi tạo mới Danh mục sản phẩm", ex);
            }
            return Json(result);
        }

	[PermissionAccess(Code = permissionEdit)]
        public PartialViewResult Edit(long id)
        {
            var myModel = new EditVM();

            var obj= _DanhMucService.GetById(id);
            if (obj== null)
            {
                throw new HttpException(404, "Không tìm thấy thông tin");
            }

            myModel = _mapper.Map(obj, myModel);
            return PartialView("_EditPartial", myModel);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]

        public JsonResult Edit(EditVM model)
        {
            var result = new JsonResultBO(true);
            try
            {
                if (ModelState.IsValid)
                {

                    var obj = _DanhMucService.GetById(model.Id);
                    if (obj == null)
                    {
                        throw new Exception("Không tìm thấy thông tin");
                    }

                    obj= _mapper.Map(model, obj);

                    _DanhMucService.Update(obj);
                    
                }
            }
            catch (Exception ex)
            {
                result.Status = false;
                result.Message = "Không cập nhật được";
                _Ilog.Error("Lỗi cập nhật thông tin Danh mục sản phẩm", ex);
            }
            return Json(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult searchData(DanhMucSearchDto form)
        {
            var searchModel = SessionManager.GetValue(searchKey) as DanhMucSearchDto;

            if (searchModel == null)
            {
                searchModel = new DanhMucSearchDto();
                searchModel.pageSize = 20;
            }
			searchModel.TenDanhMucFilter = form.TenDanhMucFilter;
			searchModel.MaDanhMucFilter = form.MaDanhMucFilter;
			searchModel.ThuTuFilter = form.ThuTuFilter;
			searchModel.GhiChuFilter = form.GhiChuFilter;

            SessionManager.SetValue((searchKey) , searchModel);

            var data = _DanhMucService.GetDaTaByPage(searchModel, 1, searchModel.pageSize);
            return Json(data);
        }

	[PermissionAccess(Code = permissionDelete)]
        [HttpPost]
        public JsonResult Delete(long id)
        {
            var result = new JsonResultBO(true, "Xóa Danh mục sản phẩm thành công");
            try
            {
                var user = _DanhMucService.GetById(id);
                if (user == null)
                {
                    throw new Exception("Không tìm thấy thông tin để xóa");
                }
                _DanhMucService.Delete(user);
            }
            catch (Exception ex)
            {
                result.MessageFail("Không thực hiện được");
                _Ilog.Error("Lỗi khi xóa tài khoản id=" + id, ex);
            }
            return Json(result);
        }

        
        public ActionResult Detail(long id)
        {
            var model = new DetailVM();
            model.objInfo = _DanhMucService.GetDtoById(id);
            return View(model);
        }
[PermissionAccess(Code = permissionExport)]
	//[PermissionAccess(Code = permissionImport)]
        public FileResult ExportExcel()
        {
            var searchModel = SessionManager.GetValue(searchKey) as DanhMucSearchDto;
            var data = _DanhMucService.GetDaTaByPage(searchModel).ListItem;
		var dataExport = _mapper.Map<List<DanhMucExportDto>>(data);
            var fileExcel = ExportExcelV2Helper.Export<DanhMucExportDto>(dataExport);
            return File(fileExcel, "application/octet-stream", "DanhMuc.xlsx");
        }

[PermissionAccess(Code = permissionImport)]
	//[PermissionAccess(Code = permissionImport)]
	public ActionResult Import()
        {
            var model = new ImportVM();
            model.PathTemplate = Path.Combine(@"/Uploads", WebConfigurationManager.AppSettings["IMPORT_DanhMuc"]);

            return View(model);
        }

        [HttpPost]
        public ActionResult CheckImport(FormCollection collection, HttpPostedFileBase fileImport)
        {
            JsonResultImportBO<DanhMucImportDto> result = new JsonResultImportBO<DanhMucImportDto>(true);
            //Kiểm tra file có tồn tại k?
            if (fileImport == null)
            {
                result.Status = false;
                result.Message = "Không có file đọc dữ liệu";
                return View(result);
            }

            //Lưu file upload để đọc
            var saveFileResult = UploadProvider.SaveFile(fileImport, null, ".xls,.xlsx", null, "TempImportFile", HostingEnvironment.MapPath("/Uploads"));
            if (!saveFileResult.status)
            {
                result.Status = false;
                result.Message = saveFileResult.message;
                return View(result);
            }
            else
            {
                
                #region Config để import dữ liệu
                var importHelper = new ImportExcelHelper<DanhMucImportDto>();
                importHelper.PathTemplate = saveFileResult.fullPath;
                //importHelper.StartCol = 2;
                importHelper.StartRow = collection["ROWSTART"].ToIntOrZero();
                importHelper.ConfigColumn = new List<ConfigModule>();
                importHelper.ConfigColumn=ExcelImportExtention.GetConfigCol<DanhMucImportDto>(collection);
                #endregion
                var rsl = importHelper.ImportCustomRow();
                if (rsl.Status)
                {
                    result.Status = true;
                    result.Message = rsl.Message;
                   
                    result.ListData = rsl.ListTrue;
                    result.ListFalse = rsl.lstFalse;
                }
                else
                {
                    result.Status = false;
                    result.Message = rsl.Message;
                }

            }
            return View(result);
        }


        [HttpPost]
        public JsonResult GetExportError(List<List<string>> lstData)
        {
            ExportExcelHelper<DanhMucImportDto> exPro = new ExportExcelHelper<DanhMucImportDto>();
            exPro.PathStore = Path.Combine(HostingEnvironment.MapPath("/Uploads"), "ErrorExport");
            exPro.PathTemplate = Path.Combine(HostingEnvironment.MapPath("/Uploads"), WebConfigurationManager.AppSettings["IMPORT_DanhMuc"]);
            exPro.StartRow = 5;
            exPro.StartCol = 2;
            exPro.FileName = "ErrorImportDanhMuc";
            var result = exPro.ExportText(lstData);
            if (result.Status)
            {
                result.PathStore = Path.Combine(@"/Uploads/ErrorExport", result.FileName);
            }
            return Json(result);
        }

        [HttpPost]
        public JsonResult SaveImportData(List<DanhMucImportDto> Data)
        {
            var result = new JsonResultBO(true);

            var lstObjSave = new List<DanhMuc>();
            try
            {
                foreach (var item in Data)
                {
                    var obj = _mapper.Map<DanhMuc>(item);
                    _DanhMucService.Create(obj);
                }

            }
            catch(Exception ex)
            {
                result.Status = false;
                result.Message = "Lỗi dữ liệu, không thể import";
		_Ilog.Error("Lỗi Import", ex);
            }

            return Json(result);
        }
        
    }
}