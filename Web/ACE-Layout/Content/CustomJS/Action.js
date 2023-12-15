//$(document).ready(function (event) {
//    $('#ActionRemove').dialog({
//        autoOpen: false,
//        modal: true,
//        width: 400,
//        height: 200,
//        resizable: false,
//        title: "<i class='ace-icon fa fa-trash red2'></i> <span class='red2'>Xóa action</span>",
//        title_html: true,
//        show: {
//            effect: "blind",
//            duration: 200,
//        }, hide: {
//            effect: "blind",
//            duration: 200
//        }
//    });
//});
//function rowInsertContent() {
//    var count = $('#insertActionTable tbody tr:last-child > td label').text();
//    if (!count)
//        count = 0;
//    var html = '';
//    html += '<tr>';
//    html += '<td>';
//    html += '<label>' + (parseInt(count) + 1) + '</label>';
//    html += '</td>';

//    html += '<td>';
//    html += '<input name="ten-action" type="text" class="col-sm-10" placeholder="Tên Action" >';
//    html += '</td>';

//    html += '<td>';
//    html += '<input name="alias-action" type="text" class="col-sm-10" placeholder="Alias" >';
//    html += '</td>';

//    html += '<td>';
//    html += '<label>' + '<input name="switch-field-1" class="ace ace-switch ace-switch-7" type="checkbox">';
//    html += '<span class="lbl"></span>';
//    html += '</label>'
//    html += '</td>';

//    html += '<td>';
//    html += '<div class="hidden-sm hidden-xs btn-group">';
//    html += '<button class="btn btn-xs btn-info">';
//    html += '<i class="ace-icon fa fa-refresh bigger-120"></i>'
//    html += '</button>';

//    html += '<button class="btn btn-xs btn-danger" onclick="removeCurrentRow(event)">';
//    html += '<i class="ace-icon fa fa-trash-o bigger-120"></i>'
//    html += '</button>';

//    html += '</div>'
//    html += '</td>';
//    html += '</tr>';
//    return html;
//}

//function rowUpdateContent(obj) {
//    var html = '';
//    html += '<tr id = "' + obj.DM_ACTION_ID + '">';
//    html += '<td>';
//    html += '<label>' + obj.DM_ACTION_ID + '</label>';
//    html += '</td>';
//    html += '<td>';
//    html += '<input name="ten-action-update" type="text" class="col-sm-10" placeholder="Tên Action" value="' + obj.TEN_ACTION + '"id="TEN_ACTION"/>';
//    html += '</td>';
//    html += '<td>';
//    html += '<input name="alias-action-update" type="text" class="col-sm-10" placeholder="Alias" value="' + obj.ALIAS + '"  id = "ALIAS_ACTION"/>'
//    html += ' </td>'
//    html += '<td>';
//    html += '<label>';
//    html += '<input name="switch-field-1" class="ace ace-switch ace-switch-7" type="checkbox" id="STATUS_ACTION">';
//    html += '<span class="lbl"></span>';
//    html += '</label>';
//    html += '</td>';
//    html += '<td>';
//    html += '<div class="hidden-sm hidden-xs btn-group">';
//    html += '<button class="btn btn-xs btn-info">';
//    html += '<i class="ace-icon fa fa-refresh bigger-120"></i>';
//    html += '</button>';
//    html += '<button class="btn btn-xs btn-danger" onclick="removeCurrentRow(event)">';
//    html += '<i class=" ace-icon fa fa-trash-o bigger-120">';
//    html += '</i>';
//    html += '</button>';
//    html += '</div>';
//    html += '</td>';
//    html += '</tr>';
//    return html;
//}
//function addInsertRow() {
//    var html = rowInsertContent();
//    $('#insertActionTable tbody tr:last-child').after(html);
//    $('#TabModule').animate({ scrollTop: $(this).height() }, 1000);
//}
//function addUpdateRow() {
//    var html = rowUpdateContent();
//}
//function openUpdateAction(event, actionId) {
//    var currentRow = $(event.currentTarget).parents('tr');
//    var obj = {
//        DM_ACTION_ID: actionId,
//        TEN_ACTION: $(currentRow).find('td:eq(1)').text(),
//        ALIAS: $(currentRow).find('td:eq(2)').text(),
//        TRANGTHAI: ($(currentRow).find('input[type=checkbox]').is(':checked') ? 1 : 0)
//    }
//    var html = rowUpdateContent(obj);
//    if (!$('#updateActionSector').is(':visible')) {
//        if ($('#insertActionSector').is(':visible'))
//            $('#insertActionSector').css("display", "none");
//        $('#ActionBtnInsert').hide('fast', function () {
//            $('#updateActionSector').fadeIn('slow', function (event) {
//            });
//        });
//        $('#updateActionTable tbody').append(html);
//    } else {
//        var existingTableRow = $('#updateActionTable tbody tr'),
//            rowIsExisted = false;
//        $.each(existingTableRow, function (event) {
//            if ($(this).attr('id') == actionId.toString()) {
//                rowIsExisted = true;
//                return;
//            }
//        });
//        if (rowIsExisted == false)
//            $('#updateActionTable tbody tr:last-child').after(html);
//    }
//    if (obj.TRANGTHAI == 1)
//        $('#updateActionTable tbody tr:last-child').find('input[type=checkbox]').prop('checked', true);
//    else
//        $('#updateActionTable tbody tr:last-child').find('input[type=checkbox]').prop('checked', false);
//    $('#TabModule').animate({ scrollTop: $('#TabModule').height() }, 1000);
//}
//function closeActionUpdate() {
//    $('#updateActionSector').fadeOut('slow', function () {
//        $('#updateActionTable').find('tbody tr').remove();
//        $('#TabModule').animate({ scrollTop: $('#TabModule').height() }, 500, function () {
//            $('#ActionBtnInsert').show('fast');
//        });
//    });
//}

//function refreshInsertRow() {
//    $('#insertActionTable tbody tr').remove();
//    var html = rowInsertContent();
//    $('#insertActionTable tbody').append(html);
//}

//function removeCurrentRow(event) {
//    var obj = $(event.currentTarget);
//    var table = obj.parents('table');
//    if ($(table).find('tbody tr').length > 1) {
//        obj.parents('tr').remove()
//    }
//}

////function saveInsertAction() {
////    var check = insertListActionValidation();
////    if (check == true) {
////        var listObject = [];

////        var listRow = $('#insertActionTable tbody').children();
////        for (var i = 0 ; i < listRow.length ; i++) {
////            var currentRow = listRow[i];
////            var name = $(currentRow).children().find('input[name=ten-action]').val().trim();
////            var alias = $(currentRow).children().find('input[name=alias-action]').val().trim();
////            var status = (($(currentRow).children().find('input[type=checkbox]')).is(':checked')) ? 1 : 0;

////            var obj = {
////                TEN_ACTION: name,
////                TRANGTHAI: status,
////                DM_MODULE_ID: $('#update-ID').val(),
////                ALIAS: alias
////            }
////            listObject.push(obj);
////        }
////        $.ajax({
////            url: '/DMActionArea/DMAction/InsertListAction',
////            type: 'POST',
////            contentType: 'application/json;charset=-utf-8',
////            dataType: 'json',
////            data: JSON.stringify({ 'listInsertAction': listObject, 'moduleID': parseInt($('#update-ID').val()) }),
////            success: function (result) {
////                reloadActionGrid($('#update-ID').val());
////                refreshInsertRow();
////            }, eror: function (result) {
////                alert("Thất bại");
////            }
////        })
////    }
    
////}

//function reloadActionGrid(id) {
//    $('#gridActionContent').load('/DMModuleArea/DMModule/ActionModule?moduleID=' + id);
//}

//function onInsertAction(event) {
//    $(event.currentTarget).hide();
//    if (!$('#insertActionSector').is(':visible')) {
//        $('#insertActionSector').fadeIn();
//        if ($('#insertActionTable').find('tbody tr').length == 0) {
//            var row = rowInsertContent();
//            $('#insertActionTable').find('tbody').append(row);
//        }
//    }
//    $('#TabModule').animate({ scrollTop: $('#TabModule').height() }, 1000);
//}
//function closeActionInsert(event) {
//    $('#insertActionSector').fadeOut('slow', function () {
//        $('#insertActionTable tbody tr').remove();
//        $('#TabModule').animate({ scrollTop: $('#TabModule').height() }, 500, function () {
//            $('#ActionBtnInsert').show('fast');
//        });
//    });
//}

//function updateListActionValidation() {
//    var valid = true;
//    var rowObjectList = $('#updateActionTable tbody tr');
//    for (var i = 0; i < rowObjectList.length; i++) {
//        var actionName = $(rowObjectList[i]).find('#TEN_ACTION').val(),
//            actionAlias = $(rowObjectList[i]).find('#ALIAS_ACTION').val(),
//            actionStatus = $(rowObjectList[i]).find("#STATUS_ACTION").is(':checked') ? 1 : 0;
//        if (!actionName) {
//            valid = false;
//            showActionUpdateMessage('Tên action không để trống');
//            $(rowObjectList[i]).find('#TEN_ACTION').focus();
//            break;
//        } else {
//            if (!actionAlias) {
//                valid = false;
//                showActionUpdateMessage('Alias của action không để trống');
//                $(rowObjectList[i]).find('#ALIAS_ACTION').focus();
//                break;
//            } else if (validAlias(actionAlias) == false) {
//                valid = false;
//                showActionUpdateMessage('Alias của action không đúng định dạng');
//                $(rowObjectList[i]).find('#ALIAS_ACTION').focus();
//                break;
//            } else {
//                for (var j = i + 1; j < rowObjectList.length; j++) {
//                    if (actionName == $(rowObjectList[j]).find('#TEN_ACTION').val()) {
//                        valid = false;
//                        showActionUpdateMessage('Tên action không được giống nhau');
//                        break;
//                    } else if (actionAlias == $(rowObjectList[j]).find('#ALIAS_ACTION').val()) {
//                        valid = false;
//                        showActionUpdateMessage('Tên alias không được giống nhau');
//                        break;
//                    }
//                }
//            }
//        }
//    }
//    return valid;
//}

//function insertListActionValidation() {
//    var valid = true;
//    var rowObjectList = $('#insertActionTable tbody tr');
//    for (var i = 0; i < rowObjectList.length; i++) {
//        var actionName = $(rowObjectList[i]).find("input[name='ten-action']").val(),
//            actionAlias = $(rowObjectList[i]).find("input[name='alias-action']").val(),
//            actionStatus = $(rowObjectList[i]).find("input[type='checkbox']").is(':checked') ? 1 : 0;
//        if (!actionName) {
//            valid = false;
//            showActionInsertMessage('Tên action không để trống');
//            $(rowObjectList[i]).find("input[name='ten-action']").focus();
//            break;
//        } else {
//            if (!actionAlias) {
//                valid = false;
//                showActionInsertMessage('Alias của action không để trống');
//                $(rowObjectList[i]).find("input[name='alias-action']").focus();
//                break;
//            } else if (validAlias(actionAlias) == false) {
//                valid = false;
//                showActionInsertMessage('Alias của action không đúng định dạng');
//                $(rowObjectList[i]).find("input[name='alias-action']").focus();
//                break;
//            } else {
//                for (var j = i + 1; j < rowObjectList.length; j++) {
//                    if (actionName == $(rowObjectList[j]).find("input[name='ten-action']").val()) {
//                        valid = false;
//                        $(rowObjectList[j]).find("input[name='alias-action']").focus();
//                        showActionInsertMessage('Tên action không được giống nhau');
//                        break;
//                    } else if (actionAlias == $(rowObjectList[j]).find("input[name='alias-action']").val()) {
//                        valid = false;
//                        $(rowObjectList[j]).find("input[name='alias-action']").focus();
//                        showActionInsertMessage('Tên alias không được giống nhau');
//                        break;
//                    }
//                }
//            }
//        }
//    }
//    return valid;

//}

//function showActionUpdateMessage(message) {
//    $('#failActionUpdate').text(message);
//    $('#failActionUpdate').fadeIn('fast', function (event) {
//        $(this).delay(1500).fadeOut('fast');
//    });
//}

//function showActionInsertMessage(message) {
//    $('#failActionInsert').text(message);
//    $('#failActionInsert').fadeIn('fast', function (event) {
//        $(this).delay(1500).fadeOut('fast');
//    });
//}

//function saveUpdateAction() {
//    var valid = updateListActionValidation();
//    if (valid == true) {
//        var listUpdateAction = [];
//        var rowContent = $('#updateActionTable tbody tr');
//        $.each(rowContent, function (event) {
//            //var DM_ACTION_ID = $(this).attr('id'),
//            //    TEN_ACTION = $(this).find('#TEN_ACTION').val(),
//            //    ALIAS = $(this).find('#ALIAS_ACTION').val(),
//            //    TRANGTHAI = $(this).find('#STATUS_ACTION').is(':checked') ? 1 : 0;
//            var action = {
//                DM_ACTION_ID: $(this).attr('id'),
//                TEN_ACTION: $(this).find('#TEN_ACTION').val(),
//                ALIAS: $(this).find('#ALIAS_ACTION').val(),
//                TRANGTHAI: $(this).find('#STATUS_ACTION').is(':checked') ? 1 : 0
//            }
//            listUpdateAction.push(action);
//        });
//        $.ajax({
//            url: '/DMActionArea/DMAction/UpdateListAction',
//            type: 'POST',
//            contentType: 'application/json;charset=utf-8',
//            dataType: 'json',
//            data: JSON.stringify({ 'listUpdateAction': listUpdateAction, 'moduleID': parseInt($('#update-ID').val()) }),
//            success: function (result) {
//                closeActionUpdate();
//                reloadActionGrid($('#update-ID').val());
//            }
//        });
//    }
//}

//function validAlias(name) {
//    var re = /^\w+$/;
//    return re.test(name);
//}

//function showActionRemoveForm(id) {
//    $('#ActionRemove').dialog('open');
//    $('#ActionRemove').find('.btn').attr('onclick', '_RemoveAction(' + id + ')');
//}

//function _RemoveAction(id) {
//    $.ajax({
//        url: '/DMActionArea/DMAction/RemoveAction/'+id,
//        type: 'POST',
//        dataType: 'json',
//        contentType: 'application/json;charset=utf-8',
//        success: function (result) {
//            if (result.success == true) {
//                $('#ActionRemove').dialog('close');
//                reloadActionGrid($('#update-ID').val());
//            } else {
//                alert(result.message);
//            }
//        }
//    })
//}