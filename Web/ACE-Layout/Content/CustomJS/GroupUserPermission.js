$(document).ready(function (event) {
    //$('#FrmGrUserPermissionSearch').submit(function (event) {
    //    alert('hello');
    //    event.preventDefault();
    //});
});
function _SaveGroupUserPermission(GROUP_ID, event) {
    var rowParent = $(event.currentTarget).parents('tr');
    var subOverFlowGrUser = $(rowParent).children().find('#SubOverFlowGrUser');
    var grPermissionWrappers = subOverFlowGrUser.children('#GrPermissionWrapper');

    var grUserPermissionList = [];

    $.each(grPermissionWrappers, function (event) {
        var actionId = $(this).find('#ActionIdentity').val();
        var actionStatus = $(this).find("#Status").val();

        var obj = {
            DM_GROUP_USER_ID: GROUP_ID,
            DM_ACTION_ID: actionId,
            TRANGTHAI : actionStatus
        }
        grUserPermissionList.push(obj);
    });

    $.ajax({
        url: '/DMGroupUserArea/DMGroupUser/UpdateGroupUserPermission',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(grUserPermissionList),
        success: function (result) {
            if (result.success == true) {
                //$('.alert-success').slideDown('fast').delay(1500).slideUp('fast', function () {
                //    $('#GrUserPermissionTblContainer').load('/DMGroupUserArea/DMGroupUser/LoadGroupUserPermission?groupId=' + GROUP_ID);
                //});
                $('#GrUserPermissionTblContainer').load('/DMGroupUserArea/DMGroupUser/LoadGroupUserPermission?groupId=' + GROUP_ID);
                commonNotifySuccess("Cập nhật quyền nhóm người dùng thành công");
            }
            else {
                alert(result.message);
            }
        }, error: function (result) {
            alert(result.responseText);
        }
    })
   
}

function _SaveAllGroupUserPermission(GROUP_ID) {
    var getRow = $('#GrUserPermissionTable tbody tr');
    var grUserPermissionList = [];
    if (getRow.length > 0) {
        $.each(getRow, function () {
            var subOverFlowGrUser = $(this).children().find('#SubOverFlowGrUser');
            var grPermissionWrappers = subOverFlowGrUser.children('#GrPermissionWrapper');

            $.each(grPermissionWrappers, function (event) {
                var actionId = $(this).find('#ActionIdentity').val();
                var actionStatus = $(this).find("#Status").val();
                var obj = {
                    DM_GROUP_USER_ID: GROUP_ID,
                    DM_ACTION_ID: actionId,
                    TRANGTHAI: actionStatus
                }
                grUserPermissionList.push(obj);
            });
        });
        $.ajax({
            url: '/DMGroupUserArea/DMGroupUser/UpdateGroupUserPermission',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(grUserPermissionList),
            success: function (result) {
                if (result.success == true) {
                    $('.alert-success').slideDown('fast').delay(1500).slideUp('fast', function () {
                        $('#GrUserPermissionTblContainer').load('/DMGroupUserArea/DMGroupUser/LoadGroupUserPermission?groupId=' + GROUP_ID);
                        $('#FrmGrUserPermissionSearch').find('input[type=text]').val('');
                        commonNotifySuccess("Cập nhật quyền nhóm người dùng thành công");
                    });
                }
                else {
                    alert(result.message);
                }
            }, error: function (result) {
                alert(result.responseText);
            }
        });
    } else {
        $('#GrUserPermissionSection').load('/DMGroupUserArea/DMGroupUser/LoadGroupUserPermission?groupId=' + GROUP_ID);
        $('#FrmGrUserPermissionSearch').find('input[type=text]').val('');
        //commonNotifySuccess("Cập nhật quyền nhóm người dùng thành công");
    }
    
}

function searchGroupUserPermission(GrUserID) {
    var moduleName = $('#FrmGrUserPermissionSearch').find('#nav-search-input').val();
    $.ajax({
        url: '/DMGroupUserArea/DMGroupUser/SearchGroupUserPermission?groupId=' + GrUserID+'&moduleName='+moduleName,
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            $("#GrUserPermissionTblContainer").html(result);
            
        }
    });
}