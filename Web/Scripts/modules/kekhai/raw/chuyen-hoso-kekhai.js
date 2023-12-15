var $formChuyenXuLyHoSoKeKhai = $('#form-chuyenxuly-hoso-kekhai');
function onChuyenHoSoKeKhaiToLanhDao() {
    var isCheckedNguoiNhan = $formChuyenXuLyHoSoKeKhai.find('input[type=checkbox][name="NguoiTiepNhan"]:checked').length > 0;
    if (!isCheckedNguoiNhan) {
        NotiError('Thất bại', 'Vui lòng chọn lãnh đạo tiêp nhận hồ sơ kê khai!');
        return false;
    }

    onConfirmCallBack('XÁC NHẬN CHUYỂN HỒ SƠ KÊ KHAI LÊN LÃNH ĐẠO', 'Bạn có chắc chắn muốn gửi số liệu này đến lãnh đạo?', function () {
        $formChuyenXuLyHoSoKeKhai.submit();
    })
}


function onChuyenHoSoKeKhaiToSo4T() {
    onConfirmCallBack('XÁC NHẬN CHUYỂN HỒ SƠ KÊ KHAI ĐỂ RÀ SOÁT', 'Bạn có chắc chắn muốn gửi số liệu kê khai này?', function () {
        $formChuyenXuLyHoSoKeKhai.submit();
    })
}


function closeChuyenHoSoKeKhaiModal() {
    $formChuyenXuLyHoSoKeKhai.closest('.modal').modal('hide');
}

function reloadCurrentPageContent() {
    setTimeout(function () {
        location.reload();
    }, 500)
}


function onChuyenHoSoKeKhaiToLanhDaoSuccess(sendResult) {
    var isSendSuccess = sendResult.Status;
    var respMessage = sendResult.Message;
    if (isSendSuccess) {
        NotiSuccess('Thành công', respMessage);
        closeChuyenHoSoKeKhaiModal();
        reloadCurrentPageContent();
    } else {
        NotiError('Thất bại', respMessage);
    }
}



function onChuyenHoSoKeKhaiToSo4TSuccess(sendResult) {
    var isSendSuccess = sendResult.Status;
    var respMessage = sendResult.Message;
    if (isSendSuccess) {
        NotiSuccess('Thành công', respMessage);
        closeChuyenHoSoKeKhaiModal();
        reloadCurrentPageContent();
    } else {
        NotiError('Thất bại', respMessage);
    }
}

function onTraVeHoSoKeKhaiSuccess(sendResult) {
    var isSendSuccess = sendResult.Status;
    var respMessage = sendResult.Message;
    if (isSendSuccess) {
        NotiSuccess('Thành công', respMessage);
        closeChuyenHoSoKeKhaiModal();
        reloadCurrentPageContent();
    } else {
        NotiError('Thất bại', respMessage);
    }
}