var request = require('request');
module.exports = function(app) {
  var ACTIVE = false;
  if(ACTIVE){
    var Original = app.models.OrginalData;
    var BDQToolkitOutput = app.models.BDQToolkitOutput;
    var assert = function(){
      request({
        url:'http://'+app.host+':3020/api/v1.0/Records/assertions/dataset',
        method: 'GET',
        qs: {url:'http://'+app.host+':3010/api/v1.0/OrginalData/'}
      }, function (error, response, body) {
        BDQToolkitOutput.upsert(JSON.parse(body).response, function (err, instance) {
         console.log(instance);
        });
      });
    };
    assert();
  }
}
