function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[1] - 1, mdy[0]);
}
$.validator.methods.date = function (value, element) {
    return this.optional(element) || parseDate(value) !== null;
}
$.validator.methods.number = function (value, element) {
    return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/.test(value);
}
$.validator.setDefaults({
    ignore: ""
});
jQuery.extend(jQuery.validator.messages, {
    required: "Vui lòng nhập thông tin này",
    remote: "Vui lòng sửa thông tin này",
    email: "Vui lòng nhập đúng định dạng Email",
    url: "Vui lòng nhập đúng định dạng  URL.",
    date: "Vui lòng nhập đúng định dạng Ngày",
    dateISO: "Vui lòng nhập đúng định dạng Ngày(ISO).",
    number: "Vui lòng nhập đúng định dạng số.",
    digits: "Vui lòng chỉ nhập số",
    creditcard: "Vui lòng nhập đúng số thẻ",
    equalTo: "Vui lòng nhập đúng giá trị.",
    accept: "Vui lòng nhập đúng phần mở rộng",
    maxlength: jQuery.validator.format("Vui lòng nhập ít hơn {0} ký tự."),
    minlength: jQuery.validator.format("Vui lòng nhập ít nhất {0} ký tự."),
    rangelength: jQuery.validator.format("Vui lòng nhập giá trị giữa {0} và {1} ký tự."),
    range: jQuery.validator.format("Vui lòng nhập giá trị từ {0} đến {1}."),
    max: jQuery.validator.format("Vui lòng nhập giá trị nhỏ hơn hoặc bằng {0}."),
    min: jQuery.validator.format("Vui lòng nhập giá trị lớn hơn hoặc bằng {0}.")
});