module.exports = function(app) {
  var ACTIVE = false;
  if(ACTIVE){
    var Original = app.models.OrginalData;
    var BDQToolkitOutput = app.models.BDQToolkitOutput;
    var FPAkkaOutput = app.models.FPAkkaOutput;
    var DQReport = app.models.DQReport;
    var count = 0
    var n = 60000;
    var assert = function(offset){
      Original.find({limit:1,offset:offset}, function (err, original) {
        var rt = {}
        rt.id = original[0].id;
        rt.resourceType = "Single Record";
        rt.value = original[0].__data;

        var assertions = {}
        assertions.id = rt.id;
        assertions.dataResource = rt;
        assertions.validations = {}
        assertions.measures = {}
        assertions.improvements = {}

        var done = false;
        BDQToolkitOutput.find({where:{id:rt.id}}, function (err, bdq) {
          /*
          * BDQ TOOLKIT
          */
          // Measurement
          assertions.measures.cd1 = {}
          assertions.measures.cd1.contextualizedDimension = {}
          assertions.measures.cd1.contextualizedDimension.label = 'Coordinates Numerical Precision';
          assertions.measures.cd1.contextualizedDimension.description = 'Measure the numerical Precision (d1) of Coordinates (ie1) based on the number of decimals of Coordinates of a Single Record (rt1). Fewer digits mean worse Precision of Coordinates, but many digits does not necessarily mean better real Precision of Coordinates.';
          assertions.measures.cd1.specification = 'Calculate the average of the number of characters after "." of dwc:decimalLatitude and dwc:decimalLongitude.';
          assertions.measures.cd1.mechanism = 'BDQ Toolkit'
          assertions.measures.cd1.assertion = bdq[0].coordinatesMeasures[1].assertion;

          assertions.measures.cd2 = {}
          assertions.measures.cd2.contextualizedDimension = {}
          assertions.measures.cd2.contextualizedDimension.label = 'Coordinates Completeness';
          assertions.measures.cd2.contextualizedDimension.description = 'Measure the Completeness based on the presence of all values for Coordinates.';
          assertions.measures.cd2.specification = 'Check whether values (disregarding extra spaces characters) for both dwc:decimalLatitude and dwc:decimalLongitude are different of zero and different of empty.';
          assertions.measures.cd2.mechanism = 'BDQ Toolkit'
          assertions.measures.cd2.assertion = bdq[0].coordinatesMeasures[0].assertion;

          assertions.measures.cd7 = {}
          assertions.measures.cd7.contextualizedDimension = {}
          assertions.measures.cd7.contextualizedDimension.label = 'SciName Completeness';
          assertions.measures.cd7.contextualizedDimension.description = 'Measure the Completeness based on the presence of all values for SciName.';
          assertions.measures.cd7.specification = 'Check whether values (disregarding extra spaces characters) for both dwc:scientificName and dwc:scientificNameAuthorship are different of empty.';
          assertions.measures.cd7.mechanism = 'BDQ Toolkit'
          assertions.measures.cd7.assertion = bdq[0].SciNameMeasures[0].assertion;

          assertions.measures.cd11 = {}
          assertions.measures.cd11.contextualizedDimension = {}
          assertions.measures.cd11.contextualizedDimension.label = 'Collected Date Completeness';
          assertions.measures.cd11.contextualizedDimension.description = 'Measure the Completeness based on the presence of value for Collected Date.';
          assertions.measures.cd11.specification = 'Check whether value (disregarding extra spaces characters) for dwc:eventDate is different of empty.';
          assertions.measures.cd11.mechanism = 'BDQ Toolkit'
          assertions.measures.cd11.assertion = bdq[0].CollectedDateMeasures[0].assertion;

          assertions.measures.cd15 = {}
          assertions.measures.cd15.contextualizedDimension = {}
          assertions.measures.cd15.contextualizedDimension.label = 'Occurrence Completeness';
          assertions.measures.cd15.contextualizedDimension.description = 'Measure the Completeness based on the presence of all values for Coordinates, SciName and Collected Date.';
          assertions.measures.cd15.specification = 'Check whether values (disregarding extra spaces characters) for both dwc:decimalLatitude and dwc:decimalLongitude are different of zero or empty and values for dwc:eventDate, dwc:scientificName and dwc:scientificNameAuthorship are different of empty.';
          assertions.measures.cd15.mechanism = 'BDQ Toolkit'
          assertions.measures.cd15.assertion = bdq[0].OccurrenceMeasures[0].assertion;
          if(assertions.measures.cd15.assertion=='Complete'){
            count++
          }
          // VALIDATION
          assertions.validations.cc1 = {}
          assertions.validations.cc1.contextualizedCriterion = 'Coordinates Numerical Precision must be higher than 4';
          assertions.validations.cc1.specification = 'Check whether the average of the number of characters after "." of dwc:decimalLatitude and dwc:decimalLongitude is higher than 4.';
          assertions.validations.cc1.mechanism = 'BDQ Toolkit'
          assertions.validations.cc1.assertion = bdq[0].coordinatesValidations[0].assertion=="Valid"?"Compliant":"Not Compliant";

          assertions.validations.cc2 = {}
          assertions.validations.cc2.contextualizedCriterion = 'Coordinates must be complete';
          assertions.validations.cc2.specification = 'Check whether values (disregarding extra spaces characters) for both dwc:decimalLatitude and dwc:decimalLongitude are different of zero and different of empty.';
          assertions.validations.cc2.mechanism = 'BDQ Toolkit'
          assertions.validations.cc2.assertion = assertions.measures.cd2.assertion=="Complete"?"Compliant":"Not Compliant";

          assertions.validations.cc7 = {}
          assertions.validations.cc7.contextualizedCriterion = 'SciName must be complete';
          assertions.validations.cc7.specification = 'Check whether values (disregarding extra spaces characters) for both dwc:scientificName and dwc:scientificNameAuthorship are different of empty.';
          assertions.validations.cc7.mechanism = 'BDQ Toolkit'
          assertions.validations.cc7.assertion = bdq[0].SciNameValidations[0].assertion=="Valid"?"Compliant":"Not Compliant";

          assertions.validations.cc11 = {}
          assertions.validations.cc11.contextualizedCriterion = 'Collected Date must be complete';
          assertions.validations.cc11.specisfication = 'Check whether value (disregarding extra spaces characters) for dwc:eventDate is different of empty.';
          assertions.validations.cc11.mechanism = 'BDQ Toolkit'
          assertions.validations.cc11.assertion = bdq[0].CollectedDateValidations[0].assertion=="Valid"?"Compliant":"Not Compliant";

          assertions.validations.cc15 = {}
          assertions.validations.cc15.contextualizedCriterion = 'Occurrence must be complete';
          assertions.validations.cc15.specification = 'Check whether values (disregarding extra spaces characters) for both dwc:decimalLatitude and dwc:decimalLongitude are different of zero or empty and values for dwc:eventDate, dwc:scientificName and dwc:scientificNameAuthorship are different of empty.';
          assertions.validations.cc15.mechanism = 'BDQ Toolkit'
          assertions.validations.cc15.assertion = bdq[0].OccurrenceValidations[0].assertion=="Valid"?"Compliant":"Not Compliant";

          assertions.validations.cc17 = {}
          assertions.validations.cc17.contextualizedCriterion = 'Collected Date must follow ISO 8601 standard format';
          assertions.validations.cc17.specification = 'Check whether dwc:eventDate is according to ISO 8601 standard specification.';
          assertions.validations.cc17.mechanism = 'BDQ Toolkit'
          assertions.validations.cc17.assertion = bdq[0].CollectedDateValidations[1].assertion=="Valid"?"Compliant":"Not Compliant";

          if(done){
            if(offset < n){
              saveDQReport(assertions);
              assert(offset+1);
            }
          }
          done = true
        });

        FPAkkaOutput.find({where:{id:rt.id}}, function (err, akka) {
          /*
          * FP-AKKA KURATOR
          */
          assertions.measures.cd3 = {}
          assertions.measures.cd3.contextualizedDimension = {}
          assertions.measures.cd3.contextualizedDimension.label = 'Coordinates Consistency';
          assertions.measures.cd3.contextualizedDimension.description = 'Measure the Consistency of Coordinates with the associated country, state/province, county and locality of record.';
          assertions.measures.cd3.specification = 'Check whether dwc:decimalLatitude and dwc:decimalLongitude values are consistent with coordinates range (latitudes range from -90 to 90 and longitudes range from -180 to 180) and are consistent with the bounds of dwc:country or close enough (currently defined as 200 km) from the georeference for dwc:country, dwc:stateProvince, dwc:county and dwc:locality.';
          assertions.measures.cd3.mechanism = 'FP-Akka Kurator'

          assertions.validations.cc3 = {}
          assertions.validations.cc3.contextualizedCriterion = 'Coordinates must be consistent';
          assertions.validations.cc3.specification = 'Check whether dwc:decimalLatitude and dwc:decimalLongitude values are consistent with coordinates range (latitudes range from -90 to 90 and longitudes range from -180 to 180) and are consistent with the bounds of dwc:country or close enough (currently defined as 200 km) from the georeference for dwc:country, dwc:stateProvince, dwc:county and dwc:locality.';
          assertions.validations.cc3.mechanism = 'FP-Akka Kurator'

          if(akka[0].Markers.GeoRefValidator == 'CURATED' ||
            akka[0].Markers.GeoRefValidator == 'UNABLE_CURATE'){
              assertions.measures.cd3.assertion = "Not Consistent";
              assertions.validations.cc3.assertion = "Not Compliant";
          } else if(akka[0].Markers.GeoRefValidator == 'CORRECT'){
              assertions.measures.cd3.assertion = "Consistent";
              assertions.validations.cc3.assertion = "Compliant";
          } else {
              assertions.measures.cd3.assertion = null;
              assertions.validations.cc3.assertion = "Not Compliant";
          }

          assertions.measures.cd8 = {}
          assertions.measures.cd8.contextualizedDimension = {}
          assertions.measures.cd8.contextualizedDimension.label = 'SciName Accuracy';
          assertions.measures.cd8.contextualizedDimension.description = 'Measure the Accuracy based on the presence of correct values of SciName according to nomenclature authorities.';
          assertions.measures.cd8.specification = 'Check against taxonomic authorities whether there is an exact match with both dwc:scientificName and dwc:scientificNameAuthorship values.';
          assertions.measures.cd8.mechanism = 'FP-Akka Kurator'

          assertions.validations.cc8 = {}
          assertions.validations.cc8.contextualizedCriterion = 'SciName must be accurate';
          assertions.validations.cc8.specification = 'Check against taxonomic authorities whether there is an exact match with both dwc:scientificName and dwc:scientificNameAuthorship values. ';
          assertions.validations.cc8.mechanism = 'FP-Akka Kurator'


          if(akka[0].Markers.ScientificNameValidator == 'CURATED' ||
            akka[0].Markers.ScientificNameValidator == 'UNABLE_CURATE'){
              assertions.measures.cd8.assertion = "Not Accurate";
              assertions.validations.cc8.assertion = "Not Compliant";
          } else if(akka[0].Markers.ScientificNameValidator == 'CORRECT'){
              assertions.measures.cd8.assertion = "Accurate";
              assertions.validations.cc8.assertion = "Compliant"
          } else {
              assertions.measures.cd8.assertion = null;
              assertions.validations.cc8.assertion = "Not Compliant";
          }

          assertions.measures.cd12 = {}
          assertions.measures.cd12.contextualizedDimension = {}
          assertions.measures.cd12.contextualizedDimension.label = 'Collected Date Consistency';
          assertions.measures.cd12.contextualizedDimension.description = 'Measure the Consistency of Collected Date value with modified date and with the life span of the collector.';
          assertions.measures.cd12.specification = 'Check whether dwc:eventDate value is correctly formatted according to ISO 8601 standard and is before dwc:modified and between life span of collector.';
          assertions.measures.cd12.mechanism = 'FP-Akka Kurator'

          assertions.validations.cc12 = {}
          assertions.validations.cc12.contextualizedCriterion = 'Collected Date must be consistent';
          assertions.validations.cc12.specification = 'Check whether dwc:eventDate value is correctly formatted according to ISO 8601 standard and is before dwc:modified and between life span of collector.';
          assertions.validations.cc12.mechanism = 'FP-Akka Kurator'

          if(akka[0].Markers.DateValidator == 'CURATED' ||
            akka[0].Markers.DateValidator == 'UNABLE_CURATE'){
              assertions.measures.cd12.assertion = "Not Consistent";
              assertions.validations.cc12.assertion = "Not Compliant";
          } else if(akka[0].Markers.DateValidator == 'CORRECT'){
              assertions.measures.cd12.assertion = "Consistent";
              assertions.validations.cc12.assertion = "Compliant";
          } else {
              assertions.measures.cd12.assertion = null;
              assertions.validations.cc12.assertion = "Not Compliant";
          }

          assertions.measures.cd17 = {}
          assertions.measures.cd17.contextualizedDimension = {}
          assertions.measures.cd17.contextualizedDimension.label = 'Coordinates Accuracy';
          assertions.measures.cd17.contextualizedDimension.description = 'Measure the Accuracy based on the Consistency measures of Coordinates and Collected Date and the Accuracy measure of SciName.';
          assertions.measures.cd17.specification = 'Check whether dwc:decimalLatitude and dwc:decimalLongitude values are consistent with coordinates range (latitudes range from -90 to 90 and longitudes range from -180 to 180) and are consistent with the bounds of dwc:country or close enough (currently defined as 200 km) from the georeference for dwc:country, dwc:stateProvince, dwc:county and dwc:locality and whether dwc:eventDate value is correctly formatted according to ISO 8601 standard and is before dwc:modified and between life span of dwc:colletedBy and whether there is an exact match with both dwc:scientificName and dwc:scientificNameAuthorship values with taxonomic authorities.';
          assertions.measures.cd17.mechanism = 'FP-Akka Kurator'

          assertions.validations.cc18 = {}
          assertions.validations.cc18.contextualizedCriterion = 'Occurrence must be accurate';
          assertions.validations.cc18.specification = 'Check whether dwc:decimalLatitude and dwc:decimalLongitude values are consistent with coordinates range (latitudes range from -90 to 90 and longitudes range from -180 to 180) and are consistent with the bounds of dwc:country or close enough (currently defined as 200 km) from the georeference for dwc:country, dwc:stateProvince, dwc:county and dwc:locality and whether dwc:eventDate value is correctly formatted according to ISO 8601 standard and is before dwc:modified and between life span of dwc:colletedBy and whether there is an exact match with both dwc:scientificName and dwc:scientificNameAuthorship values with taxonomic authorities.';
          assertions.validations.cc18.mechanism = 'FP-Akka Kurator'
          if(assertions.measures.cd3.assertion=="Consistent" && assertions.measures.cd12.assertion=="Consistent" && assertions.measures.cd8.assertion=="Accurate"){
              assertions.measures.cd17.assertion = "Accurate";
              assertions.validations.cc18.assertion = "Compliant";
          } else if(assertions.measures.cd3.assertion=="Not Consistent" || assertions.measures.cd12.assertion=="Not Consistent" || assertions.measures.cd8.assertion=="Not Accurate"){
              assertions.measures.cd17.assertion = "Not Accurate";
              assertions.validations.cc18.assertion = "Not Compliant";
          } else {
              assertions.measures.cd17.assertion = null;
              assertions.validations.cc18.assertion = "Not Compliant";
          }

          /*
          * IMPROVE
          */
          akka[0].ActorDetails.forEach(function (item) {
            if(item["Actor Result"] == 'CURATED'){
              if(item["Actor Name"] == 'ScientificNameValidator'){
                assertions.improvements.ce1 = {}
                assertions.improvements.ce1.contextualizedEnhancement = {}
                assertions.improvements.ce1.contextualizedEnhancement = 'Recommendation of SciName based on nomenclature authorities';
                assertions.improvements.ce1.specification = 'Recommend the most similar and valid Scientific Name and Scientific Name Authorship according to taxonomic authorities based on string similarity algorithms and in taxonomic rules and conventions. Details can be found at: http://sourceforge.net/p/filteredpush/svn/HEAD/tree/trunk/FP-Tools/FP-CurationServices/src/main/java/edu/harvard/mcz/nametools/';
                assertions.improvements.ce1.mechanism = 'FP-Akka Kurator'
                assertions.improvements.ce1.assertion = {};
                if(item.scientificName)
                  assertions.improvements.ce1.assertion.scientificName = item.scientificName.indexOf("CHANGED TO: ") > -1 ? item.scientificName.split("CHANGED TO: ")[1] : akka[0].Record.scientificName;
                if(item.scientificNameAuthorship)
                  assertions.improvements.ce1.assertion.scientificNameAuthorship = item.scientificNameAuthorship.indexOf("CHANGED TO: ") > -1 ? item.scientificNameAuthorship.split("CHANGED TO: ")[1] : akka[0].Record.scientificNameAuthorship;
              } else if(item["Actor Name"] == 'DateValidator'){
                assertions.improvements.ce2 = {}
                assertions.improvements.ce2.contextualizedEnhancement = {}
                assertions.improvements.ce2.contextualizedEnhancement = 'Recommendation of Collected Date based on ISO 8601 standard';
                assertions.improvements.ce2.specification = 'Recommend ISO 8601 standardized value for dwc:eventDate based on its own value, changing the order of year, month and day whether they can be parsed or try to use dwc:year, dwc:month, dwc:day and dwc:startDayOfYear values to infer the corresponding dwc:evendDate value.';
                assertions.improvements.ce2.mechanism = 'FP-Akka Kurator'
                assertions.improvements.ce2.assertion = {};
                assertions.improvements.ce2.assertion.eventDate = item.eventDate.indexOf("CHANGED TO: ") > -1 ? item.eventDate.split("CHANGED TO: ")[1] : akka[0].Record.eventDate;
              } else if(item["Actor Name"] == 'GeoRefValidator'){
                assertions.improvements.ce3 = {}
                assertions.improvements.ce3.contextualizedEnhancement = {}
                assertions.improvements.ce3.contextualizedEnhancement = 'Recommendation of Coordinates based on the associated country, state/province, county and locality';
                assertions.improvements.ce3.specification = 'Change signs (positive and negative) of dwc:decimalLatitude and dwc:decimalLongitude and recommend the dwc:decimalLatitude and dwc:decimalLongitude that is consistent with dwc:country or consistent with the georeference of dwc:country, dwc:stateProvince, dwc:county and dwc:locality. ';
                assertions.improvements.ce3.mechanism = 'FP-Akka Kurator'
                assertions.improvements.ce3.assertion = {};
                assertions.improvements.ce3.assertion.decimalLatitude = item.decimalLatitude.indexOf("CHANGED TO: ") > -1 ? item.decimalLatitude.split("CHANGED TO: ")[1] : akka[0].Record.decimalLatitude;
                assertions.improvements.ce3.assertion.decimalLongitude = item.decimalLongitude.indexOf("CHANGED TO: ") > -1 ? item.decimalLongitude.split("CHANGED TO: ")[1] : akka[0].Record.decimalLongitude;
              }
            }
          })
          if(done){
            if(offset < n){
              saveDQReport(assertions);
              assert(offset+1);
            }
          }
          done = true
        });
      });
    };

    assert(0);
    var i = 0;
    var ii = 0;
    function saveDQReport(assertion){
      DQReport.upsert(assertion, function (err, dqreport) {
        i++
        ii++
        if(i==1000){
          console.log(ii);
          console.log("Complete:",count);
          i=0;
        }
      });
    }
  }
}
