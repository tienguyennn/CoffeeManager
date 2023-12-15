jQuery(function ($) {
    //initiate dataTables plugin
    var oTable1 =
        $('#dynamic-table')
            .dataTable({
                bAutoWidth: false,
                "aoColumns": [
                    { "bSortable": false },
                    null, null, null, null, null,
                    { "bSortable": false }
                ],
                "aaSorting": [],

            });


    //TableTools settings
    TableTools.classes.container = "btn-group btn-overlap";
    TableTools.classes.print = {
        "body": "DTTT_Print",
        "info": "tableTools-alert gritter-item-wrapper gritter-info gritter-center white",
        "message": "tableTools-print-navbar"
    }

    //initiate TableTools extension
    var tableTools_obj = new $.fn.dataTable.TableTools(oTable1, {
        "sSwfPath": "assets/swf/copy_csv_xls_pdf.swf",

        "sRowSelector": "td:not(:last-child)",
        "sRowSelect": "multi",
        "fnRowSelected": function (row) {
            //check checkbox when row is selected
            try {
                $(row).find('input[type=checkbox]').get(0).checked = true
            }
            catch (e) {
            }
        },
        "fnRowDeselected": function (row) {
            //uncheck checkbox
            try {
                $(row).find('input[type=checkbox]').get(0).checked = false
            }
            catch (e) {
            }
        },

        "sSelectedClass": "success",
        "aButtons": [

        ]
    });
    //we put a container before our table and append TableTools element to it
    $(tableTools_obj.fnContainer()).appendTo($('.tableTools-container'));

    //also add tooltips to table tools buttons
    //addding tooltips directly to "A" buttons results in buttons disappearing (weired! don't know why!)
    //so we add tooltips to the "DIV" child after it becomes inserted
    //flash objects inside table tools buttons are inserted with some delay (100ms) (for some reason)
    setTimeout(function () {
        $(tableTools_obj.fnContainer()).find('a.DTTT_button').each(function () {
            var div = $(this).find('> div');
            if (div.length > 0) div.tooltip({ container: 'body' });
            else $(this).tooltip({ container: 'body' });
        });
    }, 200);


    //ColVis extension
    var colvis = new $.fn.dataTable.ColVis(oTable1, {
        "buttonText": "<i class='fa fa-search'></i>",
        "aiExclude": [0, 6],
        "bShowAll": true,
        //"bRestore": true,
        "sAlign": "right",
        "fnLabel": function (i, title, th) {
            return $(th).text();//remove icons, etc
        }

    });

    //style it
    $(colvis.button()).addClass('btn-group').find('button').addClass('btn btn-white btn-info btn-bold')

    //and append it to our table tools btn-group, also add tooltip
    $(colvis.button())
        .prependTo('.tableTools-container .btn-group')
        .attr('title', 'Ẩn/ hiện cột').tooltip({ container: 'body' });

    //and make the list, buttons and checkboxed Ace-like
    $(colvis.dom.collection)
        .addClass('dropdown-menu dropdown-light dropdown-caret dropdown-caret-right')
        .find('li').wrapInner('<a href="javascript:void(0)" />') //'A' tag is required for better styling
        .find('input[type=checkbox]').addClass('ace').next().addClass('lbl padding-8');



    $(document).on('click', '#dynamic-table .dropdown-toggle', function (e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
    });

})
function openResetPassword(username, userid, userstatus) {
    $('#ResetPasswordSection').removeClass('hide').dialog({
        modal: true,
        width: 600,
        height: 350,
        resizable: false,
        title: "<i class='ace-icon fa fa-key blue'></i>&nbsp;Cập nhật mật khẩu",
        title_html: true,
        show: {
            effect: "blind",
            duration: 200
        },
        hide: {
            effect: "blind",
            duration: 200
        }, open: function () {
            $.mask.definitions['~'] = '[+-]';
            $(this).find('#user-mobile').mask('(999) 999-9999');
            $(this).find('#username').val(username);
            if (userstatus === 1)
                $(this).find('input.user-status-enable').prop('checked', true);
            else
                $(this).find('input.user-status-disable').prop('checked', true);

        }, close: function () {
            $(this).find('input[type=text],input[type=password]').val('');
        },
        buttons: [
            {
                html: "<i class='ace-icon fa fa-check'></i>&nbsp;Cập nhật",
                "class": "btn btn-primary btn-sm",
                click: function () {
                    var userID = userid,
                        userName = username,
                        userStatus = $(this).find('input.user-status-enable').is(':checked') ? 1 : 0,
                        password = $(this).find('input#new-pass').val(),
                        rePassword = $(this).find('input#re-new-pass').val(),
                        userMobile = $(this).find('input#user-mobile').val();
                    updateUserPassword(userID, userName, userStatus, password, rePassword, userMobile);
                }
            },
            {
                html: "<i class='ace-icon fa fa-times'></i>&nbsp;Đóng",
                "class": "btn btn-danger btn-sm",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
}
function resetPasswordValidation(password, rePassword, userMobile) {
    if (password === '') {
        $('#new-pass').focus();
        showErrorMessage('#new-pass-msg', 'Mật khẩu không được để trống');
        return false;
    } else {
        if (rePassword === '') {
            $('#re-new-pass').focus();
            showErrorMessage('#re-new-pass-msg', 'Mời nhập lại mật khẩu');
            return false;
        }
        else if (password !== rePassword) {
            $('#re-new-pass').focus();
            showErrorMessage('#re-new-pass-msg', '2 mật khẩu không trùng khớp');
            return false;
        }
    }

    if (userMobile === '' || userMobile === '(___) ___-____') {
        $('#user-mobile').focus();
        showErrorMessage('#user-mobile-msg', 'Điện thoại không để trống');
        return false;
    }
    return true;
}
function updateUserPassword(userID, userName, userStatus, password, rePassword, userMobile) {
    var userBO = {
        DM_NGUOIDUNG_ID: userID,
        TENDANGNHAP: userName,
        MATKHAUMOI: password,
        TRANGTHAI: userStatus,
        DIENTHOAI: userMobile
    };
    if (resetPasswordValidation(password, rePassword, userMobile)) {
        $.ajax({
            url: '/DMNguoidungArea/DMNguoidung/UpdatePassword',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(userBO),
            success: function (result) {
                if (result.success) {
                    commonNotifySuccess("Update mật khẩu thành công");
                    setTimeout(function () {
                        $('#ResetPasswordSection').dialog('close');
                    }, 100);
                } else
                    commonNotifyError(result.message);
            }, error: function (result) {
                alert(result.responseText);
            }
        });
    }
}

function updateUserStatus(DM_NGUOIDUNG_ID, event) {
    event.preventDefault();
    $.ajax({
        url: '/DMNguoidungArea/DMNguoidung/UpdateStatus',
        type: 'POST',
        data: { 'id': DM_NGUOIDUNG_ID },
        success: function (result) {
            if (result.success == false)
                commonNotifyError("Cập nhật trạng thái thất bại");
            else
                commonNotifySuccess("Cập nhật trạng thái thành công");
        }, error: function (result) {
            alert(result.responseText);
        }
    });
}