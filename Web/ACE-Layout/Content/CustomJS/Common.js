//===>CREATE BY DUYNN
function generate_slugable(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    //str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
    //str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
    //str = str.replace(/^\-+|\-+$/g, "");//cắt bỏ ký tự - ở đầu và cuối chuỗi
    return str;
}
function showMessage(objectID) {
    $(objectID).animate({ 'opacity': 1 },
        100,
        function (event) {
            $(objectID).delay(2500).animate({ 'opacity': 0 }, 2000);
        });
}

function showCreateMessage(objectID, errMessage) {
    $(objectID).text(errMessage);
    $(objectID).animate({ 'opacity': 1 },
        100,
        function (event) {
            $(objectID).delay(2500).animate({ 'opacity': 0 }, 100);
        });
}

function showErrorMessage(objectID, errMessage) {
    $(objectID).text(errMessage);
    $(objectID).animate({ 'opacity': 1 },
        100,
        function (event) {
            $(objectID).delay(1000).animate({ 'opacity': 0 }, 100);
        });
}


function getAlertContent(normalText, boldText, type) {
    var html = '';
    html += '<button type="button" class="close" data-dissmiss = "alert">';
    html += '<i class="ace-icon fa fa-times"></i>';
    html += '</button>';
    if (type == 'success-insert') {
        html += '<i class="ace-icon fa fa-check"></i> &nbsp;';
    } else if (type == 'success-update') {
        html += '<i class="ace-icon fa fa-upload"></i> &nbsp;'
    } else if (type == 'success-remove') {
        html += '<i class="ace-icon fa fa-mail-reply"></i> &nbsp;'
    } else if (type == 'fail-remove') {
        html += '<i class="ace-icon fa fa-times"></i> &nbsp;'
    }

    html += normalText;
    html += '<strong>' + boldText + '</strong>';
    html += '<br/>';
    return html;
}

function showAlert(objectClass) {
    $(objectClass).show().delay('1500').slideUp('1000', function (event) {
        //location.reload();        
    })
}


//====> Demo hàm set active menu
function removeActiveMenu() {
    var listItems = $('.nav-list').find('li');
    $.each(listItems, function (event) {
        var $currentItem = $(this);
        if ($currentItem.hasClass('active'))
            $currentItem.removeClass('active');
        if ($currentItem.hasClass('open'))
            $currentItem.removeClass('open');
    });
}
function setActiveMenu(parentIndex, childIndex) {
    removeActiveMenu()
    $('.nav-list li:eq(' + parentIndex + ')').addClass('active open');
    $('.nav-list li:eq(' + childIndex + ')').addClass('active');
}

function moveImage(imgTargetID, fileTargetID) {
    $(imgTargetID).attr('src', null);
    var file = $(fileTargetID);
    file.replaceWith(file = file.clone(true));
}

function setSelectedOption(obj, id) {
    if (id === '' || !id) {
        $(obj).first().attr('selected', 'selected');
    }
    $.each($(obj), function () {
        if ($(this).val() == id) {
            $(this).attr('selected', 'selected');
        }
    });
}
function commonEmailValidation(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function commonShowDateTimePicker() {
    $(document).find('#ui-datepicker-div').css("z-index", "9999");
}
function commomTimeValid(selectorID) {
    var timeVal = $(selectorID).val().split('/');
    var d = parseInt(timeVal[0]),
        m = parseInt(timeVal[1]),
        y = parseInt(timeVal[2]);
    if (isNaN(Date.parse(m + '/' + d + '/' + y)))
        return false;
    return true;
}
function commonDateFromDatePicker(selector) {
    var from = $(selector).val().split("/");
    return new Date(from[2], from[1] - 1, from[0]);
}

function commonNotifyError(message) {
    notif({
        bgcolor: '#D15B47',
        color: '#fff',
        msg: "" + message + "&nbsp;<i class='ace-icon fa fa-exclamation bigger-100'></i>",
        type: 'error',
        position: 'bottom',
        timeout: 2000,
        clickable: true,
        multiline: true
    });
}

function commonNotifySuccess(message) {
    notif({
        bgcolor: '#9ACD32',
        color: '#fff',
        msg: "" + message + "&nbsp;<i class='ace-icon fa fa-exclamation bigger-100'></i>",
        type: 'success',
        position: 'bottom',
        timeout: 2000,
        clickable: true,
        multiline: true
    });
}
function commonNotifyWarning(message) {
    notif({
        bgcolor: '#FFA500',
        color: '#fff',
        msg: "" + message + "&nbsp;<i class='ace-icon fa fa-exclamation bigger-100'></i>",
        type: 'success',
        position: 'bottom',
        timeout: 2000,
        clickable: true,
        multiline: true
    });
}

function commonValidUser(username) {
    var re = /^[A-Za-z-_0-9]{3,16}$/;
    if (!re.test(username)) {
        if (commonEmailValidation(username))
            return true;
        else
            return false;
    } else
        return true;
}

function validatePassword(password) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    return regex.test(password);
}

//create by HungLee
function removehtml(htmlString) {
    return htmlString.replace(/(<([^>]+)>)/ig, "").trim();
}
//end create by HungLee



/**
* @description:
*
*/

function convertDateStringToDate(dateStr) {
    var from = dateStr.split("/");
    return new Date(from[2], from[1] - 1, from[0]);
}