jQuery(function () {
    documentLoaded();
})

function documentLoaded() {
    //set active menu bar
    $(".menu_ngang_openland li").removeClass("active");
    $("#customer_menu").addClass("active");

    $('#CreateCustomerSection #Male').prop('checked', true);
    $('#CreateCustomerSection select.form-dropdown').chosen();
    $('#CreateCustomerSection input.date-picker').datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '-100:+0',
        showAnim: 'slideDown'
    });
    $.mask.definitions['~'] = '[+-]';
    $('#insert-CMND').mask('999-999-999-999');
    $('#insert-SODIDONG').mask('(999) 999-9999');
    $('#insert-SOMAYBAN').mask('(9) 999-9999');
    $('#CreateCustomerSection input.date-picker').mask('99/99/9999');
    $('#CreateCustomerSection textarea.cst-txtarea').css('height', '50px');
    
}
function createCustomerValidation() {
    var name = $('#insert-HOTEN').val().trim(),
        identityNumber = $('#insert-CMND').val().trim(),
        job = $('#insert-NGHENGHIEP').val(),
        customerGroup = $('#insert-NHOMKH').val(),
        email = $('#insert-EMAIL').val().trim();
    if (name === '') {
        $('#insert-HOTEN-msg').text('Họ tên không để trống');
        showMessage('#insert-HOTEN-msg');
        $('#insert-HOTEN').focus();
        return false;
    }
    if (identityNumber === '' || identityNumber === '___-___-___-___') {
        $('#insert-CMND-msg').text('Số CMND không để trống');
        showMessage('#insert-CMND-msg');
        $('#insert-CMND').focus();
        return false;
    }
    if (parseInt(job) === 0) {
        $('#insert-NGHENGHIEP-msg').text('Chọn nghề nghiệp');
        showMessage('#insert-NGHENGHIEP-msg');
        $('#insert-NGHENGHIEP').focus();
        return false;
    }
    if (parseInt(customerGroup) === 0) {
        $('#insert-NHOMKH-msg').text('Chọn nhóm khách hàng');
        showMessage('#insert-NHOMKH-msg');
        $('#insert-NHOMKH').focus();
        return false;
    }
}

//function insertCustomerValidation() {
//    var valid = true;
//    var customerName = $('#insert-HOTEN').val().trim(),
//        customerEmail = $('#insert-EMAIL').val().trim(),
//        //customerMobile = $('#insert-SODIDONG').val().trim(),
//        //customerDeskPhone = $('#insert-SOMAYBAN').val().trim(),
//        customerCardID = $('#insert-CMND').val(),
//        customerWebsiteUrl = $('#insert-WEBSITE').val().trim(),
//        customerType = $("#insert-NHOMKH").val(),
//        customerJob = $('#insert-NGHENGHIEP').val(),
//        customerAvatar = document.getElementById("insert-ANHDAIDIEN").files[0],
//        availableEmailList = $('#gridKhachHangWrapper tbody tr').find('td:eq(3)').text();
//    if (!customerName || customerName === "") {
//        valid = false;
//        $('#insert-HOTEN').focus();
//        $('#insert-HOTEN-msg').text("Họ tên không được trống");
//        showMessage('#insert-HOTEN-msg');
//    }
//    //if (!customerEmail || customerEmail === '') {
//    //    valid = false;
//    //    $('#insert-EMAIL').focus();
//    //    $('#insert-EMAIL-msg').text('Email không được để trống');
//    //    showMessage('#insert-EMAIL-msg');
//    //} else {
//    //    if (!validateEmail(customerEmail)) {
//    //        valid = false;
//    //        $('#insert-EMAIL').focus();
//    //        $('#insert-EMAIL-msg').text('Email không hợp lệ');
//    //        showMessage('#insert-EMAIL-msg');
//    //    } else {
//    //        availableEmailList.indexOf()
//    //    }
//    //}
//    if (customerEmail !== '') {
//        if (!validateEmail(customerEmail)) {
//            valid = false;
//            $('#insert-EMAIL').focus();
//            $('#insert-EMAIL-msg').text('Email không hợp lệ !');
//            showMessage('#insert-EMAIL-msg');
//        }
//    }
//    //if (!customerMobile || customerMobile === '') {
//    //    valid = false;
//    //    $('#insert-SODIDONG-msg').text('Số di động không được trống');
//    //    showMessage('#insert-SODIDONG-msg');
//    //}
//    //if (!customerDeskPhone || customerDeskPhone === '') {
//    //    valid = false;
//    //    $('#insert-SOMAYBAN-msg').text('Số máy bàn không được trống');
//    //    showMessage('#insert-SOMAYBAN-msg');
//    //}
//    if (customerWebsiteUrl !== '') {
//        if (validateUrl(customerWebsiteUrl) == false) {
//            valid = false;
//            $('#insert-WEBSITE-msg').text('Địa chỉ website không hợp lệ');
//            showMessage('#insert-WEBSITE-msg');
//        }
//    }
//    if (customerJob == 0) {
//        valid = false;
//        $('#insert-NGHENGHIEP-msg').text('Chọn nghề nghiệp khách hàng');
//        showMessage('#insert-NGHENGHIEP-msg');
//    }

//    if (customerType == 0) {
//        valid = false;
//        $('#insert-NHOMKH-msg').text('Chọn nhóm khách hàng');
//        showMessage('#insert-NHOMKH-msg');
//    }
//    if (customerAvatar != null) {
//        var validImage = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmp', 'image/bpg', 'image/pbm'];
//        if ($.inArray(customerAvatar.type, validImage) < 0) {
//            valid = false;
//            $('#insert-ANHDAIDIEN-msg').text('file ảnh không hợp lệ');
//            showMessage('#insert-ANHDAIDIEN-msg');
//        }
//    }
//    if (!customerCardID || customerCardID === '___-___-___-___') {
//        valid = false;
//        $('#insert-CMND-msg').text('CMND không để trống');
//        showMessage('#insert-CMND-msg');
//    }
//    return valid;
//}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateUrl(url) {
    var re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return re.test(url);
}
function previewImage() {
    var img = document.getElementById('CustomerAvatar');
    var file = document.getElementById('insert-ANHDAIDIEN').files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function () {
        img.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
    $('#CustomerAvatarFileName').val(document.getElementById('insert-ANHDAIDIEN').value.match(/[^\/\\]+$/));
}

function redirectCreateKhachHang() {
    location.href = "/DMKhachHangArea/DMKhachHang/CreateKhachHang";
}


function CreateCustomer() {
    var check = createCustomerValidation();
    if (check == true) {
        var obj = {
            HOTEN: $('#insert-HOTEN').val().trim(),
            GIOITINH: $('#insert-GIOITINH').val(),
            QUYDANH: $('#insert-QUYDANH').val(),
            NGAYSINH: commonDateFromDatePicker('#insert-NGAYSINH'),
            CMND: $('#insert-CMND').val(),
            NGAYCAP: commonDateFromDatePicker('#insert-NGAYCAP'),
            NOICAP: $('#insert-NOICAP').val(),
            NGUYEN_QUAN: $('#insert-NGUYENQUAN').val() == 0 ? null : $('#insert-NGUYENQUAN').val(),
            THUONG_TRU: $('#insert-THUONGTRU').val(),
            EMAIL: $("#insert-EMAIL").val(),
            DIDONG: $('#insert-SODIDONG').val(),
            SOMAYBAN: $('#insert-SOMAYBAN').val(),
            SKYPE_ID: $('#insert-SKYPE').val(),
            DM_NGHENGHIEP_ID: $('#insert-NGHENGHIEP').val(),
            DM_NHOMKHACHHANG_ID: $('#insert-NHOMKH').val(),
            WEBSITE_URL: $('#insert-WEBSITE').val(),
            FACEBOOK_ADDRESS: $('#insert-FB').val(),
            WITTER_ADDRESS: $('#insert-TWITTER').val(),
            ANHDAIDIEN: $('#CustomerAvatarFileName').val()
        }
        $.ajax({
            url: '/DMKhachHangArea/DMKhachHang/InsertKhachHang',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({ 'insertCustomer': obj }),
            success: function (result) {
                if (result.success == true) {
                    if (result.hasChangeImage == true) {
                        uploadImage(result.imageName, "insert");
                    } else {
                        notif({
                            type: 'success',
                            position: 'bottom',
                            msg: 'Thêm khách hàng mới thành công!',
                        });
                    }
                } else {
                    switch (result.type) {
                        case 1:
                            $('#insert-EMAIL').focus();
                            $('#insert-EMAIL-msg').text(result.message);
                            showMessage('#insert-EMAIL-msg');
                            break;
                        case 2:
                            $('#insert-SODIDONG').focus();
                            $('#insert-SODIDONG-msg').text(result.message);
                            showMessage('#insert-SODIDONG-msg');
                            break;
                        case 3:
                            $('#insert-SOMAYBAN').focus();
                            $('#insert-SOMAYBAN-msg').text(result.message);
                            showMessage('#insert-SOMAYBAN-msg');
                            break;
                        case 4:
                            $('#insert-CMND').focus();
                            $('#insert-CMND-msg').text(result.message);
                            showMessage('#insert-CMND-msg');

                            break;
                        default:
                            notif({
                                type: 'fail',
                                position: 'bottom',
                                msg: result.message,
                            });
                            break;
                    }
                }
            }, error: function (result) {
                notif({
                    type: 'fail',
                    position: 'bottom',
                    msg: result.responseText
                });
            }
        })
    }
}

function uploadImage(imgName, type) {
    var file = document.getElementById('insert-ANHDAIDIEN').files[0];
    var formData = new FormData();
    formData.append("UserAvatar", file);
    formData.append("PictureName", imgName);
    $.ajax({
        url: '/DMKhachHangArea/DMKhachHang/SaveCustomerAvatar',
        type: 'POST',
        dataType: 'json',
        data: formData,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result.success == true) {
                if (type == "insert") {
                    notif({
                        type: 'success',
                        position: 'bottom',
                        msg: 'Thêm khách hàng thành công!',
                    });
                    $('#InsertKhachHangSection').load('/DMKhachHangArea/DMKhachHang/FormInsertKhachHang');
                } else if (type == "update") {
                    notif({
                        type: 'success',
                        position: 'bottom',
                        msg: 'Cập nhật khách hàng thành công!',
                    });
                }

            } else
                alert(result.message);
        }
    })
}

function removeInsertPicture() {
    var file = $('#insert-ANHDAIDIEN');
    file.replaceWith(file = file.clone(true));
    var img = document.getElementById('CustomerAvatar');
    var imgName = document.getElementById('CustomerAvatarFileName');
    if (img.src != "") {
        img.src = "";
    }
    if (imgName.value != "") {
        imgName.value = "";
    }
}

function updateKhachHang() {
    var check = updateCustomerValidation();
    if (check == true) {
        var obj = {
            HOTEN: $('#update-HOTEN').val().trim(),
            GIOITINH: $('#Male').is(':checked') == true ? 1 : 0,
            QUYDANH: $('#update-QUYDANH').val(),
            NGAYSINH: $('#update-NGAYSINH').val(),
            CMND: $('#update-CMND').val(),
            NGAYCAP: $('#update-NGAYCAP').val(),
            NOICAP: $('#update-NOICAP').val(),
            NGUYEN_QUAN: $('#update-NGUYENQUAN').val() == 0 ? null : $('#update-NGUYENQUAN').val(),
            THUONG_TRU: $('#update-THUONGTRU').val(),
            EMAIL: $("#update-EMAIL").val(),
            DIDONG: $('#update-SODIDONG').val(),
            SOMAYBAN: $('#update-SOMAYBAN').val(),
            SKYPE_ID: $('#update-SKYPE').val(),
            DM_NGHENGHIEP_ID: $('#update-NGHENGHIEP').val(),
            DM_NHOMKHACHHANG_ID: $('#update-NHOMKH').val(),
            WEBSITE_URL: $('#update-WEBSITE').val(),
            FACEBOOK_ADDRESS: $('#update-FB').val(),
            WITTER_ADDRESS: $('#update-TWITTER').val(),
            ANHDAIDIEN: $('#CustomerAvatarFileName').val()
        }
        $.ajax({
            url: '/DMKhachHangArea/DMKhachHang/updateKhachHang',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({ 'updateCustomer': obj }),
            success: function (result) {
                if (result.success == true) {
                    if (result.hasChangeImage == true) {
                        uploadImage(result.imageName, "update");
                    } else {
                        notif({
                            type: 'success',
                            position: 'bottom',
                            msg: 'Thêm khách hàng mới thành công!',
                        });
                        setTimeout(function () { location.reload() }, 2000);
                    }
                } else {
                    switch (result.type) {
                        case 1:
                            $('#update-EMAIL').focus();
                            $('#update-EMAIL-msg').text(result.message);
                            showMessage('#update-EMAIL-msg');
                            break;
                        case 2:
                            $('#update-SODIDONG').focus();
                            $('#update-SODIDONG-msg').text(result.message);
                            showMessage('#update-SODIDONG-msg');
                            break;
                        case 3:
                            $('#update-SOMAYBAN').focus();
                            $('#update-SOMAYBAN-msg').text(result.message);
                            showMessage('#update-SOMAYBAN-msg');
                            break;
                        case 4:
                            $('#update-CMND').focus();
                            $('#update-CMND-msg').text(result.message);
                            showMessage('#update-CMND-msg');

                            break;
                        default:
                            notif({
                                type: 'fail',
                                position: 'bottom',
                                msg: result.message,
                            });
                            break;
                    }
                }
            }, error: function (result) {
                notif({
                    type: 'fail',
                    position: 'bottom',
                    msg: result.responseText
                });
            }
        })
    }
}