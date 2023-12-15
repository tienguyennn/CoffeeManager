var $formRaSoatSoLieuKeKhai = $('#form-rasoat-solieu-kekhai');
var $idHoSo = document.getElementById('IdHoSoKeKhai').value;
var $idTruCotSo = document.getElementById('IdTruCotSo').value;
var $keyTieuChi = document.getElementById('KeyTieuChi').value;
var $idNhomTieuChiRaSoat = document.getElementById('IdNhomTieuChiRaSoat').value;
var $isComboBox = document.getElementById('IsComboBox') != null;
var $idTieuChiDuocRaSoat = document.getElementById('IdTieuChiDuocRaSoat').value;
var $idSoLieuKeKhai = document.getElementById('IdSoLieuKeKhai').value;
var $valueSoLieuKeKhai = document.getElementById('ValueSoLieuKeKhai').value;
var $idLogChuyenVienRaSoat = document.getElementById('IdLogChuyenVienRaSoat').value;

function onLuuSoLieuRaSoat() {
    var isNumber = $('#DuLieuRaSoat').hasClass('isINT');
    if (isNumber) {
        var realVal = $('#DuLieuRaSoat').val().replace(/\./g, '');
        $('#DuLieuRaSoat').val(realVal);
    }
    $formRaSoatSoLieuKeKhai.submit();
}

/**
 * lưu kê khai nhiều tiêu chí
 * */
function onLuuSoLieuRaSoatMultiple() {
    saveTempThongTinRaSoat();

    var dataRaSoatLocalStorage = localStorage.getItem('tempThongTinRaSoatTieuChi');
    var dataRaSoatSubmit = [];
    if (dataRaSoatLocalStorage) {
        dataRaSoatSubmit = JSON.parse(dataRaSoatLocalStorage)
    }

    if (dataRaSoatSubmit == null || dataRaSoatSubmit.length == 0) {
        NotiError('Thất bại', 'Bạn chưa rà soát tiêu chí nào!');
        return false;
    }

    onCallAjax('/KeKhaiArea/RaSoatKeKhai/LuuRaSoatSoLieuKeKhaiNhieuTieuChi',
        {
            idHoSoKeKhai: $idHoSo,
            idLogChuyenVienRaSoat: $idLogChuyenVienRaSoat,
            idTruCotSo: $idTruCotSo,
            dataRaSoat: dataRaSoatSubmit
        }, 'post', function (result) {
            if (dataRaSoatLocalStorage) {
                localStorage.removeItem('tempThongTinRaSoatTieuChi');
            }
            onLuuRaSoatSoLieuKeKhaiSuccess(result);
        });
}


function onLuuRaSoatSoLieuKeKhaiSuccess(result) {
    var isRaSoatSuccess = result.Status;
    var respMessage = result.Message;
    if (isRaSoatSuccess) {
        NotiSuccess('Thành công', respMessage);
        //onCallAjax('/KeKhaiArea/RaSoatKeKhai/GetLichSuKeKhaiRaSoatThamDinh',
        //    { idHoSo: $idHoSo, idTruCotSo: $idTruCotSo, keyTieuChi: $keyTieuChi },
        //    'post',
        //    function (result) {
        //        $('#block--lichsu-rasoat-solieu').html(result);
        //    });

        highLightTieuChiRaSoat();
        $("#MasterModal2").modal('hide');
    } else {
        NotiError('Thất bại', respMessage);
    }
}

/**
 * chuyển sang tiêu chí khác
 * @param {any} numbThuTuTieuChi
 * @param {any} isNext
 */
function onChuyenTieuChi(numbThuTuTieuChi, isNext) {
    saveTempThongTinRaSoat();
    var elementTieuChi = $('#tieuchi-' + numbThuTuTieuChi);
    if (elementTieuChi) {
        var configKey = elementTieuChi.data('key');
        var idNhomTieuChi = elementTieuChi.data('nhomtieuchi');
        var numbThuTuTieuChi = numbThuTuTieuChi;
        var numbTotalTieuChiRaSoat = $('#hidden-tong-sotieuchi-rasoat').val();
        var idsNhomTieuChiDuocRaSoat = $('#hidden-nhom-tieuchi-rasoat').val();
        if (configKey) {
            onCallAjax('/KeKhaiArea/RaSoatKeKhai/RaSoatSoLieuKeKhaiTieuChi',
                {
                    idHoSo: $idHoSo,
                    idTruCotSo: $idTruCotSo,
                    keyTieuChi: configKey,
                    idNhomTieuChi: idNhomTieuChi,
                    numbThuTuTieuChi: numbThuTuTieuChi,
                    numbTotalTieuChiRaSoat: numbTotalTieuChiRaSoat,
                    idsNhomTieuChiDuocRaSoat: idsNhomTieuChiDuocRaSoat
                }, 'post', function (result) {
                    $('#form-rasoat-solieu-kekhai').closest('.modal').html(result);
                });
        }
    }
}

function onChangeTieuChiRaSoat(element) {
    var idTieuChi = element.value;
    if (!idTieuChi) {
        return false;
    }
    var elementTieuChi = $('input[type="hidden"][data-id-tieuchi="' + idTieuChi + '"]').first();
    if (!elementTieuChi || elementTieuChi.length == 0) {
        return false;
    }

    var configKey = elementTieuChi.data('key');
    var idNhomTieuChi = elementTieuChi.data('nhomtieuchi');
    var numbThuTuTieuChi = elementTieuChi.data('thutu-tieuchi');
    var numbTotalTieuChiRaSoat = $('#hidden-tong-sotieuchi-rasoat').val();
    var idsNhomTieuChiDuocRaSoat = $('#hidden-nhom-tieuchi-rasoat').val();
    if (configKey) {
        onCallAjax('/KeKhaiArea/RaSoatKeKhai/RaSoatSoLieuKeKhaiTieuChi',
            {
                idHoSo: $idHoSo,
                idTruCotSo: $idTruCotSo,
                keyTieuChi: configKey,
                idNhomTieuChi: idNhomTieuChi,
                numbThuTuTieuChi: numbThuTuTieuChi,
                numbTotalTieuChiRaSoat: numbTotalTieuChiRaSoat,
                idsNhomTieuChiDuocRaSoat: idsNhomTieuChiDuocRaSoat
            }, 'post', function (result) {
                $('#form-rasoat-solieu-kekhai').closest('.modal').html(result);
            });
    }
}

/**
 * lưu thông tin rà soát vào kê khai
 * */
function saveTempThongTinRaSoat() {
    var arrInfoRaSoatTieuChi = [];
    var localStorageRaSoatTieuChi = localStorage.getItem('tempThongTinRaSoatTieuChi');
    if (!localStorageRaSoatTieuChi) {
        arrInfoRaSoatTieuChi = [];
    } else {
        arrInfoRaSoatTieuChi = JSON.parse(localStorageRaSoatTieuChi);
    }
    var itemThongTinRaSoatTieuChi = arrInfoRaSoatTieuChi.find(function (item) {
        return item.IdTieuChi == $idTieuChiDuocRaSoat
    });

    if (!itemThongTinRaSoatTieuChi) {
        itemThongTinRaSoatTieuChi = {
            IdSoLieuKeKhai: $idSoLieuKeKhai,
            IdTieuChi: $idTieuChiDuocRaSoat,
            Key: $keyTieuChi,
            IdTruCotSo: $idTruCotSo,
            IdNhomTieuChi: $idNhomTieuChiRaSoat,
            IdYKienDanhGia: $('#IdYKienDanhGia').val(),
            GhiChuDanhGia: $('#GhiChuYKienDanhGia').val(),
            SoLieuKeKhai: $valueSoLieuKeKhai,
            IsComboBox: $isComboBox,
            IdComboBox: $isComboBox ? $('#DuLieuRaSoat').val() : null,
            SoLieuRaSoat: $isComboBox ? ($('#DuLieuRaSoat').val() != "" ? $('#DuLieuRaSoat option:selected').text() : "") : $('#DuLieuRaSoat').val(),
        }

        if ($isComboBox) {
            itemThongTinRaSoatTieuChi.SoLieuRaSoat = $('#DuLieuRaSoat').val() != "" ? $('#DuLieuRaSoat option:selected').text() : "";
        } else {
            var isNumber = $('#DuLieuRaSoat').hasClass('isINT');
            if (isNumber) {
                itemThongTinRaSoatTieuChi.SoLieuRaSoat = $('#DuLieuRaSoat').val().replace(/\./g, '');
            } else {
                itemThongTinRaSoatTieuChi.SoLieuRaSoat = $('#DuLieuRaSoat').val();
            }
        }


        arrInfoRaSoatTieuChi.push(itemThongTinRaSoatTieuChi);
    } else {
        var index = arrInfoRaSoatTieuChi.findIndex(function (item) {
            return item.IdTieuChi == $idTieuChiDuocRaSoat;
        });

        itemThongTinRaSoatTieuChi.IsComboBox = $isComboBox;
        itemThongTinRaSoatTieuChi.IdComboBox = $isComboBox ? $('#DuLieuRaSoat').val() : null;
        itemThongTinRaSoatTieuChi.GhiChuDanhGia = $('#GhiChuYKienDanhGia').val();
        itemThongTinRaSoatTieuChi.IdYKienDanhGia = $('#IdYKienDanhGia').val();

        if ($isComboBox) {
            itemThongTinRaSoatTieuChi.SoLieuRaSoat = $('#DuLieuRaSoat').val() != "" ? $('#DuLieuRaSoat option:selected').text() : "";
        } else {
            var isNumber = $('#DuLieuRaSoat').hasClass('isINT');
            if (isNumber) {
                itemThongTinRaSoatTieuChi.SoLieuRaSoat = $('#DuLieuRaSoat').val().replace(/\./g, '');
            } else {
                itemThongTinRaSoatTieuChi.SoLieuRaSoat = $('#DuLieuRaSoat').val();
            }
        }

        arrInfoRaSoatTieuChi[index] = itemThongTinRaSoatTieuChi;
    }
    localStorage.setItem('tempThongTinRaSoatTieuChi', JSON.stringify(arrInfoRaSoatTieuChi));
}


/**
 * hiển thị dữ liệu của lần trước
 */
function getTempThongTinRaSoat() {
    var arrInfoRaSoatTieuChi = [];
    var localStorageRaSoatTieuChi = localStorage.getItem('tempThongTinRaSoatTieuChi');
    if (!localStorageRaSoatTieuChi) {
        return false;
    }

    arrInfoRaSoatTieuChi = JSON.parse(localStorageRaSoatTieuChi);
    var itemTempInfoRaSoat = arrInfoRaSoatTieuChi.find(function (item) {
        return item.IdTieuChi == $idTieuChiDuocRaSoat;
    });

    if (!itemTempInfoRaSoat) {
        return false;
    }

    if ($isComboBox) {
        $('#DuLieuRaSoat').val(itemTempInfoRaSoat.IdComboBox).trigger('change')
    } else {
        $('#DuLieuRaSoat').val(itemTempInfoRaSoat.SoLieuRaSoat);
    }
    $('#IdYKienDanhGia').val(itemTempInfoRaSoat.IdYKienDanhGia).trigger('change');
    $('#GhiChuYKienDanhGia').val(itemTempInfoRaSoat.GhiChuDanhGia);
}

/**
 * bôi màu và hiển thị các tiêu chí đã rà soát
 */
function highLightTieuChiRaSoat() {

    onCallAjax('/KeKhaiArea/RaSoatKeKhai/GetListTieuChiDaRaSoat',
        { idHoSo: $idHoSo, idTruCotSo: $idTruCotSo },
        'post',
        function (result) {
            //lấy các điểm thay đổi và cập nhật lại
            var listSoLieuRaSoat = result;
            var arrNhomTieuChi = [];
            listSoLieuRaSoat.forEach(function (item) {
                if (!arrNhomTieuChi.includes(item.IdNhomTieuChi)) {
                    arrNhomTieuChi.push(item.IdNhomTieuChi);
                }
            });

            $('#myTab li').each(function (index, item) {
                var tab = $(item);
                var idNhomTieuChi = parseInt(tab.data('nhomtieuchi-id'));
                var isNhomTieuChiDuocRaSoat = arrNhomTieuChi.includes(idNhomTieuChi);
                if (!isNhomTieuChiDuocRaSoat) {
                    return;
                }

                var arrTieuChiRaSoat = listSoLieuRaSoat.filter(function (item) {
                    return item.IdNhomTieuChi == idNhomTieuChi;
                });

                var numbSoLuongTieuChiDuocRaSoat = 0;
                arrTieuChiRaSoat.forEach(function (item) {
                    //các tiêu chí điểm
                    if (item.IsTieuChiTinhDiem == true) {
                        var domID = item.Key.replace(".", "_");
                        var elementDiemKeKhai = $('span[id="' + domID + '"]');
                        if (!elementDiemKeKhai || elementDiemKeKhai.length == 0) {
                            return;
                        }
                        var isDaRaSoat = item.SoLieuRaSoat != null && item.SoLieuRaSoat != "";
                        if (!isDaRaSoat) {
                            return;
                        }

                        var elementDiemRaSoat = $('#diem-rasoat-' + domID);
                        if (elementDiemRaSoat && elementDiemRaSoat.length > 0) {
                            elementDiemRaSoat.html("Điểm rà soát: <b>" + item.SoLieuRaSoat + "</b>");
                        } else {
                            elementDiemKeKhai.after('<br/><span class="text-info lbl-solieu-rasoat" id="diem-rasoat-' + domID + '">Điểm rà soát: <b>' + item.SoLieuRaSoat + '</b></span>');
                        }

                        var isThayDoiSoLieu = isDaRaSoat && item.SoLieuRaSoat != item.SoLieuKeKhai;
                        if (isThayDoiSoLieu) {
                            elementDiemKeKhai.css('text-decoration', 'line-through');
                        }
                        return;
                    }

                    //các tiêu chí tính tỷ lệ
                    if (item.IsTieuChiTinhTyLe == true) {
                        var domID = item.Key.replace(".", "_");
                        var elementTyLeKeKhai = $('span[id="' + domID + '"]');
                        if (!elementTyLeKeKhai || elementTyLeKeKhai.length == 0) {
                            return;
                        }
                        var isDaRaSoat = item.SoLieuRaSoat != null && item.SoLieuRaSoat != "";
                        if (!isDaRaSoat) {
                            return;
                        }

                        var elementTyLeRaSoat = $('#tyle-rasoat-' + domID);
                        if (elementTyLeRaSoat && elementTyLeRaSoat.length > 0) {
                            elementTyLeRaSoat.html("Tỷ lệ rà soát: <b>" + item.SoLieuRaSoat + "%</b>");
                        } else {
                            elementTyLeKeKhai.after('<br/><span class="text-info lbl-solieu-rasoat" id="tyle-rasoat-' + domID + '">Tỷ lệ rà soát: <b>' + item.SoLieuRaSoat + '%</b></span>');
                        }

                        var isThayDoiSoLieu = isDaRaSoat && item.SoLieuRaSoat != item.SoLieuKeKhai;
                        if (isThayDoiSoLieu) {
                            elementTyLeKeKhai.css('text-decoration', 'line-through');
                        }
                        return;
                    }


                    if (item.IsTieuChiDuocRaSoat == true) {
                        var idElementKeKhai = "kekhai_" + item.Key + "_" + item.IdNhomTieuChi;
                        var elementKeKhai = $('span[id="' + idElementKeKhai + '"]');

                        var idElementRaSoat = item.Key + "@" + item.IdNhomTieuChi;
                        var elementRaSoat = $('span[id="' + idElementRaSoat + '"]');

                        //hiển thị số liệu rà soát
                        var textSoLieuRaSoat = item.SoLieuRaSoat;
                        if (item.IsComboBox == true && item.SoLieuRaSoat == "0.00") {
                            textSoLieuRaSoat = "Không đồng ý với số liệu ban đầu";
                        }

                        var isSoLieuRaSoatEmpty = false;
                        if (textSoLieuRaSoat == null || textSoLieuRaSoat.trim() == "") {
                            isSoLieuRaSoatEmpty = true;
                        }

                        if (elementRaSoat && elementRaSoat.length > 0) {
                            elementRaSoat.html(!isSoLieuRaSoatEmpty ? 'Số liệu rà soát: <b>' + textSoLieuRaSoat + '</b></span>': "");
                        } else {
                            elementKeKhai.after('<br/><span class="text-info lbl-solieu-rasoat tieuchi-has-rasoat" id="' + idElementRaSoat + '">' + (!isSoLieuRaSoatEmpty ? 'Số liệu rà soát: <b>' + textSoLieuRaSoat + '</b>': '') + '</span>');
                        }

                        //hiển thị ý kiến rà soát
                        elementRaSoat = $('span[id="' + idElementRaSoat + '"]');

                        if (!item.IsTieuChiDisabledKeKhai) { //không hiển thị ý kiến với các tiêu chí bị disabled
                            var idElementYKien = "ykien_" + item.Key + "_" + item.IdNhomTieuChi;
                            var elementYKien = $('span[id="' + idElementYKien + '"]');

                            if (elementYKien && elementYKien.length > 0) {
                                elementYKien.html("Ý kiến rà soát: <b>" + item.TextYKienDanhGia + "</b><br><i>" + item.GhiChuDanhGia+"</i>");
                            } else {
                                elementRaSoat.after('<br/><span class="lbl-ykien-rasoat" id="' + idElementYKien + '">Ý kiến rà soát: <b>' + item.TextYKienDanhGia + '</b><br><i>' + item.GhiChuDanhGia+'</i></span>');
                            }
                        }

                        //gạch số liệu trước nếu thay đổi số liệu
                        var isRaSoat = item.SoLieuRaSoat != null && item.SoLieuRaSoat.trim() != '';

                        var isThayDoiSoLieuSauRaSoat = isRaSoat && item.SoLieuRaSoat != item.SoLieuKeKhai;
                        if (isThayDoiSoLieuSauRaSoat) {
                            elementKeKhai.addClass('has-changed-after-rasoat');
                        }

                        //bôi màu vùng rà soát
                        //elementKeKhai.closest('tr').find('td').css('background', '#f6e58d');

                        //cập nhật số lượng tiêu chí
                        numbSoLuongTieuChiDuocRaSoat++;
                    }
                })

                //hiển thị số lượng tiêu chí được rà soát
                var tabNhomTieuChi = $('#home-tab-' + idNhomTieuChi);
                var tenNhomTieuChi = tabNhomTieuChi.data('tentieuchi');
                if (numbSoLuongTieuChiDuocRaSoat > 0) {
                    tabNhomTieuChi.html(tenNhomTieuChi + " <span class='text-danger' title='Đã rà soát " + numbSoLuongTieuChiDuocRaSoat + " tiêu chí'><b>(" + numbSoLuongTieuChiDuocRaSoat + ")</b></span>");
                }
            });
        });
}



$(document).ready(function () {
    getTempThongTinRaSoat();
})



