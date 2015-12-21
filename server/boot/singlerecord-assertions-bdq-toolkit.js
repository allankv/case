var request = require('request');
module.exports = function(app) {
  var ACTIVE = false;
  if(ACTIVE){
    var Original = app.models.OrginalData;
    var BDQToolkitOutput = app.models.BDQToolkitOutput;
    var i = 0;
    var assert = function(offset){
      Original.find({limit:500,offset:offset}, function (err, instances) {
        request({
          url:'http://'+app.host+':3020/api/v1.0/Records/assertions/singlerecord',
          method: 'POST',
          json: instances
        }, function (error, response, body) {
              BDQToolkitOutput.create(body.response, function (err, instance) {
                if(typeof body.response == 'undefined'){
                  console.log(offset,"--->>>",JSON.stringify(err))
                } else
                assert(offset+500)
                if(i==10){
                  console.log(offset)
                  i=0
               }
                i++
              });
        });
      });
    };
    assert(0);
  }
}
