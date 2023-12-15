function DefineCssPageList() {
    $(".pagination>li:first>a").attr("href", "javascript:GetDataPage(1)");
    $(".pagination>li>a").click(function () {
        $(".pagination>li").removeClass("active");
        $(this).parent().addClass("active");
    })
}
//Nếu giá trị là null thì để trống
function getValueDisplay(obj) {
    if (obj == null) {

        return "";

    } else {
        return obj;

    }
}




function ToDate(obj) {
    if (obj == null) {
        return "";
    } else {

        if (obj.indexOf('Date') >= 0) {
            var dateint = parseInt(obj.match(/\d+/)[0]);
            console.log(dateint);
            obj = new Date(dateint);
        } else {
            obj = new Date(obj);
        }
        var mon = '';
        if ((obj.getMonth() + 1) < 10) {
            mon = "0" + (obj.getMonth() + 1);
        } else {
            mon = (obj.getMonth() + 1);
        }
        var day = "";
        if (obj.getDate() < 10) {
            day = '0' + obj.getDate();
        } else {
            day = obj.getDate();
        }
        var date_string = day + "/" + mon + "/" + obj.getFullYear();
        return date_string;

    }
}


function ToDateTime(obj) {
    if (obj == null) {
        return "";
    } else {

        if (obj.indexOf('Date') >= 0) {
            var dateint = parseInt(obj.match(/\d+/)[0]);
            obj = new Date(dateint);
        } else {
            obj = new Date(obj);
        }
        var mon = '';
        if ((obj.getMonth() + 1) < 10) {
            mon = "0" + (obj.getMonth() + 1);
        } else {
            mon = (obj.getMonth() + 1);
        }
        var day = "";
        if (obj.getDate() < 10) {
            day = '0' + obj.getDate();
        } else {
            day = obj.getDate();
        }

        var hour = obj.getHours();
        if (hour < 10) {
            hour = "0" + hour;
        }
        var minute = obj.getMinutes()
        if (minute < 10) {
            minute = "0" + minute;
        }
        var date_string = day + "/" + mon + "/" + obj.getFullYear() + " " + hour + ":" + minute;
        return date_string;

    }
}

var hinet_baseConfig = [];

var hinet_baseElement;
(function ($) {
    $.fn.hinetTable = function (type, options) {
        hinet_baseElement = $(this);

        switch (type) {
            case "init":
                initHinetTable(options);
                break;
            case "data":
                updateHinetTable(options);
                break;
            case "GetSelectedRow":
                return GetSelectedRowHinetTable();
                break;
            case "GetByPrimarykey":
                return GetObjectRowIdHinetTable(options);
                break;
            case "UnSelectRowById":
                return UnSelectRowByIdHinetTable(options);
                break;
            case "reload":
                reloadHinetTable(options);
                break;
        }
    };


    var initHinetTable = function (options) {

        // Default options
        var settings = $.extend({
            currentPage: 1,
            pageSizeList: { size: [10, 20, 50, -1], label: ['10', '20', '50', 'Tất cả'] },
            showSizePage: true,
            showCheckBox: false,
            pageSize: 20,
            pagecount: 1,
            recordCount: 0,
            actionToolBar: '',
            getData: function () { },
            listItem: [],
            config: [],
            primaryKey: "Id"
        }, options);


        hinet_baseConfig[hinet_baseElement.selector] = settings;

        /*
        var itemConf = {
            isSort: true,
            nameModel: '',
            content: function (data) {

            }
        }
        */

        //html số lượng bản ghi trên trang
        var strHeader = '<div class="table-tool-bar">';
        if (settings.showCheckBox) {
            strHeader += ' <div class=\"checkbox hinetCheckbox checkboxAll \" ><label><input name=\"form-field-checkbox\" type=\"checkbox\" onclick=\"checkBoxAllFunc($(this))\" class=\"ace\" /><span class=\"lbl\"></span></label></div>';
        }
        strHeader += '<div class="table-tool-bar-action">' + settings.actionToolBar + '</div >';

        strHeader += '<div class="table-config-bar">';
        strHeader += '<strong class="red hntbl-counter" >' + getLabelInfoAmountRecord(settings.currentPage, settings.pageSize, settings.listItem.length, settings.recordCount) + '</strong>';
        strHeader += '<div class="displayInline"><a  title="Trang trước" href="javascript:void(0)" class="btn btn-link" data-nav-type="prev"><i class="fa fa-chevron-left"></i></a><a href="javascript:void(0)" title="Trang sau" class="btn btn-link" data-nav-type="next"><i class="fa fa-chevron-right"></i></a></div>';

        if (settings.showSizePage) {

            strHeader += '<select style="" class="displayInline hntbl-page-size">';
            for (var page = 0; page < settings.pageSizeList.size.length; page++) {
                var checkedText = '';
                if (settings.pageSizeList.size[page] == settings.pageSize) {
                    checkedText = ' selected ';
                }
                strHeader += '<option value="' + settings.pageSizeList.size[page] + '" ' + checkedText + ' >' + settings.pageSizeList.label[page] + '</option>';
            }
            strHeader += '</select>';

        }
        strHeader += '</div>';
        strHeader += '</div>';

        var navigator = '<div style="width:100%">';
        navigator += '<div style="text-align:center;">';
        navigator += '<ul class="pagination pagination-sm navigator hntbl-navigator" style="margin:0px"></ul>';
        navigator += '</div>';
        navigator += '</div>';

        var isTopBar = hinet_baseElement.find("strong.hntbl-counter");

        if (isTopBar.length == 0) {
            hinet_baseElement.prepend(strHeader);
        }
        var isfootbar = hinet_baseElement.find("ul.hntbl-navigator");
        if (isfootbar.length == 0) {

            hinet_baseElement.append(navigator);
        }
        //end

        //gen phân trang
        DefineCssPageList();
        var elementpage = hinet_baseElement.find("ul.navigator");

        GenPaging(1, settings.pagecount, hinet_baseElement.selector);
        //end

        //data generate 
        if (settings.config.length > 0) {
            for (var i = 0; i < settings.config.length; i++) {
                if (settings.config[i].isSort == true) {
                    hinet_baseElement.find(" table.hinet-table thead tr th").eq(i).addClass("isSort");
                }
                if (settings.config[i].nameModel != '') {
                    hinet_baseElement.find(" table.hinet-table thead tr th").eq(i).attr("data-model", settings.config[i].nameModel);
                }
            }
            //fill data
            var strRoot = "";
            var countrow = settings.listItem.length;

            if (settings.pageSize != -1) {
                countrow = settings.listItem.length < settings.pageSize ? settings.listItem.length : settings.pageSize;
            }
            for (var item = 0; item < countrow; item++) {
                var data = settings.listItem[item];
                var strContent = "<tr>"
                if (settings.showCheckBox) {
                    strContent += "<td class=\"width30 cb-slide\"><div class=\"checkbox hinetCheckbox\" ><label><input data-primarykey=\"" + data[settings.primaryKey] + "\" type=\"checkbox\" class=\"ace chkRow\" onclick=\"checkBoxItemFunc($(this))\" /><span class=\"lbl\"></span></label></div></td>";
                }
                for (var col = 0; col < settings.config.length; col++) {

                    var tdclass = settings.config[col].tdClass != null ? settings.config[col].tdClass : "";
                    if (settings.config[col].isCounter == true) {
                        var stt = item + 1;
                        strContent += "<td class='" + tdclass + "'>" + stt + "</td>";
                    } else {
                        if (settings.config[col].content && typeof (settings.config[col].content) === 'function') {
                            var datacolum = settings.config[col].content(data);
                            var strDatacolum = datacolum != null ? datacolum + "" : "";
                            strContent += "<td class='" + tdclass + "'>" + strDatacolum.replace("<script", "&lt;script").replace("/script>", "/script&gt;") + "</td>";
                        }
                    }

                }
                strContent += "</tr>";
                strRoot += strContent;
            }
            if (countrow == 0) {
                var strContent = '<tr><td colspan="' + (settings.config.length + 1) + '" class="noData">Không có dữ liệu</td></tr>';
                strRoot += strContent;
            }
            hinet_baseElement.find("table.hinet-table tbody").html(strRoot);
            if (settings.pagecount == 1 || settings.currentPage == settings.pagecount) {
                hinet_baseElement.find("a[data-nav-type=next]").attr("disabled", true);
            } else {
                hinet_baseElement.find("a[data-nav-type=next]").attr("disabled", false);
            }
            if (settings.currentPage == 1) {
                hinet_baseElement.find("a[data-nav-type=prev]").attr("disabled", true);
            } else {
                hinet_baseElement.find("a[data-nav-type=prev]").attr("disabled", false);
            }
            if (settings.recordCount == 0) {
                hinet_baseElement.find("a[data-nav-type=next]").attr("disabled", true);
                hinet_baseElement.find("a[data-nav-type=prev]").attr("disabled", true);
            }
        }


        //set sort
        hinet_baseElement.find(" table.hinet-table thead tr th.isSort").each(function () {
            $(this).addClass("sort-none");
            $(this).attr("data-sort", "none");
        })
        var divtable = $(this);
        hinet_baseElement.find(" table.hinet-table thead tr th.isSort").click(function () {
            var trparent = $(this).parent("tr");
            var elementCLick = $(this);
            var sortvalue = elementCLick.attr("data-sort");
            trparent.find("th.isSort").each(function () {
                $(this).removeClass("sort-desc")
                $(this).removeClass("sort-asc")
                $(this).removeClass("sort-none")
                $(this).addClass("sort-none")
                $(this).attr("data-sort", "none");

            })
            elementCLick.attr("data-sort", sortvalue);
            var hinetCover = elementCLick.parents("div.hntbl-cover").first();
            var idDataTable = hinetCover.attr("ID");

            var querySort = "";
            querySort += elementCLick.attr("data-model") + " ";
            switch ($(this).attr("data-sort")) {
                case "none":
                    $(this).removeClass("sort-none");
                    $(this).addClass("sort-desc");
                    $(this).attr("data-sort", "desc");
                    querySort += "desc";
                    break;
                case "desc":
                    $(this).removeClass("sort-none");
                    $(this).removeClass("sort-desc");
                    $(this).addClass("sort-asc");
                    $(this).attr("data-sort", "asc");
                    querySort += "asc";
                    break;
                case "asc":
                    $(this).removeClass("sort-none")
                    $(this).removeClass("sort-asc");
                    $(this).addClass("sort-desc");
                    $(this).attr("data-sort", "desc");
                    querySort += "desc";
                    break;
            }
            var setting = hinet_baseConfig['#' + idDataTable];
            if (setting != null) {
                setting.getData(1, querySort, setting.pageSize);
            }

        })
        hinet_baseElement.find(" select.hntbl-page-size").change(function () {
            var pagesize = $(this).val();
            hinet_baseConfig[hinet_baseElement.selector].pageSize = parseInt(pagesize);
            settings.getData(1, "", pagesize);
        });
        hinet_baseElement.find(" a[data-nav-type=next]").click(function () {

            if (settings.pagecount != 1 && settings.currentPage != settings.pagecount) {
                settings.getData(settings.currentPage + 1, "", settings.pageSize);
            }

        });
        hinet_baseElement.find(" a[data-nav-type=prev]").click(function () {

            if (settings.pagecount != 1) {
                var pagepre = settings.currentPage - 1;
                if (pagepre >= 1) {
                    settings.getData(pagepre, "", settings.pageSize);
                }

            }

        });
        // Apply options
        return settings;

    };




    var updateHinetTable = function (options) {
        var settings = $.extend({
            pageSize: 20,
            pageIndex: 1,
            pagecount: 1,
            recordCount: 0,
            listItem: [],

        }, options);
        //hinet_baseElement.find("strong.hntbl-counter").html(settings.recordCount)
        hinet_baseElement.find("strong.hntbl-counter").html(getLabelInfoAmountRecord(settings.pageIndex, settings.pageSize, settings.listItem.length, settings.recordCount));
        GenPaging(settings.pageIndex, settings.pagecount, hinet_baseElement.selector);
        hinet_baseConfig[hinet_baseElement.selector].currentPage = settings.pageIndex;
        hinet_baseConfig[hinet_baseElement.selector].listItem = settings.listItem;
        if (hinet_baseConfig[hinet_baseElement.selector].config) {

            var config = hinet_baseConfig[hinet_baseElement.selector].config;
            var strRoot = "";
            var countrow = settings.listItem.length;

            if (settings.pageSize != -1) {
                countrow = settings.listItem.length < settings.pageSize ? settings.listItem.length : settings.pageSize;
            }
            for (var item = 0; item < countrow; item++) {
                var data = settings.listItem[item];
                var strContent = "<tr>";
                if (hinet_baseConfig[hinet_baseElement.selector].showCheckBox) {

                    strContent += "<td class=\"width30 cb-slide\"><div class=\"checkbox  hinetCheckbox\" ><label><input data-primarykey=\"" + data[hinet_baseConfig[hinet_baseElement.selector].primaryKey] + "\" type=\"checkbox\" class=\"ace chkRow\" onclick=\"checkBoxItemFunc($(this))\" /><span class=\"lbl\"></span></label></div></td>";
                }
                for (var col = 0; col < config.length; col++) {
                    var tdclass = config[col].tdClass != null ? config[col].tdClass : "";
                    if (config[col].isCounter == true) {
                        var stt = (settings.pageIndex - 1) * settings.pageSize + item + 1;
                        strContent += "<td class='" + tdclass + "'>" + stt + "</td>";
                    } else {
                        if (config[col].content && typeof (config[col].content) === 'function') {
                            var datacolum = config[col].content(data);
                            var strDatacolum = datacolum != null ? datacolum + "" : "";
                            //strContent += "<td class='" + tdclass + "'>" + strDatacolum + "</td>";
                            strContent += "<td class='" + tdclass + "'>" + strDatacolum?.replace("<script", "&lt;script").replace("/script>", "/script&gt;") + "</td>";
                        }
                    }
                }
                strContent += "</tr>";
                strRoot += strContent;
            }
            if (countrow == 0) {
                var strContent = '<tr><td colspan="' + (config.length + 1) + '" class="noData">Không có dữ liệu</td></tr>';
                strRoot += strContent;
            }
            hinet_baseElement.find("table.hinet-table tbody").html(strRoot);
            if (settings.pagecount == 1 || settings.pageIndex == settings.pagecount) {
                hinet_baseElement.find("a[data-nav-type=next]").attr("disabled", true);
            } else {
                hinet_baseElement.find("a[data-nav-type=next]").attr("disabled", false);
            }
            if (settings.pageIndex == 1) {
                hinet_baseElement.find("a[data-nav-type=prev]").attr("disabled", true);
            } else {
                hinet_baseElement.find("a[data-nav-type=prev]").attr("disabled", false);
            }

            if (settings.recordCount == 0) {
                hinet_baseElement.find("a[data-nav-type=next]").attr("disabled", true);
                hinet_baseElement.find("a[data-nav-type=prev]").attr("disabled", true);
            }
        }
    }

    //init hinet table function


    //reload table
    var reloadHinetTable = function (options) {
        var callback;
        var isfunction = options && options.callback && typeof (options.callback) == "function";
        if (!isfunction) {
            callback = function () {
                console.log("Chưa cài đặt sự kiện thành công");
            }
        } else {
            callback = options.callback;
        }
        var settings = hinet_baseConfig[hinet_baseElement.selector];
        if (settings != null) {
            settings.getData(settings.currentPage, "", settings.pageSize, options?.callback);
        }

    }

    //Get All Primarykey selected hinet table
    var GetSelectedRowHinetTable = function () {
        var arrSelected = [];
        var settings = hinet_baseConfig[hinet_baseElement.selector];
        if (settings != null) {
            var eRootTable = $(hinet_baseElement.selector);

            eRootTable.find(".hinetCheckbox input:checkbox.chkRow").each(function () {
                var currentElement = $(this);
                if (currentElement.prop("checked")) {
                    var valueSelect = currentElement.attr("data-primarykey");
                    if (!isNaN(valueSelect)) {
                        arrSelected.push(valueSelect);
                    }
                }
            })
        }
        return arrSelected;
    }

    var GetObjectRowIdHinetTable = function (options) {
        // Default options
        var returnData;
        var settingObj = $.extend({
            id: 1
        }, options);
        var settings = hinet_baseConfig[hinet_baseElement.selector];
        for (var i = 0; i < settings.listItem.length; i++) {
            var objData = settings.listItem[i];
            var itemId = objData[settings.primaryKey];
            if (itemId == settingObj.id) {
                returnData = objData;
                break;
            }
        }
        return returnData;
    }
    var UnSelectRowByIdHinetTable = function (options) {
        // Default options

        var returnData;
        var settingObj = $.extend({
            ids: []
        }, options);
        var settings = hinet_baseConfig[hinet_baseElement.selector];
        if (settingObj.ids) {
            for (var i = 0; i < settingObj.ids.length; i++) {
                var objDataId = settingObj.ids[i];
                $(hinet_baseElement.selector).find(".hinetCheckbox input:checkbox.chkRow").each(function () {
                    var checkBoxElement = $(this);
                    if (checkBoxElement.prop("checked") && parseInt(checkBoxElement.attr("data-primarykey")) == objDataId) {
                        checkBoxElement.prop("checked", false);
                    }
                })
            }
        }
        CheckboxAllLogic($(hinet_baseElement));
        return returnData;
    }
}(jQuery));

function checkBoxAllFunc(e) {
    if (e.prop("checked")) {
        e.parents(".hntbl-cover").find(".hinetCheckbox input:checkbox.chkRow").each(function () {
            $(this).prop("checked", true);
        })
        //fixed col checkbox 
        e.parents(".hntbl-cover").find(".clone").find(".hinetCheckbox input:checkbox.chkRow").each(function () {
            $(this).prop("checked", false);
        })
    } else {
        e.parents(".hntbl-cover").find(".hinetCheckbox input:checkbox.chkRow").each(function () {
            $(this).prop("checked", false);
        })
        //fixed col checkbox 
        e.parents(".hntbl-cover").find(".clone").find(".hinetCheckbox input:checkbox.chkRow").each(function () {
            $(this).prop("checked", false);
        })
    }
}

function CheckboxAllLogic(e) {

    var isNotCheck = true;
    e.find(".hinetCheckbox input:checkbox.chkRow").each(function () {
        if ($(this).prop("checked")) {
            e.find(".checkboxAll input:checkbox").prop("checked", true);
            isNotCheck = false;

            return;
        }
    })
    if (isNotCheck) {
        e.find(".checkboxAll input:checkbox").prop("checked", false);
    }
}
function checkBoxItemFunc(e) {
    var eRootTable = e.parents(".hntbl-cover");
    var isNotCheck = true;
    eRootTable.find(".hinetCheckbox input:checkbox.chkRow").each(function () {
        if ($(this).prop("checked")) {
            eRootTable.find(".checkboxAll input:checkbox").prop("checked", true);
            isNotCheck = false;

            return;
        }
    })
    if (isNotCheck) {
        eRootTable.find(".checkboxAll input:checkbox").prop("checked", false);
    }


}

function ActionPaging(id, total, updateID) {
    var config = hinet_baseConfig[updateID];
    if (id <= 0) {
        id = 1;
    }
    config.getData(id, "", config.pageSize);
    GenPaging(id, total, updateID);
}

function getLabelInfoAmountRecord(indexPageTable, pageSizeTable, rowCountCurrent, total) {
    if (total > 0) {
        var fromRow = (indexPageTable - 1) * pageSizeTable + 1;
        var toRow = fromRow + rowCountCurrent - 1;
        return fromRow + " - " + toRow + " trong tổng số " + total;
    } else {
        return "Không có bản ghi nào";
    }



}

function GenPaging(index, total, targetID) {
    var strPage = "";
    strPage += '<li><a href="javascript:ActionPaging(' + 1 + ',' + total + ',\'' + targetID + '\');" title="Trang trước">«</a></li>';
    if (index > 3) {
        strPage += '<li class="disabled"><a href="javascript:void(0);">...</a></li>';
    }
    for (var i = -3; i <= 3; i++) {
        var page = i + index;
        if (i == 0) {
            strPage += '<li class="active"><a href="javascript:void(0)">' + page + '</a></li>';
        } else {
            if (page > 0 && page <= total) {
                strPage += '<li><a href="javascript:ActionPaging(' + page + ',' + total + ',\'' + targetID + '\');">' + page + '</a></li>';
            }

        }
    }
    if (index + 3 < total) {
        strPage += '<li class="disabled"><a href="javascript:void(0);">...</a></li>';
    }
    strPage += '<li><a href="javascript:ActionPaging(' + total + ',' + total + ',\'' + targetID + '\');" title="Trang sau">»</a></li>';


    $(targetID + " ul.navigator").html(strPage);

}

function ToStrong(str) {
    return '<strong>' + str + '</strong>';
}
//Hiển thị message thay thế trong trường hợp dữ liệu và null hoặc rỗng
function ShowMessageIfEmpty(data, isMessage) {
    if (data == null || data == '') {
        var message = "<span style='color:#e67e22'>Chưa cập nhật</span>";
        if (isMessage) {
            message = "<span style='color:#e67e22'>" + isMessage + "</span>";
        }
        return message;
    }
    return data;
}