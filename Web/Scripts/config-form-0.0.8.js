$(function () {
    if ($("select.select2").length > 0) {
        $("select.select2").select2({
            width: '100%'
        });
    }

    if ($(".date-picker").length > 0) {
        $(".date-picker").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true, yearRange: "-50:+20",
            showWeek: false, weekHeader: "Tuần",
            language: 'vi',
            prevText: '<i class="fa fa-chevron-left"></i>',
            nextText: '<i class="fa fa-chevron-right"></i>',
            onSelect: function (date) {

            }
        });
    }

    if ($(".isINT").length > 0) {
        $(".isINT").autoNumeric('init', {
            maximumValue: '9999999999999999', //9 triệu tỉ
            digitGroupSeparator: '.',
            decimalCharacter: ',',
            allowDecimalPadding: false,
        });
    }


    if ($('.auto-focus').length > 0) {
        setTimeout(function () {
            $('.auto-focus')[0].focus();
        }, 500)
    }

    //cấu hình cập nhật multiple file
    var hasMultipleUploadFileInputs = $('.input-multiple-file').length > 0;

    if (hasMultipleUploadFileInputs) {
        var inputs = $('.input-multiple-file');

        $.each(inputs, function (index, item) {
            var keyTieuChi = $(this).data('key-config');
            var idDotKeKhai = $(this).data('id-dotkekhai');

            $(this).uploadFile({
                url: '/KeKhaiArea/ThucHienKeKhai/UploadTaiLieuGiaiTrinh',
                formData: { keyTieuChi: keyTieuChi, idDotKeKhai: idDotKeKhai },
                showDelete: true,
                showDownload: true,
                dragdropWidth: "inherit",
                statusBarWidth: "inherit",
                deleteStr: "Xóa tài liệu",
                maxFileSize: 250000*1000, //250mb
                onSubmit: function (files, xhr) {
                    console.log(files);
                    var allowedTypes = ["doc", "docx", "pdf", "xls", "xlsx", "png", "jpg", "jpeg", "bmp", "gif"];
                    var fileExt = files[0].split('.').pop();
                    if (fileExt) {
                        fileExt = fileExt.trim().toLowerCase();
                    }
                    if (allowedTypes.indexOf(fileExt) == -1) {
                        NotiError("Thông báo", "Định dạng tài liệu không được hỗ trợ");
                        return false;
                    } else {
                        return true;
                    }
                },
                deleteCallback: function (data, pd) {
                    if (data) {
                        var callBack = function (response, textStatus, jsXHR) {
                            var targetInput = $('#IdsFileGiaiTrinh');
                            var arrIdentityFileUploads = targetInput.val().split(',');
                            if (arrIdentityFileUploads.length == 1 && arrIdentityFileUploads[0] == '') {
                                arrIdentityFileUploads.shift();
                            }
                            arrIdentityFileUploads = arrIdentityFileUploads.filter(function (item) {
                                return item != data;
                            })
                            targetInput.val(arrIdentityFileUploads.join());
                        }

                        $.post('/Common/DeleteFile/', { id: data }, callBack);
                    }
                },
                downloadCallback: function (filename, pd) {
                    window.open('/Common/DownloadFile/' + filename);
                },
                onSuccess: function (files, data, xhr, pd) {
                    var targetInput = $('#IdsFileGiaiTrinh');
                    var arrIdentityFileUploads = targetInput.val().split(',');
                    if (arrIdentityFileUploads.length == 1 && arrIdentityFileUploads[0] == '') {
                        arrIdentityFileUploads.shift();
                    }
                    if (data) {
                        arrIdentityFileUploads.push(data);
                        targetInput.val(arrIdentityFileUploads.join());
                    }
                }
            })
        });
    }


    var isFormKeKhaiRaSoat = $('#IsFormKeKhaiRaSoat').val();
    if (isFormKeKhaiRaSoat && isFormKeKhaiRaSoat != "") {
        //cấu hình co vào sidebar
        //if (!$("body").hasClass("body-miniMenu") && !$("#left-panel").hasClass("miniMenu")) {
        //    $("body").addClass("body-miniMenu");
        //    $("#left-panel").addClass("toggleMenu");
        //    $("#left-panel").addClass("miniMenu");
        //}

        $('#btn-MenuLeft').click();

        //cấu hình hiệu ứng static của footer
        $(window).scroll(function () {
            var target = $('#footer-form-solieu');
            if (target) {
                var scrollTop = $(window).scrollTop();
                var height = $(window).height();
                var isScrollToBottom = scrollTop + height == $(document).height();

                if (isScrollToBottom) {
                    target.removeClass('fixed-footer');
                } else {
                    target.addClass('fixed-footer');
                }
            }
        })
    }
});
