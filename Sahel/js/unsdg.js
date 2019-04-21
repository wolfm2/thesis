var UNSDG = {};

function UNSDG_init (errors, rows) {
	console.log("UNSDG");
	
	// UNSDG.nData = d3.nest().key(k=>k["GeoAreaName"]).key(k=>k["TimePeriod"]).key(k=>k["SeriesCode"]).object(rows);
	
	UNSDG.nData = d3.nest().key(k=>k["GeoAreaName"]).key(k=>k["SeriesCode"]).key(k=>k["TimePeriod"]).object(rows);
	
	goodInds = {} // inds w useful name
	sahelNames.forEach((c) => { // print shitty ind names
		Object.keys(UNSDG.nData[c]).forEach((i) => {
			range(2000, 2018).forEach((y) => {
				if (UNSDG.nData[c][i][y] != undefined && UNSDG.nData[c][i][y].length == 1) {
					 // console.log(c,i,y);
					 goodInds[i] = 0;
				 }
				});
			});
		});
		
	UNSDG.changePercent = .8
	UNSDG.yearWindow = 6
	UNSDG.yearDomainMin = 2000
	UNSDG.yearDomainMax = 2017
	UNSDG.yearDomain = range(UNSDG.yearDomainMin, UNSDG.yearDomainMax);
	
	function getArgCombos(keys) { // make all forward combos of args
		var combos = [];
		keys.forEach(function(a1){
			keys.forEach(function(a2){
				if (a2 > a1)
				 combos.push([a1, a2]);
			});
		});
		return combos;
	}
	
	var results = {};
	var windows = {}; // all averages given year window/domain
	function findChange() {
		sahelNames.forEach((c) => {
			Object.keys(UNSDG.nData[c]).forEach((i) => {
				
				if (! i in goodInds) return;  // TODO FIX  killing all shitty named indexes
				
				for (var y = UNSDG.yearDomainMin; UNSDG.yearDomain.includes(y); y++) {
					yVals = range(y, y+UNSDG.yearWindow).map(d => {
						var feature = UNSDG.nData[c][i][d];
						return feature==undefined?undefined:feature[0]["Value"];
						});
					yVals = yVals.filter(d => d!=undefined) // get rid of undefineds
					
					if (yVals.length == 0) continue; // if no vals left... then nothing to do
					
					average = d3.mean(yVals);
					if (! (c in windows)) windows[c] = {};
					if (! (i in windows[c])) windows[c][i] = {};
					windows[c][i][y] = average;
				} 
				
				});
			});
		
		sahelNames.forEach(c => {
			Object.keys(windows[c]).forEach(i => {
				var combos = getArgCombos(Object.keys(windows[c][i])); // get year combos
				combos.forEach(yrs => {
						var arg0 = windows[c][i][yrs[0]];
						var arg1 = windows[c][i][yrs[1]];
						
						if (arg0 == 0) return; // cant divide by zero
						var change = ((arg0 - arg1)/arg0);
						if (Math.abs(change) >= UNSDG.changePercent) {
							if (! (c in results)) results[c] = {};
							if (! (i in results[c])) results[c][i] = [];
							results[c][i].push([yrs[0], yrs[1], arg0, arg1, change]);  // push all changes passing the filter
						}
					})
			});
		});
	}
	
	findChange()
	console.log("here")
	
	$( "#change").slider({
		min: 1,
		max: 1000,
		slide: function(event, ui) {
			$('#change-container #mid').html(ui.value);
			}
		
	});
	
	$( "#window").slider({
		min: 1,
		max: 5,
		slide: function(event, ui) {
			$('#window-container #mid').html(ui.value);
			}
		
	});	
	
	$( "#year").slider({
		range: true,
		min: 2000,
		max: 2017,
		values: [2000,2017],
		slide: function(event, ui) {
			$('#year-container #low').html(ui.values[0]);
			$('#year-container #high').html(ui.values[1]);
			}
		
	});
	
	// check for multiples
	// print indicators which exist for all years across all countries
	
	//~ var inds;
	//~ sahelNames.forEach((c,i) => {
		//~ range(2000, 2018).forEach((y,j) => {
			//~ curKeys = Object.keys(UNSDG.nData[c][y]);
			//~ if (i == 0 && j == 0) inds = curKeys;
			//~ inds = inds.filter(value => curKeys.includes(value)); // get intersection
			//~ });
		//~ });
		
	//~ console.log(inds); // poop
	//~ 0: "SL_EMP_PCAP"
	//~ 1: "NV_IND_MANF"
	//~ 2: "NV_IND_MANFPC"
	//~ 3: "ER_PTD_TERRS"
	//~ 4: "ER_RSK_LSTI"
	
	//~ var testData = d3.nest().key(k=>k["GeoAreaName"]).key(k=>k["SeriesCode"]).object(rows);
	//~ // check for multiples
	//~ // print indicators which exist for all years across all countries
	
	//~ var inds;
	//~ sahelNames.forEach((c,i) => {
			//~ curKeys = Object.keys(testData[c]);
			//~ if (i == 0 ) inds = curKeys;
			//~ inds = inds.filter(value => curKeys.includes(value)); // get intersection
		//~ });
	
	//~ console.log(inds);
}
