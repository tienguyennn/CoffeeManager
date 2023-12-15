(function () {
    const HinetChart = {};
    HinetChart.Create = function (id, config) {

        if (config.type == "BoxCount") {

            var numDecimal = !isNaN(config.numDecimal) ? config.numDecimal : 2;
            var pow = Math.pow(10, numDecimal);
            config.value = Math.round(parseFloat(config.value) * pow) / pow;

            var html = `
              <div class="box-baocao-counter"  style="border-bottom-color:${config.borderColor}; border-bottom-width:${config.borderWidth}px; background-color:${config.backgroundColor}">
                            <div class="counter-content">
                                <div class="counter-label" style="color:${config.textColor}; font-size: ${config.textFontSize}px">
                                   ${config.label}
                                </div>
                                <div class="counter-body">
                                    <div class="counter-value" style="color:${config.color}; font-size: ${config.fontSize}px">
                                       ${config.value}
                                    </div>
                                    <div class="counter-icon" style="color:${config.iconColor}; font-size: ${config.iconFontSize}px">
                                        <i class="${config.classIcon}"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
            `
            $('#' + id).html(html);

            if (config.counter) {
                $(`#${id} .counter-value`).each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: $(this).text()
                    }, {
                        duration: config.timeCounter,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now * pow) / pow)
                        }
                    });
                });
            }

            console.log(config);
        }
        else {
            //if (config.reverseAxis) {
            //    //let category = config.categoryField;
            //    //let valueFields = config.graphs.map(x => x.valueField);

            //    //lstLabel = config.dataProvider.map((y, i) => y[category] + "");
            //    lstDataChange = config.valueFields.map(x => {
            //        let data = {
            //            category: x,
            //        }
            //        config.dataProvider.map((y, i) => {
            //            let a = y[x];
            //            data["category"] = a;
            //        })
            //        return data;
            //    });
            //    //lstLabel.map((x, i) => config.graphs[i].valueField = x);
            //    //config.categoryField = "category";

            //    config.dataProvider = lstDataChange;
            //}

            //console.log(config);




            let hasImage = config.images && config.images?.length > 0 && config.images.some(x => x.enabled == true);
            if (hasImage) {
                config.backgroundImage = "/Uploads/Report/nguyennt.png";
            }

            const chart = AmCharts.makeChart(id,
                config
            );
            if (hasImage) {

                chart.addListener("animationFinished", function () {
                    let imageFirst = $(`#${id} image:first`);
                    const images = config.images;
                    for (let i = 0; i < images.length; i++) {
                        let image = images[i];
                        if (image.enabled == true) {
                            let imageEle = imageFirst.clone();
                            imageEle.attr("xlink:href", image.path);
                            if (image.x != "") imageEle.attr("x", image.x);
                            if (image.y != "") imageEle.attr("y", image.y);
                            if (image.width != "") imageEle.attr("width", image.width);
                            if (image.height != "") imageEle.attr("height", image.height);
                            imageEle.css("opacity", image.alpha);
                            imageEle.css("display", "block");
                            imageFirst.after(imageEle);
                        }

                    }
                    console.log("done");
                });
            }
            return chart;
        }

    }
    window['HinetChart'] = HinetChart;
})();