using Hinet.Model.Entities;
using Hinet.Service.CdsBoChiSoService;
using Hinet.Service.CdsNhomTieuChiService;
using Hinet.Service.CdsTieuChiService;
using Hinet.Service.CdsTruCotSoService;
using Hinet.Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hinet.Web.Controllers
{
    public class HelperController : BaseController
    {
        ICdsBoChiSoService _CdsBoChiSoService;
        ICdsTruCotSoService _CdsTruCotSoService;
        ICdsNhomTieuChiService _CdsNhomTieuChiService;
        ICdsTieuChiService _CdsTieuChiService;

        public HelperController(ICdsBoChiSoService CdsBoChiSoService,
        ICdsTruCotSoService CdsTruCotSoService,
        ICdsNhomTieuChiService CdsNhomTieuChiService,
        ICdsTieuChiService CdsTieuChiService)
        {
            _CdsBoChiSoService = CdsBoChiSoService;
            _CdsTruCotSoService = CdsTruCotSoService;
            _CdsNhomTieuChiService = CdsNhomTieuChiService;
            _CdsTieuChiService = CdsTieuChiService;
        }

        // GET: Helper
        public ActionResult CloneBoChiSo()
        {
            var idBoChiSo = 2;
            var entityBoChiSo = _CdsBoChiSoService.GetById(idBoChiSo);
            var groupTruCotSo = _CdsTruCotSoService.FindBy(x => x.BoChiSoId == idBoChiSo).ToList();

            var idsTruCotSo = groupTruCotSo.Select(x => x.Id).ToList();
            var groupNhomTieuChi = _CdsNhomTieuChiService.FindBy(x => idsTruCotSo.Contains(x.TruCotSoId)).ToList();

            var idsNhomTieuChi = groupNhomTieuChi.Select(x => x.Id).ToList();
            var groupTieuChi = _CdsTieuChiService.FindBy(x => x.NhomTieuChiId != null && idsNhomTieuChi.Contains(x.NhomTieuChiId.Value)).ToList();

            var newBoChiSo = new CdsBoChiSo()
            {
                TenBoChiSo = entityBoChiSo.TenBoChiSo + " (Clone)",
                CapDanhGia = "62",
                DangKeKhai = 72,
                IsUseToReport = true
            };
            _CdsBoChiSoService.Create(newBoChiSo);

            var listTruCotSoClone = new List<CdsTruCotSo>();
            foreach (var itemTruCotSo in groupTruCotSo)
            {
                listTruCotSoClone.Add(new CdsTruCotSo()
                {
                    TenTruCot = itemTruCotSo.TenTruCot,
                    BoChiSoId = newBoChiSo.Id,
                    DonViId = itemTruCotSo.DonViId,
                    LoaiTruCot = itemTruCotSo.LoaiTruCot
                });
            }
            _CdsTruCotSoService.InsertRange(listTruCotSoClone);


            var listTruCotSoNew = _CdsTruCotSoService.GetAllNoTracking().Where(x => x.BoChiSoId == newBoChiSo.Id).ToList();
            var listNhomTieuChiClone = new List<CdsNhomTieuChi>();
            foreach (var itemNewTruCotSo in listTruCotSoNew)
            {
                var itemTruCotSoTuongDuong = groupTruCotSo.Where(x => x.TenTruCot == itemNewTruCotSo.TenTruCot).FirstOrDefault();

                if (itemTruCotSoTuongDuong == null)
                    continue;
                var listNhomTieuChiOld = groupNhomTieuChi.Where(x => x.TruCotSoId == itemTruCotSoTuongDuong.Id).ToList();
                foreach (var itemNhomTieuChi in listNhomTieuChiOld)
                {
                    listNhomTieuChiClone.Add(new CdsNhomTieuChi()
                    {
                        TenNhomTieuChi = itemNhomTieuChi.TenNhomTieuChi,
                        TruCotSoId = itemNewTruCotSo.Id,
                        MaxScore = itemNhomTieuChi.MaxScore,
                        DonViId = itemNhomTieuChi.DonViId,
                        HtmlContent = itemNhomTieuChi.HtmlContent,
                        KeyStored = itemNhomTieuChi.KeyStored
                    });
                }
            }
            _CdsNhomTieuChiService.InsertRange(listNhomTieuChiClone);

            var idsTruCotSoNew = listTruCotSoNew.Select(x => x.Id).ToList();
            var listNhomTieuChiNew = _CdsNhomTieuChiService.GetAllNoTracking().Where(x => idsTruCotSoNew.Contains(x.TruCotSoId)).ToList();
            var listTieuChiClone = new List<CdsTieuChi>();


            foreach (var itemNewTruCotSo in listTruCotSoNew)
            {
                var itemTruCotSoCuTuongDuong = groupTruCotSo.Where(x => x.TenTruCot == itemNewTruCotSo.TenTruCot).FirstOrDefault();

                if (itemTruCotSoCuTuongDuong == null)
                    continue;

                var listNhomTieuChiOfTruCotCuTuongDuong = groupNhomTieuChi.Where(x => x.TruCotSoId == itemTruCotSoCuTuongDuong.Id).ToList();

                foreach (var itemNhomTieuChiCu in listNhomTieuChiOfTruCotCuTuongDuong)
                {
                    var itemNhomTieuChiMoiTuongDuong = listNhomTieuChiNew
                        .Where(x => x.TruCotSoId == itemNewTruCotSo.Id && x.TenNhomTieuChi == itemNhomTieuChiCu.TenNhomTieuChi).FirstOrDefault();

                    if (itemNhomTieuChiMoiTuongDuong == null)
                        continue;

                    var groupTieuChiCu = groupTieuChi.Where(x => x.NhomTieuChiId == itemNhomTieuChiCu.Id).ToList();
                    foreach (var itemTieuChiCu in groupTieuChiCu)
                    {
                        listTieuChiClone.Add(new CdsTieuChi()
                        {
                            BoChiSoId = newBoChiSo.Id,
                            TruCotSoId = itemNewTruCotSo.Id,
                            NhomTieuChiId = itemNhomTieuChiMoiTuongDuong.Id,
                            TenTieuChi = itemTieuChiCu.TenTieuChi,
                            CdsKey = itemTieuChiCu.CdsKey,
                            Required = itemTieuChiCu.Required,
                            PlaceHolder = itemTieuChiCu.PlaceHolder,
                            DataType = itemTieuChiCu.DataType,
                            IsComboBox = itemTieuChiCu.IsComboBox,
                            IdDanhMuc = itemTieuChiCu.IdDanhMuc,
                            GioiHanDuoi = itemTieuChiCu.GioiHanDuoi,
                            GioiHanTren = itemTieuChiCu.GioiHanTren,
                            IsMultiple = itemTieuChiCu.IsMultiple,
                            CongThuc = itemTieuChiCu.CongThuc,
                            IsDisableAutoCompute = itemTieuChiCu.IsDisableAutoCompute,
                            ListDisabled = itemTieuChiCu.ListDisabled,
                            ListEnabled = itemTieuChiCu.ListEnabled,
                            TenDaiDien = itemTieuChiCu.TenDaiDien,
                            SoThuTu =itemTieuChiCu.SoThuTu,
                            CapDo = itemTieuChiCu.CapDo,
                            IdParent = itemTieuChiCu.IdParent,
                            TongSoThuTu = itemTieuChiCu.TongSoThuTu,
                            TenDaiDienNoSign = itemTieuChiCu.TenDaiDienNoSign,
                            IsDaiDienChoNhomTieuChi = itemTieuChiCu.IsDaiDienChoNhomTieuChi,
                            LayChinhXacTheoKey = itemTieuChiCu.LayChinhXacTheoKey,
                            CoreLayChinhXac = itemTieuChiCu.CoreLayChinhXac,
                            KeyLayChinhXac = itemTieuChiCu.KeyLayChinhXac,
                            TinhTongTheoKey = itemTieuChiCu.TinhTongTheoKey,
                            KeySoTinhTong = itemTieuChiCu.KeySoTinhTong,
                            KeyQuanHuyenTinhTong = itemTieuChiCu.KeyQuanHuyenTinhTong,
                            DemSoDonViCo = itemTieuChiCu.DemSoDonViCo,
                            KeySoDemCo = itemTieuChiCu.KeySoDemCo,
                            KeyQuanHuyenDemCo = itemTieuChiCu.KeyQuanHuyenDemCo,
                            TonTaiCoLaCo = itemTieuChiCu.TonTaiCoLaCo,
                            KeySoTonTaiCo= itemTieuChiCu.KeySoTonTaiCo,
                            KeyQuanHuyenTonTaiCo = itemTieuChiCu.KeyQuanHuyenTonTaiCo
                        });
                    }
                }
            }
            _CdsTieuChiService.InsertRange(listTieuChiClone);
            return View();
        }
    }
}