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
using Web.Areas.BlogArea.Models;
using Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using Web.Filters;
using Service.BlogService;
using Service.BlogService.Dto;
using CommonHelper.Excel;
using CommonHelper.ObjectExtention;
using Web.Common;
using System.IO;
using System.Web.Configuration;
using CommonHelper;



namespace Web.Areas.BlogArea.Controllers
{
    public class BlogController : BaseController
    {
        private readonly ILog _Ilog;
        private readonly IMapper _mapper;
        public const string permissionIndex = "Blog_index";
        public const string permissionCreate = "Blog_create";
        public const string permissionEdit = "Blog_edit";
        public const string permissionDelete = "Blog_delete";
        public const string permissionImport = "Blog_import";
        public const string permissionExport = "Blog_export";
        public const string searchKey = "BlogPageSearchModel";
        private readonly IBlogService _BlogService;


        public BlogController(IBlogService BlogService, ILog Ilog,

            IMapper mapper
            )
        {
            _BlogService = BlogService;
            _Ilog = Ilog;
            _mapper = mapper;

        }
        // GET: BlogArea/Blog
        [PermissionAccess(Code = permissionIndex)]
        public ActionResult Index()
        {

            var listData = _BlogService.GetDaTaByPage(null);
            SessionManager.SetValue(searchKey, null);
            return View(listData);
        }

        [HttpPost]
        public JsonResult getData(int indexPage, string sortQuery, int pageSize)
        {
            var searchModel = SessionManager.GetValue(searchKey) as BlogSearchDto;
            if (!string.IsNullOrEmpty(sortQuery))
            {
                if (searchModel == null)
                {
                    searchModel = new BlogSearchDto();
                }
                searchModel.sortQuery = sortQuery;
                if (pageSize > 0)
                {
                    searchModel.pageSize = pageSize;
                }
                SessionManager.SetValue(searchKey, searchModel);
            }
            var data = _BlogService.GetDaTaByPage(searchModel, indexPage, pageSize);
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
        [ValidateInput(false)]
        public JsonResult Create(CreateVM model)
        {
            var result = new JsonResultBO(true, "Tạo Blog thành công");
            try
            {
                if (ModelState.IsValid)
                {
                    var EntityModel = _mapper.Map<Blog>(model);
                    var resultUpload_HinhAnh = UploadProvider.SaveFile(model.HinhAnhInpFile, null, UploadProvider.ListExtensionCommon, UploadProvider.MaxSizeCommon, "HinhAnh/HinhAnh", Server.MapPath("/Uploads"));
                    if (resultUpload_HinhAnh.status)
                    {
                        EntityModel.HinhAnh = resultUpload_HinhAnh.path;
                    }
                    _BlogService.Create(EntityModel);

                }

            }
            catch (Exception ex)
            {
                result.MessageFail(ex.Message);
                _Ilog.Error("Lỗi tạo mới Blog", ex);
            }
            return Json(result);
        }

        [HttpPost]
        public JsonResult ChangeIsPhatHanh(long id, bool isPhatHanh)
        {
            var result = new JsonResultBO(true);
            var obj = _BlogService.GetById(id);
            obj.IsPhatHanh = isPhatHanh;
            _BlogService.Save(obj);
            return Json(result);
        }



        [PermissionAccess(Code = permissionEdit)]
        public PartialViewResult Edit(long id)
        {
            var myModel = new EditVM();

            var obj = _BlogService.GetById(id);
            if (obj == null)
            {
                throw new HttpException(404, "Không tìm thấy thông tin");
            }

            myModel = _mapper.Map(obj, myModel);
            return PartialView("_EditPartial", myModel);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public JsonResult Edit(EditVM model)
        {
            var result = new JsonResultBO(true);
            try
            {
                if (ModelState.IsValid)
                {

                    var obj = _BlogService.GetById(model.Id);
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
                    _BlogService.Update(obj);

                }
            }
            catch (Exception ex)
            {
                result.Status = false;
                result.Message = "Không cập nhật được";
                _Ilog.Error("Lỗi cập nhật thông tin Blog", ex);
            }
            return Json(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult searchData(BlogSearchDto form)
        {
            var searchModel = SessionManager.GetValue(searchKey) as BlogSearchDto;

            if (searchModel == null)
            {
                searchModel = new BlogSearchDto();
                searchModel.pageSize = 20;
            }
            searchModel.TieuDeFilter = form.TieuDeFilter;

            SessionManager.SetValue((searchKey), searchModel);

            var data = _BlogService.GetDaTaByPage(searchModel, 1, searchModel.pageSize);
            return Json(data);
        }

        [PermissionAccess(Code = permissionDelete)]
        [HttpPost]
        public JsonResult Delete(long id)
        {
            var result = new JsonResultBO(true, "Xóa Blog thành công");
            try
            {
                var user = _BlogService.GetById(id);
                if (user == null)
                {
                    throw new Exception("Không tìm thấy thông tin để xóa");
                }
                _BlogService.Delete(user);
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
            model.objInfo = _BlogService.GetDtoById(id);
            return View(model);
        }
        [PermissionAccess(Code = permissionExport)]
        //[PermissionAccess(Code = permissionImport)]
        public FileResult ExportExcel()
        {
            var searchModel = SessionManager.GetValue(searchKey) as BlogSearchDto;
            var data = _BlogService.GetDaTaByPage(searchModel).ListItem;
            var dataExport = _mapper.Map<List<BlogExportDto>>(data);
            var fileExcel = ExportExcelV2Helper.Export<BlogExportDto>(dataExport);
            return File(fileExcel, "application/octet-stream", "Blog.xlsx");
        }

        [PermissionAccess(Code = permissionImport)]
        //[PermissionAccess(Code = permissionImport)]
        public ActionResult Import()
        {
            var model = new ImportVM();
            model.PathTemplate = Path.Combine(@"/Uploads", WebConfigurationManager.AppSettings["IMPORT_Blog"]);

            return View(model);
        }

        [HttpPost]
        public ActionResult CheckImport(FormCollection collection, HttpPostedFileBase fileImport)
        {
            JsonResultImportBO<BlogImportDto> result = new JsonResultImportBO<BlogImportDto>(true);
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
                var importHelper = new ImportExcelHelper<BlogImportDto>();
                importHelper.PathTemplate = saveFileResult.fullPath;
                //importHelper.StartCol = 2;
                importHelper.StartRow = collection["ROWSTART"].ToIntOrZero();
                importHelper.ConfigColumn = new List<ConfigModule>();
                importHelper.ConfigColumn = ExcelImportExtention.GetConfigCol<BlogImportDto>(collection);
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
            ExportExcelHelper<BlogImportDto> exPro = new ExportExcelHelper<BlogImportDto>();
            exPro.PathStore = Path.Combine(HostingEnvironment.MapPath("/Uploads"), "ErrorExport");
            exPro.PathTemplate = Path.Combine(HostingEnvironment.MapPath("/Uploads"), WebConfigurationManager.AppSettings["IMPORT_Blog"]);
            exPro.StartRow = 5;
            exPro.StartCol = 2;
            exPro.FileName = "ErrorImportBlog";
            var result = exPro.ExportText(lstData);
            if (result.Status)
            {
                result.PathStore = Path.Combine(@"/Uploads/ErrorExport", result.FileName);
            }
            return Json(result);
        }

        [HttpPost]
        public JsonResult SaveImportData(List<BlogImportDto> Data)
        {
            var result = new JsonResultBO(true);

            var lstObjSave = new List<Blog>();
            try
            {
                foreach (var item in Data)
                {
                    var obj = _mapper.Map<Blog>(item);
                    _BlogService.Create(obj);
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