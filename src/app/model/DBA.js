import demoData from '../data/DemoData.js'
import _ from 'underscore'
import AppData from '../data/AppData.js'
import ChromeAPI from '../Chrome/chrome.js'

const model = {
  set: (data,resolve) => {
      if(chrome.storage) {
        var temp = {};
        data = Object.assign(data,{
          autoRefresh: false,
          refreshInterval: AppData.defaultRefreshInterval,
        });
        temp[data.key] = data;
        chrome.storage.sync.set(temp, function() {
            resolve(data);
        });
      } else {
        resolve(data);
      }
  },
  setSettings: (data,resolve) => {
    if(chrome.storage) {
      var temp = {};
      temp['settings'] = data;
      chrome.storage.sync.set(temp, function() {
          resolve(data);
      });
    } else {
      resolve(data);
    }
  },
  get: (key,store) => {
    var data = store.filter((f)=>f.key===key);
    if(data.length) {
      return data[0];
    }
    return {};
  },
  getSettings: (key,store) => {
    var data = store.Settings;
    if(data) {
      return data;
    }
    return {};
  },
  update: (data,resolve) => {
    if(chrome.storage) {
      var temp = {};
      temp[data.key] = data;
      chrome.storage.sync.set(temp, function() {
          resolve(data);
      });
    } else {
      resolve(data);
    }
  },
  delete: (data,resolve) => {
    if(chrome.storage) {
      chrome.storage.sync.remove(data.key, function() {
          resolve(data);
      });
    } else {
      resolve(data);
    }
  },
  getAll: (resolve) => {
    new ChromeAPI().get(null).then(function(data) {
      if(data) {
        resolve(data);
      } else {
        resolve({})
      }
    },function(error) {
      resolve(demoData);
    });
  }
}

export default model;
