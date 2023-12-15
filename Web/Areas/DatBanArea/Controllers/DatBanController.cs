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
using Web.Areas.DatBanArea.Models;
using Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using Web.Filters;
using Service.DatBanService;
using Service.DatBanService.Dto;
using CommonHelper.Excel;
using CommonHelper.ObjectExtention;
using Web.Common;
using System.IO;
using System.Web.Configuration;
using CommonHelper;



namespace Web.Areas.DatBanArea.Controllers
{
    public class DatBanController : BaseController
    {
        private readonly ILog _Ilog;
        private readonly IMapper _mapper;
        public const string permissionIndex = "DatBan_index";
        public const string permissionCreate = "DatBan_create";
        public const string permissionEdit = "DatBan_edit";
        public const string permissionDelete = "DatBan_delete";
        public const string permissionImport = "DatBan_import";
        public const string permissionExport = "DatBan_export";
        public const string searchKey = "DatBanPageSearchModel";
        private readonly IDatBanService _DatBanService;


        public DatBanController(IDatBanService DatBanService, ILog Ilog,

            IMapper mapper
            )
        {
            _DatBanService = DatBanService;
            _Ilog = Ilog;
            _mapper = mapper;

        }
        // GET: DatBanArea/DatBan
        [PermissionAccess(Code = permissionIndex)]
        public ActionResult Index()
        {

            var listData = _DatBanService.GetDaTaByPage(null);
            SessionManager.SetValue(searchKey, null);
            return View(listData);
        }

        [HttpPost]
        public JsonResult getData(int indexPage, string sortQuery, int pageSize)
        {
            var searchModel = SessionManager.GetValue(searchKey) as DatBanSearchDto;
            if (!string.IsNullOrEmpty(sortQuery))
            {
                if (searchModel == null)
                {
                    searchModel = new DatBanSearchDto();
                }
                searchModel.sortQuery = sortQuery;
                if (pageSize > 0)
                {
                    searchModel.pageSize = pageSize;
                }
                SessionManager.SetValue(searchKey, searchModel);
            }
            var data = _DatBanService.GetDaTaByPage(searchModel, indexPage, pageSize);
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
            var result = "Book table success";
            try
            {
                if (ModelState.IsValid)
                {
                    var EntityModel = _mapper.Map<DatBan>(model);
                    if (DateTime.TryParseExact(model.Ngay, "MM/dd/yyyy", null, System.Globalization.DateTimeStyles.None, out var ngay))
                    {
                        EntityModel.ThoiGian = ngay;
                    }
                    var gio = model.Gio.Replace("am", "").Replace("pm", "");
                    var gios = gio.Split(':');
                    if (gios.Length > 1)
                    {
                        var time = new TimeSpan(gios[0].ToIntOrZero(), gios[1].ToIntOrZero(), 0);

                        EntityModel.ThoiGian = EntityModel.ThoiGian.Add(time);
                        if (model.Gio.Contains("pm"))
                        {
                            EntityModel.ThoiGian = EntityModel.ThoiGian.AddHours(12);
                        }
                        if (gios[0] == "12")
                        {
                            EntityModel.ThoiGian = EntityModel.ThoiGian.AddHours(-12);
                        }
                    }
                    EntityModel.TrangThai = TrangThaiConstant.ChuaXacNhan;
                    _DatBanService.Create(EntityModel);
                }
            }
            catch (Exception ex)
            {
                result = "Book table fail";
                _Ilog.Error("Lỗi tạo mới Đặt bàn", ex);
            }
            return Json(result);
        }
        [HttpPost]
        public JsonResult XacNhan(long id)
        {
            var result = new JsonResultBO(true);
            var obj = _DatBanService.GetById(id);
            obj.TrangThai = TrangThaiConstant.DaXacNhan;
            _DatBanService.Save(obj);
            return Json(result);
        }


        [PermissionAccess(Code = permissionEdit)]
        public PartialViewResult Edit(long id)
        {
            var myModel = new EditVM();

            var obj = _DatBanService.GetById(id);
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

                    var obj = _DatBanService.GetById(model.Id);
                    if (obj == null)
                    {
                        throw new Exception("Không tìm thấy thông tin");
                    }

                    obj = _mapper.Map(model, obj);

                    _DatBanService.Update(obj);

                }
            }
            catch (Exception ex)
            {
                result.Status = false;
                result.Message = "Không cập nhật được";
                _Ilog.Error("Lỗi cập nhật thông tin Đặt bàn", ex);
            }
            return Json(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult searchData(DatBanSearchDto form)
        {
            var searchModel = SessionManager.GetValue(searchKey) as DatBanSearchDto;

            if (searchModel == null)
            {
                searchModel = new DatBanSearchDto();
                searchModel.pageSize = 20;
            }
            searchModel.HoFilter = form.HoFilter;
            searchModel.TenFilter = form.TenFilter;
            searchModel.ThoiGianFromFilter = form.ThoiGianFromFilter;
            searchModel.ThoiGianToFilter = form.ThoiGianToFilter;
            searchModel.DienThoaiFilter = form.DienThoaiFilter;
            searchModel.TrangThaiFilter = form.TrangThaiFilter;

            SessionManager.SetValue((searchKey), searchModel);

            var data = _DatBanService.GetDaTaByPage(searchModel, 1, searchModel.pageSize);
            return Json(data);
        }

        [PermissionAccess(Code = permissionDelete)]
        [HttpPost]
        public JsonResult Delete(long id)
        {
            var result = new JsonResultBO(true, "Xóa Đặt bàn thành công");
            try
            {
                var user = _DatBanService.GetById(id);
                if (user == null)
                {
                    throw new Exception("Không tìm thấy thông tin để xóa");
                }
                _DatBanService.Delete(user);
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
            model.objInfo = _DatBanService.GetDtoById(id);
            return View(model);
        }
        [PermissionAccess(Code = permissionExport)]
        //[PermissionAccess(Code = permissionImport)]
        public FileResult ExportExcel()
        {
            var searchModel = SessionManager.GetValue(searchKey) as DatBanSearchDto;
            var data = _DatBanService.GetDaTaByPage(searchModel).ListItem;
            var dataExport = _mapper.Map<List<DatBanExportDto>>(data);
            var fileExcel = ExportExcelV2Helper.Export<DatBanExportDto>(dataExport);
            return File(fileExcel, "application/octet-stream", "DatBan.xlsx");
        }

        [PermissionAccess(Code = permissionImport)]
        //[PermissionAccess(Code = permissionImport)]
        public ActionResult Import()
        {
            var model = new ImportVM();
            model.PathTemplate = Path.Combine(@"/Uploads", WebConfigurationManager.AppSettings["IMPORT_DatBan"]);

            return View(model);
        }

        [HttpPost]
        public ActionResult CheckImport(FormCollection collection, HttpPostedFileBase fileImport)
        {
            JsonResultImportBO<DatBanImportDto> result = new JsonResultImportBO<DatBanImportDto>(true);
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
                var importHelper = new ImportExcelHelper<DatBanImportDto>();
                importHelper.PathTemplate = saveFileResult.fullPath;
                //importHelper.StartCol = 2;
                importHelper.StartRow = collection["ROWSTART"].ToIntOrZero();
                importHelper.ConfigColumn = new List<ConfigModule>();
                importHelper.ConfigColumn = ExcelImportExtention.GetConfigCol<DatBanImportDto>(collection);
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
            ExportExcelHelper<DatBanImportDto> exPro = new ExportExcelHelper<DatBanImportDto>();
            exPro.PathStore = Path.Combine(HostingEnvironment.MapPath("/Uploads"), "ErrorExport");
            exPro.PathTemplate = Path.Combine(HostingEnvironment.MapPath("/Uploads"), WebConfigurationManager.AppSettings["IMPORT_DatBan"]);
            exPro.StartRow = 5;
            exPro.StartCol = 2;
            exPro.FileName = "ErrorImportDatBan";
            var result = exPro.ExportText(lstData);
            if (result.Status)
            {
                result.PathStore = Path.Combine(@"/Uploads/ErrorExport", result.FileName);
            }
            return Json(result);
        }

        [HttpPost]
        public JsonResult SaveImportData(List<DatBanImportDto> Data)
        {
            var result = new JsonResultBO(true);

            var lstObjSave = new List<DatBan>();
            try
            {
                foreach (var item in Data)
                {
                    var obj = _mapper.Map<DatBan>(item);
                    _DatBanService.Create(obj);
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