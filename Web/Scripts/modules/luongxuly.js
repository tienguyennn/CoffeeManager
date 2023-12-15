var totalPage = $('#hidden--totalPage').val();
var totalRecord = $('#hidden--totalRecord').val();
var dataTable = $("#table-LuongXuLy");

function pagefunction() {
    var config = [
        {
            tdClass: "center width50 fixed-side",
            isSort: false,
            nameModel: "",
            isCounter: true,
            content: function (data) {
                return "<input type='checkbox'/>"
            }
        },

        {
            isSort: false,
            nameModel: "",
            tdClass: "center fixed-side",
            content: function (data) {
                var result = '<div class="btn-group">' +
                    '<button data-toggle="dropdown" class="btn btn-xs btn-primary btn-white dropdown-toggle" aria-expanded="false">Thao tác<i class="ace-icon fa fa-angle-down icon-on-right"></i>' +
                    '</button>' +
                    '<ul class="dropdown-menu">';
                result += "<li><a href='javascript:void(0)' onclick='onEditLuongXuLy(" + data.Id + ")'   title = 'Chỉnh sửa'><i class='glyphicon glyphicon-edit'> </i> Sửa thông tin</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='onDeleteLuongXuLy(" + data.Id + ")'  title = 'Xóa'><i class=' glyphicon glyphicon-remove' style='color:red'> </i> Xóa</a></li>";
                result += "<li><a href='/TrangThaiLuongXuLyArea/TrangThaiLuongXuLy/Index?idLuongXuLy=" + data.Id + "'  title = 'Danh sách trạng thái xử lý'><i class='glyphicon glyphicon-th-list'> </i>&nbsp;Danh sách trạng thái xử lý</a></li>";
                result += "<li><a href='/BuocXuLyArea/BuocXuLy/Index?idLuongXuLy=" + data.Id + "' title = 'Danh sách bước xử lý'><i class='glyphicon glyphicon-th-list'> </i>&nbsp;Danh sách bước xử lý</a></li>";
                result += "</ul></div>";
                return result;
            }
        },
        {
            isSort: true,
            nameModel: 'TenLuongXuLy',
            content: function (data) {
                return data.TenLuongXuLy
            }
        },
    ];

    var getData = function (page, sortQuery, pageSize) {
        $.ajax({
            url: '/LuongXuLyArea/LuongXuLy/GetData',
            type: 'post',
            cache: false,
            data: { "indexPage": page, "sortQuery": sortQuery, "pageSize": pageSize },
            success: function (data) {
                dataTable.hinetTable("data", {
                    pageSize: pageSize != -1 ? pageSize : data.Count,
                    pageIndex: page,
                    pagecount: data.TotalPage,
                    recordCount: data.Count,
                    listItem: data.ListItem,
                });
            },
            error: function (err) {
                CommonJS.alert(xhr.responseText);
            }
        });

    }

    var tblData = dataTable.hinetTable("init", {
        pageSizeList: { size: [20, 50, 100, -1], label: ['20', '50', '100', 'Tất cả'] },
        pagecount: totalPage,
        recordCount: totalRecord,
        actionToolBar: '<a href=\"#collapseDiv\" aria-controls=\"collapsePanel\" data-toggle=\"collapse\" role=\"button\" class="btn btn-primary btn-xs"><i class="fa fa-search"></i> Tìm kiếm</a>',
        getData: getData,
        listItem: dataLuongXuLy,
        config: config
    });
}

function AfterSussessActionAjaxform() {
    dataTable.hinetTable("reload");
}

function AjaxSearchSuccess(result) {
    dataTable.hinetTable("data", {
        pageIndex: 1,
        pagecount: result.TotalPage,
        recordCount: result.Count,
        listItem: result.ListItem,
    });
}

function onEditLuongXuLy(idLuongXuLy) {
    onOpenEditModal('/LuongXuLyArea/LuongXuLy/EditLuongXuLy', { idLuongXuLy: idLuongXuLy }, 'post')
}

function onDeleteLuongXuLy(idLuongXuLy) {
    var callBack = function (result) {
        if (result.Status) {
            NotiSuccess('Thành công', result.Message);
            AfterSussessActionAjaxform();
        } else {
            NotiError('Lỗi', result.Message);
        }
    }
    onConfirmCallAjax('/LuongXuLyArea/LuongXuLy/DeleteLuongXuLy', 'post',
        { id: idLuongXuLy }, callBack,
        'XÁC NHẬN XÓA LUỒNG XỬ LÝ',
        'Bạn có muốn xóa không?');
}

$(document).ready(function () {
    pagefunction();
})