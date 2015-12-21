module.exports = function(app) {
  var ACTIVE = false;
  if(ACTIVE){
    var DQReportControl = app.models.DQReportControl;

    var assert = function(){
        var rt = {}
        rt.id = 'http://'+app.host+':3010/api/v1.0/OrginalData';
        rt.resourceType = "Dataset";
        rt.value = 'http://'+app.host+':3010/api/v1.0/OrginalData';
        var assertions = {}
        assertions.id = rt.id;
        assertions.dataResource = rt;
        assertions.validations = {}
        assertions.measures = {}
        assertions.improvements = {}

        DQReportControl.find({}, function (err, report) {
          assertions.dataResource.count = report.length;

          assertions.measures.cd4  = {}
          assertions.measures.cd4.contextualizedDimension = {}
          assertions.measures.cd4.contextualizedDimension.label = "Coordinates Completeness"
          assertions.measures.cd4.contextualizedDimension.description = 'Measure the Completeness based on the proportion of records that have all values of Coordinates supplied.'
          assertions.measures.cd4.specification = 'Calculate the proportion of records in dataset with values (disregarding extra spaces) different to zero and different to empty for both dwc:decimalLatitude and dwc:decimalLongitude. Applicable to datasets of Darwin Core based records.'
          assertions.measures.cd4.mechanism = "BDQ Toolkit";
          assertions.measures.cd4.assertion = 0

          assertions.measures.cd6  = {}
          assertions.measures.cd6.contextualizedDimension = {}
          assertions.measures.cd6.contextualizedDimension.label = "Coordinates Numerical Precision"
          assertions.measures.cd6.contextualizedDimension.description = 'Measure the Precision based on the average number of decimal digits of Coordinates of records of Dataset. Fewer digits mean worse Precision, but many digits does not necessarily mean better true Coordinates Precision.'
          assertions.measures.cd6.specification = 'Calculate the mean of the average number of characters after "." of dwc:decimalLatitude and dwc:decimalLongitude of records of dataset. Applicable to datasets of Darwin Core based records.'
          assertions.measures.cd6.mechanism = "BDQ Toolkit"
          assertions.measures.cd6.assertion = 0;

          assertions.measures.cd9  = {}
          assertions.measures.cd9.contextualizedDimension = {}
          assertions.measures.cd9.contextualizedDimension.label = "SciName Completeness"
          assertions.measures.cd9.contextualizedDimension.description = 'Measure the Completeness based on the proportion of records that have all values supplied for SciName.'
          assertions.measures.cd9.specification = 'Calculate the proportion of records in dataset with values (disregarding extra spaces) different to empty for both dwc:scientificName and dwc:scientificNameAuthorship. Applicable to datasets of Darwin Core based records.'
          assertions.measures.cd9.mechanism = "BDQ Toolkit"
          assertions.measures.cd9.assertion = 0

          assertions.measures.cd13  = {}
          assertions.measures.cd13.contextualizedDimension = {}
          assertions.measures.cd13.contextualizedDimension.label = "Collected Date Completeness"
          assertions.measures.cd13.contextualizedDimension.description = 'Measure the Completeness based on the proportion of records that have a value supplied for Collected Date.'
          assertions.measures.cd13.specification = 'Calculate the proportion of records in dataset that have the dwc:eventDate value (disregarding extra spaces) different to empty. Applicable to datasets of Darwin Core based records.'
          assertions.measures.cd13.mechanism = "BDQ Toolkit"
          assertions.measures.cd13.assertion = 0

          assertions.measures.cd16  = {}
          assertions.measures.cd16.contextualizedDimension = {}
          assertions.measures.cd16.contextualizedDimension.label = "Occurrence Completeness"
          assertions.measures.cd16.contextualizedDimension.description = 'Measure the Completeness based on the proportion of records in a Dataset that have Coordinates, SciName and Collected Date values supplied.'
          assertions.measures.cd16.specification = 'Calculate the proportion of records with values (disregarding extra spaces) for both dwc:decimalLatitude and dwc:decimalLongitude that are different to zero or empty and values for dwc:eventDate, dwc:scientificName and dwc:scientificNameAuthorship that are different to empty. Applicable to datasets of Darwin Core based records.'
          assertions.measures.cd16.mechanism = "BDQ Toolkit"
          assertions.measures.cd16.assertion = 0

          assertions.measures.cd18  = {}
          assertions.measures.cd18.contextualizedDimension = {}
          assertions.measures.cd18.contextualizedDimension.label = 'Occurrence Accuracy'
          assertions.measures.cd18.contextualizedDimension.description = 'Measure the Accuracy based on the proportion of records in a Dataset that have consistent Coordinates and Collected Date and accurate SciName .'
          assertions.measures.cd18.specification = 'Calculate the proportion of records in dataset with values for dwc:decimalLatitude and dwc:decimalLongitude that are consistent with coordinates ranges (latitudes range from -90 to 90 and longitudes range from -180 to 180) and are consistent with the bounds of dwc:country or close enough (currently defined as 200 km) from the georeference for dwc:country, dwc:stateProvince, dwc:county and dwc:locality and value for dwc:eventDate is correctly formatted according to ISO 8601 standard and is before dwc:modified and within life span of dwc:collectedBy and there is an exact match with both dwc:scientificName and dwc:scientificNameAuthorship values with nomenclature authorities. Applicable to single Darwin Core based records.'
          assertions.measures.cd18.mechanism = "BDQ Toolkit"
          assertions.measures.cd18.assertion = 0;

          //**

          assertions.measures.cd5  = {}
          assertions.measures.cd5.contextualizedDimension = {}
          assertions.measures.cd5.contextualizedDimension.label = 'Coordinates Consistency'
          assertions.measures.cd5.contextualizedDimension.description = 'Measure the Consistency based on the proportion of records that have Coordinates values consistent with associated country, state/province, county and locality of record.'
          assertions.measures.cd5.specification = 'Calculate the proportion of records dwc:decimalLatitude and dwc:decimalLongitude values consistent with coordinates ranges (latitudes range from -90 to 90 and longitudes range from -180 to 180) and are consistent with the bounds of dwc:country or close enough (currently defined as 200 km) from the georeference for dwc:country, dwc:stateProvince, dwc:county and dwc:locality. Applicable to datasets of Darwin Core based records.'
          assertions.measures.cd5.mechanism = "BDQ Toolkit"
          assertions.measures.cd5.assertion = 0;

          assertions.measures.cd10  = {}
          assertions.measures.cd10.contextualizedDimension = {}
          assertions.measures.cd10.contextualizedDimension.label = 'SciName Accuracy'
          assertions.measures.cd10.contextualizedDimension.description = 'Measure the Accuracy based on the proportion of records that have  presence of correct values of SciName according to nomenclature authorities.'
          assertions.measures.cd10.specification = 'Calculate the proportion of records with an  exact match of both dwc:scientificName and dwc:scientificNameAuthorship values with nomenclatural authorities. Applicable to datasets of Darwin Core based records.'
          assertions.measures.cd10.mechanism = "BDQ Toolkit"
          assertions.measures.cd10.assertion = 0;

          assertions.measures.cd14  = {}
          assertions.measures.cd14.contextualizedDimension = {}
          assertions.measures.cd14.contextualizedDimension.label = 'Collected Date Consistency'
          assertions.measures.cd14.contextualizedDimension.description = 'Measure the Consistency based on the proportion of records which Collected Date value is consistent with modified date and with the life span of the collector.'
          assertions.measures.cd14.specification = 'Calculate the proportion of dwc:eventDate value records that are correctly formatted according to ISO 8601 standard and that are before dwc:modified and within life span of collector. Applicable to datasets of Darwin Core based records.'
          assertions.measures.cd14.mechanism = "BDQ Toolkit"
          assertions.measures.cd14.assertion = 0;

          report.forEach(function (record) {
            if(record.dataResource.resourceType!='Dataset'){
              if(record.measures.cd2.assertion == "Complete")
                assertions.measures.cd4.assertion++
              assertions.measures.cd6.assertion = assertions.measures.cd6.assertion+record.measures.cd1.assertion
              if(record.measures.cd7.assertion == "Complete")
                assertions.measures.cd9.assertion++
              if(record.measures.cd11.assertion == "Complete")
                assertions.measures.cd13.assertion++
              if(record.measures.cd15.assertion == "Complete")
                assertions.measures.cd16.assertion++
              if(record.measures.cd17.assertion == "Accurate")
                assertions.measures.cd18.assertion++

              if(record.measures.cd8.assertion == "Accurate")
                assertions.measures.cd10.assertion++
              if(record.measures.cd3.assertion == "Consistent")
                assertions.measures.cd5.assertion++
              if(record.measures.cd12.assertion == "Consistent")
                assertions.measures.cd14.assertion++
            }
          });

          assertions.measures.cd10.assertion = assertions.measures.cd10.assertion/report.length;
          assertions.measures.cd5.assertion = assertions.measures.cd5.assertion/report.length;
          assertions.measures.cd14.assertion = assertions.measures.cd14.assertion/report.length;
          assertions.measures.cd18.assertion = assertions.measures.cd18.assertion/report.length;

          assertions.measures.cd4.assertion = assertions.measures.cd4.assertion/report.length;
          assertions.measures.cd6.assertion = assertions.measures.cd6.assertion/report.length;
          assertions.measures.cd9.assertion = assertions.measures.cd9.assertion/report.length;
          assertions.measures.cd13.assertion = assertions.measures.cd13.assertion/report.length;
          console.log("Complete: ",assertions.measures.cd16.assertion);
          console.log("Count: ",assertions.measures.cd16.assertion);
          assertions.measures.cd16.assertion = assertions.measures.cd16.assertion/report.length;
          console.log("Count: ",assertions.measures.cd16.assertion);

          // Validation
          assertions.validations.cc4  = {}
          assertions.validations.cc4.contextualizedCriterion = "All records in a Dataset must have complete Coordinates"
          assertions.validations.cc4.specification = 'Check if the proportion of records in dataset with values (disregarding extra spaces) different to zero and different to empty for both dwc:decimalLatitude and dwc:decimalLongitude is equal 100%. Applicable to datasets of Darwin Core based records.'
          assertions.validations.cc4.mechanism = "BDQ Toolkit"
          assertions.validations.cc4.assertion = assertions.measures.cd4.assertion==1?'Compliant':'Not Compliant';

          assertions.validations.cc6  = {}
          assertions.validations.cc6.contextualizedCriterion = "Average value of Coordinates Numerical Precision within a Dataset must be higher than 4"
          assertions.validations.cc6.specification = 'Check if the mean of the average of the number of characters after "." of dwc:decimalLatitude and dwc:decimalLongitude of records of dataset is higher than 4. Applicable to datasets of Darwin Core based records.'
          assertions.validations.cc6.mechanism = "BDQ Toolkit"
          assertions.validations.cc6.assertion = assertions.measures.cd6.assertion>5?'Compliant':'Not Compliant';

          assertions.validations.cc9  = {}
          assertions.validations.cc9.contextualizedCriterion = "All records in a Dataset must have complete SciName"
          assertions.validations.cc9.specification = 'Check if the proportion of records in dataset with values (disregarding extra spaces) different to empty for both dwc:scientificName and dwc:scientificNameAuthorship is equal to 100%. Applicable to datasets of Darwin Core based records.'
          assertions.validations.cc9.mechanism = "BDQ Toolkit"
          assertions.validations.cc9.assertion = assertions.measures.cd9.assertion==1?'Compliant':'Not Compliant';

          assertions.validations.cc13  = {}
          assertions.validations.cc13.contextualizedCriterion = "All records in a Dataset must have complete Collected Date"
          assertions.validations.cc13.specification = 'Check if the proportion of records in dataset with values (disregarding extra spaces) different to empty for dwc:eventDate  is equal to 100%. Applicable to datasets of Darwin Core based records.'
          assertions.validations.cc13.mechanism = "BDQ Toolkit"
          assertions.validations.cc13.assertion = assertions.measures.cd13.assertion==1?'Compliant':'Not Compliant';

          assertions.validations.cc16  = {}
          assertions.validations.cc16.contextualizedCriterion = "All records in a Dataset must have Occurrence complete"
          assertions.validations.cc16.specification = 'Check if the proportion of records that have values (disregarding extra spaces characters) for both dwc:decimalLatitude and dwc:decimalLongitude that are different to zero or empty and values for dwc:eventDate, dwc:scientificName and dwc:scientificNameAuthorship that are different to empty is equal 100%. Applicable to datasets of Darwin Core based records.'
          assertions.validations.cc16.mechanism = "BDQ Toolkit"
          assertions.validations.cc16.assertion = assertions.measures.cd16.assertion==1?'Compliant':'Not Compliant';

          assertions.validations.cc5  = {}
          assertions.validations.cc5.contextualizedCriterion = "All records in a Dataset must have consistent Coordinates"
          assertions.validations.cc5.specification = 'Check if the proportion of records dwc:decimalLatitude and dwc:decimalLongitude values that are consistent with coordinates ranges (latitudes range from -90 to 90 and longitudes range from -180 to 180) and are consistent with the bounds of dwc:country or close enough (currently defined as 200 km) from the georeference for dwc:country, dwc:stateProvince, dwc:county and dwc:locality is equal 100%. Applicable to datasets of Darwin Core based records.'
          assertions.validations.cc5.mechanism = "BDQ Toolkit"
          assertions.validations.cc5.assertion = assertions.measures.cd5.assertion==1?'Compliant':'Not Compliant';

          assertions.validations.cc10  = {}
          assertions.validations.cc10.contextualizedCriterion = "All records in a Dataset must have accurate SciName"
          assertions.validations.cc10.specification = 'Check if the proportion of records with an exact match of both dwc:scientificName and dwc:scientificNameAuthorship values with nomenclature authorities is equal 100%. Applicable to datasets of Darwin Core based records.'
          assertions.validations.cc10.mechanism = "BDQ Toolkit"
          assertions.validations.cc10.assertion = assertions.measures.cd10.assertion==1?'Compliant':'Not Compliant';

          assertions.validations.cc14  = {}
          assertions.validations.cc14.contextualizedCriterion = "All records of Dataset must have consistent Collected Date"
          assertions.validations.cc14.specification = 'Check if the proportion of records of dwc:eventDate is correctly formatted according to ISO 8601 standard and is before dwc:modified and within life span of collector is equal 100%. Applicable to a dataset of Darwin Core records.'
          assertions.validations.cc14.mechanism = "BDQ Toolkit"
          assertions.validations.cc14.assertion = assertions.measures.cd14.assertion==1?'Compliant':'Not Compliant';

          assertions.validations.cc19  = {}
          assertions.validations.cc19.contextualizedCriterion = "All records in a Dataset must have accurate Occurrence"
          assertions.validations.cc19.specification = 'Check if the proportion of records in dataset with values for dwc:decimalLatitude and dwc:decimalLongitude that are consistent with coordinates ranges (latitudes range from -90 to 90 and longitudes range from -180 to 180) and are consistent with the bounds of dwc:country or close enough (currently defined as 200 km) from the georeference for dwc:country, dwc:stateProvince, dwc:county and dwc:locality and value for dwc:eventDate is correctly formatted according to ISO 8601 standard and is before dwc:modified and within life span of dwc:collectedBy and there is an exact match with both dwc:scientificName and dwc:scientificNameAuthorship values with nomenclature authorities is equal 100%. Applicable to single Darwin Core based records.'
          assertions.validations.cc19.mechanism = "BDQ Toolkit"
          assertions.validations.cc19.assertion = assertions.measures.cd18==1?'Compliant':'Not Compliant';

          saveDQReport(assertions);
        });
    };
    assert();
    function saveDQReport(assertion){
      DQReportControl.upsert(assertion, function (err, dqreport) {
        console.log(dqreport);
      });
    }
  }
}
