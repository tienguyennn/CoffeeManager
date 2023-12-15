function removeUser(sale_id, type_id) {
    $.confirm({
        'title': 'Xác nhận xóa',
        'message': 'Bạn có chắc chắn phê xóa dự án này?',
        'buttons': {
            'Yes': {
                'class': 'btn-confirm-yes',
                'action': function () {
                    $.ajax({
                        url: '/RemixQuanLyDuAn/MemberProject/RemoveSale',
                        type: 'POST',
                        data: {
                            DUAN_ID: $("#DUAN_ID").val(),
                            SALE_ID: sale_id,
                            TYPE_ID: type_id
                        },
                        success: function (result) {
                            if (result == false) {
                                notif({
                                    type: 'warning',
                                    position: 'bottom',
                                    msg: 'Gỡ nhân viên sale thất bại!',
                                });
                            } else {
                                notif({
                                    type: 'success',
                                    position: 'bottom',
                                    msg: 'Gỡ nhân viên sale thành công',
                                });
                                reloadToChucDuAn()
                            }
                        }, error: function (result) {
                            alert(result.responseText);
                        }
                    });
                }
            },
            'No': {
                'class': 'btn-info',
                'action': function () { }	// Nothing to do in this case. You can as well omit the action property.
            }
        }
    });
}
function addSaleNV() {
    if ($('#SALE_NV').val() == null) {
        notif({
            type: 'error',
            position: 'bottom',
            msg: 'Bạn phải chọn nhân viên sale!',
        });
    } else {
        var user_ids = $("#SALE_NV").val();
        $.ajax({
            url: '/RemixQuanLyDuAn/MemberProject/AddSale',
            type: 'POST',
            data: {
                TYPE_ID: 3,
                DUAN_ID: $("#DUAN_ID").val(),
                USER_IDS: user_ids.join()
            },
            success: function (result) {
                $("#addSaleManagerToProject").modal("hide");
                if (result == false) {
                    notif({
                        type: 'warning',
                        position: 'bottom',
                        msg: 'Thêm nhân viên sale thất bại!',
                    });
                } else {
                    notif({
                        type: 'success',
                        position: 'bottom',
                        msg: 'Thêm nhân viên sale thành công',
                    });
                    reloadToChucDuAn()
                }
            }, error: function (result) {
                alert(result.responseText);
            }
        });
    }
}
function addSaleAdmin() {
    if ($('#SALE_ADMIN').val() == null) {
        notif({
            type: 'error',
            position: 'bottom',
            msg: 'Bạn phải chọn sale admin!',
        });
    } else {
        var user_ids = $("#SALE_ADMIN").val();
        $.ajax({
            url: '/RemixQuanLyDuAn/MemberProject/AddSale',
            type: 'POST',
            data: {
                TYPE_ID: 2,
                DUAN_ID: $("#DUAN_ID").val(),
                USER_IDS: user_ids.join()
            },
            success: function (result) {
                $("#addSaleManagerToProject").modal("hide");
                if (result == false) {
                    notif({
                        type: 'warning',
                        position: 'bottom',
                        msg: 'Thêm sale admin thất bại!',
                    });
                } else {
                    notif({
                        type: 'success',
                        position: 'bottom',
                        msg: 'Thêm sale admin thành công',
                    });
                    reloadToChucDuAn()
                }
            }, error: function (result) {
                alert(result.responseText);
            }
        });
    }
}
function addSaleManager() {
    if ($('#SALE_MANAGER').val() == null) {
        notif({
            type: 'error',
            position: 'bottom',
            msg: 'Bạn phải chọn sale manager!',
        });
    } else {
        var user_ids = $("#SALE_MANAGER").val();
        $.ajax({
            url: '/RemixQuanLyDuAn/MemberProject/AddSale',
            type: 'POST',
            data: {
                TYPE_ID: 1,
                DUAN_ID: $("#DUAN_ID").val(),
                USER_IDS: user_ids.join()
            },
            success: function (result) {
                $("#addSaleManagerToProject").modal("hide");
                if (result == false) {
                    notif({
                        type: 'warning',
                        position: 'bottom',
                        msg: 'Thêm sale manager thất bại!',
                    });
                } else {
                    notif({
                        type: 'success',
                        position: 'bottom',
                        msg: 'Thêm sale manager thành công',
                    });
                    reloadToChucDuAn()
                }
            }, error: function (result) {
                alert(result.responseText);
            }
        });
    }

}
function reloadToChucDuAn() {
    $.ajax({
        url: '/RemixQuanLyDuAn/MemberProject/ShowMember',
        type: 'POST',
        data: {
            projectID: $("#DUAN_ID").val(),
        },
        success: function (result) {
            $("#contentProject").html(result);
        }, error: function (result) {
            alert(result.responseText);
        }
    });
}
function addSale(type) {
    if (type == 1) {
        $("#addSaleManagerToProject").modal("show");
    } else if (type == 2) {
        $("#addSaleAdminToProject").modal("show");
    } else {
        $("#addSaleToProject").modal("show");
    }

}
jQuery(function ($) {
    $(".select2").select2();
    //initiate dataTables plugin
    var oTable1 =
        $('.initdatatable')
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


    //And for the first simple table, which doesn't have TableTools or dataTables
    //select/deselect all rows according to table header checkbox
    var active_class = 'active';
    $('#simple-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function () {
        var th_checked = this.checked;//checkbox inside "TH" table header

        $(this).closest('table').find('tbody > tr').each(function () {
            var row = this;
            if (th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
            else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
        });
    });

    //select/deselect a row when the checkbox is checked/unchecked
    $('#simple-table').on('click', 'td input[type=checkbox]', function () {
        var $row = $(this).closest('tr');
        if (this.checked) $row.addClass(active_class);
        else $row.removeClass(active_class);
    });
})