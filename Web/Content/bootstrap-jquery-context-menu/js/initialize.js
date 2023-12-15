exampleMenuItemSource = function (selector) {
    if ($(selector).attr("id") == "PNG_JPG") {
        return [
            {
                header: "Example Dynamic",
            },
            {
                text: "PNG",
                action: function (e, selector) {
                    alert(
                        "PNG clicked on " +
                        selector.prop("tagName") +
                        ":" +
                        selector.attr("id")
                    );
                },
            },
            {
                text: "JPG",
                action: function (e, selector) {
                    alert(
                        "JPG clicked on " +
                        selector.prop("tagName") +
                        ":" +
                        selector.attr("id")
                    );
                },
            },
            { divider: true },
            {
                icon: "glyphicon-list-alt",
                text: "Dynamic nested",
                subMenu: [
                    {
                        text: "More dynamic",
                        action: function (e, selector) {
                            alert(
                                "More dynamic clicked on " +
                                selector.prop("tagName") +
                                ":" +
                                selector.attr("id")
                            );
                        },
                    },
                    {
                        text: "And more...",
                        action: function (e, selector) {
                            alert(
                                "And more... clicked on " +
                                selector.prop("tagName") +
                                ":" +
                                selector.attr("id")
                            );
                        },
                    },
                ],
            },
        ];
    } else {
        return [
            {
                icon: "glyphicon-exclamation-sign",
                text: "No image types supported!",
            },
        ];
    }
};

folder_menu = {
    id: "folder_menu",
    data: [
        //{
        //    header: "Thao tác",
        //},
        {
            icon: "fa-regular fa-folder-open",
            text: "Mở thư mục",
            action: function (e, selector) {
                var itemId = selector.data('itemid');
                openFolder(itemId);
            },
        },
        {
            icon: "fa-regular fa-pen-to-square",
            text: "Sửa thư mục",
            action: function (e, selector) {
                var itemId = selector.data('itemid');
                editFileOrFolder(itemId);
            },
        },
        {
            icon: "fa-solid fa-file-arrow-down",
            text: "Tải xuống",
            action: function (e, selector) {
                var itemId = selector.data('itemid');
                dowload(itemId);
            },
        },
        //{
        //	divider: true,
        //},
        //{
        //	header: "Another Example",
        //},
        {
            icon: "fa-regular fa-trash-can",
            text: "Xóa",
            action: function (e, selector) {
                var itemId = selector.data('itemid');
                deleteFileOrFolder(itemId);
            },
        },
    ],
};

file_menu = {
    id: "file_menu",
    data: [
        //{
        //    header: "Thao tác",
        //},
        {
            icon: "fa-regular fa-eye",
            text: "Xem tài liệu",
            action: function (e, selector) {
                var itemId = selector.data('itemid');
                showDetailFile(itemId);
            },
        },
        {
            icon: "fa-solid fa-file-pen",
            text: "Đổi tên",
            action: function (e, selector) {
                var itemId = selector.data('itemid');
                editFileOrFolder(itemId);
            },
        },
        {
            icon: "fa-solid fa-file-arrow-down",
            text: "Tải xuống",
            action: function (e, selector) {
                var itemId = selector.data('itemid');
                dowload(itemId);
            },
        },
        //{
        //    icon: "glyphicon-plus",
        //    text: "Thông tin",
        //    action: function (e, selector) {
        //        alert(
        //            "Create clicked on " +
        //            selector.prop("tagName") +
        //            ":" +
        //            selector.attr("id")
        //        );
        //    },
        //},
        {
            icon: "fa-regular fa-copy",
            text: "Sao chép",
            action: function (e, selector) {
                var itemId = selector.data('itemid');
                copyFile(itemId);
            },
        },
        //{
        //	divider: true,
        //},
        //{
        //	header: "Another Example",
        //},
        {
            icon: "fa-regular fa-trash-can",
            text: "Xóa",
            action: function (e, selector) {
                var itemId = selector.data('itemid');
                deleteFileOrFolder(itemId);
            },
        },
    ],
};


expoler_menu = {
    id: "expoler_menu",
    data: [
        //{
        //    header: "Thao tác",
        //},
        {
            icon: "fa-solid fa-folder-plus",
            text: "Tạo thư mục",
            action: function (e, selector) {
                createFolder(rootId);
            },
        },
        {
            icon: "fa-solid fa-file-arrow-up",
            text: "Tải tệp lên",
            action: function (e, selector) {
                createFiles(rootId);
            },
        },
        {
            icon: "fa-solid fa-paste",
            disabled: function () {
                return nClipboard?.length > 0
            },
            text: "Dán",
            action: function (e, selector) {
                pasteFiles();
            },
        },
    ],
};
