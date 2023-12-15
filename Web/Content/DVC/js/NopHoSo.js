function KeKhaiTrucTuyen(step_id) {
    $.ajax({
        url: '/DVCDETAILDICHVUCONGArea/KeKhaiDichVuCong/KeKhai',
        data: {
            'step_id': step_id
        },
        type: 'post',
        success: function (rs) {
            $("#KeKhaiTrucTuyenModal").html(rs);
            $("#KeKhaiTrucTuyenModal").modal({ backdrop: 'static', keyboard: false });
        },
        error: function () {
            NotiError("Không thực hiện được thao tác");
        }
    });
}
function SuaKeKhaiTrucTuyen(step_id, idHoSo) {
    $.ajax({
        url: '/DVCDETAILDICHVUCONGArea/KeKhaiDichVuCong/SuaKeKhai',
        data: {
            'step_id': step_id,
            'idHoSo': idHoSo || 0,
        },
        type: 'post',
        success: function (rs) {
            $("#KeKhaiTrucTuyenModal").html(rs);
            $("#KeKhaiTrucTuyenModal").modal({ backdrop: 'static', keyboard: false });
        },
        error: function () {
            NotiError("Không thực hiện được thao tác");
        }
    });
}

function ActionSuccess(rs) {
    if (rs.Status) {
        window.location.reload();
    } else {
        NotiError("Không thành công");
    }
}

function ActionFail(rs) {
    NotiError("Có lỗi xảy ra");
}
function sendKeKhai() {    
    var submitThongTinKeKhai = function () {
        var data = {
            "ID_DICHVUCONG": $('#ID_DICHVUCONG').val(),
            "UploadFileNames": $('#UploadFileNames').val()
        }
        var callBack = function (result) {
            var $title = result.Status ? 'GỬI HỒ SƠ THÀNH CÔNG' : 'GỬI HỒ SƠ THẤT BẠI';
            var $content = result.Status ? 'Gừi hồ sơ thành công' : 'Gửi hồ sơ thất bại! Vui lòng kiểm tra lại thông tin.';
            if (result.Status) {
                location.href = '/DVCDETAILDICHVUCONGArea/DVCDETAILDICHVUCONG/ThongBaoNopKeKhai?idHoSoDichVuCong=' + result.IdHoSoDichVuCong;
            } else {
                $.confirm({
                    title: $title,
                    content: $content,
                    draggable: false,
                    theme: 'material',
                    buttons: {
                        "Đóng": {
                            class: 'btn-danger',
                            text: "Không",
                            action: function () {
                                return false;
                            }
                        }
                    }
                });
            }
        }
        onCallAjax('/DVCDETAILDICHVUCONGArea/DVCDETAILDICHVUCONG/SendKeKhai', data, 'post', callBack);
    }
    //Kiểm tra xem hoàn thành các bước bắt buộc chưa
    var checkRequired = false;
    $("#table-step-row tr td .required").each(function () {
        var upload = $(this).find(".ajax-file-upload-container");
        if (upload.length > 0 && upload.html().trim() == "") {
            //chưa kê khai thông tin
            checkRequired = true;
        } else if (upload.length == 0) {
            var checkKeKhai = $(this).find(".done");
            if (checkKeKhai.length != 2) {
                checkRequired = true;
            }
        }
    });
    if (checkRequired) {
        NotiWarninFrontEndg('Bạn phải kê khai đầy đủ các bước bắt buộc');
        return false;
    }
    //Confirm lại thông tin
    $.confirm({
        title: 'XÁC NHẬN GỬI HỒ SƠ',
        content: "Bạn có chắc muốn gửi thông tin kê khai cho dịch vụ công này?",
        draggable: false,
        theme: 'material',
        buttons: {
            "Đồng ý": {
                class: 'btn-primary',
                text: 'Đồng ý',
                action: function () {
                    submitThongTinKeKhai();
                }
            },
            "Không": {
                class: 'btn-danger',
                text: "Không",
                action: function () {
                    return false;
                }
            }
        }
    });
}

function sendKeKhaiDaChinhSua() {
    var submitThongTinKeKhai = function () {
        var data = {
            "ID_DICHVUCONG": $('#ID_DICHVUCONG').val(),
            "ID_HOSO_DICHVUCONG": $('#ID_HOSO_DICHVUCONG').val(),
            "UploadFileNames": $('#UploadFileNames').val()
        }
        var callBack = function (result) {
            if (result.Status) {
                NotiSuccessFrontEnd(result.Message);
                setTimeout(function () {
                    location.href = '/Home/DanhSachHoSoDaBoSung';
                }, 1000)
            } else {
                NotiErrorFrontEnd('Thất bại', result.Message);
            }
        }
        onCallAjax('/DVCDETAILDICHVUCONGArea/DVCDETAILDICHVUCONG/SendKeKhaiChinhSua', data, 'post', callBack);
    }

    $.confirm({
        title: 'XÁC NHẬN GỬI HỒ SƠ',
        content: "Bạn có chắc muốn gửi thông tin kê khai cho dịch vụ công này?",
        draggable: false,
        theme: 'material',
        buttons: {
            "Đồng ý": {
                class: 'btn-primary',
                text: 'Đồng ý',
                action: function () {
                    submitThongTinKeKhai();
                }
            },
            "Không": {
                class: 'btn-danger',
                text: "Không",
                action: function () {
                    return false;
                }
            }
        }
    });
}