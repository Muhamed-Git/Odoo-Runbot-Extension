import ChromeAPI from '../Chrome/chrome.js'
import _ from 'underscore'

class Model {
  constructor(key,store) {
      this.key = key;
      this.chromeAPI = new ChromeAPI();
  }

  set (data,store,resolver) {
    let newDatas = [...store[this.key],data];
    let temp = {};
    _.each(newDatas,function(newData) {
        temp[newData.key] = newData;
    });
    this.chromeAPI.set(this.key,temp).then(function(){
      resolver(data)
    },function() {
      resolver(data)
    });
  }

  get (key,resolver) {
    this.chromeAPI.get(this.key).then(function(){
      resolver(data[key])
    },function() {
      resolver({})
    });
  }

  update (data,store,resolver) {
    this.set(data,store,resolver);
  }

  delete (data,store,resolver) {
    let newDatas = store[this.key].filter((d) => {
      return d.key != data.key;
    });
    let temp = {};
    _.each(newDatas,function(newData) {
        temp[newData.key] = newData;
    });
    this.chromeAPI.set(this.key,temp).then(function(){
      resolver(data)
    },function() {
      resolver(data)
    });
  }

  getAll (resolver) {
    this.chromeAPI.get(this.key === "null" ? null : this.key).then(function(data){
      resolver(data)
    },function() {
      resolver(data)
    });
  }
}

export default Model;
