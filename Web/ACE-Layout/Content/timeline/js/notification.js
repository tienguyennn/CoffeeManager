function sendNotification(msg) {
    try{
        sk_noti.emit('send notification', msg);
    } catch (err) {
        console.log("Node server chưa được bật");
    }
    
}
