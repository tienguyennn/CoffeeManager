$(document).ready(function() {
    // RateInfo statistical


    // Highcharts.chart("container-statis", {
    //     chart: {
    //         type: "column",
    //     },
    //     title: {
    //         text: "",
    //     },

    //     subtitle: {
    //         text: "",
    //     },
    //     legend: {
    //         align: "right",
    //         verticalAlign: "on",
    //         layout: "horizontal",
    //     },

    //     xAxis: {
    //         categories: ["Hà Nội", "Hải Phòng", "Quảng Ninh", "Nam Định", "Đà Nẵng"],
    //         labels: {
    //             x: -10,
    //         },
    //     },

    //     yAxis: {
    //         allowDecimals: false,
    //         title: {
    //             text: "",
    //         },
    //         tickAmount: 9,
    //     },

    //     series: [{
    //             name: "Chính quyền số",
    //             color: "#0070c0",
    //             data: [400, 400, 370, 350, 360],
    //         },
    //         {
    //             name: "Kinh tế số",
    //             color: "#00b050",
    //             data: [300, 270, 250, 220, 200],
    //         },
    //         {
    //             name: "Xã hội số",
    //             color: "#cfc000",
    //             data: [300, 250, 230, 220, 180],
    //         },
    //     ],

    //     responsive: {
    //         rules: [{
    //             condition: {
    //                 maxWidth: 500,
    //             },
    //             chartOptions: {
    //                 legend: {
    //                     align: "right",
    //                     verticalAlign: "on",
    //                     layout: "horizontal",
    //                 },
    //                 yAxis: {
    //                     labels: {
    //                         align: "left",
    //                         x: 0,
    //                         y: -5,
    //                     },
    //                 },
    //                 credits: {
    //                     enabled: false,
    //                 },
    //             },
    //         }, ],
    //     },
    // });
    //Pie-gradient
    Highcharts.setOptions({
        colors: Highcharts.map(Highcharts.getOptions().colors, function(color) {
            return {
                radialGradient: {
                    cx: 5,
                    cy: 0.3,
                    r: 0.7,
                },
                stops: [
                    [0, color],
                    [1, Highcharts.color(color).brighten(-0.3).get("rgb")], // darken
                ],
            };
        }),
    });

    // Build the chart
    Highcharts.chart("#container-pie", {
        chart: {
            renderTo: "container-pie",
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
        },
        title: {
            text: "",
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                    connectorColor: "silver",
                },
            },
        },
        series: [{
            name: "Share",
            data: [{
                    name: "",
                    y: 30,
                },
                { name: "", y: 15 },
                {
                    name: "",
                    y: 30,
                },
                { name: "", y: 15 },
                {
                    name: "",
                    y: 20,
                },
            ],
        }, ],
    });
    //Chart-3d
    Highcharts.chart("container-3d", {
        chart: {
            type: "pie",
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0,
            },
        },
        title: {
            text: "",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: "{point.name}",
                },
            },
        },
        series: [{
            type: "pie",
            name: "Browser share",
            data: [
                ["", 60.0],
                ["", 15.0],
                {
                    name: "",
                    y: 25.0,
                    sliced: true,
                    selected: true,
                },
            ],
        }, ],
    });
});