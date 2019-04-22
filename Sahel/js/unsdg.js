var UNSDG = {};

function UNSDG_init (errors, rows) {
	console.log("UNSDG");
	
	// Init Sliders
	$(".slide-container #change").slider({
		min: 1,
		max: 1000,
		value: 400,
		slide: function(event, ui) {
			$('#change-container #mid').html(ui.value);
			UNSDG.changePercent = ui.value/100;
			}
		
	});
	
	$(".slide-container #window").slider({
		min: 1,
		max: 5,
		slide: function(event, ui) {
			$('#window-container #mid').html(ui.value);
			UNSDG.yearWindow = ui.value;
			}
		
	});	
	
	$(".slide-container #year").slider({
		range: true,
		min: 2000,
		max: 2017,
		values: [2015,2017],
		slide: function(event, ui) {
			$('#year-container #low').html(ui.values[0]);
			$('#year-container #high').html(ui.values[1]);
			UNSDG.yearDomainMin = ui.values[0];
			UNSDG.yearDomainMax = ui.values[1];
			UNSDG.yearDomain = range(UNSDG.yearDomainMin, UNSDG.yearDomainMax);
			}
		
	});
	
	// init search values 
	
	UNSDG.changePercent = $('.slide-container #change').slider("option", "value")/100;
	UNSDG.yearWindow = $('.slide-container #window').slider("option", "value");
	UNSDG.yearDomainMin = $('.slide-container #year').slider("option", "values")[0];
	UNSDG.yearDomainMax = $('.slide-container #year').slider("option", "values")[1];
	UNSDG.yearDomain = range(UNSDG.yearDomainMin, UNSDG.yearDomainMax);
		
	// UNSDG.nData = d3.nest().key(k=>k["GeoAreaName"]).key(k=>k["TimePeriod"]).key(k=>k["SeriesCode"]).object(rows);
	
	UNSDG.nData = d3.nest().key(k=>k["GeoAreaName"]).key(k=>k["SeriesCode"]).key(k=>k["TimePeriod"]).object(rows);
	
	goodInds = {} // inds w useful name
	sahelNames.forEach((c) => { // print shitty ind names
		Object.keys(UNSDG.nData[c]).forEach((i) => {
			range(2000, 2018).forEach((y) => {
				if (UNSDG.nData[c][i][y] != undefined && UNSDG.nData[c][i][y].length == 1) {
					 goodInds[i] = 0;
				 }
				});
			});
		});

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
	
	var windows; // all averages given year window/domain
	
	var sdgChangeData; // raw
	var sdgChangeNData; // nested
	
	function findChange() {
		resultsByCountry = {};
		resultsByIndicator = {};
		sdgs = Array(17).fill(false);
		windows = {};
		sdgChangeData = [];
				
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
						
						var firstYear = Object.keys(UNSDG.nData[c][i])[0]
						var sdgNum = UNSDG.nData[c][i][firstYear][0]["Indicator"];
						sdgChangeData.push({s:sdgNum, c:c, i:i, y:yrs, ch:change});
					})
					
				sdgChangeNData = d3.nest().key(k => parseInt(k.s))  // nest the data
					.key(k => Math.abs(k.ch) >= UNSDG.changePercent?"changed":"unchanged")
					.key(k => k.i)
					.key(k => k.ch>0?"good":"bad")
					.key(k => k.c).object(sdgChangeData);
					
			});
		});
	}
	
	function showChangedSDGs() {
		$("#sdg-results-container .sdg-item").remove();
		
		var sdgKeys = Object.keys(sdgChangeNData);
		
		sdgKeys.forEach ((d,i)=>{
			var changedExists = sdgChangeNData[d].changed!=undefined;
			var bucket = changedExists?"#selected":"#unselected";
			var bad = mbad = mgood = good = 0;
			
			if (changedExists) {
				var indKeys = Object.keys(sdgChangeNData[d].changed);
				indKeys.forEach(k => {
					var gKey = sdgChangeNData[d].changed[k]["good"];
					var bKey = sdgChangeNData[d].changed[k]["bad"];
					if (gKey != undefined && Object.keys(gKey).length == 10) good++;
					if (gKey != undefined && Object.keys(gKey).length < 10) mgood++;
					if (bKey != undefined && Object.keys(bKey).length == 10) bad++;
					if (bKey != undefined && Object.keys(bKey).length < 10) mbad++;
					});
			}
		
			badT = "Indicators for which Sahel has gotten worse. (click for more)";
			mbadT = "Indicators for which part of Sahel has gotten worse. (click for more)";
			mgoodT = "Indicators for which part of Sahel has gotten better. (click for more)";
			goodT = "Indicators for which Sahel has gotten better. (click for more)";
			
			$("#sdg-results-container " + bucket).append(`
				<div id="SDG${i}-item" class="sdg-item" style="background:${SDG.color[i]};">
					<div id="copy">${sdgCopy[i].title}</div>
					<span id="bad" class="sdg-match-number" title="${badT}">${bad}</span>
					<span id="med-bad" class="sdg-match-number" title="${mbadT}">${mbad}</span>
					<span id="med-good" class="sdg-match-number" title="${mgoodT}">${mgood}</span>
					<span id="good" class="sdg-match-number" title="${goodT}">${good}</span>
				</div> `);
			});
	
		var numAbove = $("#sdg-results-container #unselected .sdg-item").length;
		if (numAbove == 0) $("#sdg-results-container #selected").html("<h3 id='no-match'>No Matching Indicators</h3>");
		var numBelow = $("#sdg-results-container #unselected .sdg-item").length;
		$("#sdg-results-container #unselected #qty").html(numBelow);
		$("#sdg-results-container #unselected .sdg-match-number").hide();
	}
	
	
	$(".slide-container #sdg-search").click(e => {
		$("#sdg-search img").toggle(); // start spinner
		
		setTimeout(()=>{ // super goofy... DOM won't update without js pausing
			findChange()
			showChangedSDGs();
			$("#sdg-search img").toggle(); // end spinner
			},10);
		
		});
	
	findChange()
	showChangedSDGs();
	
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
