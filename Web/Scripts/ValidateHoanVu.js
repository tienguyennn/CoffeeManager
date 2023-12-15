
function InitValidate(idform) {
    $("#" + idform + " input.Valid").blur(function () {
        clearMessage($(this));
        return ValidElementRequired($(this))
            && ValidElementLengthCharacter($(this))
            && ValidElementDate($(this))
            && ValidElementPassword($(this))
            && ValidElementCMND($(this))
            && ValidElementEmail($(this))
            && ValidElementNumber($(this))
            && ValidElementPhone($(this));


    })
    //$("#" + idform + " input:text.Valid.IsRequire.IsDate").change(function () {
    //    clearMessage($(this));
    //    return ValidElementRequired($(this))
    //})
    //$("#" + idform + " input:file.Valid").blur(function () {
    //    clearMessage($(this));
    //    return ValidElementRequired($(this))
    //})

    $("#" + idform + " input:text.Valid").keyup(function () {
        clearMessage($(this));
        return ValidElementRequired($(this))
            && ValidElementLengthCharacter($(this))
            && ValidElementDate($(this))
            && ValidElementPassword($(this))
            && ValidElementCMND($(this))
            && ValidElementEmail($(this))
            && ValidElementNumber($(this))
            && ValidElementPhone($(this));


    })

    $("#" + idform + " textarea.Valid").blur(function () {
        clearMessage($(this));
        return ValidElementTextArea($(this));
    })

    $("#" + idform + " select.Valid").blur(function () {
        clearMessage($(this));
        return ValidElementSelect($(this));
    })


}

function clearMessage(element) {
    var datatext = element.val();
    var parent = element.parents(" .form-group").first();
    var errText = parent.find(".error");
    $(this).removeClass("forcusError");
    errText.css("display", "none");

}
//Validate yêu cầu nhập
function ValidElementRequired(element) {

    var check_err = true;
    if (element.is(".IsRequire")) {
        var parent = element.parents(" .form-group").first();
        var errText = parent.find(".error");
        if (element.val() == null || element.val().length == 0 || element.val().toString().trim() == "") {
            element.addClass("forcusError");
            errText.html("Bạn phải nhập thông tin này");
            errText.css('display', 'inline');
            check_err = false;
        } else {
            element.removeClass("forcusError");
            errText.css('display', 'none');
        }
    }
    return check_err;
}

//Kiểm tra số ký tự
function ValidElementLengthCharacter(element) {
    var check_err = true;

    var parent = element.parents(" .form-group").first();
    var errText = parent.find(".error");
    var soKyTu = element.val().length;


    var maxLength = element.attr("data-maxLength");
    var length = element.attr("data-length");
    var minLength = element.attr("data-minLength");

    if (soKyTu == 0) {
        return true;
    }
    if (length != null && parseInt(length) > 0 && soKyTu != length) {

        element.addClass("forcusError");
        errText.html("Yêu cầu bắt buộc " + length + " ký tự");
        errText.css('display', 'inline');
        check_err = false;
        return check_err;
    } else {
        element.removeClass("forcusError");
        errText.css('display', 'none');
    }

    if (maxLength != null && parseInt(maxLength) > 0 && soKyTu > maxLength) {

        element.addClass("forcusError");
        errText.html("Số ký tự cần nhỏ hơn hoặc bằng " + maxLength);
        errText.css('display', 'inline');
        check_err = false;
        return check_err;
    } else {
        element.removeClass("forcusError");
        errText.css('display', 'none');

    }

    if (minLength != null && parseInt(minLength) > 0 && soKyTu < minLength) {

        element.addClass("forcusError");
        errText.html("Số ký tự cần lớn hơn hoặc bằng " + minLength);
        errText.css('display', 'inline');
        check_err = false;
        return check_err;
    } else {
        element.removeClass("forcusError");
        errText.css('display', 'none');

    }
    return check_err;
}

//Validate yêu cầu nhập ngày tháng

function ValidElementDate(element) {
    var valid = true;
    if (element.is(".IsDate")) {
        var pattern = /^[0-3][0-9]\/[01][0-9]\/[12][0-9][0-9][0-9]$/;

        var parent = element.parents(".form-group");
        var errText = parent.find(".error");
        var textDate = element.val();
        if (element.val().trim() != "") {

            if (!pattern.test(element.val().trim())) {
                element.addClass("forcusError");
                errText.html("Vui lòng nhập đúng định dạng ngày dd/mm/yyyy");
                errText.css("display", "inline");
                valid = false;
            }
            else {
                var validRang = HopLeNgayThang(textDate);
                if (validRang) {
                    element.addClass("forcusError");
                    errText.html(validRang);
                    errText.css("display", "inline");
                    valid = false;
                } else {
                    element.removeClass("forcusError");
                    errText.css("display", "none");
                }
            }
        }
    }
    return valid;
}

//Validate Password
function ValidElementPassword(element) {
    var valid = true;
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[0-9A-Za-z\d$@#$!%*?&]{8,100}/;
    var dataText = element.val().trim();
    if (element.is(".IsPassword") && dataText != "") {
        var parent = element.parents(" .form-group").first();
        var errText = parent.find(".error");
        if (!pattern.test(dataText)) {
            errText.html("Tối thiểu gồm 8 ký tự, bao gồm ký tự hoa, ký tự thường và ký tự đặc biệt");
            element.addClass("forcusError");
            errText.css("display", "inline");
            valid = false;
        }
        else {
            errText.css("display", "none");
            element.removeClass("forcusError");
        }
    }
    return valid;
}

//Validate chứng minh thư căn cước công dân
function ValidElementCMND(element) {
    var valid = true;
    var pattern = /^[0-9]{9,12}$/;
    var parent = element.parents(" .form-group").first();
    var errText = parent.find(".error");
    var dataText = element.val().trim()
    if (element.is(".IsCMND") && dataText != "") {
        if (!pattern.test(dataText)) {
            element.addClass("forcusError");
            errText.html("Yêu cầu từ 9 đến 12 chữ số");
            errText.css("display", "inline");
            valid = false;
        }
        else {
            element.removeClass("forcusError");
            errText.css("display", "none");
        }
    }

    return valid;
}

//Validate số điện thoại
function ValidElementPhone(element) {
    var valid = true;
    var pattern = /^0[1-9]{1}[0-9]{8,9}$/;

    var parent = element.parents(" .form-group").first();
    var errText = parent.find(".error");
    var dataText = element.val().trim();

    if (element.is(".IsPhone") && dataText != "") {
        if (!pattern.test(dataText)) {
            element.addClass("forcusError");
            errText.html("Số điện thoại 0xxxxxxxxx. Độ dài 10 đến 11 chữ số");
            errText.css("display", "inline");
            valid = false;
        }
        else {
            element.removeClass("forcusError");
            errText.css("display", "none");
        }
    }

    return valid;
}
//Yêu cầu nhập area
function ValidElementTextArea(element) {
    var check_err = true;

    var parent = element.parents(" .form-group").first();
    var errText = parent.find(".error");
    var dataText = element.val().trim();
    if (element.is(".IsRequire")) {
        if (dataText == "") {
            element.addClass("forcusError");
            errText.html("Bạn phải nhập thông tin này");
            errText.css("display", "inline");
            check_err = false;
        } else {
            element.removeClass("forcusError");
            errText.css("display", "none");
        }

        return check_err;
    }
}

function ValidElementSelect(element) {
    var check_err = true;

    var parent = element.parents(" .form-group").first();
    var errText = parent.find(".error");
    var dataText = element.val();
    if (element.is(".IsRequire")) {

        if (dataText == null || dataText.length == 0) {
            element.addClass("forcusError");
            errText.html("Bạn phải nhập thông tin này");
            errText.css('display', 'inline');
            check_err = false;
        } else {
            errText.css('display', 'none');
            element.removeClass("forcusError");

        }
    }

    return check_err;
}

function checkForm(idform) {
    var err = 0;
    $("#" + idform + " input.Valid").each(function () {
        clearMessage($(this));
        var self = $(this);
        if (self.prop("type") == 'text') {
            var dataText = $(this).val().trim();
            if (dataText.length > 0) {
                $(this).val(dataText.trim())
            }
        }


        err += ValidElementRequired($(this))
            && ValidElementLengthCharacter($(this))
            && ValidElementDate($(this))
            && ValidElementPassword($(this))
            && ValidElementCMND($(this))
            && ValidElementEmail($(this))
            && ValidElementNumber($(this))
            && ValidElementPhone($(this)) ? 0 : 1;
    })
    $("#" + idform + " textarea.Valid").each(function () {
        clearMessage($(this));
        err += ValidElementTextArea($(this)) ? 0 : 1;
    })

    $("#" + idform + " select.Valid").each(function () {
        clearMessage($(this));
        err += ValidElementSelect($(this)) ? 0 : 1;
    })
    if (err) {
        return false;
    } else {
        return true;
    }
}

function ValidElementEmail(element) {
    var valid = true;
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var parent = element.parents(" .form-group").first();
    var errText = parent.find(".error");
    var dataText = element.val().trim();

    if (element.is(".IsEmail") && dataText != "") {
        if (!pattern.test(dataText)) {
            errText.html("Vui lòng nhập đúng định dạng email.");
            errText.css("display", "inline");
            valid = false;
            element.addClass("forcusError");
        }
        else {
            errText.css("display", "none");
            element.removeClass("forcusError");
        }

    }
    return valid;
}

function ValidElementNumber(element) {
    var valid = true;
    var pattern = /^[0-9]+$/;
    var parent = element.parents(" .form-group").first();
    var errText = parent.find(".error");
    var dataText = element.val().trim();
    if (element.is(".IsNumber") && dataText != "") {

        if (!pattern.test(dataText)) {
            errText.html("Bạn chỉ được nhập số");
            errText.css("display", "inline");
            valid = false;
            element.addClass("forcusError");

        } else {
            errText.css("display", "none");
            element.removeClass("forcusError");
        }

    };
    return valid;
}


function onConfirmDelete(url, params, entityName, callBack) {
    $.confirm({
        'title': 'XÁC NHẬN XÓA',
        'message': 'Bạn có chắc chắn muốn xóa đối tượng <b>' + entityName + '</b> này?',
        'buttons': {
            'Đồng ý': {
                'class': 'btn-primary btn-info',
                'action': function () {
                    if (url) {
                        $.ajax({
                            url: url,
                            data: params,
                            type: 'post',
                            dataType: 'json',
                            success: function (result) {
                                if (result.Status === true) {
                                    NotiSuccess('Đã xóa đối tượng ' + entityName);
                                    if (callBack && typeof (callBack) === 'function') {
                                        callBack();
                                    } else {
                                        refreshPage();
                                    }
                                } else {
                                    NotiError(result.Message);
                                }
                            }, error: function (result) {
                                NotiError(result.responseText);
                            }, beforeSend: function () {
                                onStartAjax();
                            }, complete: function () {
                                onEndAjax();
                            }
                        })
                    } else {
                        NotiSuccess('Đã xóa đối tượng ' + entityName);
                        if (callBack && typeof (callBack) === 'function') {
                            callBack();
                        } else {
                            refreshPage();
                        }
                    }
                }
            },
            'Hủy bỏ': {
                'class': 'btn-danger',
                'action': function () {

                    /**
                      * trường hợp xóa nhanh tag văn bản
                      */
                    if (typeof $isEditTagMode !== 'undefined' && $isEditTagMode) {
                        $isEditTagMode = false;
                    }
                }
            }
        }
    });
}

function onStartAjax() {
    //waitingDialog.show('Đang xử lý...', {
    //    headerText: '',
    //    headerSize: 3,
    //    headerClass: '',
    //    dialogSize: 'sm',
    //    progressType: 'success',
    //    contentElement: 'p',
    //    contentClass: 'content'
    //});
    //document.getElementById("overlay").style.display = "block";
    $(".loading-ajax").html("Đang xử lý");
    $(".loading-ajax").show();
}

function onEndAjax() {
    //waitingDialog.hide()
    //document.getElementById("overlay").style.display = "none";
    $(".loading-ajax").hide();
}


function onConfirmDeleteNotAjax(title, callBack) {
    
    if (title == null || title == '') {
        title = "Bạn xác nhận thực hiện thao tác này ?";
    }
    $.confirm({
        title: 'Xác nhận xóa',
        content: title,
        draggable: false,
        theme: 'material',
        buttons: {
            confirm: {
                btnClass: 'btn-primary',
                text: "Xác nhận",
                action: function () {


                }
            }
        }
    });
}





/**
 * @author:duynn
 * @description: hiển thị hộp thoại xác nhận xóa một đối tượng
 * @since: 23/05/2019
 * @param {any} url: đường dẫn gọi hàm xóa trên server
 * @param {any} params: tham số để xóa (ví dụ: id, name, ...)
 * @param {any} entityName: tên đối tượng xóa
 * @param {any} callBack: hàm thực hiện sau khi xóa thành công
 */
function onConfirmDeleteVanBan(url, params, entityName, callBack) {
    $.confirm({
        'title': 'XÁC NHẬN XÓA',
        'message': 'Bạn có muốn xóa văn bản này không?',
        'buttons': {
            'Đồng ý': {
                'class': 'btn-confirm-yes btn-info',
                'action': function () {
                    if (url) {
                        $.ajax({
                            url: url,
                            data: params,
                            type: 'post',
                            dataType: 'json',
                            success: function (result) {
                                if (result.Status === true) {
                                    notifySuccess('Đã xóa đối tượng ' + entityName);
                                    if (callBack && typeof (callBack) === 'function') {
                                        callBack();
                                    } else {
                                        refreshPage();
                                    }
                                } else {
                                    notifyError(result.Message);
                                }
                            }, error: function (result) {
                                notifyError(result.responseText);
                            }, beforeSend: function () {
                                onStartAjax();
                            }, complete: function () {
                                onEndAjax();
                            }
                        })
                    } else {
                        notifySuccess('Đã xóa đối tượng ' + entityName);
                        if (callBack && typeof (callBack) === 'function') {
                            callBack();
                        } else {
                            refreshPage();
                        }
                    }
                }
            },
            'Hủy bỏ': {
                'class': 'btn-danger',
                'action': function () {

                    /**
                      * trường hợp xóa nhanh tag văn bản
                      */
                    if (typeof $isEditTagMode !== 'undefined' && $isEditTagMode) {
                        $isEditTagMode = false;
                    }
                }
            }
        }
    });
}


/**
 * hiển thị hộp thoại xác nhận một hành động
 * @param {any} url
 * @param {any} params
 * @param {any} confirmMessage
 * @param {any} callBack
 */
function onConfirmAjax(url, params, confirmMessage, callBack) {
    $.confirm({
        'title': 'XÁC NHẬN',
        'message': confirmMessage || 'Bạn có chắc chắn thực hiện hành động này',
        'buttons': {
            'Đồng ý': {
                'class': 'btn-confirm-yes btn-info',
                'action': function () {
                    if (url) {
                        $.ajax({
                            url: url,
                            data: params,
                            type: 'post',
                            dataType: 'json',
                            success: function (result) {
                                if (result.Status === true) {
                                    if (callBack && typeof (callBack) === 'function') {
                                        callBack(result);
                                    } else {
                                        refreshPage();
                                    }
                                } else {
                                    notifyError(result.Message);
                                }
                            }, error: function (result) {
                                notifyError(result.responseText);
                            }, beforeSend: function () {
                                onStartAjax();
                            }, complete: function () {
                                onEndAjax();
                            }
                        })
                    } else {
                        notifySuccess('Đã xóa đối tượng ' + entityName);
                        if (callBack && typeof (callBack) === 'function') {
                            callBack();
                        } else {
                            refreshPage();
                        }
                    }
                }
            },
            'Hủy bỏ': {
                'class': 'btn-danger',
                'action': function () {
                }
            }
        }
    });
}