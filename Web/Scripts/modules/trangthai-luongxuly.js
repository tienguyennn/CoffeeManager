var moduleTableSelector = $("#tbl-TrangThaiLuongXuLy");
var idLuongXuLy = document.getElementById('hidden--luongxuly').value;
var totalPage = document.getElementById('hidden--totalPage').value;
var totalRecord = document.getElementById('hidden--totalRecord').value;

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
                    '</button >' +
                    '<ul class="dropdown-menu">';
                result += "<li><a href='javascript:void(0)' onclick='onEditTrangThaiLuongXuLy(" + data.Id + ")'  title = 'Chỉnh sửa'><i class='glyphicon glyphicon-edit'> </i> Sửa thông tin</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='onDeleteTrangThaiLuongXuLy(" + data.Id + ")'  title = 'Xóa'><i class=' glyphicon glyphicon-remove' style='color:red'> </i> Xóa</a></li>";
                result += "</ul></div>";
                return result;
            }
        },
        {
            isSort: true,
            nameModel: 'TenTrangThaiXuLy',
            content: function (data) {
                return data.TenTrangThaiXuLy
            }
        },
        {
            isSort: true,
            nameModel: 'MoTa',
            content: function (data) {
                var html = "";
                if (data.MoTa) {
                    html += "<strong>" + data.MoTa + "</strong>";
                }
                return html;
            }
        },
        {
            isSort: true,
            nameModel: 'MaTrangThaiXuLy',
            content: function (data) {
                return data.MaTrangThaiXuLy
            }
        },
        {
            isSort: true,
            nameModel: 'IsTiepNhanTuNguoiDan',
            content: function (data) {
                if (data.IsTiepNhanTuNguoiDan) {
                    return "<center><strong class='text-success'><i class='fa fa-check-square'></i></strong></center>";
                }
            }
        },
        {
            isSort: true,
            nameModel: 'IsBatDau',
            content: function (data) {
                if (data.IsBatDau) {
                    return "<center><strong class='text-success'><i class='fa fa-check-square'></i></strong></center>";
                }
            }
        },
        {
            isSort: true,
            nameModel: 'IsKetThuc',
            content: function (data) {
                if (data.IsKetThuc) {
                    return "<center><strong class='text-success'><i class='fa fa-check-square'></i></strong></center>";
                }
            }
        },
    ];

    var getData = function (page, sortQuery, pageSize) {
        $.ajax({
            url: '/TrangThaiLuongXuLyArea/TrangThaiLuongXuLy/GetData',
            type: 'post',
            cache: false,
            data: { "idLuongXuLy": idLuongXuLy, "indexPage": page, "sortQuery": sortQuery, "pageSize": pageSize },
            success: function (data) {
                moduleTableSelector.hinetTable("data", {
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

    var tblData = moduleTableSelector.hinetTable("init", {
        pageSizeList: { size: [20, 50, 100, -1], label: ['20', '50', '100', 'Tất cả'] },
        pagecount: totalPage,
        recordCount: totalRecord,
        actionToolBar: '<a href=\"#collapseDiv\" aria-controls=\"collapsePanel\" data-toggle=\"collapse\" role=\"button\" class="btn btn-primary btn-xs"><i class="fa fa-search"></i> Tìm kiếm</a>',
        getData: getData,
        listItem: groupData,
        config: config
    });

}

function AfterSussessActionAjaxform() {
    moduleTableSelector.hinetTable("reload");
}
function AjaxSearchSuccess(result) {
    moduleTableSelector.hinetTable("data", {
        pageIndex: 1,
        pagecount: result.TotalPage,
        recordCount: result.Count,
        listItem: result.ListItem,
    });
}

function onEditTrangThaiLuongXuLy(idTrangThaiLuongXuLy) {
    onOpenEditModal('/TrangThaiLuongXuLyArea/TrangThaiLuongXuLy/EditTrangThaiLuongXuLy', { idLuongXuLy: idLuongXuLy, idTrangThaiLuongXuLy: idTrangThaiLuongXuLy }, 'post');
}

function onDeleteTrangThaiLuongXuLy(idTrangThaiLuongXuLy) {
    var callBack = function (result) {
        if (result.Status) {
            NotiSuccess('Thành công', result.Message);
            AfterSussessActionAjaxform();
        } else {
            NotiError('Lỗi', result.Message);
        }
    }
    onConfirmCallAjax('/TrangThaiLuongXuLyArea/TrangThaiLuongXuLy/DeleteTrangThaiLuongXuLy', 'post',
        { id: idTrangThaiLuongXuLy }, callBack,
        'XÁC NHẬN XÓA TRẠNG THÁI LUỒNG XỬ LÝ',
        'Bạn có muốn xóa không?');
}

pagefunction();