if (!Array.prototype.last) {
    Array.prototype.last = function () {
        if (this != "" && this.length > 0)
            return this[this.length - 1];
        return "";
    };
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function (value) {
        let index = this.indexOf(value);
        if (index > -1) { // only splice array when item is found
            this.splice(index, 1); // 2nd parameter means remove one item only
        }
    };
}
if (!Array.prototype.clear) {
    Array.prototype.clear = function () {
        while (this.length > 0) {
            this.pop();
        }
    };
}


if (!String.prototype.replaceInRange) {
    String.prototype.replaceInRange = function (
        start,
        end,
        oldValue,
        newValue
    ) {
        return (
            this.substring(0, start) +
            this.substring(start, end).replace(oldValue, newValue) +
            this.substring(end)
        );
    };
}


function GetActionOfStatus(listFunc, status) {
    let lstData = listFunc.filter((item) => {
        return item.Status == status
    });
    return lstData[0];
}

function getLink(configBtn, cl, prams) {

    var url = configBtn.LinkPattern;
    if (prams != null) {
        for (var i = 0; i < prams.length; i++) {
            url = url.replace("{" + i + "}", prams[i]);
        }
    }
    var icon = "";
    if (configBtn.Icon != null) {
        icon = "<i class='" + configBtn.Icon + "'> </i> ";
    }
    switch (configBtn.Type) {
        case 1:
            return "<a class='" + cl + "' href='" + url + "'>" + icon + configBtn.Name + "</a>";
        case 2:
            return "<a class='" + cl + "' href='javascripts:void(0)' onclick='EditAction(\"" + url + "\")'>" + icon + configBtn.Name + "</a>";
        case 3:
            return "<a class='" + cl + "' href='javascripts:void(0)' onclick='confirmLink(\"" + url + "\")'>" + icon + configBtn.Name + "</a>";
    }
}

function confirmLink(url, message) {
    var mss = "Xác nhận thao tác ?";
    if (message != null) {
        mss = message;
    }

    $.confirm({
        title: mss,
        content: "Bạn chắc chắn muốn thực hiện thao tác này",
        draggable: false,
        theme: 'material',
        buttons: {
            confirm: {
                btnClass: 'btn-primary',
                text: "Xác nhận",
                action: function () {
                    AjaxCall(url, 'post', null, function (rs) {
                        if (rs.Status) {
                            NotiSuccess("Thành công", rs.Message);
                            AfterSussessActionAjaxform();
                        } else {
                            NotiError("Lỗi xử lý", rs.Message);
                        }
                    })
                }
            },
            cancel: {
                text: "Đóng",
                action: function () {

                }
            }
        }
    });
}
function chuyendoidata(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
//hàm confirm để gọi ajax
function onConfirmCallAjax(url, type, params, callBack, title, content) {
    if (!title) {
        title = 'Xác nhận thao tác';
    }

    if (!content) {
        content = 'Bạn chắc chắn muốn thực hiện thao tác này';
    }

    $.confirm({
        title: title,
        content: content,
        draggable: false,
        theme: 'material',
        buttons: {
            confirm: {
                btnClass: 'btn-primary',
                text: "Xác nhận",
                action: function () {
                    AjaxCall(url, type, params, callBack);
                }
            },
            cancel: {
                text: "Đóng",
                action: function () {

                }
            }
        }
    });
}

//hàm confirm để gọi một hàm khác
function onConfirmCall(callBack, title, content) {
    if (!title) {
        title = 'Xác nhận thao tác';
    }

    if (!content) {
        content = 'Bạn chắc chắn muốn thực hiện thao tác này';
    }

    $.confirm({
        title: title,
        content: content,
        draggable: false,
        theme: 'material',
        buttons: {
            confirm: {
                btnClass: 'btn-primary',
                text: "Xác nhận",
                action: function () {
                    callBack();
                }
            },
            cancel: {
                text: "Đóng",
                action: function () {

                }
            }
        }
    });
}

function NotiSuccess(title, message) {
    $.gritter.add({
        title: title,
        time: 2000,
        sticky: false,
        text: message,
        class_name: 'gritter-success'
    });
}
function NotiError(title, message) {
    $.gritter.add({
        // (string | mandatory) the heading of the notification
        title: title,
        time: 2000,
        sticky: false,
        position: 'bottom',
        //position: gritter_position,
        // (string | mandatory) the text inside the notification
        text: message,
        class_name: 'gritter-error'
    });
}
function NotiSuccessFrontEnd(message) {
    notif({
        type: 'success',
        position: 'bottom',
        msg: message,
        timeout: 5000
    });
}
function NotiWarninFrontEndg(message) {
    notif({
        type: 'warning',
        position: 'bottom',
        msg: message,
        timeout: 5000
    });
}
function NotiErrorFrontEnd(message) {
    notif({
        type: 'error',
        position: 'bottom',
        msg: message,
        timeout: 5000
    });
}
function AfterSussessActionAjaxform() {
    location.reload();
}

function AjaxSearchSuccess(rs) {
    location.reload();
}

/**
 * duynn
 * @param {any} result
 */
function onAjaxCallSuccess(result) {
    if (result.Status) {
        var $div = $('div[id^="MasterModal"]:last');
        $div.modal("hide");
        $div.empty();
        NotiSuccess("Thành công", result.Message);
    } else {
        NotiError("Lỗi xử lý", result.Message);
    }
}

function AjaxFormSuccess(rs) {
    if (rs.Status) {

        $("#MasterModal").modal("hide");
        $("#MasterModal").empty();
        var msg = rs.Message;
        if (!msg || msg.trim() == '') {
            msg = 'Cập nhật dữ liệu thành công';
        } else {
            msg = rs.Message;
        }
        NotiSuccess("Thành công", msg);
        AfterSussessActionAjaxform();
    } else {
        NotiError("Lỗi xử lý", rs.Message);
    }
}
function AjaxFormSuccessRequestStatus(rs, url) {
    if (rs.Status) {
        $("#MasterModal").modal("hide");
        $("#MasterModal").empty();
        NotiSuccess("Thành công", "Cập nhật dữ liệu thành công");
        //FixedRightAction_6(url);
        AfterSussessActionAjaxform();
    } else {
        NotiError("Lỗi xử lý", rs.Message);
    }
}
function AjaxFormError() {
    NotiError("Có lỗi xảy ra", "Vui lòng kiểm tra lại thông tin");
}

function AjaxCall(url, type, data, callback, callbackError) {
    var isfunction = callback && typeof (callback) == "function";
    if (!isfunction) {
        callback = function () {
            console.log("Chưa cài đặt sự kiện thành công");
        }
    }
    var isfunction = callbackError && typeof (callbackError) == "function";
    if (!isfunction) {
        callbackError = function () {
            NotiError("Thao tác không thể thực hiện");
        }
    }
    $.ajax({
        url: url,
        type: type,
        data: data,
        success: callback,
        error: callbackError,
        beforeSend: function () {
            $("#hinet-preloader").show();
        }, complete: function () {
            $("#hinet-preloader").hide();
        }
    })

}
function AjaxCallSync(url, type, data, callback, callbackError) {
    var isfunction = callback && typeof (callback) == "function";
    if (!isfunction) {
        callback = function () {
            console.log("Chưa cài đặt sự kiện thành công");
        }
    }
    var isfunction = callbackError && typeof (callbackError) == "function";
    if (!isfunction) {
        callbackError = function () {
            NotiError("Thao tác không thể thực hiện");
        }
    }
    $.ajax({
        url: url,
        type: type,
        data: data,
        async: false,
        cache: false,
        timeout: 30000,
        success: callback,
        error: callbackError
    })

}
function EditAction(url) {
    AjaxCall(url, 'get', null, function (rs) {
        $("#MasterModal").html(rs);
        $("#MasterModal").modal("show");
    })
}
function JustAction(url) {
    try {
        AjaxCall(url, 'get', null, function (rs) {
            if (rs.Status) {
                NotiSuccess("Thành công", rs.Message);
                AfterSussessActionAjaxform();
            } else {
                NotiError("Lỗi xử lý", rs.Message);
            }
        })
    } catch (e) {
        console.log(e);
    }

}
function JustActionNonReload(url) {
    AjaxCall(url, 'get', null, function (rs) {
        if (rs.Status) {
            NotiSuccess("Thành công", rs.Message);
        } else {
            NotiError("Lỗi xử lý", rs.Message);
        }
    })
}
function CreateAction(url) {
    AjaxCall(url, 'get', null, function (rs) {
        $("#MasterModal").html(rs);
        $("#MasterModal").modal("show");
        if ($('#MasterModal .modal-dialog.fixed-right').length > 0) {
            $(".modal-backdrop").css('display', 'none');
            $(".modal").css('pointer-events', 'none');
            $("button[data-dismiss=modal]").on('click', function () {
                $(".modal-backdrop").css('display', 'none');
                $(".modal").css('pointer-events', 'auto');
            });
        } else {

        }

    })
}

function InsertPatial(url, box) {
    AjaxCall(url, 'get', null, function (rs) {
        $("#" + box).html(rs);
    })
}
function OpenModal(url, type, data) {
    AjaxCall(url, type, data, function (rs) {
        $("#MasterModal").html(rs);
        $("#MasterModal").modal("show");
        //if ($('#MasterModal .modal-dialog.fixed-right').length > 0) {
        //    $(".modal-backdrop").css('display', 'none');
        //    $(".modal").css('pointer-events', 'none');
        //    $("button[data-dismiss=modal]").on('click', function () {
        //        $(".modal-backdrop").css('display', 'none');
        //        $(".modal").css('pointer-events', 'auto');
        //    });
        //} else {

        //}

    })
}

function OpenModalFixed(url, type, data) {
    AjaxCall(url, type, data, function (rs) {
        $("#MasterModalFixed").html(rs);
        $("#MasterModalFixed").modal("show");
        $("#MasterModal").modal("hide");
    })
}

//<div id="MasterModal" class="modal fade aside aside-right aside-vc no-backdrop aside-hidden" role="dialog" data-placement="right" data-backdrop="false" overflow-y="scroll" style="display: none;">
function closeFRModal() {
    if ($("#MasterModalFixed").length) {
        $("#MasterModalFixed").find(".close").click();

    }
}
function FixedRightActionModalMode(rs, width) {
    $("#MasterModalFixed").html(rs);
    //$("#MasterModalFixed").addClass("aside");
    //$("#MasterModalFixed").attr({ "data-placement": "right", "data-backdrop": "false", "tabindex": "-1" });
    $("#MasterModalFixed .modal-dialog").addClass("fixed-modal-right", "scroll-disable");
    $("#MasterModalFixed .modal-dialog").addClass("fmr-width-" + width);
    //$('.modal.aside').ace_aside();
    $("#MasterModalFixed").modal("show");
    $(".modal.aside.in").css("z-index", 1045);
}
function FixedRightAction(url) {
    closeFRModal();
    AjaxCall(url, 'get', null, function (rs) {
        FixedRightActionModalMode(rs, 20);
    })
    //affterFRModal();
}
function FixedRightAction_2(url) {
    closeFRModal();
    AjaxCall(url, 'get', null, function (rs) {
        FixedRightActionModalMode(rs, 20);
    })
}
function FixedRightAction_4(url) {
    closeFRModal();
    AjaxCall(url, 'get', null, function (rs) {
        FixedRightActionModalMode(rs, 40);
    })
}
function FixedRightAction_6(url) {
    closeFRModal();
    AjaxCall(url, 'get', null, function (rs) {
        FixedRightActionModalMode(rs, 60);
    })
}
function FixedRightAction_8(url) {
    closeFRModal();
    AjaxCall(url, 'get', null, function (rs) {
        FixedRightActionModalMode(rs, 80);
    })
}


//fixedActionCreate begin
function OpenModalAction(url) {
    AjaxCall(url, 'get', null, function (rs) {
        $("#MasterModal").html(rs);
        $("#MasterModal").modal("show");
    })
}

function CloseModelMaster() {
    $("#MasterModal").modal("hide");
}

function DeleteAction(url, mesage) {
    if (mesage == null || mesage == '') {
        mesage = "Bạn xác nhận thực hiện thao tác này ?";
    }
    $.confirm({
        title: 'Xác nhận xóa',
        content: mesage,
        draggable: false,
        theme: 'material',
        buttons: {
            confirm: {
                btnClass: 'btn-primary',
                text: "Xác nhận",
                action: function () {
                    AjaxCall(url, 'post', null, function (rs) {
                        if (rs.Status) {
                            NotiSuccess("Thành công", rs.Message);
                            AfterSussessActionAjaxform();
                        } else {
                            NotiError("Lỗi xử lý", rs.Message);
                        }
                    })
                }
            },
            cancel: {
                text: "Đóng",
                action: function () {

                }
            }
        }
    });
    //bootbox.confirm(mesage, function (result) {
    //    if (result) {
    //        AjaxCall(url, 'post', null, function (rs) {
    //            if (rs.Status) {
    //                NotiSuccess("Thành công", rs.Message);
    //                AfterSussessActionAjaxform();
    //            } else {
    //                NotiError("Lỗi xử lý", rs.Message);
    //            }
    //        })
    //    }
    //});
}

function ConfirmAction(url, type, data, mesage) {
    if (mesage == null || mesage == '') {
        mesage = "Bạn xác nhận thực hiện thao tác này ?";
    }
    bootbox.confirm(mesage, function (result) {
        if (result) {
            AjaxCall(url, type, data, function (rs) {
                if (rs.Status) {
                    NotiSuccess("Thành công", rs.Message);
                    AfterSussessActionAjaxform();
                } else {
                    NotiError("Lỗi xử lý", rs.Message);
                }
            })
        }
    });
}

function RequireConfirm(title, content, functionYes) {
    if (title == null || title == '') {
        title = "Bạn xác nhận thực hiện thao tác này ?";
    }
    if (content == null || content == '') {
        content = "Bạn chắc chắn muốn thực hiện thao tác này ?";
    }
    $.confirm({
        title: title,
        content: content,
        draggable: false,
        theme: 'material',
        buttons: {
            confirm: {
                btnClass: 'btn-primary',
                text: "Xác nhận",
                action: functionYes
            },
            cancel: {
                text: "Đóng",
                action: function () {

                }
            }
        }
    });
}



/**
 * @author:duynn
 * @create_date: 19/04/2019
 * @param {any} url
 * @param {any} mesage
 */
function onDelete(url, mesage) {
    if (mesage == null || mesage == '') {
        mesage = "Bạn xác nhận thực hiện thao tác này ?";
    }
    bootbox.confirm(mesage, function (result) {
        if (result) {
            AjaxCall(url, 'delete', null, function (result) {
                if (result.Status) {
                    NotiSuccess("Thành công", result.Message);
                    AfterSussessActionAjaxform();
                } else {
                    NotiError("Lỗi xử lý", result.Message);
                }
            })
        }
    });
}


function ToDate(obj) {
    if (obj == null) {
        return "";
    } else {

        if (obj.indexOf('Date') >= 0) {
            var dateint = parseInt(obj.match(/\d+/)[0]);

            obj = new Date(dateint);
        } else {
            obj = new Date(obj);
        }
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
}


function ToDateTime(obj) {
    if (obj == null) {
        return "";
    } else {

        if (obj.indexOf('Date') >= 0) {
            var dateint = parseInt(obj.match(/\d+/)[0]);
            obj = new Date(dateint);
        } else {
            obj = new Date(obj);
        }
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

        var hour = obj.getHours();
        if (hour < 10) {
            hour = "0" + hour;
        }
        var minute = obj.getMinutes()
        if (minute < 10) {
            minute = "0" + minute;
        }
        var date_string = day + "/" + mon + "/" + obj.getFullYear() + " " + hour + ":" + minute;
        return date_string;

    }
}


function onAddNewRow(element) {
    var parent = $(element).closest('table');
    if (!parent) {
        return;
    }
    var request = $(element).data('request');
    if (!request) {
        return;
    }

    $.get(request, function (result) {
        parent.find('tbody').append(result);
    })
}

function onRemoveRow(element) {
    var parent = $(element).closest('tr');
    if (!parent) {
        return;
    }
    $(parent).remove();
}

function validateRequired(container) {
    var isValid = true;
    $("#" + container + " .required").each(function () {
        var parent = $(this).parents(".form-group").first();
        if (parent.length == 0) {
            parent = $(this).parent();
        }
        var errorText = parent.find(".error");
        if ($(this).val() == null || $(this).val().length == 0 || $(this).val().toString().trim() == "") {
            errorText.addClass('error-required');
            isValid = false;
        } else {
            errorText.removeClass('error-required');
        }
    });
    return isValid;
}

function validateDate(container) {
    var isValid = true;
    var pattern = /^[0-3][0-9]\/[01][0-9]\/[12][0-9][0-9][0-9]$/;
    var inputs = $("#" + container + " .checkDateValid");

    inputs.each(function () {
        var parent = $(this).parents(".form-group").first();
        var errorText = parent.find(".error");
        if ($(this).val() != null &&
            $(this).val().length != 0 &&
            $(this).val().toString().trim() != "") {
            if (!pattern.test($(this).val())) {
                errorText.addClass("error-date-format");
                isValid = false;
            }
            else {
                errorText.removeClass("error-date-format");
            }
        }
    })
    return isValid;
}

function validateSelectOption(container) {
    var isValid = true;
    var inputs = $("#" + container + " select.requiredDropDownList");
    inputs.each(function () {
        var parent = $(this).parents(" .form-group").first();
        var errorText = parent.find(".error");
        if ($(this).val() == null || $(this).val().length == 0) {
            errorText.addClass('error-required-dropdown');
            isValid = false;
        } else {
            errorText.removeClass('error-required-dropdown');
        }
    })
    return isValid;
}

function validateTextArea(container) {
    var isValid = true;
    $("#" + container + " .requiredTextArea").each(function () {
        var parent = $(this).parents(" .form-group").first();
        var errorText = parent.find(".error");
        if ($(this).html() == null || $(this).html().trim() == "") {
            errText.addClass('error-required');
            isValid = false;
        } else {
            errorText.removeClass('error-required');
        }
    });
    return isValid;
}

function validateNumber(container) {
    var isValid = true;
    var inputs = $('#' + container + ' .checkIsNumeric');
    if (inputs.length > 0) {
        inputs.each(function () {
            var parent = $(this).parents('.form-group').first();
            var errorDOM = parent.find('.error');

            if ($(this).val() != null &&
                $(this).val().length != 0 &&
                $(this).val().toString().trim() != "") {

                if (!$.isNumeric($(this).val())) {
                    errorDOM.addClass("error-number-format");
                    isValid = false;
                } else {
                    errorDOM.removeClass("error-number-format");
                }
            }
        })
    }
    return isValid;
}

function validateHTMLInjection(container) {
    var isValid = true;
    var pattern = /<[a-z][\s\S]*>/i;
    var inputs = $('#' + container + ' .checkHTMLInjection');
    if (inputs.length > 0) {
        inputs.each(function () {
            var parent = $(this).parents('.form-group').first();
            var errorDOM = parent.find('.error');

            if ($(this).val() != null &&
                $(this).val().length != 0 &&
                $(this).val().toString().trim() != "") {

                if (pattern.test($(this).val())) {
                    errorDOM.addClass('error-html-format');
                    isValid = false;
                }
                else {
                    errorDOM.removeClass('error-html-format');
                }
            }
        })
    }
    return isValid;
}

function validateSpecialCharacter(container) {
    var isValid = true;
    var pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    var inputs = $('#' + container + ' .checkSpecialCharacter');
    if (inputs.length > 0) {
        inputs.each(function () {
            var parent = $(this).parents('.form-group').first();
            var errorDOM = parent.find('.error');

            if ($(this).val() != null &&
                $(this).val().length != 0 &&
                $(this).val().toString().trim() != "") {

                if (pattern.test($(this).val())) {
                    errorDOM.addClass('error-special-character');
                    isValid = false;
                }
                else {
                    errorDOM.removeClass('error-special-character');
                }
            }
        })
    }
    return isValid;
}

function validateForm(formId) {
    var error = 0;
    var isValid = true;
    error += this.validateRequired(formId) ? 0 : 1;
    error += this.validateDate(formId) ? 0 : 1;
    error += this.validateSelectOption(formId) ? 0 : 1;
    error += this.validateTextArea(formId) ? 0 : 1;
    error += this.validateNumber(formId) ? 0 : 1;
    error += this.validateHTMLInjection(formId) ? 0 : 1;
    error += this.validateSpecialCharacter(formId) ? 0 : 1;

    $('#' + formId).find('.error').each(function () {
        var message = '';
        if ($(this).hasClass('error-required')) {
            message = 'Vui lòng nhập thông tin';
        } else if ($(this).hasClass('error-date-format')) {
            message = 'Vui lòng nhập theo định dạng "ngày/tháng/năm"';
        } else if ($(this).hasClass('error-number-format')) {
            message = 'Vui lòng đúng định dạng số';
        } else if ($(this).hasClass('error-html-format')) {
            message = 'Vui lòng không nhập ký tự HTML';
        } else if ($(this).hasClass('error-required-dropdown')) {
            message = 'Vui lòng chọn thông tin';
        } else if ($(this).hasClass('error-special-character')) {
            message = 'Vui lòng không nhập ký tự đặc biệt';
        }

        if (message !== '') {
            $(this).html(message);
            $(this).css('display', 'inline');
        } else {
            $(this).css('display', 'none');
        }
    });

    if (error > 0) {
        isValid = false;
    } else {
        isValid = true;
    }
    return isValid;
}

//Tạo action dropdown
// listAction [{
//  icon:""
//  text: "",
//  clickAction: "",
//  linkAction:"",
//  title:""
//}]
function RenderDropdownAction(name, listAction) {
    var result = '<div class="btn-group"><button data-toggle="dropdown" class="btn btn-xs btn-primary btn-white dropdown-toggle" aria-expanded="false">' + name + '<i class="ace-icon fa fa-angle-down icon-on-right"></i></button><ul class="dropdown-menu">';

    for (var ac of listAction) {

        if (ac != null) {
            var itemResult = "<li>";
            if (ac.clickAction != null) {
                itemResult += "<a href='javascript:void(0)' onclick='" + ac.clickAction + "'   title = '" + ac.title + "'><i class='" + ac.icon + "'> </i> " + ac.text + "</a>";
            } else {
                itemResult += "<a href='" + ac.linkAction + "' title = '" + ac.title + "'><i class='" + ac.icon + "'> </i> " + ac.text + "</a>";
            }
            itemResult += "</li>";
            result += itemResult;
        }

    }
    result += "</ul></div>";
    return result;
}

function renderDropdownList(urlRe, elementId, defaultMess) {
    console.log(urlRe);
    $.ajax({
        url: urlRe,
        type: 'Post',
        success: function (rs) {
            var content = '';
            if (defaultMess) {
                content += "<option value=''>" + defaultMess + "</option>";
            }
            if (rs != null) {

                for (var i = 0; i < rs.length; i++) {
                    content += "<option value='" + rs[i].Value + "'>" + rs[i].Text + "</option>";
                }
            }
            $("#" + elementId).html(content);
        },
        error: function (e) {
            NotiError("Lỗi xử lý");
        }
    });
};

function renderDropdownListPost(urlRe, data, elementId, defaultMess) {
    console.log(urlRe);
    $.ajax({
        url: urlRe,
        data: data,
        type: 'Post',
        success: function (rs) {
            var content = "<option value=''>" + defaultMess + "</option>";
            if (rs != null) {

                for (var i = 0; i < rs.length; i++) {
                    content += "<option value='" + rs[i].Value + "'>" + rs[i].Text + "</option>";
                }
            }
            $("#" + elementId).html(content);
        },
        error: function (e) {
            NotiError("Lỗi xử lý");
        }
    });
};

function renderDropdownListSelect2(urlRe, elementId, defaultMess) {
    console.log(urlRe);
    $.ajax({
        url: urlRe,
        type: 'Post',
        success: function (rs) {
            var content = "";
            if (defaultMess) {
                content += "<option value=''>" + defaultMess + "</option>";
            }
            if (rs != null) {

                for (var i = 0; i < rs.length; i++) {
                    content += "<option value='" + rs[i].Value + "'>" + rs[i].Text + "</option>";
                }
            }
            $("#" + elementId).html(content).trigger('change');
        },
        error: function (e) {
            NotiError("Lỗi xử lý");
        }
    });
}
//$('#MasterModal').on('hide.bs.modal', function (e) {

//        $(".modal").css('pointer-events', 'auto');

//})


function PersonalAndCompanyChangeStatus(status, id, area, view, action, currentUserId, stickid) {
    var result = `<div class="btn-group">
                               <button data-toggle="dropdown" class="btn btn-xs btn-primary btn-white dropdown-toggle" aria-expanded="false">Thao tác<i class="ace-icon fa fa-angle-down icon-on-right"></i>
                               </button>
						   <ul class="dropdown-menu dropdown-menu-left">`;
    if ((stickid == null || stickid == 0) || (stickid != currentUserId) && !HasRole("Super_admin")) {
        result += "<li><a href='/" + area + "/" + view + "/Detail/" + id + "' title='Thông tin chi tiết'><i class='glyphicon glyphicon-user'> </i> Thông tin chi tiết</a> </li>";
    }
    else {
        switch (status) {
            case 0: result += "<li><a href='/" + area + "/" + view + "/Detail/" + id + "' title='Thông tin chi tiết'><i class='glyphicon glyphicon-user'> </i> Thông tin chi tiết</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=2&id=" + id + "\")' title='Thay đổi thông tin hồ sơ'><i class='glyphicon glyphicon-plus-sign'style='color: #4fff4f'> </i> Yêu cầu thay đổi thông tin</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='" + action + "(\"/" + area + "/" + view + "/" + action + "?status=1&id=" + id + "\",1)' title='Duyệt thông tin trực tuyến'><i class='glyphicon glyphicon-ok-sign'style='color: #045dd9'> </i> Duyệt thông tin hồ sơ</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=4&id=" + id + "\")' title='Từ chối hồ sơ'><i class='glyphicon glyphicon-minus-sign'style='color: #ff4242'> </i> Từ chối hồ sơ</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=5&id=" + id + "\")'title='Khóa hồ sơ'><i class='glyphicon glyphicon-lock'style='color:#ffd663'> </i> Khóa hồ sơ</a> </li>";
                result += "<li><a href='/" + area + "/" + view + "/Edit/" + id + "' title='Chỉnh sửa'><i class='glyphicon glyphicon-edit'> </i> Sửa thông tin</a> </li>";
                break;
            case 1: result += "<li><a href='/" + area + "/" + view + "/Detail/" + id + "' title='Thông tin chi tiết'><i class='glyphicon glyphicon-user'> </i> Thông tin chi tiết</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=2&id=" + id + "\")' title='Thay đổi thông tin hồ sơ'><i class='glyphicon glyphicon-plus-sign'style='color: #4fff4f'> </i> Yêu cầu thay đổi thông tin</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=5&id=" + id + "\")'title='Khóa hồ sơ'><i class='glyphicon glyphicon-lock'style='color:#ffd663'> </i> Khóa hồ sơ</a> </li>";
                result += "<li><a href='/ProductInfoArea/ProductInfo/Index/" + id + "' title='Chỉnh sửa'><i class='glyphicon glyphicon-shopping-cart'style='color:#f70ab0'> </i> Quản lý sản phẩm</a> </li>";
                result += "<li><a href='/" + area + "/" + view + "/Edit/" + id + "' title='Chỉnh sửa'><i class='glyphicon glyphicon-edit'> </i> Sửa thông tin</a> </li>";
                break;
            case 2: result += "<li><a href='/" + area + "/" + view + "/Detail/" + id + "' title='Thông tin chi tiết'><i class='glyphicon glyphicon-user'> </i> Thông tin chi tiết</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=5&id=" + id + "\")'title='Khóa hồ sơ'><i class='glyphicon glyphicon-lock'style='color:#ffd663'> </i> Khóa hồ sơ</a> </li>";
                result += "<li><a href='/" + area + "/" + view + "/Edit/" + id + "' title='Chỉnh sửa'><i class='glyphicon glyphicon-edit'> </i> Sửa thông tin</a> </li>";
                break;
            case 3: result += "<li><a href='/" + area + "/" + view + "/Detail/" + id + "' title='Thông tin chi tiết'><i class='glyphicon glyphicon-user'> </i> Thông tin chi tiết</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=2&id=" + id + "\")' title='Thay đổi thông tin hồ sơ'><i class='glyphicon glyphicon-plus-sign'style='color: #4fff4f'> </i> Yêu cầu thay đổi thông tin</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='" + action + "(\"/" + area + "/" + view + "/" + action + "?status=1&id=" + id + "\",1)' title='Duyệt thông tin trực tuyến'><i class='glyphicon glyphicon-ok-sign'style='color: #045dd9'> </i> Duyệt thông tin hồ sơ</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=4&id=" + id + "\")' title='Từ chối hồ sơ'><i class='glyphicon glyphicon-minus-sign'style='color: #ff4242'> </i> Từ chối hồ sơ</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=5&id=" + id + "\")'title='Khóa hồ sơ'><i class='glyphicon glyphicon-lock'style='color:#ffd663'> </i> Khóa hồ sơ</a> </li>";
                result += "<li><a href='/" + area + "/" + view + "/Edit/" + id + "' title='Chỉnh sửa'><i class='glyphicon glyphicon-edit'> </i> Sửa thông tin</a> </li>";
                break;
            case 4: result += "<li><a href='/" + area + "/" + view + "/Detail/" + id + "' title='Thông tin chi tiết'><i class='glyphicon glyphicon-user'> </i> Thông tin chi tiết</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=2&id=" + id + "\")' title='Thay đổi thông tin hồ sơ'><i class='glyphicon glyphicon-plus-sign'style='color: #4fff4f'> </i> Yêu cầu thay đổi thông tin</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=5&id=" + id + "\")'title='Khóa hồ sơ'><i class='glyphicon glyphicon-lock'style='color:#ffd663'> </i> Khóa hồ sơ</a> </li>";
                result += "<li><a href='/" + area + "/" + view + "/Edit/" + id + "' title='Chỉnh sửa'><i class='glyphicon glyphicon-edit'> </i> Sửa thông tin</a> </li>";
                break;
            case 5: result += "<li><a href='/" + area + "/" + view + "/Detail/" + id + "' title='Thông tin chi tiết'><i class='glyphicon glyphicon-user'> </i> Thông tin chi tiết</a> </li>";
                //result += "<li><a href='javascript:void(0)' onclick='DeleteAction(\"/" + area + "/" + view + "/Delete/" + id + "\")' title='Xóa'><i class=' glyphicon glyphicon-remove' style='color:red'> </i> Xóa hồ sơ</a></li>";
                break;
        }
    }
    result += "</ul></div > ";
    return result;
}

function PersonalAndCompanyStatus(status) {
    switch (status) {
        case 0: return '<span class="label label-primary"style="height:28px;"><p>Tài khoản</br> chờ phê duyệt</p></span>';
        case 1: return '<span class="label label-success" style="height:28px;"><p>Tài khoản</br>đã duyệt</p></span>';
        case 2: return '<span class="label label-info"style="height:28px;"><p>Tài khoản cần</br>bổ sung</br>thông tin</p></span>';
        case 3: return '<span class="label label-info"style="height:28px;"><p>Tài khoản</br>đề nghị</br>chỉnh sửa</p></span>';
        case 4: return '<span class="label label-danger"style="height:28px;"><p>Tài khoản</br>bị từ chối</p></span>';
        case 5: return '<span class="label label-warning"style="height:28px;"><p>Tài khoản</br>bị khóa</p></span>';
        case 6: return '<span class="label label-warning"style="height:28px;"><p>Tài khoản</br>đề nghị chỉnh sửa</p></span>';
        case 7: return '<span class="label label-warning"style="height:28px;"><p>Tài khoản</br>đã chấm dứt</p></span>';
        case 8: return '<span class="label label-warning"style="height:28px;"><p>Tài khoản</br>đã xác nhận</p></span>';
    }
}

function EndUserStatus(status) {
    switch (status) {
        case 0: return '<span class="label label-primary" style="font-size: 11px">Tài khoản chờ phê duyệt</span>';
        case 1: return '<span class="label label-success" style="font-size: 11px">Tài khoản đã duyệt</span>';
        case 2: return '<span class="label label-info" style="font-size: 11px">Tài khoản cần bổ sung thông tin</span>';
        case 3: return '<span class="label label-info" style="font-size: 11px">Tài khoản đề nghị chỉnh sửa</span>';
        case 4: return '<span class="label label-danger" style="font-size: 11px">Tài khoản bị từ chối</span>';
        case 5: return '<span class="label label-warning" style="font-size: 11px">Tài khoản bị khóa</span>';
        case 6: return '<span class="label label-warning" style="font-size: 11px">Tài khoản đề nghị chấm dứt</span>';
        case 7: return '<span class="label label-danger" style="font-size: 11px">Tài khoản đã chấm dứt</span>';
        case 8: return '<span class="label label-success" style="font-size: 11px">Tài khoản đã xác nhận</span>';

    }
}


function permissonCodeString(view) {
    var permissionCodeString = "";
    switch (view) {
        case "WebsiteInfo": permissionCodeString = "QLWebCCDV"; break;
        case "WebsiteSaleNoti": permissionCodeString = "QLThongBaoWebBanHang"; break;
        case "AppInfo": permissionCodeString = "QLAppCCDV"; break;
        case "AppSaleNoti": permissionCodeString = "QLThongBaoAppBanHang"; break;
        case "DanhGiaTinNhiem": permissionCodeString = "DanhGiaTinNhiem"; break;
        case "WebsiteGanBieuTuongTinNhiem": permissionCodeString = "QLDSWSGanBTTN"; break;
        //case "AppSaleNoti": permissionCodeString = "QLCompany"; break;
        //case "AppSaleNoti": permissionCodeString = "QLOrganization"; break;
        //case "AppSaleNoti": permissionCodeString = "QLPersonal"; break;
        case "BCDotBaoCao": permissionCodeString = "BCDotBaoCao"; break;
        case "CompanyInfo": permissionCodeString = "CompanyInfo"; break;
        case "OrganizationInfo": permissionCodeString = "OrganizationInfo"; break;
        case "PersonalInfo": permissionCodeString = "PersonalInfo"; break;
        case "PhanAnhInfo": permissionCodeString = "QLTTPhanAnh"; break;
        case "PhanAnhAppInfo": permissionCodeString = "QLTTAppPhanAnh"; break;
        case "WebsiteBiPhanAnh": permissionCodeString = "QLWebsiteBiPhanAnh"; break;
        case "AppBiPhanAnh": permissionCodeString = "QLAppBiPhanAnh"; break;
        case "WebsiteViPham": permissionCodeString = "QLWebsiteViPham"; break;
        case "AppViPham": permissionCodeString = "QLAppViPham"; break;
        case "CategoryNews": permissionCodeString = "CategoryNews"; break;
        case "News": permissionCodeString = "News"; break;
        case "LegalDocument": permissionCodeString = "LegalDocument"; break;
        case "DocumentData": permissionCodeString = "DocumentData"; break;
        case "ProductInfo": permissionCodeString = "QLProduct"; break;
        case "ProductInfo": permissionCodeString = "QLDichVu"; break;
    }
    return permissionCodeString;
}

function NhanDauMoiactionToolBar(view) {
    var permissionCodeString = permissonCodeString(view);
    return LinkRoleFunc("GetCheckBox()", "<i class='fa fa - pencil'></i> Nhận xử lý", permissionCodeString + "_NhanXuLy", "btn btn-primary btn-xs", "", "Nhận xử lý");
}

function DauMoi(stickid, currentUserId, id, CurrentUserName, area, view) {
    var permissionCodeString = permissonCodeString(view);
    var DamoiLinkRoleJson = {
        "NhanXuLy": ["GetProcess(\"/" + area + "/" + view + "/GetProcess/" + id + "\")", "Nhận xử lý", permissionCodeString + "_NhanXuLy", "btn btn-primary btn-xs", "", "Nhận là đầu mối xử lý hồ sơ này"],
        "ChuyenDauMoiXuLy": ["CreateAction(\"/" + area + "/" + view + "/PhanDauMoiIndex?id=" + currentUserId + "&item=" + id + "\")", "Chuyển đầu mối xử lý", permissionCodeString + "_ChuyenDauMoiXuLy", "btn btn-info btn-xs", "", "Chuyển đầu mối xử lý hồ sơ này"],
        "YeuCauXuLy": ["CreateAction(\"/" + area + "/" + view + "/PhanDauMoiIndex?id=" + currentUserId + "&item=" + id + "\")", "Chuyển đầu mối xử lý", permissionCodeString + "_ChuyenDauMoiXuLy", "btn btn-info btn-xs", "", "Chuyển đầu mối xử lý hồ sơ này"],
    }
    var DauMoiLinkRoleFunc = {
        "NhanXuLy": LinkRoleFunc(DamoiLinkRoleJson.NhanXuLy[0], DamoiLinkRoleJson.NhanXuLy[1], DamoiLinkRoleJson.NhanXuLy[2], DamoiLinkRoleJson.NhanXuLy[3], DamoiLinkRoleJson.NhanXuLy[4], DamoiLinkRoleJson.NhanXuLy[5]),
        "ChuyenDauMoiXuLy": LinkRoleFunc(DamoiLinkRoleJson.ChuyenDauMoiXuLy[0], DamoiLinkRoleJson.ChuyenDauMoiXuLy[1], DamoiLinkRoleJson.ChuyenDauMoiXuLy[2], DamoiLinkRoleJson.ChuyenDauMoiXuLy[3], DamoiLinkRoleJson.ChuyenDauMoiXuLy[4], DamoiLinkRoleJson.ChuyenDauMoiXuLy[5]),
        "YeuCauXuLy": LinkRoleFunc(DamoiLinkRoleJson.YeuCauXuLy[0], DamoiLinkRoleJson.YeuCauXuLy[1], DamoiLinkRoleJson.YeuCauXuLy[2], DamoiLinkRoleJson.YeuCauXuLy[3], DamoiLinkRoleJson.YeuCauXuLy[4], DamoiLinkRoleJson.YeuCauXuLy[5]),
    }

    return (stickid == null || stickid == 0) ? DauMoiLinkRoleFunc.NhanXuLy + "<div class='clearBoth' style='margin-bottom:5px;'></div>" + DauMoiLinkRoleFunc.ChuyenDauMoiXuLy : CurrentUserName + "</br>" + DauMoiLinkRoleFunc.ChuyenDauMoiXuLy;

}

function PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action, currentUserId) {
    var permissionCodeString = permissonCodeString(view);
    var PersonalAndCompanyAndOrganizationLinkRoleStatus = {
        "NhanXuLy": ["GetProcess(\"/" + area + "/" + view + "/GetProcess/" + id + "\")", "Nhận xử lý", permissionCodeString + "_NhanXuLy", "btn btn-primary btn-xs", "", "Nhận là đầu mối xử lý hồ sơ này"],
        "ChuyenDauMoiXuLy": ["CreateAction(\"/" + area + "/" + view + "/PhanDauMoiIndex?id=" + currentUserId + "&item=" + id + "\")", "Chuyển đầu mối xử lý", permissionCodeString + "_ChuyenDauMoiXuLy", "btn btn-info btn-xs", "", "Chuyển đầu mối xử lý hồ sơ này"],
        "ThongTinChiTiet": ["/" + area + "/" + view + "/Detail/" + id, "<i class='glyphicon glyphicon-user'> </i> Thông tin chi tiết", permissionCodeString + "_Detail", "", "Thông tin chi tiết"],
        "SuaHoSo": ["/" + area + "/" + view + "/Edit/" + id, "<i class='glyphicon glyphicon-edit'> </i> Sửa đăng ký", permissionCodeString + "_Edit", "", "Sửa đăng ký"],
        "XoaHoSo": ["DeleteAction(\"/" + area + "/" + view + "/Delete/" + id + "\")", "<i class=' glyphicon glyphicon-remove' style='color:red'> </i> Xóa", permissionCodeString + "_Delete", "", "", "Xóa"],
        "YeuCauBoSungThongTin": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=2&id=" + id + "\")", "<i class='glyphicon glyphicon glyphicon-plus-sign'style='color: #4fff4f'> </i> Yêu cầu bổ sung thông tin", permissionCodeString + "_2", "", "", "Thay đổi thông tin hồ sơ"],
        "DaDuyetDienTu": [action + "(\"/" + area + "/" + view + "/" + action + "?status=1&id=" + id + "\",1)", "<i class='glyphicon glyphicon-ok-sign'style='color: #045dd9'> </i> Duyệt đăng ký", permissionCodeString + "_1", "", "", "Duyệt thông tin điện tử"],
        "DaXacNhan": [action + "(\"/" + area + "/" + view + "/" + action + "?status=8&id=" + id + "\",8)", "<i class='glyphicon glyphicon-ok-circle' style='color: #045dd9'> </i> Xác nhận hồ sơ", permissionCodeString + "_8", "", "", "Xác nhận hồ sơ"],
        "ChoDuyet": [action + "(\"/" + area + "/" + view + "/" + action + "?status=0&id=" + id + "\",0)", "<i class='glyphicon glyphicon-ok-sign'style='color: #045dd9'> </i> Chờ duyệt", permissionCodeString + "_0", "", "", "Chờ duyệt"],
        "DaChamDutDangKy": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=7&id=" + id + "\")", "<i class='glyphicon glyphicon glyphicon-download' style='color: #ff4242'> </i> Chấm dứt đăng ký", permissionCodeString + "_7", "", "", "Chấm dứt đăng ký"],
        "BiTuChoi": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=4&id=" + id + "\")", "<i class='glyphicon glyphicon-minus-sign'style='color: #ff4242'> </i> Từ chối", permissionCodeString + "_4", "", "", "Từ chối hồ sơ"],
        "BiKhoa": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=5&id=" + id + "\")", "<i class='glyphicon glyphicon-lock'style='color: #f1c40f'> </i> Khóa hồ sơ", permissionCodeString + "_5", "", "", "Khóa hồ sơ"],
        "GanDiaChi": ["CreateAction(\"/" + area + "/" + view + "/AddMarkerMap/" + id + "\")", "<i class='glyphicon glyphicon-map-marker'style='color: red'> </i> Gắn địa chỉ bản đồ", permissionCodeString + "_GanDiaChi", "", "", "Gắn địa chỉ bản đồ"],
        "ThemMoiSanPham": ["/ProductInfoArea/ProductInfo/Create?ItemType=SanPham&id=" + id, "<i class='glyphicon glyphicon-shopping-cart'> </i> Thêm sản phẩm", permissionCodeString + "_CreateSanPham", "", "Thêm sản phẩm "],
        "ThemMoiDichVu": ["/ProductInfoArea/ProductInfo/Create?ItemType=DichVu&id=" + id, "<i class='glyphicon glyphicon-headphones'> </i> Thêm dịch vụ", permissionCodeString + "_CreateDichVu", "", "Thêm dịch vụ"],
    }
    var PersonalAndCompanyAndOrganizationLinkRole = {
        "ChuyenDauMoiXuLy": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.ChuyenDauMoiXuLy[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChuyenDauMoiXuLy[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChuyenDauMoiXuLy[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChuyenDauMoiXuLy[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChuyenDauMoiXuLy[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChuyenDauMoiXuLy[5]),
        "ThongTinChiTiet": LinkRole(PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[4]),
        "SuaHoSo": LinkRole(PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[4]),
        "XoaHoSo": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[5]),
        "YeuCauBoSungThongTin": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.YeuCauBoSungThongTin[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.YeuCauBoSungThongTin[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.YeuCauBoSungThongTin[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.YeuCauBoSungThongTin[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.YeuCauBoSungThongTin[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.YeuCauBoSungThongTin[5]),
        "DaDuyetDienTu": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.DaDuyetDienTu[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaDuyetDienTu[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaDuyetDienTu[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaDuyetDienTu[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaDuyetDienTu[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaDuyetDienTu[5]),
        "DaXacNhan": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.DaXacNhan[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaXacNhan[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaXacNhan[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaXacNhan[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaXacNhan[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaXacNhan[5]),
        "ChoDuyet": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.ChoDuyet[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChoDuyet[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChoDuyet[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChoDuyet[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChoDuyet[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChoDuyet[5]),
        "DaChamDutDangKy": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.DaChamDutDangKy[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaChamDutDangKy[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaChamDutDangKy[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaChamDutDangKy[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaChamDutDangKy[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaChamDutDangKy[5]),
        "BiTuChoi": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.BiTuChoi[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiTuChoi[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiTuChoi[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiTuChoi[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiTuChoi[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiTuChoi[5]),
        "BiKhoa": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.BiKhoa[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiKhoa[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiKhoa[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiKhoa[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiKhoa[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiKhoa[5]),
        "GanDiaChi": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.GanDiaChi[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.GanDiaChi[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.GanDiaChi[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.GanDiaChi[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.GanDiaChi[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.GanDiaChi[5]),
        "ThemMoiSanPham": LinkRole(PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiSanPham[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiSanPham[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiSanPham[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiSanPham[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiSanPham[4]),
        "ThemMoiDichVu": LinkRole(PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiDichVu[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiDichVu[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiDichVu[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiDichVu[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiDichVu[4]),
    }

    return PersonalAndCompanyAndOrganizationLinkRole;
}
function PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId) {
    var permissionCodeString = permissonCodeString(view);
    var PersonalAndCompanyAndOrganizationLinkRoleStatus = {
        "NhanXuLy": ["GetProcess(\"/" + area + "/" + view + "/GetProcess/" + id + "\")", "Nhận xử lý", permissionCodeString + "_NhanXuLy", "btn btn-primary btn-xs", "", "Nhận là đầu mối xử lý hồ sơ này"],
        "ChuyenDauMoiXuLy": ["CreateAction(\"/" + area + "/" + view + "/PhanDauMoiIndex?id=" + currentUserId + "&item=" + id + "\")", "Chuyển đầu mối xử lý", permissionCodeString + "_ChuyenDauMoiXuLy", "btn btn-info btn-xs", "", "Chuyển đầu mối xử lý hồ sơ này"],
        "ThongTinChiTiet": ["/" + area + "/" + view + "/Detail/" + id, "<i class='glyphicon glyphicon-user'> </i> Thông tin chi tiết", permissionCodeString + "_Detail", "", "Thông tin chi tiết"],
        "SuaHoSo": ["/" + area + "/" + view + "/Edit/" + id, "<i class='glyphicon glyphicon-edit'> </i> Sửa đăng ký", permissionCodeString + "_Edit", "btn btn-primary btn-sm", "Sửa đăng ký"],
        "XoaHoSo": ["DeleteAction(\"/" + area + "/" + view + "/Delete/" + id + "\")", "<i class=' glyphicon glyphicon-remove' style='color:red'> </i> Xóa", permissionCodeString + "_Delete", "btn btn-danger btn-sm", "", "Xóa"],
        "YeuCauBoSungThongTin": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=2&id=" + id + "\")", "<i class='glyphicon glyphicon glyphicon-plus-sign'style='color: #4fff4f'> </i> Yêu cầu bổ sung thông tin", permissionCodeString + "_2", "btn btn-primary btn-sm", "", "Thay đổi thông tin hồ sơ"],
        "DaDuyetDienTu": [action + "(\"/" + area + "/" + view + "/" + action + "?status=1&id=" + id + "\",1)", "<i class='glyphicon glyphicon-ok-sign'style='color: #045dd9'> </i> Duyệt đăng ký", permissionCodeString + "_1", "btn btn-primary btn-sm", "", "Duyệt thông tin điện tử"],
        "DaXacNhan": [action + "(\"/" + area + "/" + view + "/" + action + "?status=8&id=" + id + "\",8)", "<i class='glyphicon glyphicon-ok-circle'style='color: #045dd9'> </i> Xác nhận hồ sơ", permissionCodeString + "_8", "btn btn-primary btn-sm", "", "Xác nhận hồ sơ"],
        "ChoDuyet": [action + "(\"/" + area + "/" + view + "/" + action + "?status=0&id=" + id + "\",0)", "<i class='glyphicon glyphicon-ok-sign'style='color: #045dd9'> </i> Chờ duyệt", permissionCodeString + "_0", "btn btn-primary btn-sm", "", "Chờ duyệt"],
        "DaChamDutDangKy": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=7&id=" + id + "\")", "<i class='glyphicon glyphicon glyphicon-download' style='color: #ff4242'> </i> Chấm dứt đăng ký", permissionCodeString + "_7", "btn btn-primary btn-sm", "", "Chấm dứt đăng ký"],
        "BiTuChoi": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=4&id=" + id + "\")", "<i class='glyphicon glyphicon-minus-sign'style='color: #ff4242'> </i> Từ chối", permissionCodeString + "_4", "btn btn-primary btn-sm", "", "Từ chối hồ sơ"],
        "BiKhoa": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=5&id=" + id + "\")", "<i class='glyphicon glyphicon-lock'style='color: #f1c40f'> </i> Khóa hồ sơ", permissionCodeString + "_5", "btn btn-primary btn-sm", "", "Khóa hồ sơ"],
        "GanDiaChi": ["CreateAction(\"/" + area + "/" + view + "/AddMarkerMap/" + id + "\")", "<i class='glyphicon glyphicon-map-marker'style='color: red'> </i> Gắn địa chỉ bản đồ", permissionCodeString + "_GanDiaChi", "btn btn-primary btn-sm", "", "Gắn địa chỉ bản đồ"],
        "ThemMoiSanPham": ["/ProductInfoArea/ProductInfo/Create?ItemType=SanPham&id=" + id, "<i class='glyphicon glyphicon-shopping-cart'> </i> Thêm sản phẩm", permissionCodeString + "_CreateSanPham", "btn btn-primary btn-sm", "Thêm sản phẩm "],
        "ThemMoiDichVu": ["/ProductInfoArea/ProductInfo/Create?ItemType=DichVu&id=" + id, "<i class='glyphicon glyphicon-headphones'> </i> Thêm dịch vụ", permissionCodeString + "_CreateDichVu", "btn btn-primary btn-sm", "Thêm dịch vụ"],
    }
    var PersonalAndCompanyAndOrganizationLinkRole = {
        "ChuyenDauMoiXuLy": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.ChuyenDauMoiXuLy[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChuyenDauMoiXuLy[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChuyenDauMoiXuLy[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChuyenDauMoiXuLy[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChuyenDauMoiXuLy[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChuyenDauMoiXuLy[5]),
        "ThongTinChiTiet": LinkRole(PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[4]),
        "SuaHoSo": LinkRole(PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[4]),
        "XoaHoSo": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[5]),
        "YeuCauBoSungThongTin": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.YeuCauBoSungThongTin[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.YeuCauBoSungThongTin[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.YeuCauBoSungThongTin[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.YeuCauBoSungThongTin[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.YeuCauBoSungThongTin[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.YeuCauBoSungThongTin[5]),
        "DaDuyetDienTu": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.DaDuyetDienTu[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaDuyetDienTu[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaDuyetDienTu[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaDuyetDienTu[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaDuyetDienTu[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaDuyetDienTu[5]),
        "DaXacNhan": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.DaXacNhan[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaXacNhan[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaXacNhan[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaXacNhan[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaXacNhan[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaXacNhan[5]),
        "ChoDuyet": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.ChoDuyet[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChoDuyet[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChoDuyet[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChoDuyet[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChoDuyet[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.ChoDuyet[5]),
        "DaChamDutDangKy": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.DaChamDutDangKy[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaChamDutDangKy[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaChamDutDangKy[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaChamDutDangKy[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaChamDutDangKy[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.DaChamDutDangKy[5]),
        "BiTuChoi": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.BiTuChoi[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiTuChoi[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiTuChoi[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiTuChoi[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiTuChoi[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiTuChoi[5]),
        "BiKhoa": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.BiKhoa[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiKhoa[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiKhoa[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiKhoa[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiKhoa[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.BiKhoa[5]),
        "GanDiaChi": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.GanDiaChi[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.GanDiaChi[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.GanDiaChi[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.GanDiaChi[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.GanDiaChi[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.GanDiaChi[5]),
        "ThemMoiSanPham": LinkRole(PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiSanPham[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiSanPham[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiSanPham[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiSanPham[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiSanPham[4]),
        "ThemMoiDichVu": LinkRole(PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiDichVu[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiDichVu[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiDichVu[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiDichVu[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemMoiDichVu[4]),

    }
    return PersonalAndCompanyAndOrganizationLinkRole;
}
function WebsiteAndAppChangeStatusByRole(id, area, view, action, currentUserId) {
    var permissionCodeString = permissonCodeString(view);
    var WebsiteAnAppLinkRoleStatus = {
        "NhanXuLy": ["GetProcess(\"/" + area + "/" + view + "/GetProcess/" + id + "\")", "Nhận xử lý", permissionCodeString + "_NhanXuLy", "btn btn-primary btn-xs", "", "Nhận là đầu mối xử lý hồ sơ này"],
        "ChuyenDauMoiXuLy": ["CreateAction(\"/" + area + "/" + view + "/PhanDauMoiIndex?id=" + currentUserId + "&item=" + id + "\")", "Chuyển đầu mối xử lý", permissionCodeString + "_ChuyenDauMoiXuLy", "btn btn-info btn-xs", "", "Chuyển đầu mối xử lý hồ sơ này"],
        "ChuyenDoi": ["ChuyenDoiHoSoType(\"/" + area + "/" + view + "/ChuyenDoiHoSoType?id=" + id + "\")", "<i class='glyphicon glyphicon-ok-sign' style='color: #81ecec'> </i> Chuyển đổi loại hồ sơ", permissionCodeString + "_ChuyenDoi", "", "", "Chuyển đổi"],
        "ThongTinChiTiet": ["/" + area + "/" + view + "/Detail/" + id, "<i class='glyphicon glyphicon-user'> </i> Thông tin chi tiết", permissionCodeString + "_Detail", "", "Thông tin chi tiết"],
        "SuaHoSo": ["/" + area + "/" + view + "/Edit/" + id, "<i class='glyphicon glyphicon-edit'> </i> Sửa đăng ký", permissionCodeString + "_Edit", "", "Sửa đăng ký"],
        "XoaHoSo": ["DeleteAction(\"/" + area + "/" + view + "/Delete/" + id + "\")", "<i class=' glyphicon glyphicon-remove' style='color:red'> </i> Xóa", permissionCodeString + "_Delete", "", "", "Xóa"],
        "YeuCauBoSungThongTin": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=6&id=" + id + "\")", "<i class='glyphicon glyphicon glyphicon-plus-sign'style='color: #4fff4f'> </i> Yêu cầu bổ sung thông tin", permissionCodeString + "_6", "", "", "Thay đổi thông tin hồ sơ"],
        "DaDuyetDienTu": [action + "(\"/" + area + "/" + view + "/" + action + "?status=4&id=" + id + "\",4)", "<i class='glyphicon glyphicon-ok-sign'style='color: #045dd9'> </i> Duyệt đăng ký", permissionCodeString + "_4", "", "", "Duyệt điện tử"],
        "DuyetGiaHan": [action + "(\"/" + area + "/" + view + "/" + action + "?status=4&id=" + id + "\",12)", "<i class='glyphicon glyphicon-ok-sign'style='color: #045dd9'> </i> Duyệt gia hạn", permissionCodeString + "_12", "", "", "Duyệt gia hạn"],
        "DaXacNhan": [action + "(\"/" + area + "/" + view + "/" + action + "?status=5&id=" + id + "\",5)", "<i class='glyphicon glyphicon-ok-circle' style='color: #045dd9'> </i> Xác nhận đăng ký", permissionCodeString + "_5", "", "", "Xác nhận hồ sơ"],
        "BiTuChoi": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=3&id=" + id + "\")", "<i class='glyphicon glyphicon-minus-sign'style='color: #ff4242'> </i> Từ chối", permissionCodeString + "_3", "", "", "Từ chối hồ sơ"],
        "DaChamDutDangKy": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=7&id=" + id + "\")", "<i class='glyphicon glyphicon glyphicon-download' style='color: #146dfc'> </i> Chấm dứt đăng ký", permissionCodeString + "_7", "", "", "Chấm dứt đăng ký"],
        "DaHuyDangKy": [action + "(\"/" + area + "/" + view + "/" + action + "?status=8&id=" + id + "\",8)", "<i class='glyphicon glyphicon glyphicon-minus-sign'style='color: #ff4242'> </i> Hủy đăng ký", permissionCodeString + "_8", "", "", "Hủy đăng ký"],
        //"DaChamDutThongBao": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=10&id=" + id + "\")", "<i class='glyphicon glyphicon glyphicon-download'style='color: #146dfc'> </i> Chấm dứt thông báo", permissionCodeString + "_10","","","Chấm dứt thông báo"],
        //"DaHuyThongBao": [action + "(\"/" + area + "/" + view + "/" + action + "?status=11&id=" + id + "\",11)", "<i class='glyphicon glyphicon glyphicon-minus-sign'style='color: #ff4242'> </i> Hủy thông báo", permissionCodeString + "_11","","","Hủy thông báo"],
        "DaYeuCauGiaHan": [action + "(\"/" + area + "/" + view + "/" + action + "?status=11&id=" + id + "\",11)", "<i class='glyphicon glyphicon glyphicon-calendar'style='color: #00e1ff'> </i> Yêu cầu gia hạn", permissionCodeString + "_11", "", "", "Yêu cầu gia hạn"],
    }
    var WebsiteAppLinkRole = {
        "ChuyenDoi": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.ChuyenDoi[0], WebsiteAnAppLinkRoleStatus.ChuyenDoi[1], WebsiteAnAppLinkRoleStatus.ChuyenDoi[2], WebsiteAnAppLinkRoleStatus.ChuyenDoi[3], WebsiteAnAppLinkRoleStatus.ChuyenDoi[4], WebsiteAnAppLinkRoleStatus.ChuyenDoi[5]),
        "ChuyenDauMoiXuLy": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.ChuyenDauMoiXuLy[0], WebsiteAnAppLinkRoleStatus.ChuyenDauMoiXuLy[1], WebsiteAnAppLinkRoleStatus.ChuyenDauMoiXuLy[2], WebsiteAnAppLinkRoleStatus.ChuyenDauMoiXuLy[3], WebsiteAnAppLinkRoleStatus.ChuyenDauMoiXuLy[4], WebsiteAnAppLinkRoleStatus.ChuyenDauMoiXuLy[5]),
        "ThongTinChiTiet": LinkRole(WebsiteAnAppLinkRoleStatus.ThongTinChiTiet[0], WebsiteAnAppLinkRoleStatus.ThongTinChiTiet[1], WebsiteAnAppLinkRoleStatus.ThongTinChiTiet[2], WebsiteAnAppLinkRoleStatus.ThongTinChiTiet[3], WebsiteAnAppLinkRoleStatus.ThongTinChiTiet[4]),
        "SuaHoSo": LinkRole(WebsiteAnAppLinkRoleStatus.SuaHoSo[0], WebsiteAnAppLinkRoleStatus.SuaHoSo[1], WebsiteAnAppLinkRoleStatus.SuaHoSo[2], WebsiteAnAppLinkRoleStatus.SuaHoSo[3], WebsiteAnAppLinkRoleStatus.SuaHoSo[4]),
        "XoaHoSo": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.XoaHoSo[0], WebsiteAnAppLinkRoleStatus.XoaHoSo[1], WebsiteAnAppLinkRoleStatus.XoaHoSo[2], WebsiteAnAppLinkRoleStatus.XoaHoSo[3], WebsiteAnAppLinkRoleStatus.XoaHoSo[4], WebsiteAnAppLinkRoleStatus.XoaHoSo[5]),
        "YeuCauBoSungThongTin": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.YeuCauBoSungThongTin[0], WebsiteAnAppLinkRoleStatus.YeuCauBoSungThongTin[1], WebsiteAnAppLinkRoleStatus.YeuCauBoSungThongTin[2], WebsiteAnAppLinkRoleStatus.YeuCauBoSungThongTin[3], WebsiteAnAppLinkRoleStatus.YeuCauBoSungThongTin[4], WebsiteAnAppLinkRoleStatus.YeuCauBoSungThongTin[5]),
        "DaDuyetDienTu": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DaDuyetDienTu[0], WebsiteAnAppLinkRoleStatus.DaDuyetDienTu[1], WebsiteAnAppLinkRoleStatus.DaDuyetDienTu[2], WebsiteAnAppLinkRoleStatus.DaDuyetDienTu[3], WebsiteAnAppLinkRoleStatus.DaDuyetDienTu[4], WebsiteAnAppLinkRoleStatus.DaDuyetDienTu[5]),
        "DuyetGiaHan": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DuyetGiaHan[0], WebsiteAnAppLinkRoleStatus.DuyetGiaHan[1], WebsiteAnAppLinkRoleStatus.DuyetGiaHan[2], WebsiteAnAppLinkRoleStatus.DuyetGiaHan[3], WebsiteAnAppLinkRoleStatus.DuyetGiaHan[4], WebsiteAnAppLinkRoleStatus.DuyetGiaHan[5]),
        "DaXacNhan": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DaXacNhan[0], WebsiteAnAppLinkRoleStatus.DaXacNhan[1], WebsiteAnAppLinkRoleStatus.DaXacNhan[2], WebsiteAnAppLinkRoleStatus.DaXacNhan[3], WebsiteAnAppLinkRoleStatus.DaXacNhan[4], WebsiteAnAppLinkRoleStatus.DaXacNhan[5]),
        "BiTuChoi": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.BiTuChoi[0], WebsiteAnAppLinkRoleStatus.BiTuChoi[1], WebsiteAnAppLinkRoleStatus.BiTuChoi[2], WebsiteAnAppLinkRoleStatus.BiTuChoi[3], WebsiteAnAppLinkRoleStatus.BiTuChoi[4], WebsiteAnAppLinkRoleStatus.BiTuChoi[5]),
        "DaChamDutDangKy": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DaChamDutDangKy[0], WebsiteAnAppLinkRoleStatus.DaChamDutDangKy[1], WebsiteAnAppLinkRoleStatus.DaChamDutDangKy[2], WebsiteAnAppLinkRoleStatus.DaChamDutDangKy[3], WebsiteAnAppLinkRoleStatus.DaChamDutDangKy[4], WebsiteAnAppLinkRoleStatus.DaChamDutDangKy[5]),
        "DaHuyDangKy": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DaHuyDangKy[0], WebsiteAnAppLinkRoleStatus.DaHuyDangKy[1], WebsiteAnAppLinkRoleStatus.DaHuyDangKy[2], WebsiteAnAppLinkRoleStatus.DaHuyDangKy[3], WebsiteAnAppLinkRoleStatus.DaHuyDangKy[4], WebsiteAnAppLinkRoleStatus.DaHuyDangKy[5]),
        //"DaChamDutThongBao": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DaChamDutThongBao[0], WebsiteAnAppLinkRoleStatus.DaChamDutThongBao[1], WebsiteAnAppLinkRoleStatus.DaChamDutThongBao[2], WebsiteAnAppLinkRoleStatus.DaChamDutThongBao[3], WebsiteAnAppLinkRoleStatus.DaChamDutThongBao[4], WebsiteAnAppLinkRoleStatus.DaChamDutThongBao[5]),
        //"DaHuyThongBao": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DaHuyThongBao[0], WebsiteAnAppLinkRoleStatus.DaHuyThongBao[1], WebsiteAnAppLinkRoleStatus.DaHuyThongBao[2], WebsiteAnAppLinkRoleStatus.DaHuyThongBao[3], WebsiteAnAppLinkRoleStatus.DaHuyThongBao[4], WebsiteAnAppLinkRoleStatus.DaHuyThongBao[5]),
        "DaYeuCauGiaHan": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DaYeuCauGiaHan[0], WebsiteAnAppLinkRoleStatus.DaYeuCauGiaHan[1], WebsiteAnAppLinkRoleStatus.DaYeuCauGiaHan[2], WebsiteAnAppLinkRoleStatus.DaYeuCauGiaHan[3], WebsiteAnAppLinkRoleStatus.DaYeuCauGiaHan[4], WebsiteAnAppLinkRoleStatus.DaYeuCauGiaHan[5]),
    }
    return WebsiteAppLinkRole;
}
function WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId) {
    var permissionCodeString = permissonCodeString(view);
    var WebsiteAnAppLinkRoleStatus = {
        "NhanXuLy": ["GetProcess(\"/" + area + "/" + view + "/GetProcess/" + id + "\")", "Nhận xử lý", permissionCodeString + "_NhanXuLy", "btn btn-primary btn-xs", "", "Nhận là đầu mối xử lý hồ sơ này"],
        "ChuyenDauMoiXuLy": ["CreateAction(\"/" + area + "/" + view + "/PhanDauMoiIndex?id=" + currentUserId + "&item=" + id + "\")", "Chuyển đầu mối xử lý", permissionCodeString + "_ChuyenDauMoiXuLy", "btn btn-info btn-xs", "", "Chuyển đầu mối xử lý hồ sơ này"],
        "ChuyenDoi": ["ChuyenDoiHoSoType(\"/" + area + "/" + view + "/ChuyenDoiHoSoType?id=" + id + "\")", "<i class='glyphicon glyphicon-ok-sign' style='color: #81ecec'> </i> Chuyển đổi loại hồ sơ", permissionCodeString + "_ChuyenDoi", "btn btn-primary btn-sm", "", "Chuyển đổi"],
        "ThongTinChiTiet": ["/" + area + "/" + view + "/Detail/" + id, "<i class='glyphicon glyphicon-user'> </i> Thông tin chi tiết", permissionCodeString + "_Detail", "btn btn-primary btn-sm", "Thông tin chi tiết"],
        "SuaHoSo": ["/" + area + "/" + view + "/Edit/" + id, "<i class='glyphicon glyphicon-edit'> </i> Sửa đăng ký", permissionCodeString + "_Edit", "btn btn-primary btn-sm", "Sửa đăng ký"],
        "XoaHoSo": ["DeleteAction(\"/" + area + "/" + view + "/Delete/" + id + "\")", "<i class=' glyphicon glyphicon-remove' style='color:red'> </i> Xóa", permissionCodeString + "_Delete", "btn btn-primary btn-sm", "", "Xóa"],
        "YeuCauBoSungThongTin": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=6&id=" + id + "\")", "<i class='glyphicon glyphicon glyphicon-plus-sign'style='color: #4fff4f'> </i> Yêu cầu bổ sung thông tin", permissionCodeString + "_6", "btn btn-primary btn-sm", "", "Thay đổi thông tin hồ sơ"],
        "DaDuyetDienTu": [action + "(\"/" + area + "/" + view + "/" + action + "?status=4&id=" + id + "\",4)", "<i class='glyphicon glyphicon-ok-sign'style='color: #045dd9'> </i> Duyệt đăng ký", permissionCodeString + "_4", "btn btn-primary btn-sm", "", "Duyệt điện tử"],
        "DuyetGiaHan": [action + "(\"/" + area + "/" + view + "/" + action + "?status=4&id=" + id + "\",12)", "<i class='glyphicon glyphicon-ok-sign'style='color: #045dd9'> </i> Duyệt gia hạn", permissionCodeString + "_12", "btn btn-primary btn-sm", "", "Duyệt gia hạn"],
        "DaXacNhan": [action + "(\"/" + area + "/" + view + "/" + action + "?status=5&id=" + id + "\",5)", "<i class='glyphicon glyphicon-ok-circle' style='color: #045dd9'> </i> Xác nhận đăng ký", permissionCodeString + "_5", "btn btn-primary btn-sm", "", "Xác nhận hồ sơ"],
        "BiTuChoi": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=3&id=" + id + "\")", "<i class='glyphicon glyphicon-minus-sign'style='color: #ff4242'> </i> Từ chối", permissionCodeString + "_3", "btn btn-primary btn-sm", "", "Từ chối hồ sơ"],
        "DaChamDutDangKy": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=7&id=" + id + "\")", "<i class='glyphicon glyphicon glyphicon-download' style='color: #146dfc'> </i> Chấm dứt đăng ký", permissionCodeString + "_7", "btn btn-primary btn-sm", "", "Chấm dứt đăng ký"],
        "DaHuyDangKy": [action + "(\"/" + area + "/" + view + "/" + action + "?status=8&id=" + id + "\",8)", "<i class='glyphicon glyphicon glyphicon-minus-sign'style='color: #ff4242'> </i> Hủy đăng ký", permissionCodeString + "_8", "btn btn-primary btn-sm", "", "Hủy đăng ký"],
        //"DaChamDutThongBao": ["CreateAction(\"/" + area + "/" + view + "/RequestStatus?status=10&id=" + id + "\")", "<i class='glyphicon glyphicon glyphicon-download'style='color: #146dfc'> </i> Chấm dứt thông báo", permissionCodeString + "_10", "btn btn-primary btn-sm", "", "Chấm dứt thông báo"],
        //"DaHuyThongBao": [action + "(\"/" + area + "/" + view + "/" + action + "?status=11&id=" + id + "\",11)", "<i class='glyphicon glyphicon glyphicon-minus-sign'style='color: #ff4242'> </i> Hủy thông báo", permissionCodeString + "_11", "btn btn-primary btn-sm", "", "Hủy thông báo"],
        "DaYeuCauGiaHan": [action + "(\"/" + area + "/" + view + "/" + action + "?status=11&id=" + id + "\",11)", "<i class='glyphicon glyphicon glyphicon-calendar'style='color: #00e1ff'> </i> Yêu cầu gia hạn", permissionCodeString + "_11", "btn btn-primary btn-sm", "", "Yêu cầu gia hạn"],
    }
    var WebsiteAppLinkRole = {
        "ChuyenDoi": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.ChuyenDoi[0], WebsiteAnAppLinkRoleStatus.ChuyenDoi[1], WebsiteAnAppLinkRoleStatus.ChuyenDoi[2], WebsiteAnAppLinkRoleStatus.ChuyenDoi[3], WebsiteAnAppLinkRoleStatus.ChuyenDoi[4], WebsiteAnAppLinkRoleStatus.ChuyenDoi[5]),
        "ChuyenDauMoiXuLy": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.ChuyenDauMoiXuLy[0], WebsiteAnAppLinkRoleStatus.ChuyenDauMoiXuLy[1], WebsiteAnAppLinkRoleStatus.ChuyenDauMoiXuLy[2], WebsiteAnAppLinkRoleStatus.ChuyenDauMoiXuLy[3], WebsiteAnAppLinkRoleStatus.ChuyenDauMoiXuLy[4], WebsiteAnAppLinkRoleStatus.ChuyenDauMoiXuLy[5]),
        "ThongTinChiTiet": LinkRole(WebsiteAnAppLinkRoleStatus.ThongTinChiTiet[0], WebsiteAnAppLinkRoleStatus.ThongTinChiTiet[1], WebsiteAnAppLinkRoleStatus.ThongTinChiTiet[2], WebsiteAnAppLinkRoleStatus.ThongTinChiTiet[3], WebsiteAnAppLinkRoleStatus.ThongTinChiTiet[4]),
        "SuaHoSo": LinkRole(WebsiteAnAppLinkRoleStatus.SuaHoSo[0], WebsiteAnAppLinkRoleStatus.SuaHoSo[1], WebsiteAnAppLinkRoleStatus.SuaHoSo[2], WebsiteAnAppLinkRoleStatus.SuaHoSo[3], WebsiteAnAppLinkRoleStatus.SuaHoSo[4]),
        "XoaHoSo": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.XoaHoSo[0], WebsiteAnAppLinkRoleStatus.XoaHoSo[1], WebsiteAnAppLinkRoleStatus.XoaHoSo[2], WebsiteAnAppLinkRoleStatus.XoaHoSo[3], WebsiteAnAppLinkRoleStatus.XoaHoSo[4], WebsiteAnAppLinkRoleStatus.XoaHoSo[5]),
        "YeuCauBoSungThongTin": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.YeuCauBoSungThongTin[0], WebsiteAnAppLinkRoleStatus.YeuCauBoSungThongTin[1], WebsiteAnAppLinkRoleStatus.YeuCauBoSungThongTin[2], WebsiteAnAppLinkRoleStatus.YeuCauBoSungThongTin[3], WebsiteAnAppLinkRoleStatus.YeuCauBoSungThongTin[4], WebsiteAnAppLinkRoleStatus.YeuCauBoSungThongTin[5]),
        "DaDuyetDienTu": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DaDuyetDienTu[0], WebsiteAnAppLinkRoleStatus.DaDuyetDienTu[1], WebsiteAnAppLinkRoleStatus.DaDuyetDienTu[2], WebsiteAnAppLinkRoleStatus.DaDuyetDienTu[3], WebsiteAnAppLinkRoleStatus.DaDuyetDienTu[4], WebsiteAnAppLinkRoleStatus.DaDuyetDienTu[5]),
        "DuyetGiaHan": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DuyetGiaHan[0], WebsiteAnAppLinkRoleStatus.DuyetGiaHan[1], WebsiteAnAppLinkRoleStatus.DuyetGiaHan[2], WebsiteAnAppLinkRoleStatus.DuyetGiaHan[3], WebsiteAnAppLinkRoleStatus.DuyetGiaHan[4], WebsiteAnAppLinkRoleStatus.DuyetGiaHan[5]),
        "DaXacNhan": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DaXacNhan[0], WebsiteAnAppLinkRoleStatus.DaXacNhan[1], WebsiteAnAppLinkRoleStatus.DaXacNhan[2], WebsiteAnAppLinkRoleStatus.DaXacNhan[3], WebsiteAnAppLinkRoleStatus.DaXacNhan[4], WebsiteAnAppLinkRoleStatus.DaXacNhan[5]),
        "BiTuChoi": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.BiTuChoi[0], WebsiteAnAppLinkRoleStatus.BiTuChoi[1], WebsiteAnAppLinkRoleStatus.BiTuChoi[2], WebsiteAnAppLinkRoleStatus.BiTuChoi[3], WebsiteAnAppLinkRoleStatus.BiTuChoi[4], WebsiteAnAppLinkRoleStatus.BiTuChoi[5]),
        "DaChamDutDangKy": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DaChamDutDangKy[0], WebsiteAnAppLinkRoleStatus.DaChamDutDangKy[1], WebsiteAnAppLinkRoleStatus.DaChamDutDangKy[2], WebsiteAnAppLinkRoleStatus.DaChamDutDangKy[3], WebsiteAnAppLinkRoleStatus.DaChamDutDangKy[4], WebsiteAnAppLinkRoleStatus.DaChamDutDangKy[5]),
        "DaHuyDangKy": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DaHuyDangKy[0], WebsiteAnAppLinkRoleStatus.DaHuyDangKy[1], WebsiteAnAppLinkRoleStatus.DaHuyDangKy[2], WebsiteAnAppLinkRoleStatus.DaHuyDangKy[3], WebsiteAnAppLinkRoleStatus.DaHuyDangKy[4], WebsiteAnAppLinkRoleStatus.DaHuyDangKy[5]),
        //"DaChamDutThongBao": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DaChamDutThongBao[0], WebsiteAnAppLinkRoleStatus.DaChamDutThongBao[1], WebsiteAnAppLinkRoleStatus.DaChamDutThongBao[2], WebsiteAnAppLinkRoleStatus.DaChamDutThongBao[3], WebsiteAnAppLinkRoleStatus.DaChamDutThongBao[4], WebsiteAnAppLinkRoleStatus.DaChamDutThongBao[5]),
        //"DaHuyThongBao": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DaHuyThongBao[0], WebsiteAnAppLinkRoleStatus.DaHuyThongBao[1], WebsiteAnAppLinkRoleStatus.DaHuyThongBao[2], WebsiteAnAppLinkRoleStatus.DaHuyThongBao[3], WebsiteAnAppLinkRoleStatus.DaHuyThongBao[4], WebsiteAnAppLinkRoleStatus.DaHuyThongBao[5]),
        "DaYeuCauGiaHan": LinkRoleFunc(WebsiteAnAppLinkRoleStatus.DaYeuCauGiaHan[0], WebsiteAnAppLinkRoleStatus.DaYeuCauGiaHan[1], WebsiteAnAppLinkRoleStatus.DaYeuCauGiaHan[2], WebsiteAnAppLinkRoleStatus.DaYeuCauGiaHan[3], WebsiteAnAppLinkRoleStatus.DaYeuCauGiaHan[4], WebsiteAnAppLinkRoleStatus.DaYeuCauGiaHan[5]),
    }
    return WebsiteAppLinkRole;
}

function WebsiteAndAppChangeStatus(status, id, area, view, action, currentUserId, stickid) {
    var result = `<div class="btn-group">
							   <button data-toggle="dropdown" class="btn btn-xs btn-primary btn-white dropdown-toggle" aria-expanded="false">Thao tác<i class="ace-icon fa fa-angle-down icon-on-right"></i>
							   </button>
    						   <ul class="dropdown-menu dropdown-menu-left">`;
    if (((stickid == null || stickid == 0) || (stickid != currentUserId)) && !HasRole("Super_admin")) {
        console.log(1)
        result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).ThongTinChiTiet + "</li>";
    } else if (HasRole("Super_admin")) {
        result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).ThongTinChiTiet + "</li>";
        switch (status) {
            case 1:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).ChuyenDoi + "</li>";
                break;
            case 6:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 4:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaXacNhan + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 5:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyDangKy + "</li>";
                break;
            case 3:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyDangKy + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao+ "</li>";
                break;
            case 2:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 9:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                break;
            case 7:
                break;
            case 8:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            //case 9:
            //    result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
            //    result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
            //    break;
            //case 10:
            //    result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
            //    break;
            //case 11:
            //    break;
            case 10:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaYeuCauGiaHan + "</li>";
                break;
            case 11:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
                break;
            case 12:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DuyetGiaHan + "</li>";
                break;
        }
    }
    else {
        result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).ThongTinChiTiet + "</li>";
        switch (status) {
            case 1:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).ChuyenDoi + "</li>";
                break;
            case 6:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 4:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaXacNhan + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 5:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyDangKy + "</li>";
                break;
            case 3:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyDangKy + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao+ "</li>";
                break;
            case 2:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 9:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                break;
            case 7:
                break;
            case 8:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            //case 9:
            //    result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
            //    result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
            //    break;
            //case 10:
            //    result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
            //    break;
            //case 11:
            //    break;
            case 10:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaYeuCauGiaHan + "</li>";
                break;
            case 11:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
                break;
            case 12:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DuyetGiaHan + "</li>";
                break;
        }
    }

    result += "</ul></div>";
    return result;
}
function WebsiteAndAppChangeStatusDetail(status, id, area, view, action, currentUserId, stickid) {
    var permissionCodeString = permissonCodeString(view);
    var result = "";
    if ((stickid == null || stickid == 0) || (stickid != currentUserId) && !HasRole("Super_admin")) {
    }
    if ((stickid == null || stickid == 0) && (currentUserId != stickid) && !HasRole("Super_admin")) {
        result += LinkRoleFunc("GetProcessDetail(\"/" + area + "/" + view + "/GetProcess/" + id + "\")", "<i class='glyphicon glyphicon-ok-sign'> </i> Nhận xử lý", permissionCodeString + "_NhanXuLy", "btn btn-primary btn-xs", "", "Nhận là đầu mối xử lý hồ sơ này");
    } else if (HasRole("Super_admin")) {
        switch (status) {
            case 1:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).ChuyenDoi;
                break;
            case 6:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 4:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaXacNhan;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 5:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyDangKy;
                break;
            case 3:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyDangKy;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyThongBao;
                break;
            case 2:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 9:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                break;
            case 7:
                break;
            case 8:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            //case 9:
            //    result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
            //    result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
            //    break;
            //case 10:
            //    result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyThongBao;
            //    break;
            //case 11:
            //    break;
            case 10:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                break;
            case 11:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                break;
            case 12:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DuyetGiaHan;
                break;
        }
    }
    else if (stickid == currentUserId) {
        switch (status) {
            case 1:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).ChuyenDoi;
                break;
            case 6:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 4:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaXacNhan;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 5:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyDangKy;
                break;
            case 3:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyDangKy;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyThongBao;
                break;
            case 2:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 9:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                break;
            case 7:
                break;
            case 8:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            //case 9:
            //    result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
            //    result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
            //    break;
            //case 10:
            //    result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyThongBao;
            //    break;
            //case 11:
            //    break;
            case 10:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                break;
            case 11:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                break;
            case 12:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DuyetGiaHan;
                break;
        }
    }
    return result;
}
function WebsiteAndAppChangeStatusExpried(status, id, area, view, action, currentUserId, stickid) {
    var result = `<div class="btn-group">
							   <button data-toggle="dropdown" class="btn btn-xs btn-primary btn-white dropdown-toggle" aria-expanded="false">Thao tác<i class="ace-icon fa fa-angle-down icon-on-right"></i>
							   </button>
    						   <ul class="dropdown-menu dropdown-menu-left">`;
    if ((stickid == null || stickid == 0) || (stickid != currentUserId) && !HasRole("Super_admin")) {
        result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).ThongTinChiTiet + "</li>";
    } else if (HasRole("Super_admin")) {
        result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).ThongTinChiTiet + "</li>";
        switch (status) {
            case 1:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).ChuyenDoi + "</li>";
                break;
            case 6:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 4:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaXacNhan + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaYeuCauGiaHan + "</li>";
                break;
            case 5:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyDangKy + "</li>";
                break;
            case 3:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyDangKy + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao+ "</li>";
                break;
            case 2:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 9:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                break;
            case 7:
                break;
            case 8:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 10:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaYeuCauGiaHan + "</li>";
                break;
            case 11:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
                break;
            case 12:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DuyetGiaHan + "</li>";
                break;
        }
    }
    else {
        result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).ThongTinChiTiet + "</li>";
        switch (status) {
            case 1:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).ChuyenDoi + "</li>";
                break;
            case 6:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 4:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaXacNhan + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaYeuCauGiaHan + "</li>";
                break;
            case 5:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyDangKy + "</li>";
                break;
            case 3:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyDangKy + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao+ "</li>";
                break;
            case 2:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 9:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                break;
            case 7:
                break;
            case 8:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            //case 9:
            //    result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
            //    result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
            //    break;
            //case 10:
            //    result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
            //    break;
            //case 11:
            //    break;
            case 10:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaYeuCauGiaHan + "</li>";
                break;
            case 11:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaChamDutThongBao + "</li>";
                //result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DaHuyThongBao + "</li>";
                break;
            case 12:
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + WebsiteAndAppChangeStatusByRole(id, area, view, action).DuyetGiaHan + "</li>";
                break;
        }
    }

    result += "</ul></div>";
    return result;
}
function WebsiteAndAppChangeStatusDetailExpried(status, id, area, view, action, currentUserId, stickid) {
    var permissionCodeString = permissonCodeString(view);
    var result = "";
    if ((stickid == null || stickid == 0) || (stickid != currentUserId) && !HasRole("Super_admin")) {
    }
    if ((stickid == null || stickid == 0) && (currentUserId != stickid) && !HasRole("Super_admin")) {
        result += LinkRoleFunc("GetProcess(\"/" + area + "/" + view + "/GetProcess/" + id + "\")", "<i class='glyphicon glyphicon-ok-sign'> </i> Nhận xử lý", permissionCodeString + "_NhanXuLy", "btn btn-primary btn-xs", "", "Nhận là đầu mối xử lý hồ sơ này");
    } else if (HasRole("Super_admin")) {
        switch (status) {
            case 1:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).ChuyenDoi;
                break;
            case 6:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 4:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaXacNhan;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaYeuCauGiaHan;
                break;
            case 5:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyDangKy;
                break;
            case 3:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyDangKy;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyThongBao;
                break;
            case 2:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 9:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                break;
            case 7:
                break;
            case 8:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            //case 9:
            //    result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
            //    result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
            //    break;
            //case 10:
            //    result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyThongBao;
            //    break;
            //case 11:
            //    break;
            case 10:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                break;
            case 11:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                break;
            case 12:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DuyetGiaHan;
                break;
        }
    }
    else if (stickid == currentUserId) {
        switch (status) {
            case 1:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).ChuyenDoi;
                break;
            case 6:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 4:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaXacNhan;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaYeuCauGiaHan;
                break;
            case 5:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyDangKy;
                break;
            case 3:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyDangKy;
                //result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyThongBao;
                break;
            case 2:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 9:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                break;
            case 7:
                break;
            case 8:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            //case 9:
            //    result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
            //    result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutThongBao;
            //    break;
            //case 10:
            //    result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaHuyThongBao;
            //    break;
            //case 11:
            //    break;
            case 10:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                break;
            case 11:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                break;
            case 12:
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += WebsiteAndAppChangeStatusByRoleDetail(id, area, view, action, currentUserId).DuyetGiaHan;
                break;
        }
    }
    return result;
}

function PersonalAndCompanyAndOrganizationChangeStatus(status, id, area, view, action, currentUserId, stickid, isAction) {
    var result = `<div class="btn-group">
							   <button data-toggle="dropdown" class="btn btn-xs btn-primary btn-white dropdown-toggle" aria-expanded="false">Thao tác<i class="ace-icon fa fa-angle-down icon-on-right"></i>
							   </button>
    						   <ul class="dropdown-menu dropdown-menu-left">`;

    if (HasRole("Super_admin")) {
        result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).ThongTinChiTiet + "</li>";
        switch (status) {
            case 0:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).BiKhoa + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 1:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).BiKhoa + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                //result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).DaXacNhan + "</li>";
                break;
            case 2:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).BiKhoa + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 3:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                //result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).BiKhoa + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 4:
                //result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).ChoDuyet + "</li>";
                //result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 5:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                //result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).XoaHoSo + "</li>";
                break;
            case 6:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                break;
            case 7:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                break;
            case 8:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).BiKhoa + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
        }
    }
    else if (isAction == true) {
        result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).ThongTinChiTiet + "</li>";
        switch (status) {
            case 0:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).BiKhoa + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 1:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).BiKhoa + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                //result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).DaXacNhan + "</li>";
                break;
            case 2:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).BiKhoa + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 3:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                //result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).BiTuChoi + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).BiKhoa + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 4:
                //result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).ChoDuyet + "</li>";
                //result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
            case 5:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                //result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).XoaHoSo + "</li>";
                break;
            case 6:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                break;
            case 7:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).DaDuyetDienTu + "</li>";
                break;
            case 8:
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).YeuCauBoSungThongTin + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).DaChamDutDangKy + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).BiKhoa + "</li>";
                result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).SuaHoSo + "</li>";
                break;
        }
    } else if ((stickid == null || stickid == 0) || (stickid != currentUserId) && !HasRole("Super_admin") || isAction == false) {
        result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).ThongTinChiTiet + "</li>";
    }
    result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).GanDiaChi + "</li>";
    result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).ThemMoiSanPham + "</li>";
    result += "<li>" + PersonalAndCompanyAndOrganizationChangeStatusByRole(id, area, view, action).ThemMoiDichVu + "</li>";

    result += "</ul></div>";
    return result;
}
function PersonalAndCompanyAndOrganizationChangeStatusDetail(status, id, area, view, action, currentUserId, isAction) {
    var result = "";
    if (HasRole("Super_admin")) {
        switch (status) {
            case 0:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiKhoa;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 1:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiKhoa;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                //result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaXacNhan;
                break;
            case 2:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiKhoa;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 3:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                //result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiKhoa;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 4:
                //result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).ChoDuyet;
                //result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 5:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                break;
            case 6:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                break;
            case 7:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                break;
            case 8:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiKhoa;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
        }
    }
    else if (isAction == true) {
        switch (status) {
            case 0:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiKhoa;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 1:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiKhoa;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                //result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaXacNhan;
                break;
            case 2:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiKhoa;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 3:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                //result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiTuChoi;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiKhoa;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 4:
                //result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).ChoDuyet;
                //result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
            case 5:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                break;
            case 6:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                break;
            case 7:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaDuyetDienTu;
                break;
            case 8:
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).YeuCauBoSungThongTin;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).DaChamDutDangKy;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).BiKhoa;
                result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).SuaHoSo;
                break;
        }
    }
    else if (!HasRole("Super_admin") || isAction == false) {
    }
    result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).GanDiaChi;
    result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).ThemMoiSanPham;
    result += PersonalAndCompanyAndOrganizationChangeStatusByRoleDetail(id, area, view, action, currentUserId).ThemMoiDichVu;

    return result;
}

function WebsiteGanBieuTuongTinNhiemChangeStatusByRole(id, area, view, action, currentUserId) {
    var permissionCodeString = permissonCodeString(view);
    var PersonalAndCompanyAndOrganizationLinkRoleStatus = {
        "ThongTinChiTiet": ["/" + area + "/" + view + "/Detail/" + id, "<i class='glyphicon glyphicon-user'> </i> Thông tin chi tiết", permissionCodeString + "_Detail", "", "Thông tin chi tiết"],
        "SuaHoSo": ["/" + area + "/" + view + "/Edit/" + id, "<i class='glyphicon glyphicon-edit'> </i> Sửa đăng ký", permissionCodeString + "_Edit", "", "Sửa đăng ký"],
        "XoaHoSo": ["DeleteAction(\"/" + area + "/" + view + "/Delete/" + id + "\")", "<i class=' glyphicon glyphicon-remove' style='color:red'> </i> Xóa", permissionCodeString + "_Delete", "", "", "Xóa"],
        "LoaiBoKhoiDanhSach": [action + "(\"/" + area + "/" + view + "/" + action + "?status=1&id=" + id + "\",1)", "<i class='glyphicon glyphicon-minus-sign'style='color: #ff4242'> </i> Loại bỏ khỏi danh sách", permissionCodeString + "_1", "", "", "Loại bỏ khỏi danh sách"],
        "ThemVaoDanhSach": [action + "(\"/" + area + "/" + view + "/" + action + "?status=2&id=" + id + "\",2)", "<i class='glyphicon glyphicon-ok-sign'style='color: #045dd9'> </i> Thêm vào danh sách", permissionCodeString + "_2", "", "", "Thêm vào danh sách"],
    }
    var PersonalAndCompanyAndOrganizationLinkRole = {
        "ThongTinChiTiet": LinkRole(PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[4]),
        "SuaHoSo": LinkRole(PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[4]),
        "XoaHoSo": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[5]),
        "LoaiBoKhoiDanhSach": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.LoaiBoKhoiDanhSach[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.LoaiBoKhoiDanhSach[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.LoaiBoKhoiDanhSach[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.LoaiBoKhoiDanhSach[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.LoaiBoKhoiDanhSach[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.LoaiBoKhoiDanhSach[5]),
        "ThemVaoDanhSach": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemVaoDanhSach[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemVaoDanhSach[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemVaoDanhSach[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemVaoDanhSach[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemVaoDanhSach[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemVaoDanhSach[5]),
    }
    return PersonalAndCompanyAndOrganizationLinkRole;
}
function WebsiteGanBieuTuongTinNhiemChangeStatusByRoleDetail(id, area, view, action, currentUserId) {
    var permissionCodeString = permissonCodeString(view);
    var PersonalAndCompanyAndOrganizationLinkRoleStatus = {
        "ThongTinChiTiet": ["/" + area + "/" + view + "/Detail/" + id, "<i class='glyphicon glyphicon-user'> </i> Thông tin chi tiết", permissionCodeString + "_Detail", "", "Thông tin chi tiết"],
        "SuaHoSo": ["/" + area + "/" + view + "/Edit/" + id, "<i class='glyphicon glyphicon-edit'> </i> Sửa đăng ký", permissionCodeString + "_Edit", "", "Sửa đăng ký"],
        "XoaHoSo": ["DeleteAction(\"/" + area + "/" + view + "/Delete/" + id + "\")", "<i class=' glyphicon glyphicon-remove' style='color:red'> </i> Xóa", permissionCodeString + "_Delete", "", "", "Xóa"],
        "LoaiBoKhoiDanhSach": [action + "(\"/" + area + "/" + view + "/" + action + "?status=1&id=" + id + "\",1)", "<i class='glyphicon glyphicon-minus-sign'style='color: #ff4242'> </i> Loại bỏ khỏi danh sách", permissionCodeString + "_1", "btn btn-primary btn-sm", "", "Loại bỏ khỏi danh sách"],
        "ThemVaoDanhSach": [action + "(\"/" + area + "/" + view + "/" + action + "?status=2&id=" + id + "\",2)", "<i class='glyphicon glyphicon-ok-sign'style='color: #045dd9'> </i> Thêm vào danh sách", permissionCodeString + "_2", "btn btn-primary btn-sm", "", "Thêm vào danh sách"],
    }
    var PersonalAndCompanyAndOrganizationLinkRole = {
        "ThongTinChiTiet": LinkRole(PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThongTinChiTiet[4]),
        "SuaHoSo": LinkRole(PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.SuaHoSo[4]),
        "XoaHoSo": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.XoaHoSo[5]),
        "LoaiBoKhoiDanhSach": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.LoaiBoKhoiDanhSach[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.LoaiBoKhoiDanhSach[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.LoaiBoKhoiDanhSach[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.LoaiBoKhoiDanhSach[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.LoaiBoKhoiDanhSach[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.LoaiBoKhoiDanhSach[5]),
        "ThemVaoDanhSach": LinkRoleFunc(PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemVaoDanhSach[0], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemVaoDanhSach[1], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemVaoDanhSach[2], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemVaoDanhSach[3], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemVaoDanhSach[4], PersonalAndCompanyAndOrganizationLinkRoleStatus.ThemVaoDanhSach[5]),
    }
    return PersonalAndCompanyAndOrganizationLinkRole;
}

function WebsiteGanBieuTuongTinNhiemChangeStatus(status, id, area, view, action, currentUserId, stickid) {
    var result = `<div class="btn-group">
							   <button data-toggle="dropdown" class="btn btn-xs btn-primary btn-white dropdown-toggle" aria-expanded="false">Thao tác<i class="ace-icon fa fa-angle-down icon-on-right"></i>
							   </button>
    						   <ul class="dropdown-menu dropdown-menu-left">`;
    if ((stickid == null || stickid == 0) || (stickid != currentUserId) && !HasRole("Super_admin")) {
        result += "<li>" + WebsiteGanBieuTuongTinNhiemChangeStatusByRole(id, area, view, action).ThongTinChiTiet + "</li>";
    }
    else {
        result += "<li>" + WebsiteGanBieuTuongTinNhiemChangeStatusByRole(id, area, view, action).ThongTinChiTiet + "</li>";
        switch (status) {
            case 1:
                //result += "<li>" + WebsiteGanBieuTuongTinNhiemChangeStatusByRole(id, area, view, action).LoaiBoKhoiDanhSach + "</li>";
                break;
            case 2:
                //result += "<li>" + WebsiteGanBieuTuongTinNhiemChangeStatusByRole(id, area, view, action).ThemVaoDanhSach + "</li>";
                break;
        }
    }

    result += "</ul></div>";
    return result;
}
function WebsiteGanBieuTuongTinNhiemChangeStatusDetail(status, id, area, view, action, currentUserId, stickid) {
    var permissionCodeString = permissonCodeString(view);
    var result = "";
    if ((stickid == null || stickid == 0) || (stickid != currentUserId) && !HasRole("Super_admin")) {
    }
    if ((stickid == null || stickid == 0) && (currentUserId != stickid) && !HasRole("Super_admin")) {
        //result += LinkRoleFunc("GetProcess(\"/" + area + "/" + view + "/GetProcess/" + id + "\")", "<i class='glyphicon glyphicon-ok-sign'> </i> Nhận xử lý", permissionCodeString + "_NhanXuLy", "btn btn-primary btn-xs", "", "Nhận là đầu mối xử lý hồ sơ này");
    }
    else if (stickid == currentUserId) {
        switch (status) {
            case 1:
                //result += WebsiteGanBieuTuongTinNhiemChangeStatusByRoleDetail(id, area, view, action, currentUserId).LoaiBoKhoiDanhSach;
                break;
            case 2:
                //result += WebsiteGanBieuTuongTinNhiemChangeStatusByRoleDetail(id, area, view, action, currentUserId).ThemVaoDanhSach;
                break;
        }
    }
    return result;
}

function addBroadcastNoti(mess) {
    $("#boxRunText").append("<span class='textItem'>" + mess + "</span>");
}

function showBroadcastNoti() {

    if ($("#boxRunText .textItem").length > 0) {
        var firstItemNoti = $("#boxRunText .textItem").first();
        firstItemNoti.addClass("active");

    }
}

//cookie
function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}
//endcookie

function displayWebsiteStatus(status) {
    switch (status) {
        case 0: return '<span class="label label-primary"style="height:28px;"><p>Website chờ</br>duyệt</p></span>';
        case 1: return '<span class="label label-info"style="height:28px;"><p><p>Website cần bổ</br>sung thông tin</p></span>';
        case 2: return '<span class="label label-default"style="height:28px;"><p><p>Website đã</br>duyệt điện tử</p></span>';
        case 3: return '<span class="label label-success"style="height:28px;"><p><p>Website đã</br>xác nhận</p></span>';
        case 4: return '<span class="label label-info"style="height:28px;"><p><p>Website bị</br>từ chối</p></span>';
        case 5: return '<span class="label label-grey"style="height:28px;"><p><p>Website đề nghị</br>chỉnh sửa</p></span>';
        case 6: return '<span class="label label-warning"style="height:42px;">Website đề nghị</br>chấm dứt</br>đăng ký</p></span>';
        case 7: return '<span class="label label-danger"style="height:28px;"><p>Website đã</br>chấm dứt</br>đăng ký</p></span>';
        case 8: return '<span class="label label-inverse"style="height:28px;"><p><p>Website đã</br>hủy đăng ký</p></span>';
        case 9: return '<span class="label label-warning"style="height:28px;"><p><p>Website đề nghị</br>chấm dứt thông báo</p></span>';
        case 10: return '<span class="label label-inverse"style="height:28px;"><p><p>Website đã</br>chấm dứt thông báo</p></span>';
        case 11: return '<span class="label label-danger"style="height:28px;"><p>Website đã</br>hủy thông báo</p></span>';
        case 12: return '<span class="label label-warning"style="height:28px;"><p>Website cần</br>gia hạn</p></span>';
        case 13: return '<span class="label label-warning"style="height:28px;"><p>Website đã yêu cầu gia hạn</br></p></span>';
    }
}

function displayAppStatus(status) {
    switch (status) {
        case 0: return '<span class="label label-primary"style="height:28px;"><p>Ứng dụng</br>chờ duyệt</p></span>';
        case 1: return '<span class="label label-info"style="height:28px;"><p>Ứng dụng cần</br>bổ sung</br>thông tin</p></span>';
        case 2: return '<span class="label label-default"style="height:28px;"><p>Ứng dụng đã</br>duyệt điện tử</p></span>';
        case 3: return '<span class="label label-success"style="height:28px;"><p>Ứng dụng đã</br>xác nhận</p></span>';
        case 4: return '<span class="label label-info"style="height:28px;"><p>Ứng dụng bị</br>từ chối</p></span>';
        case 5: return '<span class="label label-grey"style="height:28px;"><p>Ứng dụng</br>đề nghị</br>chỉnh sửa</p></span>';
        case 6: return '<span class="label label-warning"style="height:28px;"><p>Ứng dụng đề</br>nghị chấm dứt</br>đăng ký</p></span>';
        case 7: return '<span class="label label-danger"style="height:28px;"><p>Ứng dụng đã</br>chấm dứt</br>đăng ký</p></span>';
        case 8: return '<span class="label label-inverse"style="height:28px;"><p>Ứng dụng đã</br>hủy đăng ký</p></span>';
        case 9: return '<span class="label label-warning"style="height:28px;"><p>Ứng dụng đề nghị</br>chấm dứt thông báo</p></span>';
        case 10: return '<span class="label label-inverse"style="height:28px;"><p>Ứng dụng đã</br>chấm dứt thông báo</p></span>';
        case 11: return '<span class="label label-danger"style="height:28px;"><p>Ứng dụng đã</br>hủy thông báo</p></span>';
        case 12: return '<span class="label label-warning"style="height:28px;"><p>Ứng dụng cần</br>gia hạn</p></span>';
        case 13: return '<span class="label label-warning"style="height:28px;"><p>Ứng dụng đã yêu cầu gia hạn</br></p></span>';

    }
}


function displayPhanAnhStatus(status) {
    switch (status) {
        case "MoiDang": return '<span class="label label-default"style="height:16px;">Mới đăng</p></span>'; break;
        case "ChoXuLy": return '<span class="label label-primary"style="height:16px;">Chờ xử lý</p></span>'; break;
        case "DaXuLyXong": return '<span class="label label-success"style="height:16px;">Đã xử lý xong</p></span>'; break;
        case "BiTuChoi": return '<span class="label label-danger"style="height:16px;">Bị từ chối</p></span>'; break;
    }
}


function BackButtonByParentUrl() {
    var ref = document.referrer;
    location.href = ref;
}

function generate_slugable(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}
function LoaiThuongNhanToChuc(typeOrganization) {
    switch (typeOrganization) {
        case 'Company': return '<span class="label label-info">Tài khoản doanh nghiệp</span>'
        case 'Organization': return '<span class="label label-default">Tài khoản tổ chức</span>'
    }
}

function HighLightContent(content) {
    return '<span class="highlightContent"><i class="fa fa-exclamation"></i><b>' + content + '</b></span>';
}

function ShowMessageDateLine(message, date) {
    if (message != null && message != "") {
        return '<p style="color:red;">' + message + ' (' + date + ' ngày)</p>';
    } else {
        return "";
    }
}

function GetExtention(path) {
    return "." + path.split('.').pop();
}

function CheckFileUpload(IDInput, size, typeAllow) {
    var listAllow = typeAllow.split(",");
    var uploadField = $(IDInput);
    if (IDInput != undefined) {
        for (var i = 0; i < IDInput.files.length; i++) {
            if (IDInput.files[i].size > size) {
                NotiError("Dung lượng tệp đã vượt quá giới hạn cho phép");
                IDInput.value = "";
                return false;
            };
            var extent = GetExtention(IDInput.files[i].name).toLowerCase();
            if (listAllow.indexOf(extent) == -1) {
                NotiError("Vui lòng chọn file có định dạng " + typeAllow);
                IDInput.value = "";
                return false;
            }
        }
    }
}

function formatMoney(num, currency = "", splitter = ",") {
    if (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + " " + currency;
    }
    return num;
}

/**
 * author:duynn
 * description: hàm gọi confirm có hàm callback được custom
 * @param {any} title
 * @param {any} message
 * @param {any} callBack
 */
function onConfirmCallBack(title, message, callBack) {
    $.confirm({
        title: title,
        content: message,
        draggable: false,
        theme: 'material',
        buttons: {
            confirm: {
                text: 'Đồng ý',
                btnClass: 'btn-info',
                action: function () {
                    callBack();
                }
            },
            cancel: {
                text: 'Hủy bỏ',
                btnClass: 'btn-danger',
                action: function () { }
            }
        }
    });
}

/**
 * @author:duynn
 * @description: gọi các hàm ajax
 * @param {any} url: đường dẫn gọi hàm
 * @param {any} type: httpMethod: (get, post, delete, put)
 * @param {any} data: dữ liệu gửi lên server
 * @param {any} callback: hàm thực hiện khi xử lý thành công
 * @param {any} callbackError: hàm thực hiện khi xử lý thất bại
 */
function onCallAjax(url, data, type, callback, callbackError) {
    if (!callback || typeof (callback) !== "function") {
        callback = function () {
            console.log("Hàm 'callack' chưa được cấu hình");
        }
    }

    if (!callbackError || typeof (callbackError) !== "function") {
        callbackError = function () {
            console.log("Hàm 'callbackError' chưa được cấu hình");
        }
    }

    if (!url || url == '') {
        NotiError('Lỗi', 'Không thể thực hiện thao tác');
    }
    else {
        $.ajax({
            url: url,
            type: type || 'get',
            data: data,
            success: callback,
            error: callbackError,
        })
    }
}

/**
 * author:duynn
 * description: mở lên form cập nhật
 * @param {any} url
 * @param {any} data
 * @param {any} type
 * @param {any} callBackSuccess
 * @param {any} callbackError
 */
function onOpenEditModal(url, data, type, callBackSuccess, callbackError) {
    var isfunction = callbackError && typeof (callbackError) == "function";
    if (!isfunction) {
        callbackError = function () {
            console.log("Hàm 'callbackError' chưa được cấu hình");
        }
    }

    if (!url || url == '') {
        NotiError('Lỗi', 'Không thể thực hiện thao tác');
    }
    else {
        $.ajax({
            url: url,
            type: type || 'get',
            data: data,
            success: function (result) {
                var targetModal = $("#MasterModal");
                console.log(targetModal);
                if (targetModal.length != "") {
                    var $div = $('div[id^="MasterModal"]:last');
                    //console.log($div);
                    //console.log(parseInt($div.prop("id").match(/\d+/g), 10));
                    var num = (parseInt($div.prop("id").match(/\d+/g), 10) ? parseInt($div.prop("id").match(/\d+/g), 10) : 1) + 1;
                    //console.log(num);
                    var $klon = $div.clone().prop('id', 'MasterModal' + num).appendTo(".page-content");
                    //$div.after($klon.html(result).modal('show'));
                    $klon.html(result).modal('show')
                    //targetModal.clone().html(result).modal('show');
                    //targetModal.html(result);
                    //targetModal.modal('show');

                    if (callBackSuccess && typeof (callBackSuccess) === 'function') {
                        callBackSuccess();
                    }
                }
            },
            error: callbackError
        })
    }
}

/**
 * author:duynn
 * since: 23/07/2020
 * @param {any} idModal
 */
function onShowModal(idModal, content) {
    var targetModal = $(idModal);
    if (targetModal) {
        if (content) {
            targetModal.html(content);
        }
        targetModal.modal('show');
    }
}


/**
 * author:duynn
 * since: 23/07/2020
 * @param {any} idModal
 */
function onShowModalFixedRight(idModal, content) {
    var targetModal = $(idModal);
    if (targetModal) {
        closeFRModal();
        if (content) {
            targetModal.html(content);
            targetModal.addClass("fixed-modal-right", "scroll-disable");
            targetModal.addClass("fmr-width-60");
        }
        targetModal.modal('show');
        $(".modal.aside.in").css("z-index", 1045);
    }
}


function onHighLightTableRow(idObj) {
    var rows = $('tr');
    if (rows) {
        $.each(rows, function (index, item) {
            $(item).find('td').css({ 'background-color': 'none' });
        });
    }
    var row = $("span[data-obj-id=" + idObj + "]").closest('tr');
    if (row && row.length > 0) {
        row.find('td').css({ 'background-color': '#dfe6e9' });
    }
}



function OverrideSelect2() {
    $.fn.nselect2 = $.fn.select2;
    $.fn.select2 = function () {
        $(this).each(function () {
            if ($(this).attr('multiple') == "multiple") {
                var val = $(this).attr('value');
                $(this).val(val.trim(',').split(',')).change()
            }
            $(this).nselect2();
        })
      
    }
}

$.fn.multival = function () {
    $(this).each(function () {
        if ($(this).attr('multiple') == "multiple") {
            var val = $(this).attr('value');
            $(this).val(val.trim(',').split(',')).change()
        }
    })
}
//OverrideSelect2();
function onConfirmAjax(url, params, confirmMessage, callBack) {
    $.confirm({
        'title': 'XÁC NHẬN',
        'message': confirmMessage || 'Bạn có chắc chắn thực hiện hành động này',
        'buttons': {
            'Đồng ý': {
                'btnClass': 'btn-confirm-yes btn-info',
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
                                    NotiError(result.Message);
                                }
                            }, error: function (result) {
                                NotiError(result.responseText);
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
                'btnClass': 'btn-danger',
                'action': function () {
                }
            }
        }
    });
}