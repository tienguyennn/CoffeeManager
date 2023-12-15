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

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[1], mdy[0]);
}

function requiredFieldForFormId(form_id) {
    var check_err = false;
    $("#" + form_id + " .required").each(function () {
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
    if (dateEnd<dateStart) {
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

