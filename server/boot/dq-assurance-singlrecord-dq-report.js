var request = require('request');
module.exports = function(app) {
  var ACTIVE = false;
  if(ACTIVE){
    var DQReportAssurance = app.models.DQReportAssurance;
    var populate = function(offset){
      request({
        url:'http://'+app.host+':3020/api/v1.0/Occurrences/improvement/dataset/filter',
        method: 'GET',
        qs: {url:'http://'+app.host+':3010/api/v1.0/DQReportControls?filter[limit]=100&filter[skip]='+offset}
      }, function (error, response, body) {
        var output = JSON.parse(body).response;
        if(Array.isArray(output) && offset<53000){
          DQReportAssurance.create(output, function (err, instance) {
            offset=offset+100
            console.log(offset);
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
