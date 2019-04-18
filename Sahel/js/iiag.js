// ConsGovPowerVDEM	AbsJudCorrVDEM	FreeFairElecVDEM
IIAG = {
	nData: null,
	chart: null,
	indIdx: 0
}

function IIAG_init(errors, rows) {
	console.log("IIAG");
	
	IIAG.nData = d3.nest().key(k=>k["Country"]).key(k=>k["Year"]).object(rows); // cname, year, iname
	IIAG.yearMin = 2009;
	IIAG.yearMax = 2017;

	IIAG.chartInfo = [
		{
			title: "Safety 2",
			labels: ["IDPs", "Prot prop rights", "welfare svs", "riots/protests"],
			// 'LivStanPoorAFR', not great data
			inds: ['IntDisPeoIDMC', 'ProtPropRigWEF', 'WelfServWB', 'RiotsProtestsACLED'], 
			colors: colorRanges[4],
			yearMin: IIAG.yearMin,
			yearMax: IIAG.yearMax
		}, 
		{
			title: "Pol 2",
			labels: ["jud autonomy", "free fair elect", "Abs legi corrupt", "Access to justice", "agr budget cost", "abs of refugees"],
			inds: ['JudAutWEF', 'FreeFairExecElecCDD', 'AbsLegCorrVDEM', 'AccJusticeVDEM', 'AgPolCostWEF', 'PolRefUNHCR'],
			colors: colorRanges[4],
			yearMin: IIAG.yearMin,
			yearMax: IIAG.yearMax
		},
		{
			title: "Business",
			labels: ["restrict frgn invest", "Customs", "Bus regulatory env", "Good banks"],
			inds: ['AbsRestForInvWEF', 'CustProcWEF', 'CompEnvWB', 'SoundBanksWEF'],
			colors: colorRanges[4],
			yearMin: IIAG.yearMin,
			yearMax: IIAG.yearMax
		},
		{
			title: "Government",
			labels: ["Constraints on GovPower","Absence Judicial Corruption","Free Fair Elections"],
			inds: ["ConsGovPowerVDEM", "AbsJudCorrVDEM", "FreeFairElecVDEM"],
			colors: colorRanges[4],
			yearMin: IIAG.yearMin,
			yearMax: IIAG.yearMax
		},
		{
			title: "Education",
			labels: ["Edu mgmt", "Secondary enroll", "gen bal", "tert enroll", "primary complet"],
			inds: ['EducSysMgmtWEF', 'SecEducEnroUNESCO', 'GenBalEducUNESCO', 'TertEducEnroUNESCO', 'PrimScholCompWB'],
			colors: colorRanges[4],
			yearMin: IIAG.yearMin,
			yearMax: IIAG.yearMax
		},
		{
			title: "Gender",
			labels: ["women parliment", "women empowerment"],
			inds: ['WomLabForPartWB', 'WomPolEmpowerVDEM'],
			colors: colorRanges[4],
			yearMin: IIAG.yearMin,
			yearMax: IIAG.yearMax
		},
		{
			title: "Infrastructure",
			labels: ["Electric", "Air", "executive transparency and account", "Roads"],
			inds: ['ElecSuppWEF', 'QualAirTransWEF', 'ExecAccTransWB', 'RoadNetWEF'],
			colors: colorRanges[4],
			yearMin: IIAG.yearMin,
			yearMax: IIAG.yearMax
		},
		{
			title: "Pol 1",
			labels: ["Diversion pub funds", "Fed budget", "Abs Gov Favoritism", "Constraints gov pwr", "Abs Jud Corrupt", "Free fair elect"],
			inds: ['AbsDivPubFundWEF', 'BudgMgmtWB','AbsFavGovDecWEF', 'ConsGovPowerVDEM','AbsJudCorrVDEM', 'FreeFairElecVDEM',],
			colors: colorRanges[4],
			yearMin: IIAG.yearMin,
			yearMax: IIAG.yearMax
		},
		{
			title: "Safety 1",
			labels: ["Food Dep", "media impartial", "Abs Violent Crime", "Human Traf", "Pol Services reliability"],
			// not great data , 'WatDepAFR'
			inds: ['FooDepAFR', 'MedImpVDEM', 'ViolCrimeEIU', 'HumTraffUSDS', 'PolServWEF'],
			colors: colorRanges[4],
			yearMin: IIAG.yearMin,
			yearMax: IIAG.yearMax
		},		
	];
	
	// average country info by indicator
	// make result relative to a year
	// if relYear does not exist for that year, country is cut 
	// if other years dont exist, account for it in avg 
	function makeRelative (year, ind, yearMin, yearMax) {
		var caveats = [];
		var len = range(yearMin, yearMax).length // number of observations
		var total = Array(len).fill(0);
		var avgBy = Array(len).fill(0);
		
		sahelNames.forEach (c => {
			var relYear = +IIAG.nData[c][year][0][ind]; // makes '.' == NaN
			if (isNaN(relYear) || relYear == 0) {
				caveats.push({i:ind, c:c, p:year});
				return;
			}
			
			var yrs = range(yearMin, yearMax)
			var row = yrs.map(d => IIAG.nData[c][d][0][ind]);
			
			row.forEach((d,i)=> {
				if (d != '.' && d != 0 && !isNaN(d)) {
					total[i] += (relYear/+d) * 100;
					avgBy[i]++;
				} else caveats.push({i:ind, c:c, p:yrs[i]});
				});
			});
			
		total.forEach((d,i)=> {
			total[i] = d/avgBy[i];
			});
			
		return {data:total, caveats:caveats}
	}
	
	function setChartData(){
		
		$("#sec-indicators-by-country #title h4").html(IIAG.chartInfo[IIAG.indIdx].title);
		return range(0,IIAG.chartInfo[IIAG.indIdx].inds.length-1).map(i => {
			var cInfo = IIAG.chartInfo[IIAG.indIdx];
			var labels = cInfo.labels[i];
			var colors = cInfo.colors;
			var relData = makeRelative(cInfo.yearMin, cInfo.inds[i], cInfo.yearMin, cInfo.yearMax);
			
			return {
				label: labels,
				//~ data: range(IIAG.yearMin, IIAG.yearMax).map(d => IIAG.nData[cInfo.country][d]
																																//~ [0][cInfo.inds[i]]),
				data: relData.data,	
				caveats: relData.caveats,																										
				fill: false,
				borderColor: colors[i],
				pointBorderColor: colors[i],
				pointBackgroundColor: colors[i],
				backgroundColor: colors[i] 
			}
		});
	}
	
	$('#indicators-back').click(function() {
		IIAG.indIdx--;
		if (IIAG.indIdx < 0) IIAG.indIdx = IIAG.chartInfo.length - 1;
		IIAG.chart.config.data.datasets = setChartData();
		IIAG.chart.update();
	});
	
	$('#indicators-frwd').click(function() { 
		IIAG.indIdx++;
		if (IIAG.indIdx >= IIAG.chartInfo.length) IIAG.indIdx = 0;
		IIAG.chart.config.data.datasets = setChartData();
		IIAG.chart.update();
	});
	
	//TODO
	// Make interface to multiple indicators
	// Look at indiv WDI indicators / scale them by some year
	// Look at IIAG
	// Look at CROP DATA Pauline gave me
	// Add SDG funding indicators
	
	// Individual Indicators
	var ctx = $("#sec-indicators-by-country #indicators")[0].getContext('2d');
	var cfg = jQuery.extend(true, {}, defCfgLineGraph);
	cfg.data.labels = range(IIAG.yearMin, IIAG.yearMax);
	cfg.data.datasets = setChartData();
	IIAG.chart = new Chart(ctx, cfg);
}

