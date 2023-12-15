$(document).ready(function (event) {
    $("#InsertBandoAnh").dialog({
        autoOpen: false,
        modal: true,
        width: 1200,
        height: 600,
        resizable: false,
        title: "<i class='ace-icon fa fa-location-arrow blue'></i> Thêm bản đồ ảnh mới",
        title_html: true,
        show: {
            effect: "slide",
            duration: 300,
        }, hide: {
            effect: "slide",
            duration: 300
        }
    });

    $("#MapAreaInfo").dialog({
        autoOpen: false,
        modal: true,
        width: 600,
        height: 300,
        resizable: false,
        title: "<i class='ace-icon fa fa-location-arrow blue'></i> Thông tin area ",
        title_html: true,
        show: {
            effect: "slide",
            duration: 300,
        }, hide: {
            effect: "slide",
            duration: 300
        }
    });
});


function loadInsertBandoAnh() {
    $.ajax({
        url: '/DMBandoAnhArea/DMBandoAnh/LoadFormInsertBandoAnh',
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            $('#InsertBandoAnh').html(result);
            $('#InsertBandoAnh').dialog('open');
        }
    });
}

function previewImageMap() {
    var img = document.getElementById('BandoAnhImg');
    var file = document.getElementById('BandoAnh-insert').files[0];

    //$('#UserAvatarFileName').val(document.getElementById('ANHDAIDIEN-genrl-insert').value.match(/[^\/\\]+$/));
    var reader = new FileReader();
    reader.addEventListener('load', function () {
        img.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function demoSubmit(event) {
    var name = $('#insert-TENBANDO').val().trim();
    if (name == '' || !name) {
        return false;
    }
}

function redirectEditMapArea(id) {
    location.href = "/DMBandoAnhArea/DMBandoAnh/EditMapArea?id=" + id;
}

function redirectMapAreaInfo(id) {
    location.href = "/DMBandoAnhArea/DMBandoAnh/MapAreaInfo?id=" + id;
}

function showAreaInfo(id) {
    //$('#MapAreaInfo').dialog('open');
    $.ajax({
        url: "/DMBandoAnhArea/DMBandoAnh/GetAreaInfo/" + id,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            $('#MapAreaInfo').find("#Mota-Area").val(result.NOIDUNG);
            $('#MapAreaInfo').find("#TieuDe-Area").val(result.TIEUDE);
            $('#MapAreaInfo').dialog('open');
        }
    })
}