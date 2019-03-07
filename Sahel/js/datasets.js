// metadata for indicators
// min max mean
// distribution
// filtered range
// categorical, nominal, interval, float, int, float-precision

// TODO
// Create warnings log for all missing data. Eg: Mali does not have 2008

// pre-massage dataset, derive country and year, indicators from raw read
// TODO: check if key exists rather than adding a default one only to overwrite it
class dataset {
	init (importList, dataInit) {
		this.names = {};
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
					var keys = Object.keys(rows[0]);
					// Associate indicators with dataset. CB doesn't allow added data.   
					var dsName = displayDatasetNames[JSON.stringify(keys)];  // wow this is stupid.
					ds.names[dsName] = rows;
					// console.log(rows);
					// check errors
					dataInit(rows);
				});
			});
	}
	
	// get info on specific indicator
	minMax (ds, ind) {
		var rows = this.names[ds];
		var min = d3.min(rows, function(d) { return d[ind]; })
		var max = d3.max(rows, function(d) { return d[ind]; })
		
		return ({min:min, max:max});
	}
	
	// get number precision
	precision(a) { // https://stackoverflow.com/questions/9553354/how-do-i-get-the-decimal-places-of-a-floating-point-number-in-javascript
		if (isNaN(a)) return 0;
		if (!isFinite(a)) return 0;
		var e = 1, p = 0;
		while (Math.round(a * e) / e !== a) { e *= 10; p++; }
		return p;
	}
	
	maxPrecision (dset, ind) {
		var rows = this.names[dset];
		var max = d3.max(rows, function(d) { 
			return ds.precision(d[ind]); // TODO: DONT USE OBJECT NAME!
			});
		return max;
	}
}
