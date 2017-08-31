function initComponents() {
  $('#addBranchModel').modal({
    dismissible: true,
    opacity: .5,
    inDuration: 300,
    outDuration: 200,
  });
  $('select').material_select();
  $('#logModel').modal();
}

$(document).ready(function() {
  initComponents();
  this.urls = {
    odoodev: 'http://runbot.odoo.com/runbot/repo/git-github-com-odoo-dev-odoo-2',
    odoocommunity: 'http://runbot.odoo.com/runbot/repo/git-github-com-odoo-odoo-1',
    odooenterprise: 'http://runbot.odoo.com/runbot/repo/git-github-com-odoo-enterprise-7',
    entdev: 'http://runbot.odoo.com/runbot/repo/git-github-com-odoo-dev-enterprise-8',
    runbot: 'http://runbot.odoo.com'
  };

  this.branchTagName = {
    odoodev: 'Odoo Dev',
    odoocommunity: 'Odoo',
    odooenterprise: 'Enterprise',
    entdev: 'Ent Dev',
  };

  this.template = Handlebars.compile($("#entry-template").html());
  this.logTableModel = $('#logModel');
  this.status = {
    success: "Success",
    info: "Testing",
    default: {
      'fa-ban': "Skipped",
      'fa-pause': "Pending"
    },
    warning: "Warning",
    danger: "Error",
    killed: "Killed",
  };

  this.appData = {};

  var self = this;
  $('#addBranchModel .addBranchBtn').on('click', function() {
    $('#addBranchModel .loading').removeClass('hide');
    var branchTag = $('#selectedBranch').val();
    var runbotUrl = $('#addBranchModel #runbotUrl').val();
    var branchName = $('#branchname').val();
    var branchUrl = runbotUrl + "?search=" + branchName;
    var success = function(data) {
      var result = extractData(data, branchTag, branchUrl);
      if (result) {
        model.set(result);
      } else {
        $('#addBranchModel .loading').addClass('hide');
        Materialize.toast('Branch Not Found!!!!!!!', 3000, 'rounded')
      }
    };
    var error = function(message) {
      Materialize.toast(message, 3000, 'rounded');
      $('#addBranchModel .loading').addClass('hide');
    };
    ajexRequest(branchUrl, success, error);
  });

  $('#selectedBranch').on('change', function() {
    var branchTag = $('#selectedBranch').val();
    $('#addBranchModel #runbotUrl').val(self.urls[branchTag]);
  });


  function refreshBranch(event) {
      event.stopPropagation();
      var $target = $(event.currentTarget);
      $target.addClass('fa-spin');
      var key = $target.data('key');
      var success = function(data) {
        var result = extractData(data,"", self.appData[key].branchUrl);
        if (result) {
            result.branchTag = self.appData[key].branchTag;
            result.abstractBranchTag = self.appData[key].abstractBranchTag;
            self.appData[key] = result;
            renderer.reRender(key);
        }
      };
      var error = function(message) {
        Materialize.toast(message, 3000, 'rounded');
      };
      ajexRequest(self.appData[key].branchUrl, success, error);
  }

  function logDetailsClick(event) {
    var $target = $(event.currentTarget);
    var link = $target.data('link');
    var type = $target.data('type');

    var success = function(data) {
        var $tr = retriveLogElement(data,type);
        $('#logTable').empty();
        $('#logTable').attr('class',type);
        $('#logTable').append($tr);
        self.logTableModel.modal('open');
    };

    var error = function() {

    };

    ajexRequest(link,success,error);
  }

  function retriveLogElement(htmldata,type) {
      return $(htmldata).find('.table-striped tr[class="' + type + '"]');
  }

  function extractData(htmlData, branchTag, branchUrl) {
    var tr = $(htmlData).find('.table tr');
    if (tr.length == 1) {
      return false;
    } else {
      var data = {};
      var td = tr.eq(1).find('td');
      _.each(td, function(t, index) {
        t = $(t);
        if (index === 0) {
          data['branchName'] = t.find('b').html();
          data['gitBranch'] = t.find('a').eq(0).attr('href');
          data['branches'] = [];
          data['branchTag'] = self.branchTagName[branchTag];
          data['abstractBranchTag'] = branchTag;
          data['branchUrl'] = branchUrl;
        } else {
          var btns = t.find('.btn-group a');
          var i = btns.eq(0).attr('class') === 'btn btn-primary' ? 0 : -1;
          var ci = btns.eq(0).attr('class') === 'btn btn-primary' ? 11 : 7;
          data['branches'].push({
            order: index,
            status: t.attr('class') !== "default" ? self.status[t.attr('class')] : self.status[t.attr('class')][t.find('>i').attr("class").split(' ')[2]],
            statusClass: t.attr('class'),
            runbotLink: btns.eq(i++).attr('href'),
            log: self.urls.runbot + btns.eq(i++).attr('href'),
            commit: btns.eq(i++).attr('href'),
            compare: btns.eq(ci).attr('href'),
            error: 0,
            warning: 0,
          });
        }
      });
      return data;
    }
  }

  function countLog(htmlData) {
    var data_list = {
    danger: {
      name: 'danger',
      countAll: true,
      find: true,
      icon: 'fa-times',
      string: "Errors",
    },
    warning : {
      name: 'warning',
      countAll: true,
      find: true,
      icon: 'fa-warning',
      string: "Warnings"
    }};

    var dataCount = 0;
    _.each(data_list, function(data) {
      if (data.find) {
        _.extend(data, {
          count: 0,
        });
        var result = $(htmlData).find('.table-striped tr[class="' + data.name + '"]');
        if (data.countAll) {
          data.count = result.length;
        }
        if (data.count) {
          dataCount++;
        }
      }
    });
    return {data_list : data_list};
  }

  var model = {
    set: function(value) {
      var temp = {};
      Promise.all(value.branches.map(b => fetch(b.log)))
      .then(resp => Promise.all( resp.map(r => r.text()) ))
      .then(result => {
          _.each(result,function(r,index) {
              value.branches[index].logData = countLog(r);
          });
          value.key = value.abstractBranchTag+ '+' + value.branchName;
          temp[value.key] = value;
          _.extend(self.appData,temp);
          chrome.storage.sync.set(temp, function() {
              renderer.renderOne(value);
          });
      });
    },
    get: function() {
      chrome.storage.sync.get(null, function(branches) {
        return branches;
      });
    }
  };

  var renderer = {
    rendeAll: function() {
      chrome.storage.sync.get(null, function(branches) {
        console.log(branches);
        _.each(_.keys(branches), function(d) {
          branches[d]['current'] = _.filter(branches[d].branches, function(h) {
            return h.order === 1
          })[0];
          branches[d]['branches'] = _.filter(branches[d].branches, function(h) {
            return h.order !== 1
          });
        });
        self.appData = branches;
        var data = _.values(branches);
        $('.cardContainer').append(self.template({
          tdata: data
        }));
        $('.logDetails').on('click',function(event) {
            logDetailsClick(event);
        });
        $('.refreshBranch').on('click',function(event) {
            refreshBranch(event);
        })
      });
    },
    renderOne: function(data) {
        var temp = {};
        data['current'] = _.filter(data.branches, function(h) {
          return h.order === 1
        })[0];
        data['branches'] = _.filter(data.branches, function(h) {
          return h.order !== 1
        });
        temp[data.branchName] = data;
        $('.cardContainer').append(self.template({
          tdata: temp
        }));
        $('.logDetails').on('click',function(event) {
            logDetailsClick(event);
        });
        $('.refreshBranch').on('click',function(event) {
            refreshBranch(event);
        })
        $('#addBranchModel .loading').addClass('hide');
        $('#addBranchModel').modal('close');
        Materialize.toast(branchName + ' Added', 3000, 'rounded');
    },
    reRender: function(key) {
      var temp = {};
      Promise.all(self.appData[key].branches.map(b => fetch(b.log)))
      .then(resp => Promise.all( resp.map(r => r.text()) ))
      .then(result => {
          _.each(result,function(r,index) {
              self.appData[key].branches[index].logData = countLog(r);
          });

          chrome.storage.sync.remove(key,function(){
              var temp = {};
              self.appData[key].key = key;
              temp[key] = self.appData[key];
              chrome.storage.sync.set(temp, function() {
                self.appData[key]['current'] = _.filter(self.appData[key].branches, function(h) {
                  return h.order === 1
                })[0];
                self.appData[key]['branches'] = _.filter(self.appData[key].branches, function(h) {
                  return h.order !== 1
                });
                var data = _.values(self.appData);
                $('.cardContainer').empty();
                $('.cardContainer').append(self.template({
                  tdata: data
                }));
                $('.logDetails').on('click',function(event) {
                  logDetailsClick(event);
                });
                $('.refreshBranch').on('click',function(event) {
                  refreshBranch(event);
                });
              });
          });
      });
    }
  }

  function ajexRequest(branchUrl, successCallback, errorCallBack) {
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
  renderer.rendeAll();
});
