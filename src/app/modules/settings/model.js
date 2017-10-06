// Base
import Model from '../base/model/model.js'


class SettingModel extends Model {
  set (data,store,resolver) {
    var self = this;
    var newDatas = [...store[this.key],data][0];
    this.chromeAPI.set(this.key,newDatas).then(function(){
      resolver(data)
    },function() {
      resolver(data)
    });
  }
}

export default SettingModel;
