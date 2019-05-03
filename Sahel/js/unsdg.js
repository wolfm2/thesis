var UNSDG = {};

// adds UN monies to VIS1
function addToGraph () {
	﻿UNSDG_VIS1.chart.config.data.datasets.forEach(d => d.yAxisID = 'A');
	UNSDG_VIS1.chart.config.options.scales.yAxes[0].id='A';
	
	//var data = UNSDG_VIS0.chart.config.data.datasets[0];
	//var axis = UNSDG_VIS0.chart.config.options.scales.yAxes[0];
	
	//~ data.backgroundColor = data.borderColor = data.pointBorderColor = data.pointBackgroundColor = '#999'
	//~ data.yAxisID = axis.id='B';
	//~ axis.position='right';
	
	UNSDG_VIS1.chart.config.data.datasets.push(UNSDG.unGraphData);
	UNSDG_VIS1.chart.config.options.scales.yAxes.push(UNSDG.unAxisData);
	
	UNSDG_VIS1.chart.update();
}

function UNSDG_init (errors, rows) {
	console.log("UNSDG");
	
	// Init Sliders
	$(".slide-container #change").slider({
		min: 1,
		max: 1000,
		value: 1,
		slide: function(event, ui) {
			$('#change-container #mid').html(ui.value);
			UNSDG.changePercent = ui.value;
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
	
	UNSDG_VIS0.chart.config.options.annotation.annotations[0].xMin = 2015;
	UNSDG_VIS0.chart.config.options.annotation.annotations[0].xMax = 2017;
	UNSDG_VIS0.chart.update();
	$(".slide-container #year").slider({
		range: true,
		min: 2000,
		max: 2017,
		values: [2015,2017],
		slide: function(event, ui) {
      if (ui.values[0] >= ui.values[1] || // prevent overlap
					ui.values[1] <= ui.values[0]) {
            return false;
        }  
			
			
			$('#year-container #low').html(ui.values[0]);
			$('#year-container #high').html(ui.values[1]);
			UNSDG.yearDomainMin = ui.values[0];
			UNSDG.yearDomainMax = ui.values[1];
			UNSDG.yearDomain = range(UNSDG.yearDomainMin, UNSDG.yearDomainMax);
			UNSDG_VIS0.chart.config.options.annotation.annotations[0].xMin = ui.values[0];
			UNSDG_VIS0.chart.config.options.annotation.annotations[0].xMax = ui.values[1];
			UNSDG_VIS0.chart.update();
			}
		
	});
	
	$("#avgButton").button();
	UNSDG.showAvg = true;
	$("#avgButton").on("click", e => {
		var val = $("#averaged-container label").hasClass("ui-state-active"); // val() stopped working
		if (val) {
			$(e.target).button("option", "label", "Sahel Average")
		} else {
			$(e.target).button("option", "label", "Each Country")
		}
		UNSDG.showAvg = val;
		});
	
	$( ".selector" ).button( "option", "label", "new text" );
	
	// init search values 
	
	UNSDG.changePercent = $('.slide-container #change').slider("option", "value");
	UNSDG.yearWindow = $('.slide-container #window').slider("option", "value");
	UNSDG.yearDomainMin = $('.slide-container #year').slider("option", "values")[0];
	UNSDG.yearDomainMax = $('.slide-container #year').slider("option", "values")[1];
	UNSDG.yearDomain = range(UNSDG.yearDomainMin, UNSDG.yearDomainMax);
		
	// UNSDG.nData = d3.nest().key(k=>k["GeoAreaName"]).key(k=>k["TimePeriod"]).key(k=>k["SeriesCode"]).object(rows);
	
	UNSDG.nData = d3.nest().key(k=>k["GeoAreaName"]).key(k=>k["SeriesCode"]).key(k=>k["TimePeriod"]).object(rows);
  UNSDG.ind2goal = {};

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
	sdgChangeNData = {};
	UNSDG.changeNData = sdgChangeNData;
	
	function fC() {
		
		sdgChangeData = [];
		var indicators = Object.keys(UNSDG_indLabels);
		var years = range(UNSDG.yearDomainMin,UNSDG.yearDomainMax)
		
		indicators.forEach((i) => {
			var regionVals = UNSDG.getAgg({countries:sahelNames, name:i, years:years})
			var idxCombos = getArgCombos(range(0,regionVals.length-1));
		
			idxCombos.forEach(d => {
				var arg0 = regionVals[d[0]];
				var arg1 = regionVals[d[1]];
				if (arg0 == 0) return;
				var change = ((arg1 - arg0)/Math.abs(arg0)) * 100;
				if (isNaN(change)) return;
				sdgChangeData.push({s:UNSDG.ind2goal[i], c:'Sahel', i:i, y:[years[d[0]], years[d[1]]], ch:change});
				});
			});
	}
	
	function findChange() {
		// sdgs = Array(17).fill(false);
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
						var change = ((arg1 - arg0)/arg0) * 100;
						
						var firstYear = Object.keys(UNSDG.nData[c][i])[0]
						var sdgNum = UNSDG.nData[c][i][firstYear][0]["Indicator"];
						sdgChangeData.push({s:sdgNum, c:c, i:i, y:yrs, ch:change});
					})
					
				//~ sdgChangeNData = d3.nest().key(k => parseInt(k.s))  // nest the data
					//~ .key(k => Math.abs(k.ch) >= UNSDG.changePercent?"changed":"unchanged")
					//~ .key(k => k.i)
					//~ .key(k => k.ch>0?"good":"bad")
					//~ .key(k => k.c).object(sdgChangeData);
					
			});
		});
	}
	
	UNSDG.getRaw = function (i) {
		return range(2000,2017).map(d=> {
			// var year = UNSDG.nData.Cameroon.AG_FPA_CFPI[d];
			if (UNSDG.nData[i.countries[0]][i.name] == undefined) return NaN;
			var year =  UNSDG.nData[i.countries[0]][i.name][d];
			if (year == undefined) return NaN;
			// return UNSDG.nData.Cameroon.AG_FPA_CFPI[2016][0].Value;
			return UNSDG.nData[i.countries[0]][i.name][d][0].Value;
		});
	}
	
	function arrayFreq(array) { // frequency of non NaN in array
    return array.filter(item => ! isNaN(item)).length;
	}
	
	// get aggregate 
	UNSDG.getAgg = function (i) {
		var series = i.years.map(d=> {
			var vals = i.countries.map(e => {
				if (UNSDG.nData[e][i.name] == undefined)  return NaN;
				var year = UNSDG.nData[e][i.name][d];
				if (year == undefined || year.length > 1) return NaN;
				UNSDG.ind2goal[i.name] = UNSDG.nData[e][i.name][d][0]["Indicator"];
				return UNSDG.nData[e][i.name][d][0].Value;
			});
			var sum = d3.sum(vals);
			var numC = arrayFreq(vals);
			if (numC == 0) return NaN;
			return sum / numC; // return the average of available data
		});
		
		return series;
	}
	
	UNSDG.getGroup = function (i) {
		var series = i.countries.map(e => {
			return [i.years.map(d=> {
				var year = UNSDG.nData[e][i.name][d];
				if (year == undefined) return NaN;
				return UNSDG.nData[e][i.name][d][0].Value;
			})];
		});
		
		return series;
	}
	
	function showChangedSDGs() {
		$("#sdg-results-container .sdg-item, #sdg-results-container .result-txt").remove();
		
		var sdgKeys = Object.keys(sdgChangeNData);
		
		sdgKeys.forEach ((d,i)=>{
			var changedExists = sdgChangeNData[d].changed!=undefined;
			var bucket = changedExists?"#selected":"#unselected";
			var bad = mbad = mgood = good = 0;
			var badList = mbadList = mgoodList = goodList = "";
			
			if (changedExists) {
				var indKeys = Object.keys(sdgChangeNData[d].changed);
				indKeys.forEach(k => {
					var gKey = sdgChangeNData[d].changed[k]["good"];
					var bKey = sdgChangeNData[d].changed[k]["bad"];
					if (gKey != undefined && Object.keys(gKey).length == 10) {
						good++;
						goodList += ` ${d} ${k} good`;
					}
					if (gKey != undefined && Object.keys(gKey).length < 10) {
						mgood++;
						mgoodList += ` ${d} ${k} good`;
					}
					if (bKey != undefined && Object.keys(bKey).length == 10) {
						bad++;
						badList += ` ${d} ${k} bad`;
					}
					if (bKey != undefined && Object.keys(bKey).length < 10) {
						mbad++;
						mbadList += ` ${d} ${k} bad`;
					}
					});
			}
		
			badT = "Indicators where Sahel has worsened.";
			mbadT = "Downward regional trends (Avg.)";
			mgoodT = "Upward regional trends (Avg.)";
			goodT = "Indicators where Sahel has improved.";
			
					//~ <span id="good" class="sdg-match-number" title="${goodT}" data-inds="${goodList}">
						//~ <img class='result-icons ${goodList.length?"img-invert-breathe":""}' src='img/better.svg'>${good}</span>
					//~ <span id="bad" class="sdg-match-number" title="${badT}" data-inds="${badList}">
						//~ <img class='result-icons ${badList.length?"img-invert-breathe":""}' src='img/worse.svg'>${bad}</span>
						
					//<span id="med-good" class="sdg-match-number" title="${mgoodT}" data-inds="${mgoodList}">
					//	<img class='result-icons ${mgoodList.length?"img-invert-breathe":""}' src='img/up.png'>${mgood}</span>
						
			$("#sdg-results-container " + bucket).append(`
				<div id="SDG${i}-item" class="sdg-item" style="border: 2px solid ${SDG.color[i]};">
					<div id="copy">${sdgCopy[i].title}</div>
					
					<span id="med-good" class="sdg-match-number" title="${mgoodT}" data-inds="${mgoodList}">
						<div class='result-icons ${mgoodList.length?"img-invert-breathe":""}'><div style="background:${SDG.color[i]};"></div>${mgood}</div></span>
						
					<span id="med-bad" class="sdg-match-number" title="${mbadT}" data-inds="${mbadList}">
						<div class='result-icons ${mbadList.length?"img-invert-breathe":""}'><div style="background:${SDG.color[i]};"></div>${mbad}</div></span>
				</div> `);
			});
	
		var numAbove = $("#sdg-results-container #selected .sdg-item").length;
		if (numAbove == 0) $("#sdg-results-container #selected").html("<h3 class='result-txt'>No Matching Indicators</h3>");
		var numBelow = $("#sdg-results-container #unselected .sdg-item").length;
		$("#sdg-results-container #unselected #qty").html(numBelow);
		$("#sdg-results-container #unselected .sdg-match-number").hide();
		
		$("#sdg-results-container .sdg-match-number").click(function(e) {
			$('#sdg-results-container #sdg-results-deeper').remove();
			UNSDG_VIS1.indIdx = 0;
			
			var data = [];
			var indArr = $(this).data("inds").slice(1).split(" ");
			if (indArr == "") return;
			indArr = groupBy(indArr, 3);
			indArr.forEach(d => {
				var ckeys = Object.keys(UNSDG.changeNData[d[0]].changed[d[1]][d[2]]);
				ckeys.forEach(e => {
					UNSDG.changeNData[d[0]].changed[d[1]][d[2]][e].forEach(f => data.push(f));
					})
				});
			
			// by indicator, year window, country	
			var nData = d3.nest().key(k => k.i).key(k=> k.y[0] + "-" + k.y[1]).key(k => k.c).object(data)
			
			UNSDG.lvl0_keys = Object.keys(nData).sort(); // indicators
			
			UNSDG_VIS1indicators = [];
			
			UNSDG.lvl0_keys.forEach (i => {
				if (UNSDG.showAvg) var ckeys = ["Sahel"];
				else var ckeys = sahelNames;
				ckeys.forEach (c => {
					 UNSDG_VIS1indicators.push ({
						years: range(2000, 2017),
						countries: UNSDG.showAvg?sahelNames:[c],
						dset:"UNSDG",
						keyName:c + i,
						name: i,
						label: c,
						func:UNSDG.showAvg?"getAgg":"getRaw"
					})
					});
				});
			
			
			UNSDG_VIS1sections = UNSDG.lvl0_keys.map ((i, idx) => {
				i = indArr[idx][1]; // hack!
				
				if (UNSDG.showAvg) var ckeys = ["Sahel"];
				else var ckeys = sahelNames;
				var inds = ckeys.map (c => {
						return "UNSDG:" + c + i;
					});
				
				// var idx = 0;
				var endpoint = UNSDG.changeNData[indArr[idx][0]].changed[indArr[idx][1]][indArr[idx][2]].Sahel[0];
				var change = endpoint.ch	
				return {
						title: "Avg. " + maxSign(change,2) + "% change between: " + endpoint.y[0] + "-" + endpoint.y[1],
						inds: inds,
						colors: UNSDG.showAvg?["#555"]:Chart.colorschemes.tableau.ClassicLight10 // ClassicGray5
					}
				});
			
			// inject axis data
			// UNSDG_VIS1.chart.config.data.datasets[0].yAxisID = 'A'
			// UNSDG_VIS1.chart.config.options.scales.yAxes[0].id='A'
			// inject axis
			// UNSDG_VIS1.chart.config.options.scales.yAxes.push({id:'B', type:'linear', position:"right", ticks:{max:1, min:0}})
			
			UNSDG_VIS1 = {
				container: "#sec-sdg-funding #selected #sdg-results-deeper",
				indIdx: 0,
				datadep: ["UNSDG"],
				indicators: UNSDG_VIS1indicators,
				sections: UNSDG_VIS1sections,
				yearMin: 2000,
				yearMax: 2017,
				graphCfg: defCfgLineGraph,
				accessors: {},
				fill: false
			}
			
			var inds = $(this).data("inds");
			var label = UNSDG_indLabels[UNSDG.lvl0_keys[UNSDG_VIS1.indIdx]];
		  $(this).parent().after(`<div id='sdg-results-deeper'><h4>${label}</h4>
				<canvas style="width:87vw;max-width:90vw;height:50vh;max-height:50vh;" id="indicators"></canvas>
				<div style="text-align:center; max-width: 60%; margin:auto; padding-top:1rem;">
					<span id="title"><h4  style="display:inline;">Loading...</h4></span>
					<img id="back" class="ui-controls" title="Last Measure" src="img/angle-left-solid.svg" style="float:left;">
					<img id="frwd" class="ui-controls" title="Next Measure" src="img/angle-right-solid.svg" style="float:right;">
				</div>
				</div>`);
				
			$("#sec-sdg-funding #sdg-results-container .ui-controls").on("click", d => {
				$("#sdg-results-deeper h4").html(UNSDG_indLabels[UNSDG.lvl0_keys[UNSDG_VIS1.indIdx]]) // update title
				})	
			
		  glueRegister(UNSDG_VIS1, "UNSDG", {getRaw:UNSDG.getRaw, getAgg:UNSDG.getAgg});
		  addToGraph (); // add UN FINANCIAL DATA
		  $("#sdg-results-container .ui-controls").click(function(e) { // next/prev button
				addToGraph(); // add UN FINANCIAL DATA - ugly hack
			});
		  // console.log(sdgChangeNData)
		});
	}
	
	
	$(".slide-container #sdg-search").click(e => {
		$("#sdg-search img").toggle(); // start spinner
		$("#sdg-results-container #selected").html("<h3 class='result-txt'>Gathering Information... </h3>");
		
		setTimeout(()=>{ // super goofy... DOM won't update without js pausing... Goog knows about threads and mutexes, right?
			// findChange();
			fC ();
			var msg = `<h3 class='result-txt'>Comparing ${sdgChangeData.length} datapoints... </h3>`
			$("#sdg-results-container #selected").html(msg);
			
			setTimeout(()=>{
				sdgChangeNData = d3.nest().key(k => parseInt(k.s))  // nest the data
						.key(k => Math.abs(k.ch) >= UNSDG.changePercent?"changed":"unchanged")
						.key(k => k.i)
						.key(k => k.ch>0?"good":"bad")
						.key(k => k.c).object(sdgChangeData);
				UNSDG.changeNData = sdgChangeNData;
						
				showChangedSDGs();
				$("#sdg-search img").toggle(); // end spinner
				},10);
			},10);
		
		});
	
	// findChange() // first search is preloaded
	fC();
	sdgChangeNData = d3.nest().key(k => parseInt(k.s))  // nest the data
						.key(k => Math.abs(k.ch) >= UNSDG.changePercent?"changed":"unchanged")
						.key(k => k.i)
						.key(k => k.ch>0?"good":"bad")
						.key(k => k.c).object(sdgChangeData);
	UNSDG.changeNData = sdgChangeNData;
	showChangedSDGs();
	
}
