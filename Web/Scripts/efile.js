$(function () {
   
    //cấu hình cập nhật multiple file
    var hasMultipleUploadFileInputs = $('.input-multiple-file-onlyefile').length > 0;

    if (hasMultipleUploadFileInputs) {
        var inputs = $('.input-multiple-file-onlyefile');
        var idFolderEFile = 0;
        if ($("#idFolderEFile").length > 0) {
            idFolderEFile = $("#idFolderEFile").val();
        }
        $.each(inputs, function (index, item) {
            var folder = idFolderEFile;

            $(this).uploadFile({
                url: '/FileAndFolderArea/FileAndFolder/UploadEfile',
                formData: { folder: folder},
                showDelete: true,
                showDownload: true,
                dragdropWidth: "inherit",
                statusBarWidth: "inherit",
                deleteStr: "Xóa tài liệu",
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
                    
                    NotiSuccess('Thêm tài liệu thành công');
                    var currentUrl = window.location.href;
                    if (currentUrl.indexOf("FileAndFolder") != -1) {
                        setTimeout(function () {
                            location.reload();
                        }, 500)
                    } else {
                        setTimeout(function () {
                            $(location).attr('href', '/FileAndFolderArea/FileAndFolder');
                        }, 500)

                    }
                }
            })
        });
    }


    var isFormKeKhaiRaSoat = $('#IsFormKeKhaiRaSoat').val();
    if (isFormKeKhaiRaSoat && isFormKeKhaiRaSoat != "") {
        //cấu hình co vào sidebar
        if (!$("body").hasClass("body-miniMenu") && !$("#left-panel").hasClass("miniMenu")) {
            $("body").addClass("body-miniMenu");
            $("#left-panel").addClass("toggleMenu");
            $("#left-panel").addClass("miniMenu");
        }

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
