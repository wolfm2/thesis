IIAG = {
	nData: null
}

function IIAG_init(errors, rows) {
	console.log("IIAG");
	
	IIAG.nData = d3.nest().key(k=>k["Country"]).key(k=>k["Year"]).object(rows); // cname, year, iname
	//~ IIAG.yearMin = 2009;
	//~ IIAG.yearMax = 2017;

	//~ IIAG.chartInfo = [
		//~ {
			//~ title: "Security: Personal",
			//~ labels: ["Absence of Political Refugees", "Women's Empowerment", "Absence of Riots/Protests"],
			//~ inds: ['PolRefUNHCR', 'WomPolEmpowerVDEM', 'RiotsProtestsACLED'],
			//~ colors: colorRanges[4],
			//~ yearMin: IIAG.yearMin,
			//~ yearMax: IIAG.yearMax
		//~ },
		//~ // 'IntDisPeoIDMC', "Absence of Internally Displaced Peoples", 
		//~ {
			//~ title: "Infrastructure",
			//~ labels: ["Road Network Quality", "Air Transport Quality"],
			//~ inds: ['RoadNetWEF', 'QualAirTransWEF'],
			//~ colors: colorRanges[4],
			//~ yearMin: IIAG.yearMin,
			//~ yearMax: 2012
		//~ },
		//~ {
			//~ title: "State Legitimacy",
			//~ labels: ["Free/Fair Elections", "Absence Legislative Corruption", "Absence Judicial Corruption", "Constraints on Government Power"],
			//~ inds: ['FreeFairElecVDEM', 'AbsLegCorrVDEM', 'AbsJudCorrVDEM', 'ConsGovPowerVDEM'],
			//~ colors: colorRanges[4],
			//~ yearMin: IIAG.yearMin,
			//~ yearMax: IIAG.yearMax
		//~ },
		//~ {
			//~ title: "Services: Education",
			//~ labels: ["Primary Completion", "Secondary Enrollment", "TertiaryEnrollment"],
			//~ inds: ['PrimScholCompWB', 'SecEducEnroUNESCO', 'TertEducEnroUNESCO'],
			//~ colors: colorRanges[4],
			//~ yearMin: IIAG.yearMin,
			//~ yearMax: 2017
		//~ }
	//~ ];
	
	// average country info by indicator
	// make result relative to a year
	// if relYear does not exist for that year, country is cut 
	// if other years dont exist, account for it in avg 
	//~ function makeRelative (year, ind, yearMin, yearMax) {
		//~ var caveats = [];
		//~ var len = range(yearMin, yearMax).length // number of observations
		//~ var total = Array(len).fill(0);
		//~ var avgBy = Array(len).fill(0);
		
		//~ sahelNames.forEach (c => {
			//~ var relYear = +IIAG.nData[c][year][0][ind]; // makes '.' == NaN
			//~ if (isNaN(relYear) || relYear == 0) {
				//~ caveats.push({i:ind, c:c, p:year});
				//~ return;
			//~ }
			
			//~ var yrs = range(yearMin, yearMax)
			//~ var row = yrs.map(d => IIAG.nData[c][d][0][ind]);
			
			//~ row.forEach((d,i)=> {
				//~ if (d != '.' && d != 0 && !isNaN(d)) {
					//~ total[i] += (relYear/+d) * 100;
					//~ avgBy[i]++;
				//~ } else caveats.push({i:ind, c:c, p:yrs[i]});
				//~ });
			//~ });
			
		//~ total.forEach((d,i)=> {
			//~ total[i] = d/avgBy[i];
			//~ });
			
		//~ return {data:total, caveats:caveats}
	//~ }
	
	//~ function setChartData(){
		
		//~ $("#sec-indicators-by-country #title h4").html(IIAG.chartInfo[IIAG.indIdx].title);
		//~ return range(0,IIAG.chartInfo[IIAG.indIdx].inds.length-1).map(i => {
			//~ var cInfo = IIAG.chartInfo[IIAG.indIdx];
			//~ var labels = cInfo.labels[i];
			//~ var colors = cInfo.colors;
			//~ var relData = makeRelative(cInfo.yearMin, cInfo.inds[i], cInfo.yearMin, cInfo.yearMax);
			
			//~ return {
				//~ label: labels,
				//  data: range(IIAG.yearMin, IIAG.yearMax).map(d => IIAG.nData[cInfo.country][d]
				// 																												[0][cInfo.inds[i]]),
				//~ data: relData.data,	
				//~ caveats: relData.caveats,																										
				//~ fill: false,
				//~ borderColor: colors[i],
				//~ pointBorderColor: colors[i],
				//~ pointBackgroundColor: colors[i],
				//~ backgroundColor: colors[i] 
			//~ }
		//~ });
	//~ }
	
	//~ $('#indicators-back').click(function() {
		//~ IIAG.indIdx--;
		//~ if (IIAG.indIdx < 0) IIAG.indIdx = IIAG.chartInfo.length - 1;
		//~ IIAG.chart.config.data.datasets = setChartData();
		//~ IIAG.chart.update();
	//~ });
	
	//~ $('#indicators-frwd').click(function() { 
		//~ IIAG.indIdx++;
		//~ if (IIAG.indIdx >= IIAG.chartInfo.length) IIAG.indIdx = 0;
		//~ IIAG.chart.config.data.datasets = setChartData();
		//~ IIAG.chart.update();
	//~ });
	
	// Individual Indicators
	//~ var ctx = $("#sec-indicators-by-country #indicators")[0].getContext('2d');
	//~ var cfg = jQuery.extend(true, {}, defCfgLineGraph);
	//~ cfg.data.labels = range(IIAG.yearMin, IIAG.yearMax);
	//~ cfg.data.datasets = setChartData();
	//~ IIAG.chart = new Chart(ctx, cfg);
	
		// get series for one country / indicator
	IIAG.getRaw = function(i) {
		return i.years.map(d => IIAG.nData[i.countries][d][0][i.name])
		
		
	}

	// aggregated relative series for several countries / one indicator
	IIAG.relAgg = function(ind) {
		
		var len = ind.countries.length;
		var caveats = []; // countries lacking data for a year
		var total = Array(len).fill(0);
		var avgBy = Array(len).fill(0);
		
		ind.countries.forEach (c => {
			var relVal = IIAG.nData[c][ind.fArgs.relYear][0][ind.name]; // makes '.' == NaN
			if (isNaN(relVal) || relVal == 0) {
				caveats.push({i:ind, c:c, p:ind.fArgs.relYear});
				return;
			}
		
		var row = ind.years.map(d => IIAG.nData[c][d][0][ind.name]);
		
		row.forEach((d,i)=> {
				if (d != '.' && d != 0 && !isNaN(d)) {
					total[i] += (relVal/+d) * 100;
					avgBy[i]++;
				} else caveats.push({i:ind.name, c:c, p:ind.years[i]});
				});
			});
			
		total.forEach((d,i)=> {
			total[i] = d/avgBy[i];
			});
		
		ind.caveats = caveats;
		return total
	}
	
	glueRegister(VIS0, "IIAG", {getRaw:IIAG.getRaw, relAgg:IIAG.relAgg});
}

