$(document).ready(function () {
    $('.date-picker').datepicker({
        changeMonth: true,
        changeYear: true,
        showAnim: 'slideDown',
        todayHighlight: true,
        yearRange : "-100:+0"
    });
    $('#UpdatePassword').dialog({
        autoOpen: false,
        modal: true,
        width: 580,
        height: 400,
        resizable: false,
        title: "Reset mật khẩu",
        title_html: true,
        show: {
            effect: "blind",
            duration: 200
        },
        hide: {
            effect: "blind",
            duration: 200
        }
    });
});
function _UpdatePassword(event) {
    var check = updatePasswordValidate();
    if (check == true) {
        var id = $('#update-ID').val(),
            newpass = $('#update-MATKHAU').val(),
            username = $('#update-TENDANGNHAP').val(),
            phone = $('input[name=update-DIENTHOAI]').val(),
            status = ($('#update-TT-enable').is(':checked')) ? 1 : 0;
        var obj = {
            DM_NGUOIDUNG_ID: id,
            TENDANGNHAP: username,
            MATKHAUMOI: newpass,
            TRANGTHAI: status,
            DIENTHOAI: phone
        };
        $.ajax({
            url: '/DMNguoidungArea/DMNguoidung/UpdatePassword',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({ model: obj, newPass: newpass }),
            success: function (result) {
                if (result.success == false) {
                    notif({
                        type: 'error',
                        position: 'bottom',
                        msg: result.message
                    });
                }
                else {
                    $('#UpdatePassword').dialog('close');
                    notif({
                        type: 'success',
                        position: 'bottom',
                        msg: 'Cập nhật mật khẩu thành công!',
                    });
                }
            }, error: function (result) {
                alert(result.responseText);
            }
        });
    }
}
function _UpdateStatus(DM_NGUOIDUNG_ID, event) {
    event.preventDefault();
    $.ajax({
        url: '/DMNguoidungArea/DMNguoidung/UpdateStatus/' + DM_NGUOIDUNG_ID,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result.success == false)
                alert(result.message);
        }, error: function (result) {
            alert(result.responseText);
        }
    });
}
function _UpdateUser(DM_NGUOIDUNG_ID, event) {
    var valid = updateUserValidate();
    if (valid == true) {
        var obj = {
            DM_NGUOIDUNG_ID: $('#update-ID').val(),
            HOTEN: $('#update-HOTEN').val(),
            NGAYSINH: $('#update-NGAYSINH').val(),
            DIENTHOAI: $("#update-DIENTHOAI").val(),
            EMAIL: $('#update-EMAIL').val(),
            CMT: $('#update-CMT').val(),
            NGAYCAP: $('#update-NGAYCAP').val(),
            NOICAP: $('#update-NOICAP').val(),
            NGUYEN_QUAN: $('#update-NGUYENQUAN').val(),
            THUONG_TRU: $('#update-THUONGTRU').val(),
            TENDANGNHAP: $('#update-TENDANGNHAP').val(),
            TRANGTHAI: $('#update-TRANGTHAI').is(':checked') ? 1 : 0,
            MUC_HOAHONG: $('#update-MUCHOAHONG').val(),
            DM_PHONGBAN_ID: $('#update-PHONG').val(),
            DM_VAITRO_ID: $('#update-CHUCVU').val(),
            MASO_THUE: $('#update-MST').val(),
            DM_NGANHANG_ID: $('#update-NGANHANG').val(),
            SO_TAIKHOAN: $('#update-SOTAIKHOAN').val(),
            NGUOI_QUANLY: $('#update-NgQUANLI').val()
        };
        var emailPassword = $('#update-MK-EMAIL').val();
        $.ajax({
            url: '/DMNguoidungArea/DMNguoidung/UpdateUser',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({ 'updateUser': obj, 'emailPassword': emailPassword }),
            success: function (result) {
                if (result.success === false) {
                    switch (result.type) {
                        case 1:
                            $('#update-DIENTHOAI-msg').text(result.message);
                            showUpdateMessage('#update-DIENTHOAI-msg');
                            $('#update-DIENTHOAI').focus();
                            break;
                        case 2:
                            $('#update-EMAIL-msg').text(result.message);
                            showUpdateMessage('#update-EMAIL-msg');
                            $('#update-EMAIL').focus();
                            break;
                        case 3:
                            $('#update-CMT-msg').text(result.message);
                            showUpdateMessage('#update-CMT-msg');
                            $('#update-CMT').focus();
                            break;
                        case 4:
                            $('#update-TENDANGNHAP-msg').text(result.message);
                            showUpdateMessage('#update-TENDANGNHAP-msg');
                            $('#update-TENDANGNHAP').focus();
                            break;
                        default:
                            alert(result.message);
                            break;
                    }
                } else {
                    notif({
                        type: 'success',
                        position: 'bottom',
                        msg: 'Cập nhật người dùng thành công!',
                    });
                }
            }, error: function (result) {
                alert(result.responseText);
            }
            , complete: function (event) {
                location.reload()
            }
        });
    }
}
function _InsertUser(event) {
    event.preventDefault();
    var check = insertUserValidate();
    if (check == true) {

        var fullName = $('#genrl-insert-HOTEN').val().trim(),
            cmt = $('#genrl-insert-CMT').val().trim(),
            placeProvideId = $('#genrl-insert-NOICAP').val().trim(),
            country = $('#genrl-insert-NGUYENQUAN').val(),
            address = $('#genrl-insert-THUONGTRU').val().trim(),
            userName = $('#genrl-insert-TENDANGNHAP').val().trim(),
            password = $('#genrl-insert-MK').val(),
            status = ($('#genrl-insert-TRANGTHAI').is(':checked')) ? 1 : 0,
            email = $('#genrl-insert-EMAIL').val().trim(),
            emailPass = $('#genrl-insert-MK-EMAIL').val(),
            phone = $('#genrl-insert-DIENTHOAI').val(),
            rate = $('#genrl-insert-MUCHOAHONG').val(),
            //taxCode = $('#genrl-insert-MST').val().trim(),
            //bank = $('#genrl-insert-NGANHANG').val().trim(),
            //bankAccountNumber = $('#genrl-insert-SOTAIKHOAN').val().trim(),
            manager = $('#genrl-insert-NgQUANLI').val(),
            apartmentId = $('#genrl-insert-PHONG').val(),
            roleId = $('#genrl-insert-CHUCVU').val(),
            //investorID = $('#genrl-insert-CHUDAUTU').val(),
            avatar = $('#ANHDAIDIEN-genrl-insert').val();
        var obj = {
            TENDANGNHAP: userName,
            MAHOA_MK: Math.random().toString(36).substring(22).trim(),
            TRANGTHAI: status,
            EMAIL: email,
            DIENTHOAI: phone,
            HOTEN: fullName,
            NGUYEN_QUAN: country,
            THUONG_TRU: address,
            CMT: cmt,
            NOICAP: placeProvideId,
            MUC_HOAHONG: rate,
            //MASO_THUE: taxCode,
            DM_CHUCVU_ID: roleId,
            DM_PHONGBAN_ID: apartmentId,
            //DM_NGANHANG_ID: bank,
            NGUOI_QUANLY: manager,
            ANH_DAIDIEN: avatar
            //DM_CHUDAUTU_ID : investorID
        }, MATKHAU = password,
           MK_EMAIL = $('#genrl-insert-MK-EMAIL').val(),
           birth = $('#genrl-insert-NGAYSINH').val(),
           supplyDate = $('#genrl-insert-NGAYCAP').val();
        $.ajax({
            url: '/DMNguoidungArea/DMNguoidung/InsertUser',
            type: 'POST',
            contentType: 'application/json',
            processData: false,
            dataType: 'json',
            data: JSON.stringify({ 'nguoidung': obj, 'password': MATKHAU, 'emailPassword': MK_EMAIL, 'birth': birth, 'supplyDate': supplyDate }),
            success: function (result) {
                if (result.success == false) {
                    switch (result.type) {
                        case 1:
                            $('#TENDN-genrl-insert-msg').text("Tài khoản đã tồn tại.");
                            showUpdateMessage('#TENDN-genrl-insert-msg');
                            $('#genrl-insert-TENDANGNHAP').focus();
                            break;
                        case 2:
                            $('#DIENTHOAI-genrl-insert-msg').text("Số điện thoại đã được dùng.");
                            showUpdateMessage('#DIENTHOAI-genrl-insert-msg');
                            $('#genrl-insert-DIENTHOAI').focus();
                            break;
                        case 3:
                            $('#EMAIL-genrl-insert-msg').text("EMAIL đã được sử dụng.");
                            showUpdateMessage('#EMAIL-genrl-insert-msg');
                            $('#genrl-insert-EMAIL').focus();
                            break;
                        case 5:
                            $('#MST-genrl-insert-msg').text('Mã số thuế đã tồn tại');
                            showUpdateMessage('#MST-genrl-insert-msg');
                            $('#genrl-insert-MST').focus();
                            break;
                        case 6:
                            $('#SOTAIKHOAN-genrl-insert-msg').text('Só tài khoản đã tồn tại');
                            showUpdateMessage('#SOTAIKHOAN-genrl-insert-msg');
                            $('#genrl-insert-SOTAIKHOAN').focus();
                            break;
                        case 7:
                            $('#CMT-genrl-insert-msg').text("Số CMT đã được sử dụng");
                            showUpdateMessage('#CMT-genrl-insert-msg');
                            $('#genrl-insert-CMT').focus();
                            break;
                        default:
                            notif({
                                type: 'error',
                                position: 'bottom',
                                msg: 'Thêm người dùng không thành công',
                            });
                            break;

                    }
                } else {
                    if (result.insertImage == false) {
                        notif({
                            type: 'success',
                            position: 'bottom',
                            msg: 'Thêm người dùng thành công!',
                        });
                        setTimeout(function () { location.href = '/DMNguoiDungArea/DMNguoiDung' }, 1000);
                    }
                    else {
                        var name = result.strImage;
                        insertImage(name);
                    }
                }
            }, error: function (result) {
                alert(result.responseText);
            }
        });
    }
}
function loadFormResetMK(DM_NGUOIDUNG_ID) {
    $.ajax({
        url: '/DMNguoidungArea/DMNguoidung/LoadFormResetPassword',
        type: 'GET',
        success: function (result) {
            $('#UpdatePassword').html(result);
            $('#UpdatePassword').dialog('open');


            $.mask.definitions['~'] = '[+-]';
            $('.input-mask-phone').mask('(999) 999-9999');

            _AccountInfo(DM_NGUOIDUNG_ID);

        },
        error: function (result) {
            alert(result.responseText);
        }
    });
}
function loadFormUpdateInfo(DM_NGUOIDUNG_ID) {
    $.ajax({
        url: '/DMNguoidungArea/DMNguoidung/LoadFormUpdateInfo',
        type: 'GET',
        success: function (result) {
            $('#UpdateInfo').html(result);
            $('#UpdateInfo').dialog('open');


            $('.date-picker').datepicker({
                autoclose: true,
                todayHighlight: true
            }).next().on(ace.click_event, function () {
                $(this).prev().focus();
            });

            $.mask.definitions['~'] = '[+-]';
            $('#genrl-update-DIENTHOAI').mask('(999) 999-9999');
            $('#genrl-update-NGAYSINH').mask('99-99-9999');
            _GeneralInfo(DM_NGUOIDUNG_ID);
        },
        error: function (result) {
            alert(result.responseText);
        }
    })
}

function redirectEditUser(userId) {
    window.location.href = "/DMNguoidungArea/DMNguoidung/EditUser/" + userId;
}

function _AccountInfo(id) {
    $.ajax({
        url: '/DMNguoidungArea/DMNguoidung/AccountInfo/' + id,
        type: 'GET',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (result) {
            $('#update-ID').val(result.identity);
            $('#update-TENDANGNHAP').val(result.userName);
            var status = result.status;
            if (status == 1)
                $('#update-TT-enable').prop('checked', true);
            else if (status == 0)
                $('#update-TT-disable').prop('checked', true);
        },
        error: function (result) {
            alert(result.responseText);
        }
    });
}

function updateUserValidate() {
    var check = true;
    var fullName = $('#update-HOTEN').val().trim(),
        phone = $('#update-DIENTHOAI').val().trim(),
        email = $('#update-EMAIL').val().trim(),
        cmt = $('#update-CMT').val().trim(),
        country = $('#update-NGUYENQUAN').val(),
        bank = $('#update-NGANHANG').val(),
        userName = $('#update-TENDANGNHAP').val(),
        commissionRate = $('#update-MUCHOAHONG').val();
    ;
    if (fullName === "" || !fullName) {
        $('#update-HOTEN-msg').text("Họ tên không được để trống");
        $('#update-HOTEN').focus();
        showUpdateMessage('#update-HOTEN-msg');
        check = false;
    }
    if (phone === '' || !phone) {
        $('#update-DIENTHOAI-msg').text("Số điện thoại không để trống");
        $('#update-DIENTHOAI').focus();
        showUpdateMessage('#update-DIENTHOAI-msg');
        check = false;
    }
    if (email === '' || !email) {
        $('#update-EMAIL-msg').text('Email không được để trống');
        $('#update-EMAIL').focus();
        showUpdateMessage('#update-EMAIL-msg');
        check = false;
    } else {
        if (commonEmailValidation(email) === false) {
            $('#update-EMAIL-msg').text('Email không đúng định dạng');
            $('#update-EMAIL').focus();
            showUpdateMessage('#update-EMAIL-msg');
            check = false;
        }
    }
    if (cmt === '' || !cmt) {
        $('#update-CMT-msg').text('Số cmt không được trống');
        $('#update-CMT').focus();
        showUpdateMessage('#update-CMT-msg');
        check = false;
    }
    if (country === '0') {
        $('#NGUYENQUAN-update-msg').text('Chọn nguyên quán');
        $('#update-NGUYENQUAN').focus();
        showUpdateMessage('#NGUYENQUAN-update-msg');
        check = false;
    }
    if (bank === '0') {
        $('#update-NGANHANG-msg').text('Chọn ngân hàng');
        $('#update-NGANHANG').focus();
        showUpdateMessage('#update-NGANHANG-msg');
        check = false;
    }
    if (userName === '' || !userName) {
        $('#update-TENDANGNHAP').text('Tên đăng nhập không trống');
        $('#update-TENDANGNHAP').focus();
        showUpdateMessage('#update-TENDANGNHAP-msg');
        check = false;
    }
    if (commissionRate > 100 || commissionRate < 0) {
        $('#update-MUCHOAHONG-msg').text('Mức hoa hồng từ 0 -> 100');
        $('#update-MUCHOAHONG').focus();
        showUpdateMessage('#update-MUCHOAHONG-msg');
        check = false;
    }
    return check;
}

function updatePasswordValidate() {
    var pass = $('#update-MATKHAU').val(),
        repass = $('#update-REMATKHAU').val();
    var valid = true;
    if (!pass || pass == "") {
        $("#MATKHAU-update-msg").removeClass('hidden').text('Mật khẩu không để trống !');
        valid = false;
    } else {
        if (!repass || repass == "") {
            $("#REMATKHAU-update-msg").removeClass('hidden').text('Mời bạn nhập lại mật khẩu !');
            valid = false;
        } else if (repass != pass) {
            $("#REMATKHAU-update-msg").removeClass('hidden').text('Mật khẩu không khớp !');
            valid = false;
        }
    }
    return valid;
}

function insertUserValidate() {
    var fullName = $('#genrl-insert-HOTEN').val().trim(),
        phone = $('#genrl-insert-DIENTHOAI').val(),
        email = $('#genrl-insert-EMAIL').val().trim(),
        emailPass = $('#genrl-insert-MK-EMAIL').val(),
        userName = $('#genrl-insert-TENDANGNHAP').val().trim(),
        pass = $('#genrl-insert-MK').val().trim(),
        repass = $('#genrl-insert-ReMK').val().trim(),
        cmt = $('#genrl-insert-CMT').val().trim(),
        country = $('#genrl-insert-NGUYENQUAN').val(),
        //bank = $('#genrl-insert-NGANHANG').val(),
        rate = $('#genrl-insert-MUCHOAHONG').val(),
        //investorID = $('#genrl-insert-CHUDAUTU').val(),
        userAvatar = document.getElementById('ANHDAIDIEN-genrl-insert').files[0];
    var valid = true;
    if (!fullName) {
        $('#HOTEN-genrl-insert-msg').text("Họ tên không được để trống");
        showUpdateMessage('#HOTEN-genrl-insert-msg');
        valid = false;
    }
    //if (investorID === '0') {
    //    $('#CHUDAUTU-genrl-insert-msg').text("Chọn chủ đầu tư");
    //    showUpdateMessage('#CHUDAUTU-genrl-insert-msg');
    //    valid = false;
    //}
    if (userAvatar != null) {
        var validImage = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
        if ($.inArray(userAvatar.type, validImage) < 0) {
            valid = false;
            $('#ANHDAIDIEN-genrl-insert-msg').text('file ảnh không hợp lệ');
            showUpdateMessage('#ANHDAIDIEN-genrl-insert-msg');
        }
    }
    if (!phone || phone === '(___) ___-____') {
        $('#DIENTHOAI-genrl-insert-msg').text("Số điện thoại không để trống");
        showUpdateMessage('#DIENTHOAI-genrl-insert-msg')
        valid = false;
    }
    if (!email) {
        $('#EMAIL-genrl-insert-msg').text("Email không được để trống");
        showUpdateMessage('#EMAIL-genrl-insert-msg');
        valid = false;
    } else {
        var check = commonEmailValidation(email);
        if (check == false) {
            valid = false;
            $('#EMAIL-genrl-insert-msg').text("Email này không hợp lệ");
            showUpdateMessage('#EMAIL-genrl-insert-msg');
        }
    }
    if (!emailPass) {
        $('#MK-EMAIL-genrl-insert-msg').text("Mật khẩu email không được để trống");
        showUpdateMessage('#MK-EMAIL-genrl-insert-msg');
        valid = false;
    }
    if (!cmt) {
        valid = false;
        $('#CMT-genrl-insert-msg').text("Số CMT không được trống");
        showUpdateMessage("#CMT-genrl-insert-msg");
    }
    if (country == 0) {
        valid = false;
        $('#NQ-genrl-insert-msg').text("Nguyên quán không được trống");
        showUpdateMessage("#NQ-genrl-insert-msg");
    }
    if (!rate) {
        valid = false;
        $('#MUCHOAHONG-genrl-insert-msg').text("Mức hoa hồng không để trống");
        showUpdateMessage("#MUCHOAHONG-genrl-insert-msg");
    } else {
        if (rate > 100) {
            valid = false;
            $('#MUCHOAHONG-genrl-insert-msg').text("Mức hoa hồng không quá 100");
            showUpdateMessage("#MUCHOAHONG-genrl-insert-msg");
        }
    }
    //if (bank == 0) {
    //    valid = false;
    //    $('#NGANHANG-genrl-insert-msg').text('Ngân hàng không được trống');
    //    showUpdateMessage("#NGANHANG-genrl-insert-msg");
    //}
    if (!userName) {
        $('#TENDN-genrl-insert-msg').text("Tên đăng nhập không được trống");
        showUpdateMessage('#TENDN-genrl-insert-msg');
        valid = false;
    }
    if (!pass) {
        $('#MK-genrl-insert-msg').text("Mật khẩu không trống");
        showUpdateMessage('#MK-genrl-insert-msg');
        valid = false;
    } else {
        if (!repass) {
            $('#ReMK-genrl-insert-msg').text("Nhập lại mật khẩu");
            showUpdateMessage('#ReMK-genrl-insert-msg');
            valid = false;
        } else {
            if (repass != pass) {
                $('#ReMK-genrl-insert-msg').text("2 mật khẩu không trùng khớp");
                showUpdateMessage('#ReMK-genrl-insert-msg');
                valid = false;
            } else if (validatePassword(repass) == false) {
                $('#ReMK-genrl-insert-msg').text("Mật khẩu không hợp lệ");
                showUpdateMessage('#ReMK-genrl-insert-msg');
                valid = false;
            }
        }
    }
    return valid;
}

function showUpdateMessage(objectID) {
    $(objectID).animate({ 'opacity': 1 },
        100,
        function (event) {
            $(objectID).delay(1500).animate({ 'opacity': 0 }, 100);
        });
}
function customKeyPress(objectID) {
    $(objectID).on('keypress', function () {
        $(this).parent().next('.cst-msg').text('');
    });
}

function resetText(event) {
    event.preventDefault();
    $('#update-MATKHAU').val('');
    $('#update-REMATKHAU').val('');
    $('#update-DIENTHOAI').val('');
    $('#frmResetPassword').find('.cst-msg').text('');
}

function reloadGrid() {
    $.ajax({
        url: '/DMNguoidungArea/DMNguoidung/LoadGridData',
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            $('#cst-list').html(result);
        }
    })
}

function _SearchUser() {
    var fullName = $('#HOTEN-search').val().trim(),
        email = $('#EMAIL-search').val().trim(),
        userName = $('#TenDN-search').val().trim(),
        role = $('#VAITRO-search').val(),
        status = $('#TRANGTHAI-search').is(':checked') ? 1 : 0
    ;
    $.ajax({
        url: '/DMNguoidungArea/DMNguoidung/SearchUser',
        type: 'GET',
        dataType: 'html',
        data: { 'userName': userName, 'email': email, 'fullName': fullName, 'role': role, 'status': status },
        success: function (result) {
            $('#UserSection').html(result);
        }
    })
}

function _SaveUserPermission(UserID, event) {
    var rowParent = $(event.currentTarget).parents('tr');
    var userActionSection = rowParent.find('#SubUserActionSection');
    var userActionWrapper = userActionSection.children('#UserActionWrapper');
    var UserPermissionList = [];
    $.each(userActionWrapper, function (event) {
        var obj = {
            DM_ACTION_ID: $(this).find('#ActionIdentity').val(),
            DM_NGUOIDUNG_ID: UserID,
            TRANGTHAI: $(this).find('#Status').val()
        }
        UserPermissionList.push(obj);
    });
    $.ajax({
        url: '/DMNguoidungArea/DMNguoidung/SaveUserPermissionList',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(UserPermissionList),
        success: function (result) {
            if (result.success == true) {
                notif({
                    type: 'success',
                    position: 'bottom',
                    msg: 'Cập nhật quyền người dùng thành công!',
                });
                $('#UserPermissionSection').load('/DMNguoidungArea/DMNguoidung/LoadUserPermission/' + UserID);
            }
        }
    });
}

function _SaveAllUserPermission(UserID) {
    var rows = $("#UserPermissionTable tbody tr");
    var UserPermissionList = [];
    if (rows.length > 0) {
        $.each(rows, function (event) {
            var userActionSection = $(this).find('#UserActionSection');
            var userActionWrapper = userActionSection.children('#UserActionWrapper');
            $.each(userActionWrapper, function (event) {
                var obj = {
                    DM_ACTION_ID: $(this).find('#ActionIdentity').val(),
                    DM_NGUOIDUNG_ID: UserID,
                    TRANGTHAI: $(this).find('#Status').val()
                }
                UserPermissionList.push(obj);
            });
        });
        $.ajax({
            url: '/DMNguoidungArea/DMNguoidung/SaveUserPermissionList',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(UserPermissionList),
            success: function (result) {
                if (result.success == true) {
                    notif({
                        type: 'success',
                        position: 'bottom',
                        msg :'Cập nhật quyền người dùng thành công'
                    });
                    $('#UserPermissionSection').load('/DMNguoidungArea/DMNguoidung/LoadUserPermission/' + UserID);
                    $('#FrmUserPermissionSearch').find('input[type=text]').val('');
                }
            }
        });
    } else {
        $('#UserPermissionSection').load('/DMNguoidungArea/DMNguoidung/LoadUserPermission/' + UserID);
        $('#FrmUserPermissionSearch').find('input[type=text]').val('');
    }

}

function removePicture() {
    var file = $('#ANHDAIDIEN-genrl-insert');
    file.replaceWith(file = file.clone(true));
    var img = document.getElementById('UserAvatar');
    var imgName = document.getElementById('UserAvatarFileName');
    if (img.src != "") {
        img.src = "";
    }
    if (imgName.value != "") {
        imgName.value = "";
    }
    $('#ANHDAIDIEN-remove').hide();
}

function insertImage(imgName) {
    var file = document.getElementById('ANHDAIDIEN-genrl-insert').files[0];
    var formData = new FormData();
    formData.append("UserAvatar", file);
    formData.append("ImageName", imgName);
    $.ajax({
        url: '/DMNguoidungArea/DMNguoidung/InsertUserAvatar',
        type: 'POST',
        dataType: 'json',
        data: formData,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result.success == true) {
                notif({
                    type: 'success',
                    position: 'bottom',
                    msg: 'Thêm người dùng thành công!',
                });
                setTimeout(function () { location.href = '/DMNguoidungArea/DMNguoidung' }, 2000);
            } else {
                notif({
                    type: 'error',
                    position: 'bottom',
                    msg: result.message,
                });
            }
        }
    });
}

function searchUserPermission(UserID) {
    var moduleName = $('#FrmUserPermissionSearch').find('#nav-search-input').val();
    $.ajax({
        url: '/DMNguoidungArea/DMNguoidung/SearchUserPermission?id=' + UserID + '&moduleName=' + moduleName,
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            $('#UserPermissionSection').html(result);
        }
    })
}