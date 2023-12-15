$(document).ready(function () {
    $("#InsertGroupUser").dialog({
        autoOpen: false,
        modal: true,
        width: 600,
        height: 310,
        resizable: false,
        title: "<i class='ace-icon fa fa-users blue'></i> Thêm nhóm người dùng mới",
        title_html: true,
        show: {
            effect: "blind",
            duration: 200,
        }, hide: {
            effect: "blind",
            duration: 200
        }   
    });
    $('#UpdateGroupUser').dialog({
        autoOpen: false,
        modal: true,
        width: 600,
        height: 310,
        resizable: false,
        title: "<i class='ace-icon fa fa-users blue'></i> Cập nhật nhóm người dùng",
        title_html: true,
        show: {
            effect: "blind",
            duration: 200,
        }, hide: {
            effect: "blind",
            duration: 200
        }
    });
    $('#RemoveMemberConfirm').dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        height: 'auto',
        resizable: false,
        title: "<i class='ace-icon fa fa-trash red2'></i> <span class='red2'>Xóa thành viên</span>",
        title_html: true,
        show: {
            effect: "blind",
            duration: 200,
        }, hide: {
            effect: "blind",
            duration: 200
        }
    });
    $('#RemoveListMemberConfirm').dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        height: 'auto',
        resizable: false,
        title: "<i class='ace-icon fa fa-trash red2'></i> <span class='red2'>Xóa danh sách người dùng</span>",
        title_html: true,
        show: {
            effect: "blind",
            duration: 200,
        }, hide: {
            effect: "blind",
            duration: 200
        }
    });
    $('#InsertListMemberConfirm').dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        height: 'auto',
        resizable: false,
        title: "<i class='ace-icon fa fa-plus-square green'></i> <span class='green'>Thêm danh sách người dùng</span>",
        title_html: true,
        show: {
            effect: "blind",
            duration: 200,
        }, hide: {
            effect: "blind",
            duration: 200
        }
    });
    $('#InsertMemberConfirm').dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        height: 210,
        resizable: false,
        title: "<i class='ace-icon fa fa-plus green'></i> <span class='green'>Thêm thành viên</span>",
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
function loadGroupUserMember(id) {
    location.href = "/DMGroupUserArea/DMGroupUser/GroupUserMember/" + id;
}

function loadFormUpdateGroupUser(id) {
    $.ajax({
        url: '/DMGroupUserArea/DMGroupUser/LoadFormUpdateGroupUser/' + id,
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            $('#UpdateGroupUser').html(result);
            $('#UpdateGroupUser').dialog('open');
        }
    })
}

function reloadGroupUserList() {
    $('#gridGroupUsercontent').load('/DMGroupUserArea/DMGroupUser/ReloadGrid');
}

function loadGroupUserPermission(id) {
    window.location.href = "/DMGroupUserArea/DMGroupUser/GroupUserPermission?id=" + id;
}


function loadInsertGroupUser() {
    $.ajax({
        url: '/DMGroupUserArea/DMGroupUser/LoadFormInsertGroupUser',
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            $("#InsertGroupUser").html(result);
            $("#InsertGroupUser").dialog('open');

        }
    })
}

function reloadGrid() {
    $('#gridGroupUsercontent').load('/DMGroupUserArea/DMGroupUser/ReloadGrid');
}

function _InsertGroupUser() {
    var GrUserName = $('#insert-TEN-GROUP-USER').val();
    var GrUserDescription = $('#genrl-insert-MOTA').val();
    if (!GrUserName) {
        $('#TENGrUser-genrl-insert-msg').text("Tên nhóm không được trống");
        showMessage('#TENGrUser-genrl-insert-msg');
        $('#insert-TEN-GROUP-USER').focus();
    } else {
        var obj = {
            TEN_GROUP_USER: GrUserName,
            MOTA: GrUserDescription
        }
        $.ajax({
            url: '/DMGroupUserArea/DMGroupUser/InsertGroupUser',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(obj),
            success: function (result) {
                if (result.success == true) {
                    $("#InsertGroupUser").dialog('close');
                    var alertContent = getAlertContent('Thêm thành công nhóm', ' ' + obj.TEN_GROUP_USER, 'success-insert');
                    $('.alert-success').html(alertContent);
                    showAlert('.alert-success');
                    reloadGrid();
                }
                else {
                    if (result.type == 1) {
                        $('#TENGrUser-genrl-insert-msg').text(result.message);
                        showMessage('#TENGrUser-genrl-insert-msg');
                        $('#insert-TEN-GROUP-USER').focus();
                    }
                }
            }
        })
    }
}

function _UpdateGroupUser(id) {
    var GrName = $('#update-TEN-GROUP-USER').val();
    if (!GrName) {
        $('#TENGrUser-genrl-update-msg').text("Tên nhóm không được trống");
        showMessage('#TENGrUser-genrl-update-msg');
        $('#update-TEN-GROUP-USER').focus();
    } else {
        var obj = {
            ID: $('#update-ID').val(),
            TEN_GROUP_USER: GrName,
            MOTA: $('#genrl-update-MOTA').val()
        }
        $.ajax({
            url: '/DMGroupUserArea/DMGroupUser/UpdateGroupUser/',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(obj),
            success: function (result) {
                if (result.success == true) {
                    $("#UpdateGroupUser").dialog('close');
                    var alertContent = getAlertContent('Cập nhật thành công nhóm ', ' ' + obj.TEN_GROUP_USER, 'success-insert');
                    $('.alert-success').html(alertContent);
                    showAlert('.alert-success');
                    reloadGrid();
                }
                else {
                    if (result.type == 1) {
                        $('#TENGrUser-genrl-update-msg').text(result.message);
                        showMessage('#TENGrUser-genrl-update-msg');
                        $('#update-TEN-GROUP-USER').focus();
                    }
                }
            }
        });
    }
}

function _GetMemberList(groupUserId) {
    $.ajax({
        url: '/DMGroupUserArea/DMGroupUser/GetMemberList?groupId=' + groupUserId,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            var html = '';
            $('#IsMemberSection').find('#TotalMember').text(result.length);
            $.each(result, function (key, item) {
                html += '<tr class="active" id=' + item.DM_NGUOIDUNG_ID + '>';
                html += '<td class="center">';
                html += '<label class="pos-rel">'
                html += '<input type="checkbox" class="ace" value="' + item.DM_NGUOIDUNG_ID + '" onchange="onChangeRemoveMember(event)">';
                html += '<span class="lbl"></span>';
                html += '</label>';
                html += '</td>';
                html += '<td>';
                html += '<a href="#" class="col-xs-11" id ="MemberName">' + item.HOTEN + '</a>';
                html += '<a href="javascript:void(0)" class="col-xs-1" onclick="confirmRemoveMember(event,' + item.DM_NGUOIDUNG_ID + ',' + groupUserId + ')" title="xóa ' + item.HOTEN + '" id="RemoveMemberBtn">';
                html += '<i class="ace-icon fa fa-times bigger-150"></i>';
                html += '</a>';
                html += '<a href="javascript:void(0)" class="col-xs-1" id="InsertMemberBtn" onclick="confirmInsertMember(event,' + item.DM_NGUOIDUNG_ID + ',' + groupUserId + ')">'
                html += '<i class="ace-icon  fa fa-plus bigger-140"></i>';
                html += '</a>';
                html += '</td>'
                html += '</tr>';
            });
            $('#IsMemberTable tbody').html(html);
        }
    });
}

function _GetNotMemberList(groupUserId) {
    $.ajax({
        url: '/DMGroupUserArea/DMGroupUser/GetNotMemberList?groupId=' + groupUserId,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            $('#NotMemberSection').find('#TotalMember').text(result.length);
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr class="active"  id=' + item.DM_NGUOIDUNG_ID + '>'
                html += '<td class="center">'
                html += ' <label class="pos-rel">'
                html += ' <input type="checkbox" class="ace" value=' + item.DM_NGUOIDUNG_ID + ' onchange = "onChangeInsertMember(event)">'
                html += ' <span class="lbl"></span>'
                html += ' </label>'
                html += ' </td>'
                html += ' <td>'
                html += '<a href="#" class="col-xs-11" id="MemberName">' + item.HOTEN + '</a>'
                html += ' <a href="javascript:void(0)" class="col-xs-1" id="RemoveMemberBtn" onclick="_RemoveMember(event,' + item.DM_NGUOIDUNG_ID + ',' + groupUserId + ')">'
                html += ' <i class="ace-icon  fa fa-times bigger-150"></i>'
                html += ' </a>'
                html += ' <a href="javascript:void(0)" class="col-xs-1" id="InsertMemberBtn" onclick="confirmInsertMember(event,' + item.DM_NGUOIDUNG_ID + ',' + groupUserId + ')">'
                html += '<i class="ace-icon  fa fa-plus bigger-140"></i>'
                html += '</a>'
                html += '</td>'
                html += ' </tr>'
            });
            $('#NotMemberTable tbody').html(html);
        }
    });
}

function _SearchMember(event) {
    var searchKey = $(event.currentTarget).val().trim();
    $('#IsMemberTable tbody tr').each(function (index) {
        $row = $(this);
        var name = $(this).find('#MemberName').text();
        if (name.toLocaleLowerCase().indexOf(searchKey.toLowerCase()) > -1)
            $row.show();
        else
            $row.hide();
    });
}

function _RemoveMember(event, memberId, groupId) {
    $.ajax({
        url: '/DMGroupUserArea/DMGroupUser/RemoveMember',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({ 'userId': memberId }),
        success: function (result) {
            if (result.success == true) {
                $('#RemoveMemberConfirm').dialog('close');
                _GetMemberList(groupId);
                _GetNotMemberList(groupId);
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert(result.responseText);
        }
    })
}

function _InsertMember(event, memberId, groupId) {
    $.ajax({
        url: '/DMGroupUserArea/DMGroupUser/InsertMember',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({ 'userId': memberId, 'groupId': groupId }),
        success: function (result) {
            if (result.success == true) {
                $('#InsertMemberConfirm').dialog('close');
                _GetMemberList(groupId);
                _GetNotMemberList(groupId);
                notif({
                    type: 'success',
                    position: 'bottom',
                    msg: 'Add user successfully!',
                });
            } else {
                alert(result.message);
            }
        }, error: function (result) {
            alert(result.responseText);
        }
    });
}

function _SearchNotMember(event) {
    var searchKey = $(event.currentTarget).val().trim();
    $('#NotMemberTable tbody tr').each(function (index) {
        $row = $(this);
        var name = $(this).find('#MemberName').text();
        if (name.toLocaleLowerCase().indexOf(searchKey.toLowerCase()) > -1)
            $row.show();
        else
            $row.hide();
    });
}

function confirmInsertMember(event, userId, groupId) {
    var name = $(event.currentTarget).parents('tr').find('#MemberName').text();
    $('#InsertMemberConfirm').find('#InsertMemberMessage').text(name);
    $('#InsertMemberConfirm').find('.btn').attr('onclick', '_InsertMember(event,' + userId + ',' + groupId + ')');
    $('#InsertMemberConfirm').dialog('open');
}

function confirmRemoveMember(event, userId, groupId) {
    var name = $(event.currentTarget).parents('tr').find('#MemberName').text();
    $('#RemoveMemberConfirm').find('#RemoveMemberMessage').text(name);
    $('#RemoveMemberConfirm').find('.btn').attr('onclick', '_RemoveMember(event,' + userId + ',' + groupId + ')');
    $('#RemoveMemberConfirm').dialog('open');
}

function listNotMemberCheckAll(event) {
    if ($(event.currentTarget).is(':checked')) {
        $('#MemberMovement').find('.btn-info').prop('disabled', false);
        $('#NotMemberTable tbody tr').each(function () {
            $(this).find('input[type=checkbox]').prop('checked', true);
        });
    } else {
        $('#MemberMovement').find('.btn-info').prop('disabled', true);
        $('#NotMemberTable tbody tr').each(function () {
            $(this).find('input[type=checkbox]').prop('checked', false);
        });
    }
}

function listMemberCheckAll(event) {
    if ($(event.currentTarget).is(':checked')) {
        $('#MemberMovement').find('.btn-danger').prop('disabled', false);
        $('#IsMemberTable tbody tr').each(function () {
            $(this).find('input[type=checkbox]').prop('checked', true);
        });
    } else {
        $('#MemberMovement').find('.btn-danger').prop('disabled', true);
        $('#IsMemberTable tbody tr').each(function () {
            $(this).find('input[type=checkbox]').prop('checked', false);
        });
    }
}

function onChangeRemoveMember(event) {
    if ($(event.currentTarget).is(':checked')) {
        $('#MemberMovement').find('.btn-danger').prop('disabled', false);
        $('#IsMemberCheckAll').prop('checked', false);
    } else {
        var rowCheckedLeft = $('#IsMemberTable tbody').find('input[type=checkbox]:checked').length;
        $('#IsMemberCheckAll').prop('checked', false);
        if (rowCheckedLeft == 0) {
            $('#MemberMovement').find('.btn-danger').prop('disabled', true);
        }
    }
}

function onChangeInsertMember(event) {
    if ($(event.currentTarget).is(':checked')) {
        $('#MemberMovement').find('.btn-info').prop('disabled', false);
    } else {
        var rowCheckedLeft = $('#NotMemberTable tbody').find('input[type=checkbox]:checked').length;
        $('#NotMemberCheckAll').prop('checked', false);
        if (rowCheckedLeft == 0) {
            $('#MemberMovement').find('.btn-info').prop('disabled', true);
        }
    }
}

function confirmRemoveListMember(groupUserId) {
    var totalMemberRemove = $('#IsMemberTable tbody').find('input[type=checkbox]:checked').length
    $('#RemoveListMemberConfirm').find('#ListMemberRemoveTotal').text(totalMemberRemove);
    $('#RemoveListMemberConfirm').find('#ListMemberRemoveGroup').text($('#GROUP-NAME').text());
    $('#RemoveListMemberConfirm').dialog('open');
    $('#RemoveListMemberConfirm').find('.btn-danger').attr('onclick', '_RemoveListMember(' + groupUserId + ')');
}

function confirmInsertListMember(groupUserId) {
    var totalMemberRemove = $('#NotMemberTable tbody').find('input[type=checkbox]:checked').length
    $('#InsertListMemberConfirm').find('#ListMemberInsertTotal').text(totalMemberRemove);
    $('#InsertListMemberConfirm').find('#ListMemberInsertGroup').text($('#GROUP-NAME').text());
    $('#InsertListMemberConfirm').dialog('open');
    $('#InsertListMemberConfirm').find('.btn').attr('onclick', '_InsertListMember(' + groupUserId + ')');
}

function _RemoveListMember(groupId) {
    var listMemberRemove = [];
    var rowsChecked = $('#IsMemberTable tbody tr').has('input[type=checkbox]:checked');
    $.each(rowsChecked, function () {
        var obj = {
            DM_NGUOIDUNG_ID: $(this).attr('id')
        };
        listMemberRemove.push(obj);
    });
    $.ajax({
        url: '/DMGroupUserArea/DMGroupUser/RemoveListMember',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(listMemberRemove),
        success: function (result) {
            if (result.success == true) {
                $('#RemoveListMemberConfirm').dialog('close');
                _GetMemberList(groupId);
                _GetNotMemberList(groupId);
                notif({
                    type: 'success',
                    position: 'bottom',
                    msg: 'Xóa người dùng thành công!',
                });
                $('#MemberMovement').find('.btn-info').prop('disabled', true);
                $('#MemberMovement').find('.btn-danger').prop('disabled', true);
            } else
                alert(result.message);
        },
        error: function (result) {
            alert(result.responseText);
        }
    });
}

function _InsertListMember(groupId) {
    var listMemberInsert = [];
    var rowsChecked = $('#NotMemberTable tbody tr').has('input[type=checkbox]:checked');
    $.each(rowsChecked, function () {
        var obj = {
            DM_NGUOIDUNG_ID: $(this).attr('id')
        };
        listMemberInsert.push(obj);
    });
    $.ajax({
        url: '/DMGroupUserArea/DMGroupUser/InsertListMember',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({ 'listUser': listMemberInsert, 'groupId': groupId }),
        success: function (result) {
            if (result.success == true) {
                $('#InsertListMemberConfirm').dialog('close');
                _GetMemberList(groupId);
                _GetNotMemberList(groupId);
                notif({
                    type: 'success',
                    position: 'bottom',
                    msg: 'Thêm người dùng thành công!',
                });
                $('#MemberMovement').find('.btn-info').prop('disabled', true);
                $('#MemberMovement').find('.btn-danger').prop('disabled', true);
            } else
                alert(result.message);
        },
        error: function (result) {
            alert(result.responseText);
        }
    });
}

function loadSearchGroupUser() {
    if ($('#search-group-user').is(':visible') == false)
        $('#search-group-user').slideDown();
}
function closeGroupUserSearchForm() {
    if ($('#search-group-user').is(':visible')) {
        $('#search-group-user').find('input[type=text]').val("");
        $('#search-group-user').slideUp(function (event) {
            reloadGrid();
        });
    }
}