var moduleTableSelector = $("#tbl-BuocXuLy");
var totalPage = document.getElementById('hidden--totalPage').value;
var totalRecord = document.getElementById('hidden--totalRecord').value;
var idLuongXuLy = document.getElementById('hidden--luongxuly').value;

function pagefunction() {
    var config = [
        {
            tdClass: "center width50 fixed-side",
            isSort: false,
            nameModel: "",
            isCounter: true,
            content: function (data) {
                return "<input type='checkbox' />";
            }
        },

        {
            isSort: false,
            nameModel: "",
            tdClass: "center",
            content: function (data) {
                var result = '<div class="btn-group">';
                result += '<button data-toggle="dropdown" class="btn btn-xs btn-primary btn-white dropdown-toggle" aria-expanded="false">Thao tác<i class="ace-icon fa fa-angle-down icon-on-right"></i>';
                result += '</button >';
                result += '<ul class="dropdown-menu">';
                result += "<li><a href='javascript:void(0)' onclick='onEditBuocXuLy(" + data.Id + ")' title='Chỉnh sửa'><i class='glyphicon glyphicon-edit'> </i> Sửa thông tin</a> </li>";
                result += "<li><a href='javascript:void(0)' onclick='DeleteAction(\"/BuocXuLyArea/BuocXuLy/DeleteBuocXuLy/" + data.Id + "\")' title='Xóa'><i class=' glyphicon glyphicon-remove' style='color:red'> </i> Xóa</a></li>";
                result += "</ul></div>";
                return result;
            }
        },
        {
            isSort: true,
            nameModel: 'TenBuocXuLy',
            content: function (data) {
                var html = "<span data-obj-id='" + data.Id + "'>";
                html += data.TenBuocXuLy;
                html += "</span>";
                return html;
            }
        },
        {
            isSort: true,
            nameModel: 'TenTrangThaiBatDau',
            content: function (data) {
                return data.TenTrangThaiBatDau
            }
        },
        {
            isSort: true,
            nameModel: 'IsBuocTraVe',
            content: function (data) {
                if (!data.IsBuocTraVe) {
                    return "<strong class='text-success'><i class='glyphicon glyphicon-arrow-right'></i></strong>";
                } else {
                    return "<strong class='text-danger'><i class='glyphicon glyphicon-arrow-left'></i></strong>";
                }
            }
        },
        {
            isSort: true,
            nameModel: 'TenTrangThaiKetThuc',
            content: function (data) {
                return data.TenTrangThaiKetThuc
            }
        },
    ];


    var getData = function (page, sortQuery, pageSize) {
        $.ajax({
            url: '/BuocXuLyArea/BuocXuLy/GetDataBuocXuLy',
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
function AjaxSearchSuccess(rs) {
    moduleTableSelector.hinetTable("data", {
        pageIndex: 1,
        pagecount: rs.TotalPage,
        recordCount: rs.Count,
        listItem: rs.ListItem,
    });
}

function onEditBuocXuLy(idBuocXuLy) {
    onOpenEditModal('/BuocXuLyArea/BuocXuLy/EditBuocXuLy', { idLuongXuLy: idLuongXuLy, idBuocXuLy: idBuocXuLy }, 'post');
}

//biến global để lưu trữ nội dung biểu đồ
var flowDiagram = null;

function loadDiagram(diagramData) {
    //cấu hình biểu đồ
    if (diagramData) {
        if (flowDiagram && flowDiagram.div) {
            flowDiagram.div = null;
        }
        var graphJS = go.GraphObject.make;  //template của biểu đồ
        flowDiagram =
            graphJS(go.Diagram, "blockDiagram",  // must name or refer to the DIV HTML element
                {
                    // start everything in the middle of the viewport
                    initialContentAlignment: go.Spot.Top,
                    // have mouse wheel events zoom in and out instead of scroll up and down
                    // support double-click in background creating a new node
                    // enable undo & redo
                    allowInsert: false,
                    allowDelete: false,
                    allowLink: false,
                    allowTextEdit: false
                });

        // when the document is modified, add a "*" to the title and enable the "Save" button
        flowDiagram.addDiagramListener("Modified", function (e) {
            var button = document.getElementById("SaveButton");
            if (button) button.disabled = !myDiagram.isModified;
            var idx = document.title.indexOf("*");
            if (flowDiagram.isModified) {
                if (idx < 0) document.title += "*";
            } else {
                if (idx >= 0) document.title = document.title.substr(0, idx);
            }
        });

        // define the Node template
        flowDiagram.nodeTemplate =
            graphJS(go.Node, "Auto",
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                // define the node's outer shape, which will surround the TextBlock
                graphJS(go.Shape, "RoundedRectangle",
                    {
                        parameter1: 20,  // the corner has a large radius
                        fill: graphJS(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),
                        stroke: null,
                        portId: "",  // this Shape is the Node's port, not the whole Node
                        fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer"
                    }),
                graphJS(go.TextBlock,
                    {
                        font: "bold 11pt helvetica, bold arial, sans-serif",
                        editable: true  // editing the text automatically updates the model data
                    },
                    new go.Binding("text").makeTwoWay())
            );

        // unlike the normal selection Adornment, this one includes a Button
        flowDiagram.nodeTemplate.selectionAdornmentTemplate =
            graphJS(go.Adornment, "Spot",
                graphJS(go.Panel, "Auto",
                    graphJS(go.Shape, { fill: null, stroke: "blue", strokeWidth: 2 }),
                    graphJS(go.Placeholder)  // a Placeholder sizes itself to the selected Node
                )
                // the button to create a "next" node, at the top-right corner

            ); // end Adornment

        // clicking the button inserts a new node to the right of the selected node,
        // and adds a link to that new node
        function addNodeAndLink(e, obj) {
            var adornment = obj.part;
            var diagram = e.diagram;
            diagram.startTransaction("Add State");

            // get the node data for which the user clicked the button
            var fromNode = adornment.adornedPart;
            var fromData = fromNode.data;
            // create a new "State" data object, positioned off to the right of the adorned Node
            var toData = { text: "new" };
            var p = fromNode.location.copy();
            p.x += 200;
            toData.loc = go.Point.stringify(p);  // the "loc" property is a string, not a Point object
            // add the new node data to the model
            var model = diagram.model;
            model.addNodeData(toData);

            // create a link data from the old node data to the new node data
            var linkdata = {
                from: model.getKeyForNodeData(fromData),  // or just: fromData.id
                to: model.getKeyForNodeData(toData),
                text: "transition"
            };
            // and add the link data to the model
            model.addLinkData(linkdata);

            // select the new Node
            var newnode = diagram.findNodeForData(toData);
            diagram.select(newnode);

            diagram.commitTransaction("Add State");

            // if the new node is off-screen, scroll the diagram to show the new node
            diagram.scrollToRect(newnode.actualBounds);
        }

        // replace the default Link template in the linkTemplateMap
        flowDiagram.linkTemplate =
            graphJS(go.Link,  // the whole link panel
                {
                    curve: go.Link.Bezier, adjusting: go.Link.Stretch,
                    reshapable: true, relinkableFrom: true, relinkableTo: true,
                    toShortLength: 3
                },
                new go.Binding("points").makeTwoWay(),
                new go.Binding("curviness"),
                graphJS(go.Shape,  // the link shape
                    { strokeWidth: 1.5 }),
                graphJS(go.Shape,  // the arrowhead
                    { toArrow: "standard", stroke: null }),
                graphJS(go.Panel, "Auto",
                    graphJS(go.Shape,  // the label background, which becomes transparent around the edges
                        {
                            fill: graphJS(go.Brush, "Radial",
                                { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" }),
                            stroke: null
                        }),
                    graphJS(go.TextBlock, "transition",  // the label text
                        {
                            textAlign: "center",
                            font: "9pt helvetica, arial, sans-serif",
                            margin: 4,
                            editable: true  // enable in-place editing
                        },
                        // editing the text automatically updates the model data
                        new go.Binding("text").makeTwoWay())
                )
            );

        // read in the JSON data from the "mySavedModel" element
        flowDiagram.model = go.Model.fromJson(diagramData);
    }
}

function onSaveStateLocation() {
    var data = flowDiagram.model.toJson();
    $.ajax({
        url: '/BuocXuLyArea/BuocXuLy/SaveStateLocation',
        type: 'post',
        data: JSON.stringify({ "data": JSON.parse(data) }),
        dataType: 'json',
        contentType: 'application/json',
        success: function (result) {
            if (result.Status) {
                NotiSuccess('Thành công', result.Message);
            } else {
                NotiError('Thất bại', result.Message);
            }
        }
    })
}

function reloadDiagram() {
    var callBack = function (data) {
        loadDiagram(data);
    }
    onCallAjax('/BuocXuLyArea/BuocXuLy/GetDiagramData', { idLuongXuLy: document.getElementById('hidden--luongxuly').value }, 'post', callBack);
}


$(document).ready(function () {
    pagefunction();

    loadDiagram(diagramData);
})