var AppNotification = function(message) {
  Materialize.toast(message, 3000, 'rounded');
}

var ChromeNotification = function(option) {
  var opt = {
    type: "basic",
    title: option.tital,
    message: option.message,
    iconUrl: "/image/odoo-icon.png"
  }
  if(chrome.notifications) {
    chrome.notifications.create(option.id, opt);
  }
}
module.exports = {
  AppNotification,
  ChromeNotification
}
