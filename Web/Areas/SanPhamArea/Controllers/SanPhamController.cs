using AutoMapper;
using CommonHelper.String;
using CommonHelper.Upload;
using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Model.IdentityEntities;
using Model.Entities;
using Service.Common;

using Web.Areas.SanPhamArea.Models;
using Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using Web.Filters;
using Service.SanPhamService;
using Service.SanPhamService.Dto;
using CommonHelper.Excel;
using CommonHelper.ObjectExtention;
using Web.Common;
using System.IO;
using System.Web.Configuration;
using CommonHelper;

using Service.DanhMucService;
using Service.DanhMucService.Dto;



namespace Web.Areas.SanPhamArea.Controllers
{
    public class SanPhamController : BaseController
    {
        private readonly ILog _Ilog;
        private readonly IMapper _mapper;
        public const string permissionIndex = "SanPham_index";
        public const string permissionCreate = "SanPham_create";
        public const string permissionEdit = "SanPham_edit";
        public const string permissionDelete = "SanPham_delete";
        public const string permissionImport = "SanPham_import";
        public const string permissionExport = "SanPham_export";
        public const string searchKey = "SanPhamPageSearchModel";
        private readonly ISanPhamService _SanPhamService;
        private readonly IDanhMucService _DanhMucService;

        public SanPhamController(ISanPhamService SanPhamService, ILog Ilog,
                IDanhMucService DanhMucService,

            IMapper mapper
            )
        {
            _SanPhamService = SanPhamService;
            _Ilog = Ilog;
            _mapper = mapper;
            _DanhMucService = DanhMucService;

        }
        // GET: SanPhamArea/SanPham
        [PermissionAccess(Code = permissionIndex)]
        public ActionResult Index()
        {
            var dropdownListDanhMucId = _DanhMucService.GetDropdown("TenDanhMuc", "Id");
            ViewBag.dropdownListDanhMucId = dropdownListDanhMucId;

            var listData = _SanPhamService.GetDaTaByPage(null);
            SessionManager.SetValue(searchKey, null);
            return View(listData);
        }

        [HttpPost]
        public JsonResult getData(int indexPage, string sortQuery, int pageSize)
        {
            var searchModel = SessionManager.GetValue(searchKey) as SanPhamSearchDto;
            if (!string.IsNullOrEmpty(sortQuery))
            {
                if (searchModel == null)
                {
                    searchModel = new SanPhamSearchDto();
                }
                searchModel.sortQuery = sortQuery;
                if (pageSize > 0)
                {
                    searchModel.pageSize = pageSize;
                }
                SessionManager.SetValue(searchKey, searchModel);
            }
            var data = _SanPhamService.GetDaTaByPage(searchModel, indexPage, pageSize);
            return Json(data);
        }
        [PermissionAccess(Code = permissionCreate)]
        public PartialViewResult Create()
        {
            var myModel = new CreateVM();
            var dropdownListDanhMucId = _DanhMucService.GetDropdown("TenDanhMuc", "Id");
            ViewBag.dropdownListDanhMucId = dropdownListDanhMucId;

            return PartialView("_CreatePartial", myModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]

        public JsonResult Create(CreateVM model)
        {
            var result = new JsonResultBO(true, "Tạo Sản phẩm thành công");
            try
            {
                if (ModelState.IsValid)
                {
                    var EntityModel = _mapper.Map<SanPham>(model);
                    var resultUpload_HinhAnh = UploadProvider.SaveFile(model.HinhAnhInpFile, null, UploadProvider.ListExtensionCommon, UploadProvider.MaxSizeCommon, "HinhAnh/HinhAnh", Server.MapPath("/Uploads"));
                    if (resultUpload_HinhAnh.status)
                    {
                        EntityModel.HinhAnh = resultUpload_HinhAnh.path;
                    }
                    _SanPhamService.Create(EntityModel);

                }

            }
            catch (Exception ex)
            {
                result.MessageFail(ex.Message);
                _Ilog.Error("Lỗi tạo mới Sản phẩm", ex);
            }
            return Json(result);
        }

        [PermissionAccess(Code = permissionEdit)]
        public PartialViewResult Edit(long id)
        {
            var myModel = new EditVM();

            var obj = _SanPhamService.GetById(id);
            if (obj == null)
            {
                throw new HttpException(404, "Không tìm thấy thông tin");
            }
            var dropdownListDanhMucId = _DanhMucService.GetDropdown("TenDanhMuc", "Id", obj.DanhMucId);
            ViewBag.dropdownListDanhMucId = dropdownListDanhMucId;

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

                    var obj = _SanPhamService.GetById(model.Id);
                    if (obj == null)
                    {
                        throw new Exception("Không tìm thấy thông tin");
                    }

                    obj = _mapper.Map(model, obj);
                    var resultUpload_HinhAnh = UploadProvider.SaveFile(model.HinhAnhInpFile, null, UploadProvider.ListExtensionCommon, UploadProvider.MaxSizeCommon, "HinhAnh/HinhAnh", Server.MapPath("/Uploads"));
                    if (resultUpload_HinhAnh.status)
                    {
                        obj.HinhAnh = resultUpload_HinhAnh.path;
                    }
                    _SanPhamService.Update(obj);

                }
            }
            catch (Exception ex)
            {
                result.Status = false;
                result.Message = "Không cập nhật được";
                _Ilog.Error("Lỗi cập nhật thông tin Sản phẩm", ex);
            }
            return Json(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult searchData(SanPhamSearchDto form)
        {
            var searchModel = SessionManager.GetValue(searchKey) as SanPhamSearchDto;

            if (searchModel == null)
            {
                searchModel = new SanPhamSearchDto();
                searchModel.pageSize = 20;
            }
            searchModel.DanhMucIdFilter = form.DanhMucIdFilter;
            searchModel.TenFilter = form.TenFilter;
            searchModel.GiaFilter = form.GiaFilter;
            searchModel.ThuTuFilter = form.ThuTuFilter;

            SessionManager.SetValue((searchKey), searchModel);

            var data = _SanPhamService.GetDaTaByPage(searchModel, 1, searchModel.pageSize);
            return Json(data);
        }

        [PermissionAccess(Code = permissionDelete)]
        [HttpPost]
        public JsonResult Delete(long id)
        {
            var result = new JsonResultBO(true, "Xóa Sản phẩm thành công");
            try
            {
                var user = _SanPhamService.GetById(id);
                if (user == null)
                {
                    throw new Exception("Không tìm thấy thông tin để xóa");
                }
                _SanPhamService.Delete(user);
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
            model.objInfo = _SanPhamService.GetDtoById(id);
            return View(model);
        }
        [PermissionAccess(Code = permissionExport)]
        //[PermissionAccess(Code = permissionImport)]
        public FileResult ExportExcel()
        {
            var searchModel = SessionManager.GetValue(searchKey) as SanPhamSearchDto;
            var data = _SanPhamService.GetDaTaByPage(searchModel).ListItem;
            var dataExport = _mapper.Map<List<SanPhamExportDto>>(data);
            var fileExcel = ExportExcelV2Helper.Export<SanPhamExportDto>(dataExport);
            return File(fileExcel, "application/octet-stream", "SanPham.xlsx");
        }

        [PermissionAccess(Code = permissionImport)]
        //[PermissionAccess(Code = permissionImport)]
        public ActionResult Import()
        {
            var model = new ImportVM();
            model.PathTemplate = Path.Combine(@"/Uploads", WebConfigurationManager.AppSettings["IMPORT_SanPham"]);

            return View(model);
        }

        [HttpPost]
        public ActionResult CheckImport(FormCollection collection, HttpPostedFileBase fileImport)
        {
            JsonResultImportBO<SanPhamImportDto> result = new JsonResultImportBO<SanPhamImportDto>(true);
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
                var importHelper = new ImportExcelHelper<SanPhamImportDto>();
                importHelper.PathTemplate = saveFileResult.fullPath;
                //importHelper.StartCol = 2;
                importHelper.StartRow = collection["ROWSTART"].ToIntOrZero();
                importHelper.ConfigColumn = new List<ConfigModule>();
                importHelper.ConfigColumn = ExcelImportExtention.GetConfigCol<SanPhamImportDto>(collection);
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
            ExportExcelHelper<SanPhamImportDto> exPro = new ExportExcelHelper<SanPhamImportDto>();
            exPro.PathStore = Path.Combine(HostingEnvironment.MapPath("/Uploads"), "ErrorExport");
            exPro.PathTemplate = Path.Combine(HostingEnvironment.MapPath("/Uploads"), WebConfigurationManager.AppSettings["IMPORT_SanPham"]);
            exPro.StartRow = 5;
            exPro.StartCol = 2;
            exPro.FileName = "ErrorImportSanPham";
            var result = exPro.ExportText(lstData);
            if (result.Status)
            {
                result.PathStore = Path.Combine(@"/Uploads/ErrorExport", result.FileName);
            }
            return Json(result);
        }

        [HttpPost]
        public JsonResult SaveImportData(List<SanPhamImportDto> Data)
        {
            var result = new JsonResultBO(true);

            var lstObjSave = new List<SanPham>();
            try
            {
                foreach (var item in Data)
                {
                    var obj = _mapper.Map<SanPham>(item);
                    _SanPhamService.Create(obj);
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