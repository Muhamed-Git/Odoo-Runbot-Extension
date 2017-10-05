import _ from 'underscore'

var extractGroups = function(historys) {
    var groups = {};
    var r = /:\/\/(.[^/]+)/;
    _.each(historys,function(history) {
        var url = history.url.match(r)[1];
        url = url.indexOf('www.') === 0 ? url.substring(4) : url;
        if(!groups[url]) {
          groups[url] = [];
        }
        groups[url].push(history);
    });
    return groups;
};

var ChromeAPI = {
  getHistory: function(options,successCallBack) {
    if (chrome.history) {
      chrome.history.search(options, function (data) {
        successCallBack(data);
      });
    }
  },
  getGroups: function (options,successCallBack) {
      this.getHistory(options,(data) => {
          successCallBack(extractGroups(data));
      });
  }
};

export default ChromeAPI;
