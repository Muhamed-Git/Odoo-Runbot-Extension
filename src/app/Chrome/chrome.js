import demoData from '../data/DemoData.js';
import _ from 'underscore'

class ChromeAPI {
  constructor() {
      this.storage = chrome.storage ? chrome.storage.local : undefined;
      this.history = chrome.history;
      this.bookmarks = chrome.bookmarks;
  }

  set (key,value) {
    var self = this;
    return new Promise( (resolve,reject) => {
      if (self.storage) {
        var temp = {};
        temp[key] = value;
        self.storage.set(temp, function () {
          resolve(value);
        });
      } else {
        reject({
          key,
          message: "Chrome Storage Not Found",
          value,
        });
      }
    });
  }

  get (key) {
    var self= this;
    return new Promise( (resolve, reject) => {
      if (self.storage) {
        self.storage.get(key, function (data) {
          resolve(data);
        });
      } else {
        reject({
          key,
          message: "Chrome Storage Not Found",
          data: {},
        });
      }
    });
  }

  update (key,value) {
    return this.set(key,value);
  }

  remove (key) {
    return new Promise( (resolve, reject) => {
      if (self.storage) {
        self.storage.remove(key, function () {
          resolve();
        });
      } else {
        reject({
          key,
          message: "Chrome Storage Not Found",
        });
      }
    });
  }

  getHistory (options) {
    var self = this;
    return new Promise( (resolve,reject) => {
      if (this.history) {
        this.history.search(options, function (data) {
          resolve(data);
        });
      } else {
        // reject({
        //   message: "Chrome History API Not Found",
        // });
        resolve(demoData.history);
      }
    });
  }

  getHistoryGroups (options) {
    var self = this;
    return new Promise( (resolve,reject) => {
        self.getHistory(options).then(function(data) {
            resolve(self._extractHistoryGroups(data));
        },function(error) {
            reject(error);
        })
    });
  }

  getBookmarks () {
    var self = this;
    return new Promise( (resolve,reject) => {
      if (this.bookmarks) {
        this.bookmarks.getTree(function (data) {
          resolve(data);
        });
      } else {
        reject({
          message: "Chrome Bookmarks API Not Found",
        });
      }
    });
  }

  setBookmarks(data) {

  }

  _extractHistoryGroups(historys) {
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
  }

}


export default ChromeAPI;
