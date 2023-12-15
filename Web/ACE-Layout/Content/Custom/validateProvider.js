function checkRequireWithIDErr(formID, fieldID, errID) {
    var check_err = false;
    if ($("#" + formID + " #" + fieldID).val().trim() == "") {
        $("#" + formID + " #" + errID).html("Bạn phải nhập thông tin này");
        $("#" + formID + " #" + errID).css('display', 'inline');
        check_err = true;
    } else {
        $(this).next().find(".error").css('display', 'none');
    }
    return check_err;
}

function ValidateFieldNumber(formID) {
    var valid = true;
    var pattern = /^[0-9]+$/;
    var obj = $("#" + formID + " .validateNumber");
    obj.each(function () {
        var parent = $(this).parents(" .form-group").first();
        var errText = parent.find(".error");
        if ($(this).val().trim() == "") {
            errText.html("Bạn phải nhập thông tin này");
            errText.css("display", "inline");
            valid = false;


        } else {
            if (!pattern.test($(this).val())) {
                errText.html("Bạn chỉ được nhập số");
                errText.css("display", "inline");
                valid = false;

            }
            else {
                errText.css("display", "none");
            }
        }
    })
    return valid;
}

function ValidateFieldDate(formID) {
    var valid = true;
    var pattern = /^[0-3][0-9]\/[01][0-9]\/[12][0-9][0-9][0-9]$/;

    var obj = $("#" + formID + " .validateDate");

    obj.each(function () {
        var parent = $(this).parents(" .form-group").first();
        var errText = parent.find(".error");
        if ($(this).val().trim() == "") {
            errText.html("Bạn phải nhập thông tin này");
            errText.css("display", "inline");
            valid = false;
        } else {
            if (!pattern.test($(this).val())) {
                errText.html("Vui lòng nhập đúng định dạng ngày dd/mm/yyyy");
                errText.css("display", "inline");
                valid = false;
            }
            else {
                errText.css("display", "none");

            }
        }
    })
    return valid;
}

function ValidateFieldEmail(formID) {
    var valid = true;
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var obj = $("#" + formID + " .validateEmail");

    obj.each(function () {
        var parent = $(this).parents(" .form-group").first();
        var errText = parent.find(".error");
        if ($(this).val().trim() == "") {
            errText.html("Bạn phải nhập thông tin này");
            errText.css("display", "inline");
            valid = false;


        } else {
            if (!pattern.test($(this).val())) {
                errText.html("Vui lòng nhập đúng định dạng email.");
                errText.css("display", "inline");
                valid = false;

            }
            else {
                errText.css("display", "none");
            }
        }
    })
    return valid;
}

function AjaxCheckExist(url, para) {
    var result = false;
    $.ajax({
        url: url,
        data: para,
        type: "Post",
        async: false,
        success: function (rs) {
            if (rs == true) {
                result = true;
            }
        }
    });
    return result;
}

function ValidateFieldPhone(formID) {
    var valid = true;
    var pattern = /^0[1-9]{1}[0-9]{8,9}$/;

    var obj = $("#" + formID + " .validatePhone");

    obj.each(function () {
        var parent = $(this).parents(" .form-group").first();
        var errText = parent.find(".error");
        if ($(this).val().trim() == "") {
            errText.html("Bạn phải nhập thông tin này");
            errText.css("display", "inline");
            valid = false;


        } else {
            if (!pattern.test($(this).val())) {
                errText.html("Vui lòng nhập đúng định dạng số điện thoại 0xxxxxxxxx. Độ dài 10 đến 11 chữ số");
                errText.css("display", "inline");
                valid = false;

            }
            else {
                errText.css("display", "none");
            }
        }
    })
    return valid;
}

function ValidateFieldCMND(formID) {
    var valid = true;
    var pattern = /^[0-9]{9,12}$/;

    var obj = $("#" + formID + " .validateCMND");

    obj.each(function () {
        var parent = $(this).parents(" .form-group").first();
        var errText = parent.find(".error");
        if ($(this).val().trim() == "") {
            errText.html("Bạn phải nhập thông tin này");
            errText.css("display", "inline");
            valid = false;

        } else {
            if (!pattern.test($(this).val())) {
                errText.html("Bạn chỉ được nhập số độ dài từ 9 đến 12 chữ số");
                errText.css("display", "inline");
                valid = false;

            }
            else {
                errText.css("display", "none");

            }
        }
    })
    return valid;
}


function requiredField() {
    var check_err = false;
    $(".required").each(function () {
        if ($(this).val().trim() == "") {
            $(this).next().find(".error").html("Bạn phải nhập thông tin này");
            $(this).next().find(".error").css('display', 'inline');
            check_err = true;
        } else {
            $(this).next().find(".error").css('display', 'none');
        }
    });
    return check_err;
}

function IsDate(formID, fieldID) {
    var valid = true;
    var dateStr = $("#" + formID + " #" + fieldID).val();

    var pattern = /^[0-3][0-9]\/[01][0-9]\/2[0-9][0-9][0-9]$/;
    if ($("#" + formID + " #" + fieldID).val().trim() != "") {
        if (pattern.test(dateStr) == false) {

            valid = false;
        }
    } else {
        valid = false;

    }
    return valid;
}


function regexDate(formID, fieldID, errID) {
    var valid = false;
    var dateStr = $("#" + formID + " #" + fieldID).val();

    var pattern = /^[0-3][0-9]\/[01][0-9]\/2[0-9][0-9][0-9]$/;
    if ($("#" + formID + " #" + fieldID).val().trim() == "") {
        $("#" + formID + " #" + errID).html("Vui lòng nhập thông tin này");
        $("#" + formID + " #" + errID).css('display', 'inline');
        valid = true;
    } else {

        if (pattern.test(dateStr) == false) {
            $("#" + formID + " #" + errID).html("Sai đinh dạng ngày VD: dd/mm/yyyy");
            $("#" + formID + " #" + errID).css('display', 'inline');
            valid = true;
        } else {
            $("#" + formID + " #" + errID).css('display', 'none');

        }
    }
    return valid;
}

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}
function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[1] - 1, mdy[0]);
}
//chuyển date sang dd/MM/yyyy
function DateToText(obj) {
    var mon = '';
    if ((obj.getMonth() + 1) < 10) {
        mon = "0" + (obj.getMonth() + 1);
    } else {
        mon = (obj.getMonth() + 1);
    }
    var day = "";
    if (obj.getDate() < 10) {
        day = '0' + obj.getDate();
    } else {
        day = obj.getDate();
    }
    var date_string = day + "/" + mon + "/" + obj.getFullYear();
    return date_string;
}

function requiredFieldForFormId(form_id) {
    var check_err = false;
    $("#" + form_id + " .required").each(function () {
        var parent = $(this).parents(" .form-group").first();
        var errText = parent.find(".error");
        if ($(this).val() == null || $(this).val().trim() == "") {

            errText.html("Bạn phải nhập thông tin này");
            errText.css('display', 'inline');
            //$(this).next().find(".error").html("Bạn phải nhập thông tin này");
            //$(this).next().find(".error").css('display', 'inline');
            check_err = true;
        } else {
            //$(this).next().find(".error").css('display', 'none');
            errText.css('display', 'none');
        }
    });
    return check_err;
}

function regexEmail(form_id) {
    var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var check_err = false;
    $("#" + form_id + " .email").each(function () {
        if ($(this).val().trim() != "") {
            if (pattern.test($(this).val().trim()) == false) {
                $(this).next().find(".error").html("Bạn phải nhập đúng định dạng email");
                $(this).next().find(".error").css('display', 'inline');
                check_err = true;
            } else {
                $(this).next().find(".error").css('display', 'none');
            }
        }
    });
    return check_err;
}

function isURL(str) {
    var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    var url = new RegExp(urlRegex, 'i');
    return str.length < 2083 && url.test(str);
}

function regexCMT(form_id) {
    var pattern = /^[0-9]{9,12}$/;
    var check_err = false;
    $("#" + form_id + " .regexCMT").each(function () {
        if ($(this).val().trim() != "") {
            if (pattern.test($(this).val().trim()) == false) {
                $(this).next().find(".error").html("Bạn chỉ được nhập số độ dài 9-12");
                $(this).next().find(".error").css('display', 'inline');
                check_err = true;
            } else {
                $(this).next().find(".error").css('display', 'none');
            }
        }
    });
    return check_err;
}

function CheckRangeDate(formID, DateStartID, DateEndID) {
    var valid = true;
    var dateStart = parseDate($("#" + formID + " #" + DateStartID).val());
    var dateEnd = parseDate($("#" + formID + " #" + DateEndID).val());
    if (dateEnd < dateStart) {
        valid = false;
    }
    return valid;
}



function regexNumber(form_id) {
    var pattern = /^[0-9]+$/;
    var check_err = false;
    $("#" + form_id + " .regexNumber").each(function () {
        if ($(this).val().trim() != "") {
            if (pattern.test($(this).val().trim()) == false) {
                $(this).next().find(".error").html("Bạn chỉ được nhập số");
                $(this).next().find(".error").css('display', 'inline');
                check_err = true;
            } else {
                if (parseInt($(this).val(), 10) < 0) {
                    $(this).next().find(".error").html("Thông tin này phải nhập số có giá trị lớn hơn 0");
                    $(this).next().find(".error").css('display', 'inline');
                    check_err = true;
                } else {
                    $(this).next().find(".error").css('display', 'none');
                }
            }
        }
    });
    return check_err;
}

function GetRangeDay(first, second) {
    return (second - first) / (1000 * 60 * 60 * 24);
}


function NotifErr(message) {
    notif({
        type: 'error',
        position: 'bottom',
        msg: message,
        timeout: 5000
    });
}

function StateAction(ObjectName, state, action) {
    if (state != "") {

        var message;

        if (state == "True") {
            switch (action) {
                case '1':
                    message = "Thêm mới " + ObjectName + " thành công";
                    break;
                case '2':
                    message = "Cập nhật " + ObjectName + " thành công";
                    break;
                case '3':
                    message = "Xóa " + ObjectName + " thành công";
                    break;
            }



            notif({
                type: 'success',
                position: 'bottom',
                msg: message,
                timeout: 5000
            });
        } else {

            switch (action) {
                case '1':
                    message = "Thêm mới " + ObjectName + " thất bại";
                    break;
                case '2':
                    message = "Cập nhật " + ObjectName + " thất bại";
                    break;
                case '3':
                    message = "Xóa " + ObjectName + " thất bại";
                    break;
            }
            notif({
                type: 'error',
                position: 'bottom',
                msg: message,
                timeout: 5000
            });
        }
    }
}


function commonNotifySuccess(mes) {
    notif({
        type: 'success',
        position: 'bottom',
        msg: mes,
        timeout: 5000
    });
}

function DeleteConfirm(url, para, objecName) {
    $.confirm({
        'title': 'Xác nhận xóa',
        'message': 'Bạn có chắc chắn muốn xóa ' + objecName + ' này?',
        'buttons': {
            'Đồng ý': {
                'class': 'btn-confirm-yes btn-info',
                'action': function () {
                    $.ajax({
                        url: url,
                        data: para,
                        type: 'Post',
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                commonNotifySuccess('Đã xóa ' + objecName);
                                setTimeout(function () {
                                    refreshPageClient();
                                }, 500);
                            } else
                                commonNotifyError(result.message);
                        }, error: function (result) {
                            alert(result.responseText);
                        }
                    })
                }
            },
            'Hủy bỏ': {
                'class': 'btn-danger',
                'action': function () { }
            }
        }
    });


}

function refreshPage(url, para, updateID) {
    $.ajax({
        url: url,
        type: 'GET',
        data: para,
        dataType: 'html',
        success: function (result) {
            $("#" + updateID).html(result);
        }, error: function (result) {
            alert(result.responseText);
        }
    });

}
function GetPartial(url, para, updateID) {
    $.ajax({
        url: url,
        type: 'GET',
        data: para,
        dataType: 'html',
        success: function (result) {
            $("#" + updateID).html(result);
        }, error: function (result) {
            alert(result.responseText);
        }
    });
}

function GetPartialThen(url, para, updateID) {
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        data: para,
        dataType: 'html',
        success: function (result) {
            $("#" + updateID).html(result);
        }, error: function (result) {
            alert(result.responseText);
        }
    });
}
//Lấy url ảnh ckeditor
function updateValue(id, value) {
    var dialog = CKEDITOR.dialog.getCurrent();
    dialog.setValueOf('info', 'txtUrl', value);
}