var rowHangMucSanPhamCount = 1;
$(document).ready(function () {

    $(".menu_ngang_openland li").removeClass("active");
    $("#quan_li_nha_dat").addClass("active");

    $('.form-dropdown').chosen();
    $('#CHINHSACH_BANHANG_ID').selectpicker({
        actionsBox: true,
        deselectAllText: 'Bỏ chọn',
        selectAllText: 'Chọn tất cả',
        noneSelectedText: 'Chọn chính sách bán hàng',
        liveSearch: true,
        liveSearchPlaceholder: 'Tìm chính sách bán hàng'
    });
    $('#KHUYENMAI_ID').selectpicker({
        actionsBox: true,
        deselectAllText: 'Bỏ chọn',
        selectAllText: 'Chọn tất cả',
        noneSelectedText: 'Chọn khuyến mại',
        liveSearch: true,
        liveSearchPlaceholder: 'Tìm khuyến mại'
    });


    $('#fuelux-wizard-container').ace_wizard({

    }).on('actionclicked.fu.wizard', function (e, info) {
        var isInfoValid = validateRealEstateInfo();
        if (!isInfoValid) {
            e.preventDefault();
        }
    }).on('finished.fu.wizard', function (e) {
        var isInfoValid = validateRealEstateInfo();
        if (!isInfoValid) {
            e.preventDefault();
        } else {
            var numberOfHangMucSanPhams = $('#table-hangmuc-sanpham tbody tr').length;
            $('#HANGMUC-SANPHAM').val(numberOfHangMucSanPhams);
            if (numberOfHangMucSanPhams > 0) {
                $.each($('#table-hangmuc-sanpham tbody tr'), function (index, object) {
                    $(object).find('input[name=HANGMUC_ID]').attr('name', "HANGMUC_ID_" + index);
                    $(object).find('select[name=LOAI_HANGMUC]').attr('name', "LOAI_HANGMUC_" + index);
                    $(object).find('input[name=TEN_HANGMUC]').attr('name', "TEN_HANGMUC_" + index);
                    $(object).find('input[name=DIENTICH_HANGMUC]').attr('name', "DIENTICH_HANGMUC_" + index);
                });
            }
        }
        $('#formUpdateSanPham').submit();
    })
});

function onSelectBlock() {
    var id = $('#BLOCK_ID').val() == "" ? 0 : $('#BLOCK_ID').val().trim();
    var defer = $.Deferred();
    $.ajax({
        url: '/SanPhamArea/SanPham/GetTangCungThietKeAndViTriByBlockId',
        type: 'POST',
        data: { blockId: id },
        dataType: 'json',
        success: function (result) {
            if (result.done == true) {
                var htmlTangs = "<option value=''>--- Chọn tầng ---</option>";
                var htmlViTris = "<option value=''>--- Chọn vị trí ---</option>";
                for (var floor = 1; floor <= result.maxSoTang; floor++) {
                    htmlTangs += "<option value=" + floor + ">" + floor + "</option>";
                }

                htmlViTris += "";
                for (var position = 1; position <= result.maxSoPhong; position++) {
                    if (result.maxSoPhong < 10) {
                        htmlViTris += "<option value=" + "0" + position + ">Căn 0" + position + "</option>";
                    } else {
                        htmlViTris += "<option value=" + position + "> Căn " + position + "</option>";
                    }
                }
                $("#TANG_TKCS").html(htmlTangs).trigger('chosen:updated');
                $("#VITRI").html(htmlViTris).trigger('chosen:updated');
            }
        }, beforeSend: function () {
        }, complete: function () {
        }, error: function (err) {
            defer.resolve(false);
        }
    });
}

function onSelectLoDat(id) {
    var defer = $.Deferred();
    var id = $('#' + id).val().trim() == "" ? 0 : $('#' + id).val().trim();
    $.ajax({
        url: '/SanPhamArea/SanPham/GetImageAndListViTriOfLoDat',
        type: 'POST',
        data: { lodatId: id},
        dataType: 'json',
        success: function (result) {
            if (result.done == true) {
                var htmlViTriBietThu = "<option value=''>--- Chọn lô biệt thự ---</option>";
                for (var i = 0; i < result.vitris.length; i++) {
                    htmlViTriBietThu += "<option value='" + result.vitris[i] + "'>" + result.vitris[i] + "</option>";
                }
                $('#VITRI').html(htmlViTriBietThu).trigger('chosen:updated');
                $('#img-sodo-dat').attr('src', result.path);
                defer.resolve(true);
            }
        }, beforeSend: function () {
        }, complete: function () {
        }, error: function (err) {
            defer.resolve(false);
        }
    });
    return defer.promise();
}

