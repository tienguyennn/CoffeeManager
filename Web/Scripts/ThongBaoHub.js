var myImg = "/assets/images/LogoQuocHuy.png";

var NotiLibibox = function (mes, link) {
    Lobibox.notify('info', {
        title: 'Thông Báo Hệ Thống',
        //width: 361,
        img: myImg,
        msg: mes,
        link: link,
        closable: true,
        closeOnClick: true,
        delay: 30000,                // Hide notification after this time (in miliseconds)
        delayIndicator: true,
    });
}

var NotiBrowser = function (mes, link) {
    var options = {
        title: 'Thông Báo Hệ Thống',
        options: {
            body: mes,
            icon: myImg,
            lang: 'vi',
            onClick: function () {
                location.href = link;
            }
        }
    };
    if (!$("#easyNotify").easyNotify(options)) {
        NotiLibibox(mes, link);
    }
}

var reloadNotify = function () {
    AjaxCall("/NotificationArea/Notification/ShowNotification", 'get', null, function (rs) {
        $("#NotiArea").empty();
        $("#NotiArea").html(rs);
    })
}

var reloadNotifyEndUser = function () {
    AjaxCall("/EndUserNotification/ShowNotification", 'get', null, function (rs) {
        $("#NotiArea").empty();
        $("#NotiArea").html(rs);
    })
}
$(function () {

    if (jsUserId > 0 && jsUserId != null) {

        // Reference the auto-generated proxy for the hub.
        var tbHub = $.connection.thongBaoHub;
        // Create a function that the hub can call back to display messages.


        //chat.client.userConnected = function (connectId) {
        //    console.log(connectId + " Đã tham gia");
        //}
        //chat.client.userLeft = function (connectId) {
        //    console.log(connectId + " Đã thoát");
        //}

        tbHub.client.thongbao = function (str, link, enduser) {
            if (enduser) {
                reloadNotifyEndUser();
            } else {
                reloadNotify();
            }
            NotiBrowser(str, link);
        };
        tbHub.client.thongbaoglobal = function (str, link) {
            $("#boxRunText").append("<span class='textItem'>" + str + "</span>");
        };

        tbHub.client.SessionTimeOut = function () {
            //alert("SessionTimeOut");
            location.href = "/AccountAdmin/LogOff";
        }


        $.connection.hub.start().done(function () {
            tbHub.server.init(jsUserId, jsUserName, $.connection.hub.id, typeAcc, false);

        });

        // This optional function html-encodes messages for display in the page.
        function htmlEncode(value) {
            var encodedValue = $('<div />').text(value).html();
            return encodedValue;
        }
    }

});