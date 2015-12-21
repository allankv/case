var request = require('request');
module.exports = function(app) {
  var ACTIVE = false;
  if(ACTIVE){
    var DQReportControl = app.models.DQReportControl;
    var populate = function(offset){
      request({
        url:'http://'+app.host+':3020/api/v1.0/Occurrences/improvement/dataset/acceptrecommendation',
        method: 'GET',
        qs: {url:'http://'+app.host+':3010/api/v1.0/DQReports?filter[limit]=100&filter[skip]='+offset}
      }, function (error, response, body) {
        var output = JSON.parse(body).response;
        if(Array.isArray(output) && output.length>0){
          DQReportControl.create(output, function (err, instance) {
            offset=offset+100
            console.log((offset/52412)*100);
            populate(offset)
          });
        }else {
          console.log("****\n DONE: \n"+output);
        }
      });
    };
    populate(0);
  }
}
