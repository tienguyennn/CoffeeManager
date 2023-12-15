var $idDotKeKhai = document.getElementById('IdDotKeKhai').value;
$(document).ready(function () {
    $('#btn--thaydoi-trangthai').on('click', function () {
        onOpenEditModal('/CdsDotKeKhaiArea/CdsDotKeKhai/ThayDoiTrangThaiDotKeKhai',
            { idDotKeKhai: $idDotKeKhai }, 'post');
    })
});

$(document).ready(function () {
    let maxHeight = 0;
    $(".widget-main").each(function () {
        console.log($(this).outerHeight());
        if ($(this).outerHeight() > maxHeight) {
            maxHeight = $(this).outerHeight();
        }
    });
    $(".widget-main").each(function () {
        $(this).outerHeight(maxHeight);
    });
});

/**
 * update: duynn
 * since: 16/08/2021
 * @param {any} id
 */
function onDuyetDotKeKhai(id) {
    var htmlContent = "<div class='block-confirm-change-status'>";
    htmlContent += "<div><input type='checkbox' id='checkbox-duyet-dotkekhai'/><strong><label for='checkbox-duyet-dotkekhai'>&nbsp;Gửi email thông báo tới các đơn vị</label></strong></div>"
    htmlContent += "<div>Bạn có muốn duyệt đợt kê khai này?</div>";
    htmlContent += "</div>";

    $.confirm({
        title: 'XÁC NHẬN DUYỆT ĐỢT KÊ KHAI',
        content: htmlContent,
        theme: 'material',
        buttons: {
            confirm: {
                text: 'Duyệt',
                btnClass: 'btn-info',
                keys: ['enter'],
                action: function () {
                    var isSendEmail = document.getElementById('checkbox-duyet-dotkekhai').checked;
                    AjaxCall('/CdsDotKeKhaiArea/CdsDotKeKhai/DuyetDotKeKhai/', 'post', { id: id, isSendEmail: isSendEmail }, function (result) {
                        if (result.Status) {
                            NotiSuccess("Thành công", result.Message);
                            AfterSussessActionAjaxform();
                        } else {
                            NotiError("Lỗi xử lý", result.Message);
                        }
                    })
                }
            },
            cancel: {
                text: 'Huỷ',
                btnClass: 'btn-default',
            }
        }
    });
}
function onLockDotKeKhai(id) {
    var htmlContent = "<div class='block-confirm-change-status'>";
    htmlContent += "<div><input type='checkbox'/><strong>&nbsp;Gửi email thông báo tới các đơn vị</strong></div>"
    htmlContent += "<div>Bạn có muốn khoá đợt kê khai này và chuyển sang rà soát?</div>";
    htmlContent += "</div>";
    $.confirm({
        title: 'XÁC NHẬN TIẾN HÀNH RÀ SOÁT ĐỢT KÊ KHAI',
        content: htmlContent,
        theme: 'material',
        buttons: {
            confirm: {
                text: 'Cập nhật',
                btnClass: 'btn-info',
                keys: ['enter'],
                action: function () {
                    AjaxCall('/CdsDotKeKhaiArea/CdsDotKeKhai/LockDotKeKhai/', 'post', { id: id }, function (rs) {
                        if (rs.Status) {
                            NotiSuccess("Thành công", "Khoá đợt kê khai thành công.");
                            AfterSussessActionAjaxform();
                        } else {
                            NotiError("Lỗi xử lý", rs.Message);
                        }
                    })
                }
            },
            cancel: {
                text: 'Huỷ',
                btnClass: 'btn-default',
            }
        }
    });
}
function onGiaiTrinhDotKeKhai(id) {
    $.confirm({
        title: 'Xác nhận hành động',
        content: 'Bạn có muốn cho phép các đơn vị bắt đầu giải trình?',
        theme: 'material',
        buttons: {
            confirm: {
                text: 'Khoá',
                btnClass: 'btn-info',
                keys: ['enter'],
                action: function () {
                    AjaxCall('/CdsDotKeKhaiArea/CdsDotKeKhai/GiaiTrinhDotKeKhai/', 'post', { id: id }, function (rs) {
                        if (rs.Status) {
                            NotiSuccess("Thành công", "Chuyển trạng thái đợt kê khai thành công.");
                            AfterSussessActionAjaxform();
                        } else {
                            NotiError("Lỗi xử lý", rs.Message);
                        }
                    })
                }
            },
            cancel: {
                text: 'Huỷ',
                btnClass: 'btn-default',
            }
        }
    });
}

function onChotDotKeKhai(id) {
    $.confirm({
        title: 'Xác nhận hành động',
        content: 'Bạn có muốn khoá đợt kê khai này và chuyển sang trạng thái chờ chốt số liệu?',
        theme: 'material',
        buttons: {
            confirm: {
                text: 'Khoá',
                btnClass: 'btn-info',
                keys: ['enter'],
                action: function () {
                    AjaxCall('/CdsDotKeKhaiArea/CdsDotKeKhai/ChotDotKeKhai/', 'post', { id: id }, function (rs) {
                        if (rs.Status) {
                            NotiSuccess("Thành công", "Chuyển trạng thái đợt kê khai thành công.");
                            AfterSussessActionAjaxform();
                        } else {
                            NotiError("Lỗi xử lý", rs.Message);
                        }
                    })
                }
            },
            cancel: {
                text: 'Huỷ',
                btnClass: 'btn-default',
            }
        }
    });
}

function onKetThucDotKeKhai(id) {
    $.confirm({
        title: 'Xác nhận hành động',
        content: 'Bạn có muốn kết thúc đợt kê khai này?',
        theme: 'material',
        buttons: {
            confirm: {
                text: 'Khoá',
                btnClass: 'btn-info',
                keys: ['enter'],
                action: function () {
                    AjaxCall('/CdsDotKeKhaiArea/CdsDotKeKhai/KetThucKeKhai/', 'post', { id: id }, function (rs) {
                        if (rs.Status) {
                            NotiSuccess("Thành công", "Chuyển trạng thái đợt kê khai thành công.");
                            AfterSussessActionAjaxform();
                        } else {
                            NotiError("Lỗi xử lý", rs.Message);
                        }
                    })
                }
            },
            cancel: {
                text: 'Huỷ',
                btnClass: 'btn-default',
            }
        }
    });
}

function onChotDiemHoSo(idDonVi, idDotKeKhai) {
    onConfirmCallBack('xác nhận chốt điểm', 'Bạn có chắc chắn chốt điểm', function () {
        confirmSoLieuGiaiTrinh(idDonVi, idDotKeKhai);
    })
}

function confirmSoLieuGiaiTrinh(idDonVi, idDotKeKhai) {
    var confirmSoLieuGiaiTrinhCallBack = function (sendResult) {
        var isSendSuccess = sendResult.Status;
        var respMessage = sendResult.Message;
        if (isSendSuccess) {
            NotiSuccess(respMessage);

            //cái này sau này chuyển thành ajax
            setTimeout(function () {
                location.reload();
            }, 500)
        } else {
            NotiError(respMessage);
        }
    }

    onCallAjax('/KeKhaiArea/LuongXuLyHoSoGiaiTrinh/ChotSoLieuGiaiTrinh', { idDonVi: idDonVi, idDotKeKhai: idDotKeKhai }, 'post', confirmSoLieuGiaiTrinhCallBack);
}

function onXemThongKeRaSoat(idDonVi, idDotKeKhai) {
    onOpenEditModal('/KeKhaiArea/BaoCaoKeKhai/XemThongKeRaSoatDonVi',
        { idDonVi: idDonVi, idDotKeKhai: idDotKeKhai }, 'post');
}

/**
 * nhắc nhở đơn vị kê khai
 * @param {any} idDonVi
 * @param {any} idDotKeKhai
 */
function onGuiNhacNhoKeKhai(idDonVi, idDotKeKhai, capDanhGia) {
    onOpenEditModal('/KeKhaiArea/BaoCaoKeKhai/NhacNhoKeKhai',
        { idDonVi: idDonVi, idDotKeKhai: idDotKeKhai, capDanhGia: capDanhGia }, 'post');
}



/**
 * nhắc nhở đơn vị kê khai
 * @param {any} idDonVi
 * @param {any} idDotKeKhai
 */
function onGuiNhacNhoKeKhaiAll(idDotKeKhai, idCapDanhGia) {
    onConfirmCallBack('XÁC NHẬN GỬI NHẮC NHỞ KÊ KHAI CHO CÁC ĐƠN VỊ CHƯA GỬI SỐ LIỆU CỦA CẤP ĐÁNH GIÁ NÀY', 'Bạn có chắc chắn không?', function () {
        onCallAjax("/KeKhaiArea/BaoCaoKeKhai/GuiNhacNhoKeKhaiTheoCap",
            { idDotKeKhai: idDotKeKhai, idCapDanhGia: idCapDanhGia }, 'post', function (result) {
            if (result.Status) {
                NotiSuccess('Thành công', result.Message);
                $('#form--search-tinhtrang-kekhai-' + idCapDanhGia).submit();
            } else {
                NotiError('Thất bại', result.Message);
            }
        })
    })
}


function onMoChotKeKhaiDonVi(idDonVi, idDotKeKhai, idCapDanhGia) {
    onConfirmCallBack('XÁC NHẬN MỞ TRẠNG THÁI CHỐT CHO ĐƠN VỊ VÀO GIẢI TRÌNH', 'Bạn có chắc chắn không?', function () {
        onCallAjax("/KeKhaiArea/BaoCaoKeKhai/MoChotKeKhaiDonVi", { idDonVi: idDonVi, idDotKeKhai: idDotKeKhai, idCapDanhGia }, 'post', function (result) {
            if (result.Status) {
                NotiSuccess('Thành công', result.Message);

                //reload lại danh sách đơn vị bằng cách submit lại form tìm kiếm
                $('#form--search-tinhtrang-kekhai-' + idCapDanhGia).submit();
            } else {
                NotiError('Thất bại', result.Message);
            }
        })
    })
}


function onKhoaChotKeKhaiDonVi(idDonVi, idDotKeKhai, idCapDanhGia) {
    onConfirmCallBack('XÁC NHẬN MỞ TRẠNG THÁI CHỐT CHO ĐƠN VỊ VÀO GIẢI TRÌNH', 'Bạn có chắc chắn không?', function () {
        onCallAjax("/KeKhaiArea/BaoCaoKeKhai/KhoaChotKeKhaiDonVi", { idDonVi: idDonVi, idDotKeKhai: idDotKeKhai, idCapDanhGia }, 'post', function (result) {
            if (result.Status) {
                NotiSuccess('Thành công', result.Message);

                //reload lại danh sách đơn vị bằng cách submit lại form tìm kiếm
                $('#form--search-tinhtrang-kekhai-' + idCapDanhGia).submit();
            } else {
                NotiError('Thất bại', result.Message);
            }
        })
    })
}

function onExportTinhTrangKeKhai(idDotKeKhai, idCapDanhGia) {
    location.href = '/KeKhaiArea/BaoCaoKeKhai/ExportTinhTrangKeKhai?idDotKeKhai=' + idDotKeKhai + "&idCapDanhGia=" + idCapDanhGia;
}


function onTraVeSoLieuKeKhai(idDonVi, idDotKeKhai, idCapDanhGia) {
    onConfirmCallBack('XÁC NHẬN TRẢ VỀ SỐ LIỆU KÊ KHAI', 'Bạn có chắc chắn không?', function () {
        onCallAjax("/KeKhaiArea/BaoCaoKeKhai/TraVeHoSoKeKhai",
            { idDotKeKhai: idDotKeKhai, idDonVi: idDonVi }, 'post', function (result) {
                if (result.Status) {
                    NotiSuccess('Thành công', result.Message);
                    $('#form--search-tinhtrang-kekhai-' + idCapDanhGia).submit();
                } else {
                    NotiError('Thất bại', result.Message);
                }
            })
    })
}


function onDongYSoLieuKeKhai(idDonVi, idDotKeKhai, idCapDanhGia) {
    onConfirmCallBack('XÁC NHẬN ĐồNG Ý SỐ LIỆU KÊ KHAI', 'Bạn có chắc chắn không?', function () {
        onCallAjax("/KeKhaiArea/BaoCaoKeKhai/DongYSoLieuKeKhai",
            { idDotKeKhai: idDotKeKhai, idDonVi: idDonVi }, 'post', function (result) {
                if (result.Status) {
                    NotiSuccess('Thành công', result.Message);
                    $('#form--search-tinhtrang-kekhai-' + idCapDanhGia).submit();
                } else {
                    NotiError('Thất bại', result.Message);
                }
            })
    })
}
