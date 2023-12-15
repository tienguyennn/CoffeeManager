function createFolder(parentId, callBack) {
    parentId = parentId || 0;
    callBack = callBack || "";
    $('#id-thumuc-edit').val(parentId);
    onOpenEditModal('/FileAndFolderArea/FileAndFolder/EditFolder', { parentId: parentId, callBack: callBack }, 'post');
}
function submitCreateFolder() {
    if ($.trim($("#tenthumuc").val()) == "") {
        NotiError("Bạn phải điền tên thư mục");
    } else {

        onConfirmCallBack('XÁC NHẬN TẠO THƯ MỤC', 'Bạn có chắc chắn muốn tạo thư mục này?', function () {
            createFolderPDTI($.trim($("#tenthumuc").val()));
        })
    }
}
function createFolderPDTI(tenthumuc) {
    var notifyResult = function (sendResult) {
        var isSendSuccess = sendResult.Status;
        var respMessage = sendResult.Message;
        if (isSendSuccess) {
            NotiSuccess('Thành công', respMessage);

            var currentUrl = window.location.href;
            if (currentUrl.indexOf("FileAndFolder") != -1) {
                setTimeout(function () {
                    location.reload();
                }, 500)
            } else {
                setTimeout(function () {
                    $(location).attr('href', '/FileAndFolderArea/FileAndFolder');
                }, 500)

            }
        } else {
            NotiError('Thất bại', respMessage);
        }
    }
    var idFolderEFile = 0;
    if ($("#idFolderEFile").length > 0) {
        idFolderEFile = $("#idFolderEFile").val();
    }
    onCallAjax('/FileAndFolderArea/FileAndFolder/createFolder', { tenthumuc: tenthumuc, idFolderEFile: idFolderEFile }, 'post', notifyResult);
}

function createFiles(folderId, callBack) {
    callBack = callBack || "";
    $('#id-thumuc-edit').val(folderId);
    onOpenEditModal('/FileAndFolderArea/FileAndFolder/UploadFilesToFolder', { folderId: folderId, callBack: callBack }, 'post');
}

function submitEditFileOrFolder() {
    if ($.trim($("#edittenthumuc").val()) == "") {
        NotiError("Bạn phải điền tên file hoặc tên thư mục");
    } else {
        if ($("#idtenthumucorfile").val() == "") {
            NotiError("Có lỗi xảy ra");
        } else {
            onConfirmCallBack('XÁC NHẬN SỬA TÊN', 'Bạn có chắc chắn muốn sửa tên file hoặc thư mục này?', function () {
                editFileOrFolderPDTI($.trim($("#edittenthumuc").val()), $("#idtenthumucorfile").val());
            })
        }

    }
}
function editFileOrFolderPDTI(tenthumuc, idFolderEFile) {
    var notifyResult = function (sendResult) {
        var isSendSuccess = sendResult.Status;
        var respMessage = sendResult.Message;
        if (isSendSuccess) {
            NotiSuccess('Thành công', respMessage);

            setTimeout(function () {
                location.reload();
            }, 500)
        } else {
            NotiError('Thất bại', respMessage);
        }
    }
    onCallAjax('/FileAndFolderArea/FileAndFolder/editFileOrFolder', { tenthumuc: tenthumuc, idFolderEFile: idFolderEFile }, 'post', notifyResult);
}