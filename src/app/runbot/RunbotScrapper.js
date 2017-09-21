import _ from 'underscore'
import appData from '../data/AppData.js'

var fetchData = function(branch,branchName,successCallback,errorCallBack) {
    var url = branch.url + "?search=" + branchName;
    ajexRequest(url,(htmlData)=>{
        var data = extractData(htmlData,{branchName,branch,url});
        if(data) {
          data = Object.assign(data,{
            autoRefresh: false,
            refreshInterval: 0,
          });
          fetchLogData(data,successCallback)
        } else {
          errorCallBack('Branch Not Found')
        }
    },errorCallBack)
};

var extractData = function(htmlData,option) {
  var tr = $(htmlData).find('.table tr');
  if (tr.length === 1) {
    return false;
  } else if(tr.length === 2) {
    var td = tr.eq(1).find('td');
    return extractDataFromRow(td,option);
  } else {
    var td = "";
    _.each(tr,function(t){
      var branchName = $(t).find('td').eq(0).find('b').html();
      if(branchName === option.branchName) {
        td = $(t).find('td');
      }
    });
    if(td === "") {
      return false;
    }
    return extractDataFromRow(td,option);
  }
};

var extractDataFromRow = function(td,option) {
  var data = {};
  _.each(td, function(t, index) {
    t = $(t);
    if (index === 0) {
      data['key'] = option.branch.key+"+"+option.branchName;
      data['branchName'] = t.find('b').html();
      data['branchType'] = option.branch.key;
      data['branchUrl'] = option.url;
      data['gitBranchURL'] = t.find('a').eq(0).attr('href');
      data['branches'] = [];
    } else {
      var btns = t.find('.btn-group');
      data['gitCompareURL'] = !data['gitCompareURL'] && data['gitCompareURL'] !== '#' ? btns.find("a:contains('Compare')").attr('href') : data['gitCompareURL'];
      data['branches'].push({
        order: index,
        statusString: t.attr('class') !== "default" ? appData.status[t.attr('class')].string : appData.status[t.attr('class')].string[t.find('>i').attr("class").split(' ')[2]],
        status: t.attr('class'),
        runbotLink: btns.find('a.btn.btn-primary .fa-sign-in').parent().attr('href') || "#",
        logURL: appData.runbotURL + btns.find("a:contains('Logs')").attr('href'),
        commitURL: btns.find("a:contains('Commit')").attr('href'),
        logs: {
          error: 0,
          warning: 0
        }
      });
    }
  });
  return data;
}

var fetchLogData = function functionName(data,successCallback) {
  Promise.all(data.branches.map(b => fetch(b.logURL)))
  .then(resp => Promise.all( resp.map(r => r.text()) ))
  .then(result => {
      _.each(result,function(r,index) {
          var count = countLog(r);
          data.branches[index].logs.error = count.data_list.error.count;
          data.branches[index].logs.warning = count.data_list.warning.count;
      });
      successCallback(data);
  });
}

var countLog = function(htmlData) {
  var data_list = {
  error: {
    name: 'danger',
    string: "Errors",
  },
  warning : {
    name: 'warning',
    string: "Warnings"
  }};

  var dataCount = 0;
  _.each(data_list, function(data) {
      _.extend(data, {
        count: 0,
      });
      var result = $(htmlData).find('.table-striped tr[class="' + data.name + '"]');
      data.count = result.length;
  });
  return {data_list : data_list};
}

var retriveLogElement = function(link,type,successCallback) {
  ajexRequest(link,(htmlData)=>{
      successCallback($(htmlData).find('.table-striped tr[class="' + type + '"]'));
  })
}

var ajexRequest = function(branchUrl, successCallback, errorCallBack) {
  $.ajax({
    type: "GET",
    url: branchUrl,
    success: function(data) {
      successCallback(data);
    },
    error: function(jqXHR, exception) {
      var msg = '';
      if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }
      errorCallBack(msg);
    },
    });
}

module.exports = {
  fetchData,
  retriveLogElement
}
