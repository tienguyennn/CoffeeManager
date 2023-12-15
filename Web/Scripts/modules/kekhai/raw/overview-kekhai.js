$(document).ready(function () {

});

$(document).ready(function () {
    let maxHeight = 0;
    $(".widget-main").each(function () {
        //console.log($(this).outerHeight());
        if ($(this).outerHeight() > maxHeight) {
            maxHeight = $(this).outerHeight();
        }
    });
    $(".widget-main").each(function () {
        $(this).outerHeight(maxHeight);
    });

    $(window).resize(function () {
        maxHeight = 0;
        $(".widget-main").each(function () {
            $(this).css("height", "auto");
            if ($(this).outerHeight() > maxHeight) {
                maxHeight = $(this).outerHeight();
            }
        });
        $(".widget-main").each(function () {
            $(this).outerHeight(maxHeight);
        });
    });
});

function openDanhSachLanhDaoTiepNhanHoSoKeKhai(idHoSo, idQuaTrinhXuLyHoSo, isDoneKekhai) {
    console.log(isDoneKekhai);
    if (isDoneKekhai == 'True') {
        onOpenEditModal('/KeKhaiArea/LuongXuLyHoSoKeKhai/DanhSachLanhDaoTiepNhanHoSoKeKhai',
            { idHoSo: idHoSo, idQuaTrinhXuLyHoSo: idQuaTrinhXuLyHoSo },
            'post');
    } else {
        onConfirmCallBack('CẢNH BÁO', 'Kê khai chưa được hoàn tất, bạn có chắc chắn muốn trình số liệu này?', function () {
            onOpenEditModal('/KeKhaiArea/LuongXuLyHoSoKeKhai/DanhSachLanhDaoTiepNhanHoSoKeKhai',
                { idHoSo: idHoSo, idQuaTrinhXuLyHoSo: idQuaTrinhXuLyHoSo },
                'post');
        })
    }

}

function showConfirmSoLieuKeKhaiDialog(idHoSo, idQuaTrinhXuLyHoSo) {
    onConfirmCallBack('XÁC NHẬN SỐ LIỆU KÊ KHAI', 'Bạn có chắc chắn đồng ý với số liệu kê khai được gửi lên?', function () {
        confirmSoLieuKeKhai(idHoSo, idQuaTrinhXuLyHoSo);
    })
}

function openDialogXacNhanGuiSoLieuKeKhai(idHoSo, idQuaTrinhXuLyHoSo) {
    onOpenEditModal('/KeKhaiArea/LuongXuLyHoSoKeKhai/ManHinhXacNhanGuiSoLieuKeKhaiSo4T',
        { idHoSo: idHoSo, idQuaTrinhXuLyHoSo: idQuaTrinhXuLyHoSo },
        'post');
}

function openDialogXacNhanTraVeSoLieuKeKhai(idHoSo, idQuaTrinhXuLyHoSo) {
    onOpenEditModal('/KeKhaiArea/LuongXuLyHoSoKeKhai/ManHinhXacNhanTraVeSoLieu',
        { idHoSo: idHoSo, idQuaTrinhXuLyHoSo: idQuaTrinhXuLyHoSo },
        'post');
}


function confirmSoLieuKeKhai(idHoSo, idQuaTrinhXuLyHoSo) {
    var confirmSoLieuKeKhaiCallBack = function (sendResult) {
        var isSendSuccess = sendResult.Status;
        var respMessage = sendResult.Message;
        if (isSendSuccess) {
            NotiSuccess('Thành công', respMessage);

            //cái này sau này chuyển thành ajax
            setTimeout(function () {
                location.reload();
            }, 500)
        } else {
            NotiError('Thất bại', respMessage);
        }
    }

    onCallAjax('/KeKhaiArea/LuongXuLyHoSoKeKhai/XacNhanSoLieuKeKhai', { IdHoSo: idHoSo, IdQuaTrinhXuLy: idQuaTrinhXuLyHoSo }, 'post', confirmSoLieuKeKhaiCallBack);
}

function openDanhSachLanhDaoTiepNhanHoSoGiaiTrinh(idHoSo, idQuaTrinhXuLyHoSo) {
    onOpenEditModal('/KeKhaiArea/LuongXuLyHoSoGiaiTrinh/DanhSachLanhDaoTiepNhanHoSoGiaiTrinh',
        { idHoSo: idHoSo, idQuaTrinhXuLyHoSo: idQuaTrinhXuLyHoSo },
        'post');
}


function showConfirmSoLieuGiaiTrinhDialog(idHoSo, idQuaTrinhXuLyHoSo) {
    onConfirmCallBack('XÁC NHẬN SỐ LIỆU GIẢI TRÌNH', 'Bạn có chắc chắn đồng ý với số liệu giải trình được gửi lên?', function () {
        confirmSoLieuGiaiTrinh(idHoSo, idQuaTrinhXuLyHoSo);
    })
}

function confirmSoLieuGiaiTrinh(idHoSo, idQuaTrinhXuLyHoSo) {
    var confirmSoLieuGiaiTrinhCallBack = function (sendResult) {
        var isSendSuccess = sendResult.Status;
        var respMessage = sendResult.Message;
        if (isSendSuccess) {
            NotiSuccess('Thành công', respMessage);

            //cái này sau này chuyển thành ajax
            setTimeout(function () {
                location.reload();
            }, 500)
        } else {
            NotiError('Thất bại', respMessage);
        }
    }

    onCallAjax('/KeKhaiArea/LuongXuLyHoSoGiaiTrinh/XacNhanSoLieuGiaiTrinh', { IdHoSo: idHoSo, IdQuaTrinhXuLy: idQuaTrinhXuLyHoSo }, 'post', confirmSoLieuGiaiTrinhCallBack);
}

function openDialogXacNhanTraVeSoLieuGiaiTrinh(idHoSo, idQuaTrinhXuLyHoSo) {
    onOpenEditModal('/KeKhaiArea/LuongXuLyHoSoGiaiTrinh/ManHinhXacNhanTraVeSoLieuGiaiTrinh',
        { idHoSo: idHoSo, idQuaTrinhXuLyHoSo: idQuaTrinhXuLyHoSo },
        'post');
}