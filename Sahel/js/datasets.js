	
// TODO
// Create warnings log for all missing data. Eg: Mali does not have 2008

// pre-massage dataset, derive country and year, indicators from raw read
// TODO: check if key exists rather than adding a default one only to overwrite it
function dsImport (importList, dataInit) {
  Object.keys(importList).forEach((path) => {
		d3.csv("data/" + path, 
		  function(d, i, headers) {
				var accessors = {};
				headers.forEach ((e) => { // build default list
					accessors[e] = d[e];
					});
				accessors['Year'] = +d.Year;
				var exceptions = dsImportList[path].exceptions;
				Object.keys(exceptions).forEach ((e) => { // build exception list
					if (exceptions[e] == Number)
						accessors[e] = +d[e];
					});
				return accessors;
			},
			function(error, rows) {
				// console.log(rows);
				// check errors
				dataInit(rows);
			});
		});
}

