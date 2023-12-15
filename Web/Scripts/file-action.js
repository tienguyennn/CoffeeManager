/**
 * xem file
 * @param {any} id
 * @param {any} itemType
 */
function onXemFile(id, itemType) {
    onOpenEditModal('/Common/PreviewFile?itemType=' + itemType, { id: id }, 'post');
}

/**
 * tải file
 * @param {any} id
 */
function onTaiFile(id) {
    location.href = '/SystemCommon/DownloadFile?id=' + id;
}

/**
 * xóa file
 * @param {any} id
 */
function onXoaFile(id) {
    $.confirm({
        title: 'Xác nhận xóa file',
        content: 'Bạn xác nhận thực hiện thao tác này ?',
        draggable: false,
        theme: 'material',
        buttons: {
            confirm: {
                btnClass: 'btn-primary',
                text: "Xác nhận",
                action: function () {
                    AjaxCall('/Common/DeleteFile/' + id, 'post', null, function (result) {
                        if (result.Status) {
                            NotiSuccess("Thành công", result.Message);
                            var elementToRemove = $('#ROW_TAILIEU_' + id);
                            if (elementToRemove) {
                                elementToRemove.remove();
                            }
                            return false;
                        }
                        NotiError("Lỗi xử lý", result.Message);
                    })
                }
            },
            cancel: {
                text: "Đóng",
                action: function () {

                }
            }
        }
    });
}


function onXoaFileTongHop(id,key,idBaoCao) {
    $.confirm({
        title: 'Xác nhận xóa file',
        content: 'Bạn xác nhận thực hiện thao tác này ?',
        draggable: false,
        theme: 'material',
        buttons: {
            confirm: {
                btnClass: 'btn-primary',
                text: "Xác nhận",
                action: function () {
                    AjaxCall('/CdsTongHopSoLieuArea/CdsTongHopSoLieu/DeleteFileGiaiTrinh', 'post', {id:id,key:key,idBaoCao:idBaoCao}, function (result) {
                        if (result.Status) {
                            NotiSuccess("Thành công", result.Message);
                            var elementToRemove = $('#ROW_TAILIEU_' + id);
                            if (elementToRemove) {
                                elementToRemove.remove();
                            }
                            return false;
                        }
                        NotiError("Lỗi xử lý", result.Message);
                    })
                }
            },
            cancel: {
                text: "Đóng",
                action: function () {

                }
            }
        }
    });
}