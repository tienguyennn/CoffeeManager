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


    /////////////////////////////////
    //table checkboxes
    //$('th input[type=checkbox], td input[type=checkbox]').prop('checked', false);

    //select/deselect all rows according to table header checkbox
    //$('#dynamic-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function () {
    //    var th_checked = this.checked;//checkbox inside "TH" table header

    //    $(this).closest('table').find('tbody > tr').each(function () {
    //        var row = this;
    //        if (th_checked) tableTools_obj.fnSelect(row);
    //        else tableTools_obj.fnDeselect(row);
    //    });
    //});

    //select/deselect a row when the checkbox is checked/unchecked
    //$('#dynamic-table').on('click', 'td input[type=checkbox]', function () {
    //    var row = $(this).closest('tr').get(0);
    //    if (!this.checked) tableTools_obj.fnSelect(row);
    //    else tableTools_obj.fnDeselect($(this).closest('tr').get(0));
    //});


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


    /********************************/
    //add tooltip for small view action buttons in dropdown menu
    $('[data-rel="tooltip"]').tooltip({ placement: tooltip_placement });

    //tooltip placement on right or left
    function tooltip_placement(context, source) {
        var $source = $(source);
        var $parent = $source.closest('table')
        var off1 = $parent.offset();
        var w1 = $parent.width();

        var off2 = $source.offset();
        //var w2 = $source.width();

        if (parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2)) return 'right';
        return 'left';
    }

})
function XoaProject(id) {
    $.confirm({
        'title': 'Xác nhận xóa',
        'message': 'Bạn có chắc chắn phê xóa dự án này?',
        'buttons': {
            'Yes': {
                'class': 'btn-confirm-yes',
                'action': function () {
                    $.ajax({
                        url: '/RemixQuanLyDuAn/QuanLyDuAn/Delete',
                        type: 'POST',
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        data: JSON.stringify({ 'id': id }),
                        success: function (result) {
                            $('#frmRemove').dialog('close');
                            if (result == false) {
                                notif({
                                    type: 'warning',
                                    position: 'bottom',
                                    msg: 'Xóa dự án thất bại!',
                                });
                            } else {
                                notif({
                                    type: 'success',
                                    position: 'bottom',
                                    msg: 'Xóa dự án thành công!',
                                });
                                setTimeout('reloadPage()', 2000);
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
function reloadPage() {
    location.reload();
}
function approve(id) {
    $.confirm({
        'title': 'Xác nhận phê duyệt',
        'message': 'Bạn có chắc chắn phê duyệt dự án này?',
        'buttons': {
            'Yes': {
                'class': 'btn-confirm-yes',
                'action': function () {
                    $.ajax({
                        url: '/RemixQuanLyDuAn/QuanLyDuAn/Approve',
                        type: 'post',
                        cache: false,
                        data: { ID: id },
                        success: function (result) {
                            if (result == false) {
                                notif({
                                    type: 'error',
                                    position: 'bottom',
                                    msg: 'Phê duyệt không thành công!',
                                });
                            } else {
                                notif({
                                    type: 'success',
                                    position: 'bottom',
                                    msg: 'Phê duyệt thành công!',
                                });
                                setTimeout('reloadPage()', 1000);
                            }
                        },
                        error: function (err) {
                            CommonJS.alert(err.responseText);
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
function unApprove(id) {
    $.confirm({
        'title': 'Xác nhận phê duyệt',
        'message': 'Bạn có chắc chắn từ chối phê duyệt dự án này?',
        'buttons': {
            'Yes': {
                'class': 'btn-confirm-yes',
                'action': function () {
                    $.ajax({
                        url: '/RemixQuanLyDuAn/QuanLyDuAn/UnApprove',
                        type: 'post',
                        cache: false,
                        data: { ID: id },

                        success: function (result) {
                            if (result == false) {
                                notif({
                                    type: 'error',
                                    position: 'bottom',
                                    msg: 'Từ chối phê duyệt không thành công!',
                                });
                            } else {
                                notif({
                                    type: 'success',
                                    position: 'bottom',
                                    msg: 'Từ chối phê duyệt thành công!',
                                });
                                setTimeout('reloadPage()', 1000);
                            }
                        },
                        error: function (err) {
                            CommonJS.alert(err.responseText);
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