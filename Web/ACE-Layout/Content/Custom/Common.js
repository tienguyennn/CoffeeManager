
// NAMDV
function elementInViewport2(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
}



function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top >= window.pageYOffset &&
        left >= window.pageXOffset &&
        (top + height) <= (window.pageYOffset + window.innerHeight) &&
        (left + width) <= (window.pageXOffset + window.innerWidth)
    );
}


(function ($) {
    $.fn.fixMe = function () {
        return this.each(function () {
            var $this = $(this),
                $t_fixed;
            function init() {
                $this.wrap('<div class="container" />');
                $t_fixed = $this.clone();
                $t_fixed.find("tbody").remove().end().addClass("fixed").insertBefore($this);
                resizeFixed();
            }
            function resizeFixed() {

            }
            function scrollFixed() {
                var offset = $(this).scrollTop(),
                    tableOffsetTop = $this.offset().top,
                    tableOffsetBottom = tableOffsetTop + $this.height() - $this.find("thead").height();
                if (offset < tableOffsetTop || offset > tableOffsetBottom)
                    $t_fixed.hide();
                else if (offset >= tableOffsetTop && offset <= tableOffsetBottom && $t_fixed.is(":hidden"))
                    $t_fixed.show();
            }
            $(window).resize(resizeFixed);
            $(window).scroll(scrollFixed);
            init();
        });
    };
})(jQuery);


var CommonJS = {
    HEADER_HIGHT: 271,

    baseAlert: function (msg) {
        if (msg.Message != null) {
            alert(msg.Message);
            return msg;
        }
        json = {};
        try {
            json = $.parseJSON(msg);
        } catch (e) {
            alert(msg);
            return;
        }

        alert(json.Message);
        return json;
    },

    alert: function (msg) {
        $("#_GlobalMessage").attr("class", "");
        $("#_GlobalMessage").addClass("msg-type-SUCCESS");
        if (msg.Message != null) {
            $("#_GlobalMessage").html(msg.Message);
            $("#_GlobalMessage").fadeIn();
            setTimeout('$("#_GlobalMessage").fadeOut();', 6000);
            return msg;
        }
        json = {};
        try {
            json = $.parseJSON(msg);
        } catch (e) {
            $("#_GlobalMessage").html(msg);
            $("#_GlobalMessage").fadeIn();
            setTimeout('$("#_GlobalMessage").fadeOut();', 6000);
            return;
        }
        if (json == null) {
            $("#_GlobalMessage").addClass("msg-type-ERROR");
            $("#_GlobalMessage").html("null");
        } else {
            $("#_GlobalMessage").addClass("msg-type-" + json.Type);
            $("#_GlobalMessage").html(json.Message);
        }
        $("#_GlobalMessage").fadeIn();
        setTimeout('$("#_GlobalMessage").fadeOut();', 6000);
        return json;
    },

    back: function () {
        history.back(1);
    },

    checkDate: function checkDate(date) {
        var minYear = 1902;
        var errorMsg = "";
        // regular expression to match required date format 
        re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

        if (date != '') {
            if (regs = date.match(re)) {
                if (regs[1] < 1 || regs[1] > 31) {
                    errorMsg = "Invalid value for day: " + regs[1];
                    return false;
                }
                else if (regs[2] < 1 || regs[2] > 12) {
                    errorMsg = "Invalid value for month: " + regs[2];
                    return false;
                }
                else if (regs[3] < minYear) {
                    errorMsg = "Invalid value for year: " + regs[3] + " - must be between " + minYear;
                    return false;
                }
            }
            else {
                errorMsg = "Invalid date format: " + date;
                return false;
            }
        }
        else {
            errorMsg = "Empty date not allowed!";
            return false;
        }

        return true;
    },
    isNumber: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },

    makeSizeMatchParent: function (elementID, parentID) {
        var pheight = $("#" + parentID).height();
        var pwidth = $("#" + parentID).width();
        $("#" + elementID).css({
            width: pwidth,
            height: pheight,
        });
    },

    FullScreen: function (elementID, isFull) {
        if (isFull) {
            $("#container").css({
                width: '1px',
                height: '1px',
                overflow: 'hidden'
            });

            $("#" + elementID).css({
                position: 'absolute',
                width: $(window).width() - 3,
                height: $(window).height() - 5,
                top: 0,
                left: 0,
                'z-index': 100,
                overflow: 'hidden',
                background: '#fff'
            });

            $(".form-enter-data").css({
                width: $(window).width() - 290,
                height: $(window).height() - 100,
                'max-height': $(window).height() - 100,
                overflow: 'auto',
            });
            $("#DivGroupTree .panelScroll").width($("#DivGroupTree").width());
        } else {
            $("#container").css({
                width: '',
                height: '',
                overflow: ''
            });
            $("#" + elementID).css({
                position: '',
                width: '',
                height: '',
                top: '',
                left: '',
                'z-index': '',
                overflow: '',
                background: ''
            });

            $(".form-enter-data").css({
                width: '',
                height: '',
                overflow: '',
                'max-height': $(window).height() - CommonJS.HEADER_HIGHT,
                background: ''
            });
            $("#DivGroupTree .panelScroll").width(194);
        }


    },

    EditableFullScreen: function (elementID, isFull) {
        $(window).resize(function () {
            CommonJS.FullScreen(elementID, isFull);
        });
        CommonJS.FullScreen(elementID, isFull);
        if (isFull) {
            $("#btnFullScreen").hide();
            $("#btnUnFull").show();
            $("#TemplateHide").show();
            $("#isFullScreen").val(1);
            $(".PanelContentScroll").css({
                'max-height': $(window).height() - 90,
            });
        } else {
            $("#btnFullScreen").show();
            $("#btnUnFull").hide();
            $("#isFullScreen").val(0);
            $(".PanelContentScroll").css({
                'max-height': $(window).height() - CommonJS.HEADER_HIGHT,
            });
        }
    },

    PrepareEditableFullScreen: function () {
        if ($("#isFullScreen").val() * 1 == 1) {
            $("#btnFullScreen").click();
        } else {
            $("#btnUnFull").click();
        }
    },
    ReloadPage: function () {
        window.location.href = window.location.href;
    },
    ClearAllCache: function () {
        sessionStorage.clear();
    },
    TreeClickFirstLeave: function () {
        var cnode = $($("div.hitarea")[0])
        var _count = 1;
        while (cnode.length > 0) {
            if (!cnode.hasClass("lastCollapsable-hitarea")) {
                cnode.click();
            }
            cnode = $(cnode.parent().find("ul li div.hitarea")[0])
            _count++;
            if (_count > 20) break;
        }

        $($("li span[id^=Template]")[0]).find("a.treeitem").click();
    }
}

var empty = "";
var CommonExcelGrid = {
    selectorId: empty,
    selectorErrorId: empty,
    tableName: empty,
    tableErrorName: empty,
    parentId: empty,
    parentErrorId: empty,
    pagerId: empty,
    pagerErrorId: empty,
    columnNames: [],
    columnModels: [],
    columnModelsError: [],
    data: [],
    dataError: [],
    rowList: [10, 20, 30, 40, 50, 100, 200, 500, 'Tất cả'],
    table: {},
    uploadExcel: function (url, fileSelectorId) {
        var fileDOM = document.getElementById(fileSelectorId);
        var file = fileDOM.files[0];
        var formData = new FormData();
        var data = [];
        var defer = $.Deferred();
        formData.append('fileBase', file);
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {
                CommonExcelGrid.data = response.correctData;
                CommonExcelGrid.dataError = response.inCorrectData;
                CommonExcelGrid.buildGrid();
                defer.resolve(true);
            }, beforeSend: function () {
                //WaitingLoad_Start()
            }, complete: function () {
                //WaitingLoad_End()
            }, error: function (err) {
                defer.resolve(false);
            }
        });
        return defer.promise();
    }, buildGrid: function () {
        var saveRowData = function (listData, data, rowId, selectorId, parentId, caption, updateParameters) {
            //loadScript('/js/plugin/jqgrid/grid.locale-en.min.js', function () {
            //    loadScript('/js/plugin/jqgrid/jquery.jqGrid.min.js', function () {
            $("#" + selectorId).delRowData(rowId);
            $('#' + selectorId).trigger('reloadGrid');
            $('#' + selectorId).jqGrid('setCaption', caption + ' ' + '(' + $('#' + selectorId).jqGrid('getGridParam', 'data').length + ')');
            $('#' + parentId + " .ui-pg-selbox option[value='" + (listData.length - 1) + "']").val(listData.length);
            //});

            if (updateParameters !== null) {
                updateParameters.data.push(data);
                $('#' + updateParameters.selectorId).jqGrid('setGridParam', { data: updateParameters.data });
                $('#' + updateParameters.parentId + " .ui-pg-selbox option[value='" + (updateParameters.data.length - 1) + "']").val(updateParameters.data.length);
                $('#' + updateParameters.selectorId).jqGrid('setCaption', updateParameters.caption + ' ' + '(' + updateParameters.data.length + ')');
                $("#" + updateParameters.selectorId).setGridParam({ rowNum: updateParameters.data.length });
                $('#' + updateParameters.selectorId).trigger('reloadGrid');

            }
            //});
        }

        var loadingData = function (selectorId, data, columnNames, colModel, pagerId, caption, parentId, isDataError, updateParameters) {
            $('#' + selectorId).jqGrid({
                data: data,
                url: 'clientArray',
                editurl: 'clientArray',
                datatype: "local",
                height: 'auto',
                colNames: columnNames,
                colModel: colModel,
                rowNum: isDataError ? 10 : data.length,
                rowList: CommonExcelGrid.rowList,
                pager: '#' + pagerId,
                viewrecords: true,
                sortorder: "desc",
                caption: caption,
                toolbarfilter: true,
                viewrecords: true,
                multiselect: !isDataError,
                recordtext: "Bản ghi {0} - {1} của {2}",
                emptyrecords: "Không có dữ liệu",
                loadtext: "Đang tải...",
                pgtext: "Trang {0} của {1}",
                gridComplete: function () {
                    //cấu hình cột chỉnh sửa
                    //var ids = $('#' + selectorId).jqGrid('getDataIDs');
                    //for (var i = 0; i < ids.length; i++) {
                    //    var cl = ids[i];
                    //    be = "<button class='btn btn-xs btn-default' data-original-title='Chỉnh sửa' title='Chỉnh sửa' onclick=\"$('#" + selectorId + "').editRow('" + cl + "');\"><i class='fa fa-pencil'></i></button>";
                    //    se = "<button class='btn btn-xs btn-default' data-original-title='Lưu lại' title='Lưu lại' onclick=\"$('#" + selectorId + "').saveRow('" + cl + "');\"><i class='fa fa-save'></i></button>";
                    //    ce = "<button class='btn btn-xs btn-default' data-original-title='Thoát' title='Thoát chỉnh sửa' onclick=\"$('#" + selectorId + "').restoreRow('" + cl + "');\"><i class='fa fa-times'></i></button>";
                    //    $("#" + selectorId).jqGrid('setRowData', ids[i], {
                    //        act: "<div class='button-group' style='width:100px'>" + be + se + ce + "</div>"
                    //    });
                    //}

                    //cho options "Tất cả" có giá trị bằng dãy dữ liệu
                    $('#' + parentId + " .ui-pg-selbox option[value='Tất cả']").val(data.length);
                    //cấu hình tìm kiếm trên bảng ( nhấn nút Enter để tìm kiếm)
                    var options = {
                        searchOnEnter: true
                    };
                    $('#' + selectorId).jqGrid('filterToolbar', options);
                    //chỉnh độ rộng của bảng
                    $('#' + selectorId).jqGrid('setGridWidth', $('#' + parentId).width(), true);
                }
            });
            //tự động chọn "Tất cả" nếu là bảng của Bản ghi hợp lệ
            if (!isDataError) {
                $('#' + parentId + " .ui-pg-selbox option").last().prop('selected', true);
            }

            //tự động clear dữ liệu nếu người dùng up lại file
            $('#' + selectorId).jqGrid('clearGridData');
            $('#' + selectorId).jqGrid('setGridParam', { data: data });
            $('#' + selectorId).jqGrid('setCaption', caption + ' ' + '(' + data.length + ')');
            $('#' + selectorId).trigger('reloadGrid');

            $("#" + parentId + " .ui-icon.ui-icon-seek-prev").wrap("<div class='btn btn-sm btn-default'></div>");
            $("#" + parentId + " .ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");

            $("#" + parentId + " .ui-icon.ui-icon-seek-first").wrap("<div class='btn btn-sm btn-default'></div>");
            $("#" + parentId + " .ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");

            $("#" + parentId + " .ui-icon.ui-icon-seek-next").wrap("<div class='btn btn-sm btn-default'></div>");
            $("#" + parentId + " .ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");

            $("#" + parentId + " .ui-icon.ui-icon-seek-end").wrap("<div class='btn btn-sm btn-default'></div>");
            $("#" + parentId + " .ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
        }

        //loadScript('/js/plugin/jqgrid/grid.locale-en.min.js', function () {
        //    loadScript('/js/plugin/jqgrid/jquery.jqGrid.min.js', function () {

        var updateParameters = {
            data: CommonExcelGrid.data,
            selectorId: CommonExcelGrid.selectorId,
            parentId: CommonExcelGrid.parentId,
            caption: CommonExcelGrid.tableName
        };
        //load dữ liệu hợp lệ
        loadingData(CommonExcelGrid.selectorId, CommonExcelGrid.data, CommonExcelGrid.columnNames, CommonExcelGrid.columnModels, CommonExcelGrid.pagerId, CommonExcelGrid.tableName, CommonExcelGrid.parentId, false, null, );

        //load dữ liệu không hợp lệ
        loadingData(CommonExcelGrid.selectorErrorId, CommonExcelGrid.dataError, CommonExcelGrid.columnNames, CommonExcelGrid.columnModelsError, CommonExcelGrid.pagerErrorId, CommonExcelGrid.tableErrorName, CommonExcelGrid.parentErrorId, true, updateParameters);
        //    });
        //});
    },
    exportExcel: function (url) {
        var data = JSON.stringify($('#' + CommonExcelGrid.selectorErrorId).jqGrid('getGridParam', 'data'));
        var defer = $.Deferred();
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (response) {
                defer.resolve(response);
            }
        });
        return defer.promise();
    },
    importExcelV2: function (url) {
        var result = false;
        var selectedRowIds = $('#' + CommonExcelGrid.selectorId).jqGrid('getGridParam', 'selarrrow');
        var length = selectedRowIds.length;
        if (length <= 0) {
            $.confirm({
                'title': 'Cập nhật bản ghi hợp lệ',
                'message': 'Bạn chưa chọn bản ghi nào',
                'buttons': {
                    'Đóng': {
                        'class': 'btn-confirm-yes',
                        'action': function () {
                        }
                    }
                }
            })
        } else {
            var importData = [];
            for (var i = 0; i < length; i++) {
                var row = $('#' + CommonExcelGrid.selectorId).getRowData(selectedRowIds[i]);
                importData.push(row);
            }
            var defer = $.Deferred();
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(importData),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                success: function (response) {
                    defer.resolve(response.success);
                }, beforeSend: function () {
                    //WaitingLoad_Start()
                }, complete: function () {
                    //WaitingLoad_End()
                }, error: function (err) {
                    defer.resolve(false);
                }
            });
            return defer.promise();
        }
    },
    importExcel: function (id, url) {
        var result = false;
        var selectedRowIds = $('#' + CommonExcelGrid.selectorId).jqGrid('getGridParam', 'selarrrow');
        var length = selectedRowIds.length;
        if (length <= 0) {
            $.smallBox({
                title: "Thông báo!",
                content: "Bạn chưa chọn bản ghi nào",
                color: "#d9534f",
                timeout: 6000,
                icon: "fa fa-bell swing animated"
            });
        } else {
            var importData = [];
            for (var i = 0; i < length; i++) {
                var row = $('#' + CommonExcelGrid.selectorId).getRowData(selectedRowIds[i]);
                importData.push(row);
            }
            var defer = $.Deferred();
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify({ "id": id, "listImport": importData }),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                success: function (response) {
                    defer.resolve(response.success);
                }, beforeSend: function () {
                    //WaitingLoad_Start()
                }, complete: function () {
                    //WaitingLoad_End()
                }, error: function (err) {
                    defer.resolve(false);
                }
            });
            return defer.promise();
        }
    }
}


var CommonGrid = {
    dialogSelectorId: empty,
    searchParam: {
    },
    dataPerPage: 10,
    columns: [],
    url: empty,
    selectorId: empty,
    pagerId: empty,
    title: empty,
    titleId: empty,
    pageIndex: 0,
    data: [],
    total: 0,
    table: {},
    hasFastFilter: false,
    orderIndex: 0,
    orderType: 'asc',
    editColumns: function (id) {
        return "<div class='btn-group'>"
            + "<a href='javascript:void(0)' onclick='openModalEdit(" + id + ")'   title = 'Chỉnh sửa'><i class='glyphicon glyphicon-edit'> </i></a>"
            + "<a href='javascript:void(0)' onclick='openModalDelete(" + id + ")'  title = 'Xóa'><i class=' glyphicon glyphicon-remove' style='color:red'> </i></a>"
            + "</div>";
    },
    getData: function (url) {
        var defer = $.Deferred();
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(CommonGrid.searchParam),
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            success: function (data) {
                defer.resolve(data);
            }, beforeSend: function () {
            }, complete: function () {
            }, error: function (err) {
                defer.resolve(false);
            }
        });
        return defer.promise();
    },
    buildGrid: function () {
        if (CommonGrid.url) {
            CommonGrid.getData(CommonGrid.url).done(function (result) {
                CommonGrid.data = result.listItemsPerPage;
                CommonGrid.total = result.totalItem;
                var startRow = (CommonGrid.pageIndex - 1) * CommonGrid.dataPerPage + 1;
                var html = '';
                var target = CommonGrid.selectorId + "_container";
                html += "<table class='wtfayo display projects-table table table-striped table-bordered table-hover' cellspacing='0' width='100%' id=" + target + ">";
                html += '<thead><tr>';
                for (var i = 0; i < CommonGrid.columns.length; i++) {
                    html += '<th  class="thtableresponsive">';
                    html += escapeHTML(CommonGrid.columns[i].text);
                    html += '</th>';
                }
                html += '</tr></thead>';
                html += '<tbody>';
                if (CommonGrid.data.length >= 0) {
                    var dataLength = CommonGrid.data.length;
                    if (CommonGrid.data !== null && CommonGrid.data.length) {
                        var columnsLength = CommonGrid.columns.length;
                        for (var i = 0; i < dataLength; i++) {
                            html += '<tr>';
                            for (var j = 0; j < columnsLength; j++) {
                                html += '<td>';
                                if (CommonGrid.columns[j].isOrder) {
                                    html += (startRow + i);
                                } else if (CommonGrid.columns[j].isLinkChinhSachBanHang) {
                                    //need to rewrite
                                    var data = CommonGrid.data[i][CommonGrid.columns[j].field];
                                    var id = CommonGrid.data[i][CommonGrid.columns[j].subField];
                                    html += "<a href='javascript:openDetailForm(" + id + ")'>" + data + "</a>";
                                } else if (CommonGrid.columns[j].isLinkKhuyenMai) {
                                    //need to rewrite
                                    var data = CommonGrid.data[i][CommonGrid.columns[j].field];
                                    var id = CommonGrid.data[i][CommonGrid.columns[j].subField];
                                    html += "<a href='javascript:openDetailForm(" + id + ")'>" + data + "</a>";
                                }
                                else if (CommonGrid.columns[j].isLinkSanPham) {
                                    //need to rewrite
                                    var data = CommonGrid.data[i][CommonGrid.columns[j].field];
                                    var id = CommonGrid.data[i][CommonGrid.columns[j].subField];
                                    var type = CommonGrid.data[i][CommonGrid.columns[j].subFieldChild];
                                    html += "<a href = '/SanPhamArea/SanPham/DetailProduct?productId=" + id + "&realEstateTypeId=" + type + "'>" + data + "</a>";
                                }
                                else if (CommonGrid.columns[j].isStatusChinhSachBanHang) {
                                    //need to rewrite
                                    var data = CommonGrid.data[i][CommonGrid.columns[j].field];
                                    if (data == "1") {
                                        data = '<span class="green"><i class="ace-icon fa fa-check bigger-110"></i>&nbsp;Đã duyệt</span>';
                                    } else if (data == "0") {
                                        data = '<b class="red2" title="Không được duyệt"><i class="ace-icon fa fa-times-circle-o"></i>&nbsp; Không được duyệt </b>';
                                    } else {
                                        data = "<span style='color: #ffb752!important;' title='Chờ duyệt'> <i class='ace-icon fa fa-clock-o bigger-110 hidden-480 bigger-110'></i>&nbsp;Chờ duyệt </span>";
                                    }
                                    html += data;
                                }
                                else if (CommonGrid.columns[j].isStatusKhuyenMai) {
                                    //need to rewrite
                                    var data = CommonGrid.data[i][CommonGrid.columns[j].field];
                                    if (data == true) {
                                        data = '<span class="green" title="Đã duyệt"><i class="ace-icon fa fa-check bigger-110"></i>&nbsp;Đã phê duyệt</span>';
                                    } else {
                                        data = '<span class="red2" title="Chưa duyệt"><i class="ace- icon fa fa-exclamation"></i>&nbsp;Chưa phê duyệt</span>';
                                    }
                                    html += data;
                                } else if (CommonGrid.columns[j].isStatusSanPham) {
                                    var data = CommonGrid.data[i][CommonGrid.columns[j].field];
                                    if (data == "1") {
                                        data = '<span class="text-success" title="Mở bán"><b>Mở bán</b></span>';
                                    } else if (data == "2") {
                                        data = '<span class="text-success" title="Đã giữ chỗ"><b>Đã giữ chỗ</b></span>';
                                    } else if (data == "3") {
                                        data = '<span class="text-success" title="Đã đặt cọc"><b>Đã đặt cọc</b></span>';
                                    } else if (data == "4") {
                                        data = '<span style="color:orange" title="Đã bán"><b>Đã bán</b></span>';
                                    }
                                    else if (data == "5") {
                                        data = '<span class="text-success" title="Đã bàn giao"><b>Đã bàn giao</b></span>';
                                    }
                                    else if (data == "100") {
                                        data = '<span class="text-warning" title="Đã khóa sản phẩm"><b>Đã khóa sản phẩm</b></span>';
                                    }
                                    else {
                                        data = '<span class="text-danger" title="Chưa mở bán"><b>Chưa mở bán</b></span>';
                                    }
                                    html += data;
                                }
                                else if (CommonGrid.columns[j].hidden) {

                                } else if (CommonGrid.columns[j].isEdit) {
                                    if (CommonGrid.columns[j].isEditChinhSachBanHang) {
                                        var data = CommonGrid.data[i][CommonGrid.columns[j].subField];
                                        if (data == null) {
                                            var data = CommonGrid.data[i][CommonGrid.columns[j].field];
                                            html += CommonGrid.editColumns(data);
                                        } else {
                                            html += empty;
                                        }
                                    }
                                    else if (CommonGrid.columns[j].isEditKhuyenMai) {
                                        var data = CommonGrid.data[i][CommonGrid.columns[j].subField];
                                        if (data != true) {
                                            var data = CommonGrid.data[i][CommonGrid.columns[j].field];
                                            html += CommonGrid.editColumns(data);
                                        } else {
                                            html += empty;
                                        }
                                    } else if (CommonGrid.columns[j].isEditSanPham) {
                                        try {
                                            var realEstateType = CommonGrid.data[i][CommonGrid.columns[j].subField];
                                            var realEstateProductId = CommonGrid.data[i][CommonGrid.columns[j].field];

                                            html += CommonGrid.editColumns(realEstateProductId, realEstateType);
                                        } catch (err) {
                                            console.log(err);
                                            html += empty;
                                        }
                                    }
                                    else {
                                        var data = CommonGrid.data[i][CommonGrid.columns[j].field];
                                        html += CommonGrid.editColumns(data);
                                    }
                                } else {
                                    var data = CommonGrid.data[i][CommonGrid.columns[j].field];
                                    html += escapeHTML(data);
                                }
                                html += '</td>';
                            }
                            html += '</tr>';
                        }
                    }
                    html += '</tbody>';
                    html += '</table>'
                    $('#' + CommonGrid.selectorId).html(html);
                    CommonGrid.orderIndex = CommonGrid.orderIndex > (CommonGrid.columns.length - 1) ? 1 : CommonGrid.orderIndex;
                    CommonGrid.table = $('#' + target).DataTable({
                        "bDestroy": true,
                        "paging": false,
                        "bFilter": false,
                        "bInfo": false,
                        "order": [[CommonGrid.orderIndex, CommonGrid.orderType]]
                    });
                    if (CommonGrid.hasFastFilter) {
                        var filter = '';
                        filter += "<div class='col-xs-6'></div>";
                        filter += "<div class='col-xs-6'>";
                        filter += "<div id='" + CommonGrid.selectorId + "_container_filter' class='dataTables_filter'>";
                        filter += "<label>";
                        filter += "Tìm kiếm:";
                        filter += "<input type='search' class='form-control input-sm' placeholder='' aria-controls='" + CommonGrid.selectorId + "_container' onkeyup='CommonGrid.onFastSearch(event)'>";
                        filter += "</label>";
                        filter += "</div>";
                        filter += "</div>";

                        $('#' + CommonGrid.selectorId + '_container_wrapper .row:first-child').html(filter);
                    }
                    CommonGrid.pagingTable(CommonGrid.total);
                }
                $('#' + target).on('order.dt', function () {
                    var order = CommonGrid.table.order();
                    var index = order[0][0];
                    var orderType = order[0][1];
                    CommonGrid.orderIndex = index;
                    CommonGrid.orderType = orderType;
                    CommonGrid.searchParam = {
                        ...CommonGrid.searchParam,
                        orderField: CommonGrid.columns[index].field,
                        orderType: orderType
                    };
                    CommonGrid.buildGrid();
                });
            })
        }
    },
    pagingTable: function (totalDatas) {
        var currentPageIndex = CommonGrid.pageIndex;
        var totalPages = 0;
        if (totalDatas <= CommonGrid.dataPerPage) {
            totalPages = 1;
        } else if (totalDatas % CommonGrid.dataPerPage !== 0) {
            totalPages = Math.floor(totalDatas / CommonGrid.dataPerPage) + 1;
        } else {
            totalPages = Math.floor(totalDatas / CommonGrid.dataPerPage);
        }
        var startRow = (currentPageIndex - 1) * CommonGrid.dataPerPage + 1;
        var endRow = (startRow + CommonGrid.data.length - 1);
        var pagingHtml = '';
        pagingHtml += '<div class="row" style="border-bottom:1px solid #e0e0e0;padding-top: 12px;padding-bottom: 12px;background-color: #EFF3F8">';
        //left content
        var leftContent = '';
        leftContent += '<div class="col-xs-6">';
        leftContent += '<div class="dataTables_info" id="' + CommonGrid.selectorId + "ss" + '" role="status" aria-live="polite">';
        leftContent += 'Hiển thị <span class="txt-color-darken">' + startRow + '</span> đến <span class="txt-color-darken">' + endRow + '</span> của <span class="text-primary">' + totalDatas + '</span> bản ghi';
        leftContent += '</div>';
        leftContent += '</div>';
        //end left content

        //right content
        var rightContent = '';
        rightContent += '<div class="col-xs-6">';
        rightContent += '<div class="dataTables_paginate paging_simple_numbers" id="' + CommonGrid.selectorId + '_paginate">'
        rightContent += '<ul class="pagination">';

        if (totalPages >= currentPageIndex) {
            if (totalPages <= 7) {
                if (totalPages === 1) {
                    rightContent += '<li class="paginate_button active" aria-controls="dt_basic" tabindex="0">';
                    rightContent += '<a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + totalPages + ')">' + totalPages + '</a>';
                    rightContent += '</li>';
                } else {
                    if (currentPageIndex === 1) {
                        rightContent += '<li class="paginate_button previous disabled" aria-controls="' + CommonGrid.selectorId + '" tabindex="0" id="' + CommonGrid.selectorId + '_previous"><a href="javascript:void(0)">Trang trước</a></li>';
                    } else {
                        rightContent += '<li class="paginate_button previous" aria-controls="' + CommonGrid.selectorId + '" tabindex="0" id="' + CommonGrid.selectorId + '_previous"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + (currentPageIndex - 1) + ')">Trang trước</a></li>';
                    }
                    for (var index = 1; index <= totalPages; index++) {
                        if (index === currentPageIndex) {
                            rightContent += '<li class="paginate_button active" aria-controls="' + CommonGrid.selectorId + '" tabindex="0">';
                        } else {
                            rightContent += '<li class="paginate_button" aria-controls="' + CommonGrid.selectorId + '" tabindex="0">';
                        }
                        rightContent += '<a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + index + ')">' + index + '</a>';
                        rightContent += '</li>';
                    }
                    if (currentPageIndex === totalPages) {
                        rightContent += '<li class="paginate_button next disabled" aria-controls="' + CommonGrid.selectorId + '" tabindex="0" id="' + CommonGrid.selectorId + '_next"><a href="javascript:void(0)">Trang tiếp</a></li>';
                    } else {
                        rightContent += '<li class="paginate_button next" aria-controls="' + CommonGrid.selectorId + '" tabindex="0" id="' + CommonGrid.selectorId + '_next"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + (currentPageIndex + 1) + ')">Trang tiếp</a></li>';
                    }
                }
            }
            else {
                if (currentPageIndex <= 4) {
                    if (currentPageIndex === 1) {
                        rightContent += '<li class="paginate_button previous disabled" aria-controls="dt_basic" tabindex="0" id="dt_basic_previous"><a href="javascript:void(0)">Trang trước</a></li>';
                    } else {
                        rightContent += '<li class="paginate_button previous" aria-controls="dt_basic" tabindex="0" id="dt_basic_previous"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + (currentPageIndex - 1) + ')">Trang trước</a></li>';
                    }
                    for (var index = 1; index <= 5; index++) {
                        if (index === currentPageIndex) {
                            rightContent += '<li class="paginate_button active" aria-controls="dt_basic" tabindex="0">';
                        } else {
                            rightContent += '<li class="paginate_button" aria-controls="dt_basic" tabindex="0">';
                        }
                        rightContent += '<a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + index + ')">' + index + '</a>';
                        rightContent += '</li>';
                    }
                    rightContent += '<li class="paginate_button disabled" aria-controls="dt_basic" tabindex="0" id="dt_basic_ellipsis"><a href="javascript:void(0)">…</a></li>';
                    rightContent += '<li class="paginate_button " aria-controls="dt_basic" tabindex="0"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + (totalPages) + ')">' + totalPages + '</a></li>';
                    rightContent += '<li class="paginate_button next" aria-controls="dt_basic" tabindex="0" id="dt_basic_next"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + (index + 1) + ')">Trang tiếp</a></li>';
                } else if (currentPageIndex >= 5 && currentPageIndex < (totalPages - 3)) {
                    rightContent += '<li class="paginate_button previous" aria-controls="dt_basic" tabindex="0" id="dt_basic_previous"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + (currentPageIndex - 1) + ')">Trang trước</a></li>';
                    rightContent += '<li class="paginate_button previous" aria-controls="dt_basic" tabindex="0" id="dt_basic_previous"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + 1 + ')">1</a></li>';
                    rightContent += '<li class="paginate_button disabled" aria-controls="dt_basic" tabindex="0" id="dt_basic_ellipsis"><a href="javascript:void(0)">…</a></li>';

                    rightContent += '<li class="paginate_button previous" aria-controls="dt_basic" tabindex="0" id="dt_basic_previous"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + (currentPageIndex - 1) + ')">' + (currentPageIndex - 1) + '</a></li>';
                    rightContent += '<li class="paginate_button previous active" aria-controls="dt_basic" tabindex="0" id="dt_basic_previous"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + (currentPageIndex) + ')">' + (currentPageIndex) + '</a></li>';
                    rightContent += '<li class="paginate_button previous" aria-controls="dt_basic" tabindex="0" id="dt_basic_previous"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + (currentPageIndex + 1) + ')">' + (currentPageIndex + 1) + '</a></li>';

                    rightContent += '<li class="paginate_button disabled" aria-controls="dt_basic" tabindex="0" id="dt_basic_ellipsis"><a href="javascript:void(0)">…</a></li>';
                    rightContent += '<li class="paginate_button " aria-controls="dt_basic" tabindex="0"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + (totalPages) + ')">' + totalPages + '</a></li>';
                    rightContent += '<li class="paginate_button next" aria-controls="dt_basic" tabindex="0" id="dt_basic_next"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + (index + 1) + ')">Trang tiếp</a></li>';

                } else {
                    rightContent += '<li class="paginate_button previous" aria-controls="dt_basic" tabindex="0" id="dt_basic_previous"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + (currentPageIndex - 1) + ')">Trang trước</a></li>';
                    rightContent += '<li class="paginate_button previous" aria-controls="dt_basic" tabindex="0" id="dt_basic_previous"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + 1 + ')">1</a></li>';
                    rightContent += '<li class="paginate_button disabled" aria-controls="dt_basic" tabindex="0" id="dt_basic_ellipsis"><a href="javascript:void(0)">…</a></li>';
                    for (var index = (totalPages - 4); index <= totalPages; index++) {
                        if (index === currentPageIndex) {
                            rightContent += '<li class="paginate_button active" aria-controls="dt_basic" tabindex="0">';
                        } else {
                            rightContent += '<li class="paginate_button" aria-controls="dt_basic" tabindex="0">';
                        }
                        rightContent += '<a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + index + ')">' + index + '</a>';
                        rightContent += '</li>';
                    }

                    if (currentPageIndex === totalPages) {
                        rightContent += '<li class="paginate_button previous disabled" aria-controls="dt_basic" tabindex="0" id="dt_basic_previous"><a href="javascript:void(0)">Trang tiếp</a></li>';
                    } else {
                        rightContent += '<li class="paginate_button previous" aria-controls="dt_basic" tabindex="0" id="dt_basic_previous"><a href="javascript:void(0)" onclick="CommonGrid.pagingItem(' + (totalPages) + ')">Trang tiếp</a></li>';
                    }
                }
            }
        }
        rightContent += '</ul>';
        rightContent += '</div>';
        rightContent += '</div>';
        //end right content

        pagingHtml += (leftContent + rightContent);
        pagingHtml += "</div>";
        $('#' + CommonGrid.pagerId).html(pagingHtml);
        if ($('#' + CommonGrid.titleId).length > 0) {
            CommonGrid.settingTableTitle();
        }
    },
    pagingItem: function (index) {
        CommonGrid.searchParam = {
            ...CommonGrid.searchParam,
            pageIndex: index,
        }
        CommonGrid.pageIndex = index;
        CommonGrid.buildGrid();
    }, reloadGrid: function () {
        CommonGrid.buildGrid();
        if ($('#' + CommonGrid.titleId).length > 0) {
            $('#' + CommonGrid.titleId).text(CommonGrid.title + ' (' + CommonGrid.total + ')')
        }
    }, onFastSearch(event) {
        if (event.which == 13) {
            CommonGrid.searchParam = {
                ...CommonGrid.searchParam,
                isFastSearch: true,
                fastSearchQuery: $(event.currentTarget).val().trim(),
                pageIndex: 1,
            }
            CommonGrid.pageIndex = 1;
            CommonGrid.buildGrid();
        }
    }, settingTableTitle: function () {
        $('#' + CommonGrid.titleId).text(CommonGrid.title + ' (' + CommonGrid.total + ')');
    }
}

function escapeHTML(str) {
    var htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    };
    // Regex containing the keys listed immediately above.
    var htmlEscaper = /[&<>"'\/]/g;
    return ('' + str).replace(htmlEscaper, function (match) {
        return htmlEscapes[match];
    });
}

/*
 * @author:duynn
 * @since: 19/03/2021
 */
function fillDataToDropdownList(data, id, hasDefaultLabel) {
    var $element = $('#' + id);
    if (data && $element.length > 0 && $element.prop('tagName').toLowerCase() === 'select') {
        var html = '';
        var count = data.length;
        if (hasDefaultLabel) {
            html += '<option value="">--- Chọn ---</option>';
        }
        for (var i = 0; i < count; i++) {
            html += '<option value="' + data[i].Value + '">' + data[i].Text + '</option>';
        }
        $element.html(html);
        if ($.fn.select2) {
            //kiểm tra tồn tại plugin select2
            $('select#' + id).select2();
        }
    }
}

function clearDataDropdownList(ids) {
    if (ids && ids.length > 0) {
        for (var i = 0; i < ids.length; i++) {
            var element = $('#' + ids[i]);
            if (element && element.length && element.prop('tagName').toLowerCase() == 'select') {
                html = '<option value="">--- Chọn ---</option>';
                element.html(html);
            }

            if ($.fn.select2) {
                $('select#' + ids[i]).select2();
            }
        }
    }
}
