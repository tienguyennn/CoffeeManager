if (window.jQuery) {
    $.getScript("/Content/LibUploadFile/jquery.uploadfile.js")
        .done(function (script, textStatus) {
            var inputs = $('.input-multiple-file');
            $.each(inputs, function (index, item) {
                var itemType = $(this).data('item-type');
                var keyTieuChi = $(this).data('key-config') || '';
                var idNhomTieuChi = $(this).data('id-nhomtieuchi') || '';
                var idBoChiSo = $(this).data('id-bochiso') || '';
                var idTruCotSo = $(this).data('id-trucotso') || '';
                $(this).uploadFile({
                    url: '/Common/UploadTempFile',
                    formData: {
                        itemType: itemType,
                        keyTieuChi: keyTieuChi,
                        idBoChiSo: idBoChiSo,
                        idTruCotSo: idTruCotSo,
                        idNhomTieuChi: idNhomTieuChi,
                    },
                    showDelete: true,
                    showDownload: true,
                    dragdropWidth: "inherit",
                    statusBarWidth: "inherit",
                    deleteStr: "Xóa tài liệu",
                    deleteCallback: function (data, pd) {
                        if (data) {
                            var fileCount = data.length;
                            for (var i = 0; i < fileCount; i++) {
                                $.post("/Common/DeleteTempFile", { fileName: data[i], itemType: itemType },
                                    function (resp, textStatus, jqXHR) {
                                        var removeFileName = resp.Message;
                                        var inputUploadFileNames = $("#input-file-upload-names");
                                        if (inputUploadFileNames) {
                                            var arrFileNames = inputUploadFileNames.val().split('#');
                                            arrFileNames = arrFileNames.filter(function (item) {
                                                return item != removeFileName;
                                            });

                                            var fileNames = "";
                                            for (var x = 0; x < arrFileNames.length; x++) {
                                                fileNames += "#" + arrFileNames[x];
                                            }
                                            inputUploadFileNames.val(fileNames);
                                        }
                                    });
                            }
                            pd.statusbar.hide();
                        }
                    },
                    downloadCallback: function (filename, pd) {

                    },
                    onSuccess: function (files, data, xhr, pd) {
                        var inputUploadFileNames = $("#input-file-upload-names");
                        if (inputUploadFileNames) {
                            var fileCount = data.length;
                            var fileNames = inputUploadFileNames.val();

                            for (var i = 0; i < fileCount; i++) {
                                fileNames += "#" + data[i];
                            }
                            inputUploadFileNames.val(fileNames);
                        }
                    }
                })

            });
        }).fail(function (jqxhr, settings, exception) {
            console.log("Triggered ajaxError handler.");
        });
} else {
    console.log('error loading jquery');
}