using AutoMapper;
using CommonHelper.String;
using CommonHelper.Upload;
using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Model.IdentityEntities;
using Model.Entities;
using Service.Common;
using Service.Constant;
using Web.Areas.LienHeArea.Models;
using Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using Web.Filters;
using Service.LienHeService;
using Service.LienHeService.Dto;
using CommonHelper.Excel;
using CommonHelper.ObjectExtention;
using Web.Common;
using System.IO;
using System.Web.Configuration;
using CommonHelper;



namespace Web.Areas.LienHeArea.Controllers
{
    public class LienHeController : BaseController
    {
        private readonly ILog _Ilog;
        private readonly IMapper _mapper;
        public const string permissionIndex = "LienHe_index";
        public const string permissionCreate = "LienHe_create";
        public const string permissionEdit = "LienHe_edit";
        public const string permissionDelete = "LienHe_delete";
        public const string permissionImport = "LienHe_import";
        public const string permissionExport = "LienHe_export";
        public const string searchKey = "LienHePageSearchModel";
        private readonly ILienHeService _LienHeService;


        public LienHeController(ILienHeService LienHeService, ILog Ilog,

            IMapper mapper
            )
        {
            _LienHeService = LienHeService;
            _Ilog = Ilog;
            _mapper = mapper;

        }
        // GET: LienHeArea/LienHe
        [PermissionAccess(Code = permissionIndex)]
        public ActionResult Index()
        {

            var listData = _LienHeService.GetDaTaByPage(null);
            SessionManager.SetValue(searchKey, null);
            return View(listData);
        }

        [HttpPost]
        public JsonResult getData(int indexPage, string sortQuery, int pageSize)
        {
            var searchModel = SessionManager.GetValue(searchKey) as LienHeSearchDto;
            if (!string.IsNullOrEmpty(sortQuery))
            {
                if (searchModel == null)
                {
                    searchModel = new LienHeSearchDto();
                }
                searchModel.sortQuery = sortQuery;
                if (pageSize > 0)
                {
                    searchModel.pageSize = pageSize;
                }
                SessionManager.SetValue(searchKey, searchModel);
            }
            var data = _LienHeService.GetDaTaByPage(searchModel, indexPage, pageSize);
            return Json(data);
        }
        [PermissionAccess(Code = permissionCreate)]
        public PartialViewResult Create()
        {
            var myModel = new CreateVM();

            return PartialView("_CreatePartial", myModel);
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult Create(CreateVM model)
        {
            var result = "Send information successfully";
            try
            {
                if (ModelState.IsValid)
                {
                    var EntityModel = _mapper.Map<LienHe>(model);

                    _LienHeService.Create(EntityModel);

                }

            }
            catch (Exception ex)
            {
                result = "Send information failure";
                _Ilog.Error("Lỗi tạo mới Liên hệ", ex);
            }
            return Json(result);
        }

        [PermissionAccess(Code = permissionEdit)]
        public PartialViewResult Edit(long id)
        {
            var myModel = new EditVM();

            var obj = _LienHeService.GetById(id);
            if (obj == null)
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

                    var obj = _LienHeService.GetById(model.Id);
                    if (obj == null)
                    {
                        throw new Exception("Không tìm thấy thông tin");
                    }

                    obj = _mapper.Map(model, obj);

                    _LienHeService.Update(obj);

                }
            }
            catch (Exception ex)
            {
                result.Status = false;
                result.Message = "Không cập nhật được";
                _Ilog.Error("Lỗi cập nhật thông tin Liên hệ", ex);
            }
            return Json(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult searchData(LienHeSearchDto form)
        {
            var searchModel = SessionManager.GetValue(searchKey) as LienHeSearchDto;

            if (searchModel == null)
            {
                searchModel = new LienHeSearchDto();
                searchModel.pageSize = 20;
            }
            searchModel.HoTenFilter = form.HoTenFilter;
            searchModel.EmailFilter = form.EmailFilter;

            SessionManager.SetValue((searchKey), searchModel);

            var data = _LienHeService.GetDaTaByPage(searchModel, 1, searchModel.pageSize);
            return Json(data);
        }

        [PermissionAccess(Code = permissionDelete)]
        [HttpPost]
        public JsonResult Delete(long id)
        {
            var result = new JsonResultBO(true, "Xóa Liên hệ thành công");
            try
            {
                var user = _LienHeService.GetById(id);
                if (user == null)
                {
                    throw new Exception("Không tìm thấy thông tin để xóa");
                }
                _LienHeService.Delete(user);
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
            model.objInfo = _LienHeService.GetDtoById(id);
            return View(model);
        }
        [PermissionAccess(Code = permissionExport)]
        //[PermissionAccess(Code = permissionImport)]
        public FileResult ExportExcel()
        {
            var searchModel = SessionManager.GetValue(searchKey) as LienHeSearchDto;
            var data = _LienHeService.GetDaTaByPage(searchModel).ListItem;
            var dataExport = _mapper.Map<List<LienHeExportDto>>(data);
            var fileExcel = ExportExcelV2Helper.Export<LienHeExportDto>(dataExport);
            return File(fileExcel, "application/octet-stream", "LienHe.xlsx");
        }

        [PermissionAccess(Code = permissionImport)]
        //[PermissionAccess(Code = permissionImport)]
        public ActionResult Import()
        {
            var model = new ImportVM();
            model.PathTemplate = Path.Combine(@"/Uploads", WebConfigurationManager.AppSettings["IMPORT_LienHe"]);

            return View(model);
        }

        [HttpPost]
        public ActionResult CheckImport(FormCollection collection, HttpPostedFileBase fileImport)
        {
            JsonResultImportBO<LienHeImportDto> result = new JsonResultImportBO<LienHeImportDto>(true);
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
                var importHelper = new ImportExcelHelper<LienHeImportDto>();
                importHelper.PathTemplate = saveFileResult.fullPath;
                //importHelper.StartCol = 2;
                importHelper.StartRow = collection["ROWSTART"].ToIntOrZero();
                importHelper.ConfigColumn = new List<ConfigModule>();
                importHelper.ConfigColumn = ExcelImportExtention.GetConfigCol<LienHeImportDto>(collection);
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
            ExportExcelHelper<LienHeImportDto> exPro = new ExportExcelHelper<LienHeImportDto>();
            exPro.PathStore = Path.Combine(HostingEnvironment.MapPath("/Uploads"), "ErrorExport");
            exPro.PathTemplate = Path.Combine(HostingEnvironment.MapPath("/Uploads"), WebConfigurationManager.AppSettings["IMPORT_LienHe"]);
            exPro.StartRow = 5;
            exPro.StartCol = 2;
            exPro.FileName = "ErrorImportLienHe";
            var result = exPro.ExportText(lstData);
            if (result.Status)
            {
                result.PathStore = Path.Combine(@"/Uploads/ErrorExport", result.FileName);
            }
            return Json(result);
        }

        [HttpPost]
        public JsonResult SaveImportData(List<LienHeImportDto> Data)
        {
            var result = new JsonResultBO(true);

            var lstObjSave = new List<LienHe>();
            try
            {
                foreach (var item in Data)
                {
                    var obj = _mapper.Map<LienHe>(item);
                    _LienHeService.Create(obj);
                }

            }
            catch (Exception ex)
            {
                result.Status = false;
                result.Message = "Lỗi dữ liệu, không thể import";
                _Ilog.Error("Lỗi Import", ex);
            }

            return Json(result);
        }

    }
}