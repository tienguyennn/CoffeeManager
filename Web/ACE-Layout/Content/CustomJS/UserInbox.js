$(function () {
    showAlert('.alert-success');
    showAlert('.alert-info');
});

$(document).ajaxStart(function (event) {
    $('.message-container').append('<div class="message-loading-overlay"><i class="fa-spin ace-icon fa fa-spinner orange2 bigger-160"></i></div>');
});
$(document).ajaxStop(function () {
    $('.message-container').find('.message-loading-overlay').remove();
})

function showInboxContent(event, uid) {
    var currentMessageItem = $(event.currentTarget).parents('.message-item');
    var messageContent = $(currentMessageItem).find('.message-content');
    //Check nếu đã có sẵn content ở trong đó
    if (messageContent.length == 1) {
        if (messageContent.is(':visible') == false) {
            $(currentMessageItem).addClass('message-inline-open');
            messageContent.css({ 'display': 'block' });
        } else {
            $(currentMessageItem).removeClass('message-inline-open');
            var seenIcon = $(currentMessageItem).find('.mail-tag').find('.ace-icon');
            if (seenIcon.hasClass('fa-eye-slash') && seenIcon.hasClass('green')) {
                seenIcon.addClass('fa-eye blue').attr('title', "Đã xem");
            }
            $(messageContent).css('display', 'none');
            
        }
      
    } else {
        $.ajax({
            url: '/DMNguoidungArea/DMNguoidung/InboxContent',
            type: 'GET',
            data: { 'uid': uid },
            dataType: 'html',
            success: function (result) {
                $(currentMessageItem).addClass('message-inline-open');
                $(currentMessageItem).append(result);
            }, error: function (result) {
                alert('Lỗi xảy ra . Không thể hiển thị nội dung mail');
            }
        });
    }
}

function hideInboxContent(event) {
    var messageContent = $(event.currentTarget).parents('.message-content');
    var messageItem = $(event.currentTarget).parents('.message-item');
    var seenIcon = messageItem.find('.mail-tag').find('.ace-icon');
    $(messageContent).css('display', 'none');
    if (messageItem.hasClass('message-inline-open')) {
        messageItem.removeClass('message-inline-open');  
    }
    if (seenIcon.hasClass('fa-eye-slash') && seenIcon.hasClass('green')) {
        seenIcon.addClass('fa-eye blue').attr('title', "Đã xem");
    }
}

function setStarredInbox(event, uid) {
    var item = $(event.currentTarget);
    if (item.hasClass("fa-star") && item.hasClass('orange2')) {
        item.removeClass('fa-star orange2');
        item.addClass('fa-star-o light-grey');
    } else if (item.hasClass('fa-star-o') && item.hasClass('light-grey')) {
        item.removeClass('fa-star-o light-grey');
        item.addClass('fa-star orange2');
    }
    $.ajax({
        url: '/DMNguoidungArea/DMNguoidung/SetFlagEmail',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({ 'uid': uid }),
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            //location.reload();
        }, error: function (result) {
            alert(result.responseText);
        }
    })
}

function onhover(event) {
    $(event.currentTarget).css("background-color", "white");
}
function sendEmailValidation() {
    var to = $('#email-message-form').find('#form-field-recipient').val();
    var check = true
    if (!to || to === '') {
        check = false;
        $('#recipient-msg').text('Ít nhất có 1 người nhận');
        showMessage('#recipient-msg');
        $('#form-field-recipient').focus();
    } else {
        if (validateEmail(to) == false) {
            check = false;
            $('#recipient-msg').text('Email sai định dạng');
            showMessage('#recipient-msg');
            $('#form-field-recipient').focus();
        }
    }
    return check;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function editAttachment(event) {
}

function deleteListEmail() {
    var uidList = [];
    var listEmail = $('#message-list').find('.ace');
    $.each(listEmail, function (event) {
        if ($(this).is(':checked')) {
            var uid = $(this).attr('value');
            uidList.push(uid);
        }
    });
    $.ajax({
        url: '/DMNguoidungArea/DMNguoidung/DeleteListEmail',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(uidList),
        success: function (result) {
            if (result.success == true) {
                notif({
                    type: 'success',
                    timeout: '1400',
                    position:'bottom',
                    msg: "Xóa thành công " + uidList.length + " email"
                });
                $('#message-list').find('.selected').remove();
            } else {
                alert(result.message);
            }
        }, error: function (result) {
            alert(result.responseText);
        }
    });
    return uidList;
}