var historyData = {
  getMilisecound: function(days) {
    days = parseInt(days,10);
    var microsecondsBack = 1000 * 60 * 60 * 24 * days;
    var startTime = (new Date).getTime() - microsecondsBack;
    return startTime;
  },
};

export default historyData;
