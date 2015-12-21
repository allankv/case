// module.exports = function(app) {
//   var Original = app.models.OrginalData;
//   var FPAkkaOutput = app.models.FPAkkaOutput;
//   var populate = function(offset){
//     FPAkkaOutput.find({limit:1000,offset:offset}, function (err, instances) {
//       var records = [];
//       instances.forEach(function(item) {
//         var record = item.Record;
//         record.id = item.id;
//         if(record.originalScientificName){
//             record.scientificName = record.originalScientificName
//             delete record.originalScientificName
//         }
//         if(record.origialScientificNameAuthorship){
//             record.scientificNameAuthorship = record.origialScientificNameAuthorship
//             delete record.origialScientificNameAuthorship
//         }
//         if(record.origialEventDate){
//             record.eventDate = record.origialEventDate
//             delete record.origialEventDate
//         }
//         if(record.origialDecimalLatitude){
//             record.decimalLatitude = record.origialDecimalLatitude
//             delete record.origialDecimalLatitude
//         }
//         if(record.origialDecimalLongitude){
//             record.decimalLongitude = record.origialDecimalLongitude
//             delete record.origialDecimalLongitude
//         }
//         delete record.ValidationState;
//         records.push(record);
//       })
//       Original.upsert(records, function (err, instance) {
//         if(instance.length>0)
//           populate(offset+1000);
//         console.log(offset)
//       })
//     });
//   };
//   populate(0);
// }
