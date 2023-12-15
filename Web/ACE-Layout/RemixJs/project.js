$(document).ready(function () {
    //khởi tạo dropdown
    $(".select2").select2();

    //khỏi tạo editor
    tinymce.init({
        selector: '#GIOITHIEU, #VITRI, #QUYMO',
        language: 'vi_VN',
        width: '100%',
        height: 150,
        plugins: [
                "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
                "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                "table contextmenu directionality emoticons template textcolor paste textcolor colorpicker textpattern"
        ],
        toolbar1: "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
        toolbar2: "cut copy paste pastetext | bullist numlist | outdent indent | undo redo | link unlink code | forecolor backcolor",
        toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | insertdatetime preview | print fullscreen | ltr rtl | pagebreak restoredraft",
        menubar: false,
        convert_urls: false,
        paste_data_images: true,
        toolbar_items_size: 'small'
    });
    $(".date-picker").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true, yearRange: "-5:+20",
        showWeek: false, weekHeader: "Tuần",
    });
    $(".date-picker").keyup(function () {
        if ($(this).val().length == 2) {
            $(this).val($(this).val() + "/");
        } else if ($(this).val().length == 5) {
            $(this).val($(this).val() + "/");
        }
    });
})
function customerAddImgPreview(img_id, file_id, show_id, remove_id) {
    try {
        var img = document.getElementById(img_id),
        fileImg = document.getElementById(file_id).files[0];

        var fileName = $('#' + file_id).val().match(/[^\/\\]+$/)
        if (/\.(jpe?g|png|gif)$/i.test(fileName)) {
            var reader = new FileReader();
            reader.addEventListener('load', function () {
                img.src = reader.result;
                $('#' + show_id).val(fileName);
                $('#' + remove_id).show();
            }, false);
            if (fileImg) {
                reader.readAsDataURL(fileImg);
            }
        }
    } catch (err) {
        alert(err.message);
    }
}
function createCustomerMoveImage(img_id, file_id, show_id, remove_id) {
    moveImage('#' + img_id, '#' + file_id);
    $('#' + show_id).val("");
    $('#' + remove_id).hide();
}

function validateForm() {
    checkRequireInputtextForm("form-create-duan");
    RequireDropDownlist("form-create-duan");
    var checkImage = false;

    if ($("#AnhGioiThieu").first().attr("src") == undefined || $("#AnhGioiThieu").first().attr("src") == "") {        
        $("#insert-AnhGioiThieu-msg").html("Bạn phải upload ảnh giới thiệu dự án");
        $("#insert-AnhGioiThieu-msg").css({ opacity: 1 });
        checkImage = true;
    }
    if ($("#AnhQuyMo").first().attr("src") == undefined || $("#AnhQuyMo").first().attr("src") == "") {
        checkImage = true;
        $("#insert-AnhQuyMo-msg").html("Bạn phải upload ảnh quy mô dự án");
        $("#insert-AnhQuyMo-msg").css({ opacity: 1 });
    }
    if ($("#AnhViTri").first().attr("src") == undefined || $("#AnhViTri").first().attr("src") == "") {
        checkImage = true;
        $("#insert-AnhViTri-msg").html("Bạn phải upload ảnh vị trí dự án");
        $("#insert-AnhViTri-msg").css({ opacity: 1 });
    }
    if ($("#AnhSoDo").first().attr("src") == undefined || $("#AnhSoDo").first().attr("src") == "") {
        checkImage = true;
        $("#insert-AnhSoDo-msg").html("Bạn phải upload ảnh sơ đồ dự án");
        $("#insert-AnhSoDo-msg").css({ opacity: 1 });
    }

    if ($(".error:visible").length > 0 || checkImage) {
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
        $("#form-create-duan").submit();
    }
    
}