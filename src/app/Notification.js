var AppNotification = function(message) {
  Materialize.toast(message, 3000, 'rounded');
}

var ChromeNotification = function(option) {
  var opt = {
    type: "basic",
    title: option.tital,
    message: option.message,
    iconUrl: "/static/img/odooicon.png"
  }
  if(chrome) {
    chrome.notifications.create(option.id, opt);
  }
}
module.exports = {
  AppNotification
}
