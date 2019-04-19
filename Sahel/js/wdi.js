WDI = {
	nData: null,
	chart: null,
	indIdx: 0
}

function WDI_init(errors, rows) {
	console.log("WDI");
	WDI.nData = d3.nest().key(k=>k["Country Name"]).key(k=>k["Indicator Code"]).object(rows); // cname, iname, year
	WDI.yearMin = 2007;
	WDI.yearMax = 2016;
	
	// get series for one country / indicator
	WDI.getRaw = function(key) {
		var i = WDI.indicators[WDI.indKey[key]];
		return i.years.map(d => WDI.nData[i.countries[0]][i.name][0][d])
	}
	
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

	// aggregated relative series for several countries / one indicator
	WDI.relAgg = function(key) {
		var ind = WDI.indicators[WDI.indKey[key]];
		
		var len = ind.countries.length;
		var caveats = []; // countries lacking data for a year
		var total = Array(len).fill(0);
		var avgBy = Array(len).fill(0);
		
		ind.countries.forEach (c => {
			var relVal = WDI.nData[c][ind.name][0][ind.fArgs.relYear]; // makes '.' == NaN
			if (isNaN(relVal) || relVal == 0) {
				caveats.push({i:ind, c:c, p:ind.fArgs.relYear});
				return;
			}
		
		var row = ind.years.map(d => WDI.nData[c][ind.name][0][d]);
		
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
		// return i.years.map(d => WDI.nData["Mali"][i.name][0][d])
	}
	
	WDI.indicators = [
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"EN.POP.DNST",
		label:"Pop density",
		func:WDI.relAgg,
		fArgs:{relYear:WDI.yearMin}
	},
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"SP.POP.GROW",
		label:"pop growth",
		func:WDI.relAgg,
		fArgs:{relYear:WDI.yearMin}
	},
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"SM.POP.REFG.OR",
		label:"Refugees from org",
		func:WDI.relAgg,
		fArgs:{relYear:WDI.yearMin}
	},
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"SH.STA.BASS.RU.ZS",
		label:"rural sanit svc",
		func:WDI.relAgg,
		fArgs:{relYear:WDI.yearMin}
	},
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"SH.STA.BASS.ZS",
		label:"all sani svc",
		func:WDI.relAgg,
		fArgs:{relYear:WDI.yearMin}
	},
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"MS.MIL.XPND.CD",
		label:"military expenditure",
		func:WDI.getRaw
	},
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"VC.IDP.NWDS",
		label:"idps",
		func:WDI.relAgg,
		fArgs:{relYear:WDI.yearMin}
	},
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"SH.XPD.CHEX.PC.CD",
		label:"per capita health expend",
		func:WDI.relAgg,
		fArgs:{relYear:WDI.yearMin}
	},
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"SP.DYN.TFRT.IN",
		label:"births per woman",
		func:WDI.getRaw
	},
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"AG.PRD.FOOD.XD",
		label:"food production",
		func:WDI.relAgg,
		fArgs:{relYear:WDI.yearMin}
	},
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"FP.CPI.TOTL.ZG",
		label:"inflation %",
		func:WDI.relAgg,
		fArgs:{relYear:WDI.yearMin}
	},
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"SP.ADO.TFRT",
		label:"ado fertility rate",
		func:WDI.getRaw
	},
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"AG.LND.ARBL.HA.PC",
		label:"ariable land",
		func:WDI.relAgg,
		fArgs:{relYear:WDI.yearMin}
	},
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"AG.PRD.CREL.MT",
		label:"relative cerial yield",
		func:WDI.relAgg,
		fArgs:{relYear:WDI.yearMin}
	},
	{
		years: range(WDI.yearMin, WDI.yearMax),
		countries: sahelNames,
		dset:"WDI",
		name:"AG.YLD.CREL.KG",
		label:"cerial yield kg",
		func:WDI.relAgg,
		fArgs:{relYear:WDI.yearMin}
	},
	]
	
	WDI.indKey = {};
	WDI.indicators.forEach((d,i)=>WDI.indKey[d.dset + ":" + d.name] = i) 
	// TODO use keyname if existing
	// use default countries, years, dset, func if not existing
	
	WDI.chartInfo = [
		{
			title: "Agriculture",
			inds: ["WDI:EN.POP.DNST", "WDI:SP.POP.GROW", "WDI:SM.POP.REFG.OR"],
			infoText: "Stuff",
			colors: colorRanges[0].slice(1)
		},
		{
			title: "IDP",
			inds: ["WDI:SH.STA.BASS.RU.ZS", "WDI:SH.STA.BASS.ZS", "WDI:MS.MIL.XPND.CD", "WDI:VC.IDP.NWDS"],
			infoText: "Stuff",
			colors: colorRanges[1].slice(1)
		},
		{
			title: "Jobs",
			inds: ["WDI:SH.XPD.CHEX.PC.CD", "WDI:SP.DYN.TFRT.IN", "WDI:AG.PRD.FOOD.XD", "WDI:FP.CPI.TOTL.ZG"],
			infoText: "Stuff",
			colors: colorRanges[2].slice(1)
		},
		{
			title: "stuff",
			inds: ["WDI:SP.ADO.TFRT", "WDI:AG.LND.ARBL.HA.PC", "WDI:AG.PRD.CREL.MT", "WDI:AG.YLD.CREL.KG"],
			infoText: "Stuff",
			colors: colorRanges[2].slice(1)
		}		
	];
	
	function setChartData(action){
		
		var idx = WDI.indIdx;
		switch(action) {
			case '-':
				idx--;
				if (idx < 0) idx = WDI.chartInfo.length - 1;
				break;
			case '+':
				idx++;
				if (idx >= WDI.chartInfo.length) idx = 0
				break;
			default:
				WDI.indIdx = action;
		}

		var cInfo = WDI.chartInfo[WDI.indIdx];
		
		var overlay = $(WDI.container + " canvas#indicators + #overlay")
		if (cInfo.infoText != undefined && overlay.css("display") == "none") {
			overlay.css("width", $(WDI.container + " canvas#indicators").width());
			overlay.css("height", $(WDI.container + " canvas#indicators").height());
			overlay.fadeIn(100);
			overlay.css("display", "flex");
			$(WDI.container + " canvas#indicators + #overlay #copy").html(cInfo.infoText);
			
			$(WDI.container + "  #title h4").html(WDI.chartInfo[WDI.indIdx].title);
			

		} else {
			//overlay.css("display","none");
			overlay.fadeOut(100);
			WDI.indIdx = idx;		
			return;
		}
		
		var datasets =  range(0,cInfo.inds.length-1).map(i => {
			var colors = cInfo.colors;
			var indInfo = WDI.indicators[WDI.indKey[cInfo.inds[i]]]
			return {
				label: indInfo.label,
				data: indInfo.func(cInfo.inds[i]),
				fill: false,
				borderColor: colors[i],
				pointBorderColor: colors[i],
				pointBackgroundColor: colors[i],
				backgroundColor: colors[i] 
			}
		});
		

		WDI.chart.config.data.datasets = datasets;
		WDI.chart.update();

	}
	
	// Individual Indicators
	//~ var ctx = $("#sec-indicators-by-country #indicators")[0].getContext('2d');
	//~ var cfg = jQuery.extend(true, {}, defCfgLineGraph);
	//~ cfg.data.labels = range(WDI.yearMin, WDI.yearMax);
	//~ cfg.data.datasets = setChartData();
	//~ WDI.chart = new Chart(ctx, cfg);
	// WDI.chart.update();

	WDI.container = "#sec-sdg-funding"

	// SDG Contrasting Indicators
	var ctx = $("#sec-sdg-funding #indicators")[0].getContext('2d');
	var cfg = jQuery.extend(true, {}, defCfgLineGraph);
	cfg.data.labels = range(WDI.yearMin, WDI.yearMax);
	WDI.chart = new Chart(ctx, cfg);
	setChartData(0);

	$('#change-back').click(function() {
		setChartData('-');
	});
	
	$('#change-frwd').click(function() { 
		setChartData('+');
	});

}
