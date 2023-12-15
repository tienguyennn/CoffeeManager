$(function () {
    $("#CreateKM").dialog({
        autoOpen: false,
        modal: true,
        width: 1000,
        height: 520,
        resizable: false,
        title: "<i class='ace-icon fa fa-gift blue'></i> Thêm mới chương trình khuyến mại",
        title_html: true,
        show: {
            effect: "blind",
            duration: 200,
        }, hide: {
            effect: "blind",
            duration: 200
        }
    });
    $("#EditKM").dialog({
        autoOpen: false,
        modal: true,
        width: 1000,
        height: 520,
        resizable: false,
        title: "<i class='ace-icon fa fa-gift blue'></i> Cập nhật chương trình khuyến mại",
        title_html: true,
        show: {
            effect: "blind",
            duration: 200,
        }, hide: {
            effect: "blind",
            duration: 200
        }
    });
})


function openCreateForm() {
    $.ajax({
        url: '/QuanLyKhuyenMai/KhuyenMai/CreateKMForm',
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            $('#CreateKM').html(result);
            $('#CreateKM').dialog('open');
            $('#insert-DUAN').multipleSelect({
                single: true,
                filter: true,
                placeholder: "[-- Chọn dự án --]"
            });
            $.mask.definitions['~'] = '[+-]';
            $('#insert-TimeStart').mask('99/99/9999');
            $('#insert-TimeStart').datepicker({
                autoclose: true,
                todayHighlight: true
            }).next().on(ace.click_event, function () {
                $(this).prev().focus();
            });
            

            $('#insert-TimeEnd').mask('99/99/9999');
            $('#insert-TimeEnd').datepicker({
                autoclose: true,
                todayHighlight: true
            }).next().on(ace.click_event, function () {
                $(this).prev().focus();
            });
        }
    })
}

function openEditForm(id) {
    $.ajax({
        url: '/QuanLyKhuyenMai/KhuyenMai/EditKMForm/'+id,
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            $('#EditKM').html(result);
            $('#EditKM').dialog('open');
            $('#update-DUAN').multipleSelect({
                single: true,
                filter: true,
                placeholder: "[-- Chọn dự án --]"
            });
            $.mask.definitions['~'] = '[+-]';
            $('#update-TimeStart').mask('99/99/9999');
            $('#update-TimeStart').datepicker({
                autoclose: true,
                todayHighlight: true
            }).next().on(ace.click_event, function () {
                $(this).prev().focus();
            });

            $('#update-TimeEnd').mask('99/99/9999');
            $('#update-TimeEnd').datepicker({
                autoclose: true,
                todayHighlight: true
            }).next().on(ace.click_event, function () {
                $(this).prev().focus();
            });
        }
    })
}

function _InsertKM() {
    var check = insertKMValidation();
    if (check == true) {
        var obj = {
            MA_DUAN : $('#insert-DUAN').val()[0],
            TEN_CHUONGTRINH: $('#insert-TenCT').val().trim(),
            TEN_QUATANG: $('#insert-TenQT').val().trim(),
            NGAY_BATDAU: $('#insert-TimeStart').val(),
            NGAY_KT: $('#insert-TimeEnd').val(),
            TYLE: $('#insert-TyLe').val(),
            TIENMAT: $('#insert-TienMat').val(),
            GHICHU: $('#insert-GHICHU').val().trim
        }
        $.ajax({
            url: '/QuanLyKhuyenMai/KhuyenMai/CreateKM',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(obj),
            success: function (result) {
                if (result.success == false) {
                    if (result.type === 0) {
                        notif({
                            type: 'error',
                            position: 'bottom',
                            msg: result.message
                        });
                    } else if (result.type === 1) {
                        $('#insert-TenCT-msg').text(result.message);
                        showMessage('#insert-TenCT-msg');
                        $('#insert-TenCT').focus();
                    }
                } else {
                    notif({
                        type: 'success',
                        position: 'bottom',
                        msg: "Thêm chương trình khuyến mãi thành công"
                    });
                    $('#CreateKM').dialog('close');
                    setTimeout(reloadGrid(), 1000);
                }
            },
            error: function (result) {
                notif({
                    type: 'error',
                    position: 'bottom',
                    msg: result.responseText
                });
            }
        })
    }
}
function insertKMValidation() {
    var valid = true;
    var project = $("#insert-DUAN").val(),
        name = $('#insert-TenCT').val().trim(),
        gift = $('#insert-TenQT').val().trim(),
        ratio = parseInt($('#insert-TyLe').val()),
        money = parseFloat($('#insert-TienMat').val());
    if (project === null) {
        valid = false;
        $('#insert-DuAn-msg').text('Bạn phải chọn dự án');
        showMessage('#insert-DuAn-msg')
        $('#insert-DUAN').focus();
    }
    if (!name) {
        valid = false;
        $('#insert-TenCT-msg').text('Bạn phải nhập tên chương trình');
        showMessage('#insert-TenCT-msg')
        $('#insert-TenCT').focus();
    }
    if (!gift) {
        valid = false;
        $('#insert-TenQT-msg').text('Bạn phải nhập quà tặng');
        showMessage('#insert-TenQT-msg')
        $('#insert-TenQT').focus();
    }
    if (ratio !== null) {
        if (ratio < 0 || ratio > 100) {
            valid = false;
            $('#insert-TyLe-msg').text('Tỉ lệ trong khoảng 1 -> 100');
            showMessage('#insert-TyLe-msg')
            $('#insert-TyLe').focus();
        }
    }
    if (money !== null) {
        if (money < 0) {
            valid = false;
            $('#insert-TienMat-msg').text('Tiền mặt không thể âm');
            showMessage('#insert-TienMat-msg');
            $('#insert-TienMat').focus();
        }
    }
    
    return valid;
}
function editKMValidation() {
    var valid = true;
    var project = $("#update-DUAN").val(),
        name = $('#update-TenCT').val().trim(),
        gift = $('#update-TenQT').val().trim(),
        ratio = parseFloat($('#update-TyLe').val()),
        money = parseFloat($('#update-TienMat').val());
    if (project === null) {
        valid = false;
        $('#update-DuAn-msg').text('Bạn phải chọn dự án');
        showMessage('#update-DuAn-msg')
        $('#update-DUAN').focus();
    }
    if (!name) {
        valid = false;
        $('#update-TenCT-msg').text('Bạn phải nhập tên chương trình');
        showMessage('#update-TenCT-msg')
        $('#update-TenCT').focus();
    }
    if (!gift) {
        valid = false;
        $('#update-TenQT-msg').text('Bạn phải nhập quà tặng');
        showMessage('#update-TenQT-msg')
        $('#update-TenQT').focus();
    }
    if (ratio !== null) {
        if (ratio < 0 || ratio > 100) {
            valid = false;
            $('#update-TyLe-msg').text('Tỉ lệ trong khoảng 1 -> 100');
            showMessage('#update-TyLe-msg')
            $('#update-TyLe').focus();
        }
    }
    if (money !== null) {
        if (money < 0) {
            valid = false;
            $('#update-TienMat-msg').text('Tiền mặt không thể âm');
            showMessage('#update-TienMat-msg');
            $('#update-TienMat').focus();
        }
    }
    return valid;
}

function _UpdateKM() {
    var check = editKMValidation();
    if (check === true) {
        var obj = {
            MA_KHUYENMAI :$('#update-MaKM').val(),
            MA_DUAN : $('#update-DUAN').val()[0],
            TEN_CHUONGTRINH: $('#update-TenCT').val().trim(),
            TEN_QUATANG: $('#update-TenQT').val().trim(),
            NGAY_BATDAU: $('#update-TimeStart').val(),
            NGAY_KT: $('#update-TimeEnd').val(),
            TYLE: $('#update-TyLe').val(),
            TIENMAT: $('#update-TienMat').val(),
            GHICHU: $('#update-GHICHU').val().trim
        }
        $.ajax({
            url: '/QuanLyKhuyenMai/KhuyenMai/EditKM',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(obj),
            success: function (result) {
                if (result.success == false) {
                    if (result.type === 0) {
                        notif({
                            type: 'error',
                            position: 'bottom',
                            msg: result.message
                        });
                    } else if (result.type === 1) {
                        $('#update-TenCT-msg').text(result.message);
                        showMessage('#insert-TenCT-msg')
                        $('#update-TenCT').focus();
                    }
                } else {
                    notif({
                        type: 'success',
                        position: 'bottom',
                        msg: "Cập nhật chương trình khuyến mãi thành công",
                        timeout :'1500'
                    });
                    $('#EditKM').dialog('close');
                    setTimeout(reloadGrid(), 1000);
                }
            },
            error: function (result) {
                notif({
                    type: 'error',
                    position: 'bottom',
                    msg: result.responseText
                });
            }
        })
    }
}




function onKmHeaderCheck(event) {
    var current = $(event.currentTarget),
        table = current.parents('table');
    $.each(table.find('tr td input[type=checkbox]'), function () {
        $(this).prop('checked', current.is(':checked'));
    });
    if (current.is(':checked')) {
        $('.message-bar').removeClass('hide');
    } else {
        $('.message-bar').addClass('hide');
    }
}

function onKmBodyCheck(event) {
    $('#KmCheckAll').prop('checked', false);
    var isCheckingTotal = $(event.currentTarget).parents('table').find('tr td input[type=checkbox]:checked').length;
    if (isCheckingTotal > 0)
        $('.message-bar').removeClass('hide');
    else
        $('.message-bar').addClass('hide');
}

function _ApproveListKM() {
    var arrKM = [];
    var listKmChecked = $('#gridKhuyenMaiWrapper').find('tr td input[type=checkbox]:checked');
    $.each(listKmChecked, function (event) {
        var obj = {
            KHUYENMAI_ID : $(this).val()
        }
        arrKM.push(obj);
    });
    $.ajax({
        url: '/QuanLyKhuyenMai/KhuyenMai/ApproveListKM',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(arrKM),
        success: function (result) {
            if (result.success == true) {
                notif({
                    type: 'info',
                    msg: '<i class="ace-icon fa fa-check"></i>&nbsp;Đã phê duyệt <b>' + arrKM.length + '</b> bản ghi !',
                    bgColor :'#438EB9',
                    position: 'bottom',
                    timeout : 1000
                });
                reloadGrid();
            }
        }
    });
}

function _DeleteListKM() {
    var arrKM = [],
        isRemove = false;
    var listKmChecked = $('#gridKhuyenMaiWrapper').find('tr td input[type=checkbox]:checked');
    $.each(listKmChecked, function (event) {
        var obj = {
            KHUYENMAI_ID: $(this).val()
        }
        arrKM.push(obj);
    });
    $("#DeleteKM").removeClass('hide').dialog({
        resizable: false,
        width: '350',
        modal: true,
        title: "<i class='ace-icon fa fa-exclamation-triangle red'></i> Xóa chương trình khuyến mại",
        title_html: true,
        open: function () {
            $('#DeleteKM').find('.alert').html('Bạn có chắc sẽ xóa <b>' + arrKM.length + '</b> chương trình khuyến mại !');
        },
        buttons: [
            {
                html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Xóa",
                "class": "btn btn-danger btn-sm",
                click: function () {
                    $.ajax({
                        url: '/QuanLyKhuyenMai/KhuyenMai/DeleteListKM',
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json;charset=utf-8',
                        data: JSON.stringify(arrKM),
                        success: function (result) {
                            isRemove = true;
                            $('#DeleteKM').dialog('close');
                        }
                    });
                }
            }
            ,
            {
                html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; Hủy",
                "class": "btn btn-info btn-sm",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ], hide: {
            effect: "blind",
            duration: 200
        }, show: {
            effect: "blind",
            duration: 200
        }, close: function () {
            if (isRemove === true) {
                notif({
                    type: 'info',
                    msg: '<i class="ace-icon fa fa-check"></i>&nbsp;Đã xóa <b>' + arrKM.length + '</b> bản ghi !',
                    bgColor: '#438EB9',
                    position: 'bottom',
                    timeout: 1000
                });
                reloadGrid();
            }
        }
    });
}
