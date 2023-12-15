$(function () {
    $(".menu_ngang_openland li").removeClass("active");
    $("#quan_li_cau_hinh").addClass("active");

    $(".date-picker").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true, yearRange: "-5:+20",
        showWeek: false, weekHeader: "Tuần",
    });
});


function previewImg() {
    try {
        var img = document.getElementById('UserAvatar'),
        fileImg = document.getElementById('anhdaidien').files[0];

        var fileName = $('#anhdaidien').val().match(/[^\/\\]+$/)
        if (/\.(jpe?g|png|gif)$/i.test(fileName)) {
            var reader = new FileReader();
            reader.addEventListener('load', function () {
                img.src = reader.result;
                //$('#AvatarFileName').val(fileName);
                $('#anhdaidien-remove').show();
            }, false);
            if (fileImg) {
                reader.readAsDataURL(fileImg);
            }
        }
    } catch (err) {
        alert(err.message);
    }
}
function cancelImg() {
    moveImage('#UserAvatar', '#anhdaidien');
    $('#anhdaidien-remove').hide();
}



function insert() {
    checkRequireInputtextForm("CreateUserForm");
    if ($("#RE-MATKHAU").val() != $("#MATKHAU").val()) {
        var errText = $("#RE-MATKHAU").parent().find('.error');
        errText.html("Vui lòng nhập chính xác lại mật khẩu");
        errText.css('display', 'inline');
    } else {
        var errText = $("#RE-MATKHAU").parent().find('.error');
        if ($("#RE-MATKHAU").val().length < 6) {
            
            errText.html("Mật khẩu phải có ít nhất 6 ký tự");
            errText.css('display', 'inline');
        } else {
            errText.css('display', 'none');
        }
    }
    if ($(".error:visible").length > 0) {
        notif({
            type: 'error',
            position: 'bottom',
            msg: 'Bạn phải điền đẩy đủ những thông tin bắt buộc!'
        });
        return false;
    } else {
        notif({
            type: 'success',
            position: 'bottom',
            msg: 'Lưu thông tin dự án thành công!'
        });
        $("#CreateUserForm").submit();
    }
}

function update() {
    checkRequireInputtextForm("UpdateUserForm");
    if ($(".error:visible").length > 0) {
        notif({
            type: 'error',
            position: 'bottom',
            msg: 'Bạn phải điền đẩy đủ những thông tin bắt buộc!'
        });
        return false;
    } else {
        notif({
            type: 'success',
            position: 'bottom',
            msg: 'Lưu thông tin dự án thành công!'
        });
        $("#UpdateUserForm").submit();
    }
}