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
using Web.Areas.OrderArea.Models;
using Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using Web.Filters;
using Service.OrderService;
using Service.OrderService.Dto;
using CommonHelper.Excel;
using CommonHelper.ObjectExtention;
using Web.Common;
using System.IO;
using System.Web.Configuration;
using CommonHelper;
using Service.OrderDetailService;
using Service.SanPhamService;

namespace Web.Areas.OrderArea.Controllers
{
    public class OrderController : BaseController
    {
        private readonly ILog _Ilog;
        private readonly IOrderDetailService _orderDetailService;
        private readonly ISanPhamService _sanPhamService;
        private readonly IMapper _mapper;
        public const string permissionIndex = "Order_index";
        public const string permissionCreate = "Order_create";
        public const string permissionEdit = "Order_edit";
        public const string permissionDelete = "Order_delete";
        public const string permissionImport = "Order_import";
        public const string permissionExport = "Order_export";
        public const string searchKey = "OrderPageSearchModel";
        private readonly IOrderService _OrderService;


        public OrderController(IOrderService OrderService, ILog Ilog,
            IOrderDetailService orderDetailService,
            ISanPhamService sanPhamService,
            IMapper mapper
            )
        {
            _OrderService = OrderService;
            _Ilog = Ilog;
            this._orderDetailService = orderDetailService;
            this._sanPhamService = sanPhamService;
            _mapper = mapper;

        }
        // GET: OrderArea/Order
        [PermissionAccess(Code = permissionIndex)]
        public ActionResult Index()
        {

            var listData = _OrderService.GetDaTaByPage(null);
            SessionManager.SetValue(searchKey, null);
            return View(listData);
        }

        [HttpPost]
        public JsonResult getData(int indexPage, string sortQuery, int pageSize)
        {
            var searchModel = SessionManager.GetValue(searchKey) as OrderSearchDto;
            if (!string.IsNullOrEmpty(sortQuery))
            {
                if (searchModel == null)
                {
                    searchModel = new OrderSearchDto();
                }
                searchModel.sortQuery = sortQuery;
                if (pageSize > 0)
                {
                    searchModel.pageSize = pageSize;
                }
                SessionManager.SetValue(searchKey, searchModel);
            }
            var data = _OrderService.GetDaTaByPage(searchModel, indexPage, pageSize);
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
            var result = new JsonResultBO(true, "Tạo Đặt hàng thành công");
            try
            {
                if (ModelState.IsValid)
                {
                    var EntityModel = _mapper.Map<Order>(model);
                    EntityModel.TrangThai = TrangThaiConstant.ChuaXacNhan;
                    _OrderService.Create(EntityModel);

                    var cart = SessionManager.GetValue("CartStorage") as Dictionary<long, int> ?? new Dictionary<long, int>();
                    var sanphamIds = cart.Select(x => x.Key).ToList();
                    var sanphams = _sanPhamService.GetByIds(sanphamIds);
                    foreach (var item in sanphams)
                    {
                        var orderDetail = new OrderDetail()
                        {
                            OrderId = EntityModel.Id,
                            SanPhamId = item.Id,
                            SoLuong = cart[item.Id],
                            GiaTien = cart[item.Id] * item.Gia,
                        };
                        _orderDetailService.Create(orderDetail);
                    }
                    SessionManager.SetValue("CartStorage", new Dictionary<long, int>());


                }

            }
            catch (Exception ex)
            {
                result.MessageFail(ex.Message);
                _Ilog.Error("Lỗi tạo mới Đặt hàng", ex);
            }
            return Json(result);
        }

        [HttpPost]
        public JsonResult XacNhan(long id)
        {
            var result = new JsonResultBO(true);
            var obj = _OrderService.GetById(id);
            obj.TrangThai = TrangThaiConstant.DaXacNhan;
            _OrderService.Save(obj);
            return Json(result);
        }


        [PermissionAccess(Code = permissionEdit)]
        public PartialViewResult Edit(long id)
        {
            var myModel = new EditVM();

            var obj = _OrderService.GetById(id);
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

                    var obj = _OrderService.GetById(model.Id);
                    if (obj == null)
                    {
                        throw new Exception("Không tìm thấy thông tin");
                    }

                    obj = _mapper.Map(model, obj);

                    _OrderService.Update(obj);

                }
            }
            catch (Exception ex)
            {
                result.Status = false;
                result.Message = "Không cập nhật được";
                _Ilog.Error("Lỗi cập nhật thông tin Đặt hàng", ex);
            }
            return Json(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult searchData(OrderSearchDto form)
        {
            var searchModel = SessionManager.GetValue(searchKey) as OrderSearchDto;

            if (searchModel == null)
            {
                searchModel = new OrderSearchDto();
                searchModel.pageSize = 20;
            }
            searchModel.HoFilter = form.HoFilter;
            searchModel.TenFilter = form.TenFilter;
            searchModel.DiaChiFilter = form.DiaChiFilter;
            searchModel.DiaChiChiTietFilter = form.DiaChiChiTietFilter;
            searchModel.DienThoaiFilter = form.DienThoaiFilter;
            searchModel.EmailFilter = form.EmailFilter;
            searchModel.SanPhamIdsFilter = form.SanPhamIdsFilter;
            searchModel.TrangThaiFilter = form.TrangThaiFilter;

            SessionManager.SetValue((searchKey), searchModel);

            var data = _OrderService.GetDaTaByPage(searchModel, 1, searchModel.pageSize);
            return Json(data);
        }

        [PermissionAccess(Code = permissionDelete)]
        [HttpPost]
        public JsonResult Delete(long id)
        {
            var result = new JsonResultBO(true, "Xóa Đặt hàng thành công");
            try
            {
                var user = _OrderService.GetById(id);
                if (user == null)
                {
                    throw new Exception("Không tìm thấy thông tin để xóa");
                }
                _OrderService.Delete(user);
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
            model.objInfo = _OrderService.GetDtoById(id);
            return View(model);
        }
        [PermissionAccess(Code = permissionExport)]
        //[PermissionAccess(Code = permissionImport)]
        public FileResult ExportExcel()
        {
            var searchModel = SessionManager.GetValue(searchKey) as OrderSearchDto;
            var data = _OrderService.GetDaTaByPage(searchModel).ListItem;
            var dataExport = _mapper.Map<List<OrderExportDto>>(data);
            var fileExcel = ExportExcelV2Helper.Export<OrderExportDto>(dataExport);
            return File(fileExcel, "application/octet-stream", "Order.xlsx");
        }

        [PermissionAccess(Code = permissionImport)]
        //[PermissionAccess(Code = permissionImport)]
        public ActionResult Import()
        {
            var model = new ImportVM();
            model.PathTemplate = Path.Combine(@"/Uploads", WebConfigurationManager.AppSettings["IMPORT_Order"]);

            return View(model);
        }

        [HttpPost]
        public ActionResult CheckImport(FormCollection collection, HttpPostedFileBase fileImport)
        {
            JsonResultImportBO<OrderImportDto> result = new JsonResultImportBO<OrderImportDto>(true);
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
                var importHelper = new ImportExcelHelper<OrderImportDto>();
                importHelper.PathTemplate = saveFileResult.fullPath;
                //importHelper.StartCol = 2;
                importHelper.StartRow = collection["ROWSTART"].ToIntOrZero();
                importHelper.ConfigColumn = new List<ConfigModule>();
                importHelper.ConfigColumn = ExcelImportExtention.GetConfigCol<OrderImportDto>(collection);
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
            ExportExcelHelper<OrderImportDto> exPro = new ExportExcelHelper<OrderImportDto>();
            exPro.PathStore = Path.Combine(HostingEnvironment.MapPath("/Uploads"), "ErrorExport");
            exPro.PathTemplate = Path.Combine(HostingEnvironment.MapPath("/Uploads"), WebConfigurationManager.AppSettings["IMPORT_Order"]);
            exPro.StartRow = 5;
            exPro.StartCol = 2;
            exPro.FileName = "ErrorImportOrder";
            var result = exPro.ExportText(lstData);
            if (result.Status)
            {
                result.PathStore = Path.Combine(@"/Uploads/ErrorExport", result.FileName);
            }
            return Json(result);
        }

        [HttpPost]
        public JsonResult SaveImportData(List<OrderImportDto> Data)
        {
            var result = new JsonResultBO(true);

            var lstObjSave = new List<Order>();
            try
            {
                foreach (var item in Data)
                {
                    var obj = _mapper.Map<Order>(item);
                    _OrderService.Create(obj);
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