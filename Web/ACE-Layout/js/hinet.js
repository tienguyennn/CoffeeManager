function WaitingLoad_Start() {
    waitingDialog.show('Đang xử lý...', {

        // if the option is set to boolean false, it will hide the header and "message" will be set in a paragraph above the progress bar.
        // When headerText is a not-empty string, "message" becomes a content above the progress bar and headerText string will be set as a text inside the H3;
        headerText: '',

        // this will generate a heading corresponding to the size number
        headerSize: 3,

        // extra class(es) for the header tag
        headerClass: '',

        // bootstrap postfix for dialog size, e.g. "sm", "m"
        dialogSize: 'sm',

        // bootstrap postfix for progress bar type, e.g. "success", "warning";
        progressType: 'success',

        // determines the tag of the content element
        contentElement: 'p',

        // extra class(es) for the content tag
        contentClass: 'content'

    });

}
function WaitingLoad_End() {
    waitingDialog.hide();
}
function NotiSuccess(message) {
    notif({
        type: 'success',
        position: 'bottom',
        msg: message,
        timeout: 5000
    });
}
function NotiWarning(message) {
    notif({
        type: 'warning',
        position: 'bottom',
        msg: message,
        timeout: 5000
    });
}
function NotiError(message) {

    notif({
        type: 'error',
        position: 'bottom',
        msg: message,
        timeout: 5000
    });
}
