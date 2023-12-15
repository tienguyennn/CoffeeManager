$(document).ready(function() {
    //Propress 1
    var el = document.getElementById("graph-2"); // get canvas

    var options = {
        percent: el.getAttribute("data-percent") || 25,
        size: el.getAttribute("data-size") || 90,
        lineWidth: el.getAttribute("data-line") || 10,
        rotate: el.getAttribute("data-rotate") || 0,
    };

    var canvas = document.createElement("canvas");
    var span = document.createElement("span");
    span.innerHTML =
        options.percent + `<br/><small class="size-small ">% </small>`;

    if (typeof G_vmlCanvasManager !== "undefined") {
        G_vmlCanvasManager.initElement(canvas);
    }

    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = options.size;

    el.appendChild(span);
    el.appendChild(canvas);

    ctx.translate(options.size / 2, options.size / 2); // change center
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

    //imd = ctx.getImageData(0, 0, 240, 240);
    var radius = (options.size - options.lineWidth) / 2;

    var drawCircle = function(color, lineWidth, percent) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = "round"; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    };

    drawCircle("#efefef", options.lineWidth, 100 / 100);
    drawCircle("#07a398", options.lineWidth, options.percent / 100);
    //Propress 2
    var elTwo = document.getElementById("graph-3"); // get canvas

    var optionsTwo = {
        percent: elTwo.getAttribute("data-percent") || 25,
        size: elTwo.getAttribute("data-size") || 90,
        lineWidth: elTwo.getAttribute("data-line") || 10,
        rotate: elTwo.getAttribute("data-rotate") || 0,
    };

    var canvas = document.createElement("canvas");
    var span = document.createElement("span");
    span.innerHTML =
        optionsTwo.percent + `<br/><small class="size-small ">% </small>`;

    if (typeof G_vmlCanvasManager !== "undefined") {
        G_vmlCanvasManager.initElement(canvas);
    }

    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = optionsTwo.size;

    elTwo.appendChild(span);
    elTwo.appendChild(canvas);

    ctx.translate(optionsTwo.size / 2, optionsTwo.size / 2); // change center
    ctx.rotate((-1 / 2 + optionsTwo.rotate / 180) * Math.PI); // rotate -90 deg

    //imd = ctx.getImageData(0, 0, 240, 240);
    var radius = (optionsTwo.size - optionsTwo.lineWidth) / 2;

    var drawCircle = function(color, lineWidth, percent) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = "round"; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    };

    drawCircle("#efefef", optionsTwo.lineWidth, 100 / 100);
    drawCircle("#90c221", optionsTwo.lineWidth, optionsTwo.percent / 100);

    //Propress 4
    var elTwo = document.getElementById("graph-1"); // get canvas

    var optionsTwo = {
        percent: elTwo.getAttribute("data-percent") || 25,
        size: elTwo.getAttribute("data-size") || 90,
        lineWidth: elTwo.getAttribute("data-line") || 10,
        rotate: elTwo.getAttribute("data-rotate") || 0,
    };

    var canvas = document.createElement("canvas");
    var span = document.createElement("span");
    span.innerHTML =
        optionsTwo.percent + `<br/><small class="size-small ">% </small>`;

    if (typeof G_vmlCanvasManager !== "undefined") {
        G_vmlCanvasManager.initElement(canvas);
    }

    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = optionsTwo.size;

    elTwo.appendChild(span);
    elTwo.appendChild(canvas);

    ctx.translate(optionsTwo.size / 2, optionsTwo.size / 2); // change center
    ctx.rotate((-1 / 2 + optionsTwo.rotate / 180) * Math.PI); // rotate -90 deg

    //imd = ctx.getImageData(0, 0, 240, 240);
    var radius = (optionsTwo.size - optionsTwo.lineWidth) / 2;

    var drawCircle = function (color, lineWidth, percent) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = "round"; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    };

    drawCircle("#efefef", optionsTwo.lineWidth, 100 / 100);
    drawCircle("#0680c3", optionsTwo.lineWidth, optionsTwo.percent / 100);
    //Propress 3
    var elThree = document.getElementById("graph-4"); // get canvas

    var optionsThree = {
        percent: elThree.getAttribute("data-percent") || 25,
        size: elThree.getAttribute("data-size") || 90,
        lineWidth: elThree.getAttribute("data-line") || 10,
        rotate: elThree.getAttribute("data-rotate") || 0,
    };

    var canvas = document.createElement("canvas");
    var span = document.createElement("span");
    span.innerHTML =
        optionsThree.percent + `<br/><small class="size-small ">% </small>`;

    if (typeof G_vmlCanvasManager !== "undefined") {
        G_vmlCanvasManager.initElement(canvas);
    }

    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = optionsThree.size;

    elThree.appendChild(span);
    elThree.appendChild(canvas);

    ctx.translate(optionsThree.size / 2, optionsThree.size / 2); // change center
    ctx.rotate((-1 / 2 + optionsThree.rotate / 180) * Math.PI); // rotate -90 deg

    //imd = ctx.getImageData(0, 0, 240, 240);
    var radius = (optionsThree.size - optionsThree.lineWidth) / 2;

    var drawCircle = function(color, lineWidth, percent) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = "round"; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    };

    drawCircle("#efefef", optionsThree.lineWidth, 100 / 100);
    drawCircle("#fba200", optionsThree.lineWidth, optionsThree.percent / 100);

});