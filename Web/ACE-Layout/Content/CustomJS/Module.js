$(document).ready(function () {
    $("#ModuleInsert").dialog({
        autoOpen: false,
        modal: false,
        width: 500,
        height: 400,
        resizable: false,
        title: "<i class='ace-icon fa fa-plus-circle blue'></i> Thêm module mới",
        title_html: true,
        show: {
            effect: "blind",
            duration: 200,
        }, hide: {
            effect: "blind",
            duration: 200
        }
    })

    $('#ModuleUpdate').dialog({
        autoOpen: false,
        modal: true,
        width: 1200,
        height: 580,
        resizable: false,
        title: "<i class='ace-icon fa fa-wrench blue'></i> Update module",
        title_html: true,
        show: {
            effect: "blind",
            duration: 200,
        }, hide: {
            effect: "blind",
            duration: 200
        },
        close: function (event, ui) {
            reloadGrid();
        }
    });

    $('#ModuleRemove').dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        height: 200,
        resizable: false,
        title: "<i class='ace-icon fa fa-exclamation-circle red2'></i> Xóa module",
        title_html: true,
        show: {
            effect: "blind",
            duration: 200,
        }, hide: {
            effect: "blind",
            duration: 200
        }
    });
});
function showModuleInsertForm() {
    $.ajax({
        url: '/DMModuleArea/DMModule/FormInsertModule',
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            $('#ModuleInsert').html(result);
            $('#ModuleInsert').dialog('open');
        }, error: function (message) {
            alert(message.responseText);
        }
    });
}

function showModuleUpdateForm(id) {
    $.ajax({
        url: '/DMModuleArea/DMModule/FormUpdateModule?moduleID=' + id,
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            $('#ModuleUpdate').html(result);
            $('#ModuleUpdate').dialog('open');
            _ShowInfoModule(id);
        }
    })
}

function showModuleRemoveForm(id) {
    $('#ModuleRemove').dialog('open');
    $('#ModuleRemove button').attr('onclick', '_RemoveModule(' + id + ')');
}

function _InsertModule(event) {
    var check = onInsertValidation();
    if (check == true) {
        var obj = {
            TEN_MODULE: $('#insert-TENMODULE').val().trim(),
            MOTA: $("#insert-MOTA").val().trim(),
            TRANGTHAI: $('#insert-TRANGTHAI').is(':checked') ? 1 : 0,
            ALIAS : $('#insert-ALIAS').val().trim()
        };
        $.ajax({
            url: '/DMModuleArea/DMModule/InsertModule',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(obj),
            success: function (result) {
                if (result.success == true) {
                    $('#ModuleInsert').dialog('close');
                    var contentAlert = getAlertContent('Đã thêm thành công ', obj.TEN_MODULE, 'success-insert');
                    $('.alert-success').html(contentAlert);
                    showAlert('.alert-success');
                    reloadGrid();
                } else {
                    if (result.type == 1) {
                        $('#TENMODULE-insert-msg').text(result.message);
                        showMessage("#TENMODULE-insert-msg");
                        $('#insert-TENMODULE').focus();

                    } else if (result.type == 2) {
                        $('#ALIAS-insert-msg').text(result.message);
                        showMessage("#ALIAS-insert-msg");
                        $('#insert-ALIAS').focus();
                    }
                }
            }, error: function (result) {
                alert(result.responseText);
            }
        });
    }
}

function _UpdateModule() {
    var check = onUpdateValidation();
    if (check == true) {
        var obj = {
            DM_MODULE_ID: $('#update-ID').val(),
            TEN_MODULE: $('#update-TENMODULE').val().trim(),
            MOTA: $('#update-MOTA').val().trim(),
            TRANGTHAI: ($('#update-TRANGTHAI').is(':checked')) ? 1 : 0,
            ALIAS : $('#update-ALIAS').val().trim()
        }
        $.ajax({
            url: '/DMModuleArea/DMModule/UpdateModule',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(obj),
            success: function (result) {
                if (result.success == true) {
                    if (result.hasChanged == true) {
                        $('#ModuleUpdate').dialog('close');
                        var contentAlert = getAlertContent('Đã update thành công', '', 'success-update');
                        $('.alert-info').html(contentAlert);
                        showAlert('.alert-info');
                        reloadGrid();
                    }
                    else {
                        $('#ModuleUpdate').dialog('close');
                    }
                }
            },
            error: function (result) {
                alert('Thất bại');
            }
        });
    }
}

function _ShowInfoModule (id) {
    $.ajax({
        url: '/DMModuleArea/DMModule/GetInfo/' + id,
        type: 'GET',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (result) {
            $('#update-ID').val(result.DM_MODULE_ID);
            $('#update-TENMODULE').val(result.TEN_MODULE);
            $('#update-MOTA').val(result.MOTA);
            $('#update-ALIAS').val(result.ALIAS);
            $('#update-NGAYTAO').val(result.NGAYTAO);
            $('#update-NGAYSUA').val(result.NGAYSUA);
            $('#update-NGUOITAO').val(result.NGUOITAO);
            $('#update-NGUOISUA').val(result.NGUOISUA);
            if (result.TRANGTHAI == 1)
                $('#update-TRANGTHAI').prop('checked', true);
            else
                $('#update-TRANGTHAI').prop('checked', false);
        }
    });
}

function _RemoveModule(id) {
    $.ajax({
        url: '/DMModuleArea/DMModule/RemoveModule/' + id,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (result) {
            $('#ModuleRemove').dialog('close');
            if (result.success == true) {
                var contentAlert = getAlertContent('Đã xóa thành công bản ghi', '', 'success-remove');
                $('.cst-header-page .alert-success').html(contentAlert);
                showAlert('cst-header-page .alert-success');
                reloadGrid();
            } else {
                var contentAlert = getAlertContent('Xóa bản ghi không thành công', '', 'fail-remove');
                $('.cst-header-page .alert-danger').html(contentAlert);
                showAlert('.cst-header-page .alert-danger');
                reloadGrid();
            }
        }, error: function (result) {
            alert(result.responseText);
        }
    });
}
function onInsertValidation() {
    var moduleName = $('#insert-TENMODULE').val().trim(),
        alias = $('#insert-ALIAS').val().trim();
    var valid = true;
    if (!moduleName || moduleName == '') {
        $('#TENMODULE-insert-msg').text('Tên module không được bỏ trống');
        showMessage("#TENMODULE-insert-msg");
        $('#insert-TENMODULE').focus();
        valid = false;
    }
    if (!alias || alias == '') {
        $('#ALIAS-insert-msg').text('Alias của module không bỏ trống');
        showMessage("#ALIAS-insert-msg");
        $('#insert-ALIAS').focus();
        valid = false;
    } else {
        if (validAlias(alias) == false) {
            $('#ALIAS-insert-msg').text('Alias của module không hợp lệ');
            showMessage("#ALIAS-insert-msg");
            $('#insert-ALIAS').focus();
            valid = false;
        }
    }
    return valid;
}

function onUpdateValidation() {
    var valid = true;
    var moduleName = $('#update-TENMODULE').val().trim(),
        alias = $('#update-ALIAS').val().trim();
    if (!moduleName || moduleName == '') {
        $('#TENMODULE-update-msg').text('Tên module không được để trống');
        showMessage('#TENMODULE-update-msg');
        $('#update-TENMODULE').focus();
        valid = false;
    }
    if (!alias || alias == '') {
        $('#ALIAS-update-msg').text('Alias của module không bỏ trống');
        showMessage("#ALIAS-update-msg");
        $('#update-ALIAS').focus();
        valid = false;
    } else {
        if (validAlias(alias) == false) {
            $('#ALIAS-update-msg').text('Alias của module không hợp lệ');
            showMessage("#ALIAS-update-msg");
            $('#update-ALIAS').focus();
            valid = false;
        }
    }
    return valid;
}

function reloadGrid() {
    //$.ajax({
    //    url: '/DMModuleArea/DMModule/ReloadGrid',
    //    type: 'POST',
    //    dataType: 'html',
    //    success: function (result) {
    //        $('#grid-content').html(result);
    //        $('#grid-content').load(location.href + " #grid-content"); //----> Hàm đặc biệt
    //    }
    //})
    //$('#grid-content').load("/DMModuleArea/DMModule/ReloadGrid");
    $('#grid-content').load(location.href + " #grid-content"); //----> Hàm đặc biệt

}
function _UpdateModuleStatus(id, event) {
    var obj = {
        DM_MODULE_ID: id,
        TRANGTHAI: ($(event.currentTarget).is(':checked')) ? 1 : 0
    }
    $.ajax({
        url: '/DMModuleArea/DMModule/UpdateModuleStatus',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(obj),
        success: function (result) {
            if (result.success == true && result.hasChanged == true) {
                //reloadGrid();
            }
        }, error: function (result) {
            alert('Không thành công');
        }
    })
}

function openModuleSearchForm() {
    if ($('#search-module').is(':visible') == false) {
        $('#search-TT-01').prop('checked', true);
        $('#search-module').slideDown();
    }
}
function closeModuleSerchForm() {
    if ($('#search-module').is(':visible')) {
        $('#search-module').slideUp();
        reloadGrid();
    }

}

function _SearchAction(event) {
    var searchKey = $(event.currentTarget).val();

}

function validAlias(name) {
    var re = /^\w+$/;
    return re.test(name);
}