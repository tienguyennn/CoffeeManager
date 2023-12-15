
CeateScript('https://code.jquery.com/jquery-2.1.4.min.js', main)

var guid = document.currentScript.getAttribute('guid');
var idChart = document.currentScript.getAttribute('id-chart');
if (!idChart || idChart == "")
    idChart = "hinet-chart";


var src = document.currentScript.getAttribute('src');
console.log(src);

var host = src.replace("/Content/HinetChart/hinet-chart.js", "");
var url = src.replace("/Content/HinetChart/hinet-chart.js", "/api/ShareData/GetDataChart");
var urlLibAmchart = src.replace("hinet-chart.js", "lib-amchart-3-all.js");
var urlCss = src.replace("hinet-chart.js", "css/style-all.css");
var urlImage = src.replace("hinet-chart.js", "images");

//<div class="logo-ttx" style="background-image:url(${urlImage}/customs/TTXVN.png);position: absolute;top: 10px;left: 10px;width: 160px; height: 40px;background-size: 160px 40px;"></div>

function main() {
    var strDivChart = `
                        <div id=${idChart}-chart style="height:100%;width:100%;margin-top:40px;"></div>`
    $('#' + idChart).html(strDivChart).promise().done(() => {

    });

    waitForElementToDisplay("#" + idChart + "-chart", () => {
        $.ajax(
            {
                url: url,
                type: "GET",
                data: { "guid": guid },
                success: function (response) {
                    console.log(response);
                    var dataJson = response.DataChart;
                    if (dataJson && dataJson != "") {
                        var dataChart = JSON.parse(dataJson);
                        CeateScript(urlLibAmchart, () => LoadChart(dataChart))
                        CreateCss(urlCss, () => { console.log("created style") });
                    }

                },
                error: function (e) {
                    console.log(e);
                }
            });

    }, 100, 10000)


}


function LoadChart(dataChart) {

    console.log(dataChart)
    dataChart.path = host + "/Content/HinetChart/";
    var chart = AmCharts.makeChart(`${idChart}-chart`,
        dataChart
    );

    setTimeout(() => {
        $("#" + idChart/* + "-chart"*/ + " a:first").hide();
    }, 1000);

    setTimeout(() => {
        $("#" + idChart +/* "-chart"*/ + " a: first").hide();
    }, 30000);




    //href = "amcharts/images/dragIconRoundBig.svg"

}


function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
    var startTimeInMs = Date.now();
    (function loopSearch() {
        if ($(selector).length > 0) {
            callback();
            return;
        }
        else {
            setTimeout(function () {
                if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
                    return;
                loopSearch();
            }, checkFrequencyInMs);
        }
    })();
}




function CeateScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.onload = function () {
        callback();
    };
    //var myScript = document.getElementById('hinet-chart-script');
    var head = document.getElementsByTagName("head")[0]
    head.insertBefore(script, head.firstChild);

    return script;
}


function CeateScripts(arrSrc, index, callback) {
    if (index < arrSrc.length) {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement('script');
        script.src = arrSrc[index];
        script.id = "script" + index;
        script.type = 'text/javascript';
        head.insertBefore(script, head.firstChild);
        script.onload = function () {
            CeateScripts(arrSrc, index + 1, callback);
        };
    }
    else {
        try {
            callback()

        } catch (error) {
            setTimeout(() => {
                try {
                    callback();
                } catch (error1) {
                    setTimeout(() => {
                        try {
                            callback();
                        } catch (error2) { }
                    }, 2000);
                }
            }, 500);
        }
    }
}


function CreateCss(src, callback) {
    var style = document.createElement('link');
    style.href = src;
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.onload = function () {
        callback();
    };
    //var myScript = document.getElementById('hinet-chart-script');
    var head = document.getElementsByTagName("head")[0]
    head.insertBefore(style, head.firstChild);

    return style;
}