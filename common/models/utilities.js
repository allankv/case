
module.exports = function(Utilities) {
  Utilities.PopulateOriginalData = function(body,cb) {
    var FPAkkaOutput = Utilities.app.models.FPAkkaOutput;
    FPAkkaOutput.find({limit:10}, function (err, instance) {
      cb(null, instance);
    });
  };

  Utilities.remoteMethod(
      'PopulateOriginalData',
      {
        http: {path: '/PopulateOriginalData', verb: 'get'},
        accepts: [],
        returns: {arg: 'output', type: 'object'}
      }
    );
};
