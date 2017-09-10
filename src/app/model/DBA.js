import demoData from '../data/DemoData.js'
import _ from 'underscore'

const model = {
  set: (data,resolve) => {
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
  get: (key,store) => {
    var data = store.filter((f)=>f.key===key);
    if(data.length) {
      return data[0];
    }
    return {};
  },
  getAll: (resolve) => {
    if(chrome.storage) {
      chrome.storage.sync.get(null, function(data) {
         if(data) {
           resolve(_.values(data));
         } else {
           resolve([])
         }
      });
    } else {
      resolve(demoData);
    }
  }
}

export default model;
