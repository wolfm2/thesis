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
	
	WDI.chartInfo = [
		{
			title: "Agriculture",
			country: "Mali", // should be array
			labels: ["Grain Crop Yield","Agri Land (hectares)","Other indicator"],
			inds: ["AG.PRD.CROP.XD", "SN.ITK.DEFC.ZS", "AG.LND.AGRI.ZS"],
			colors: colorRanges[0].slice(1)
		},
		{
			title: "IDP",
			country: "Gambia, The", // should be array
			labels: ["Grain Crop Yield","Agri Land (hectares)","Other indicator"],
			inds: ["AG.LND.AGRI.ZS", "AG.PRD.CROP.XD", "SN.ITK.DEFC.ZS"],
			colors: colorRanges[1].slice(1)
		},
		{
			title: "Jobs",
			country: "Senegal", // should be array
			labels: ["Grain Crop Yield","Agri Land (hectares)","Other indicator"],
			inds: ["AG.PRD.CROP.XD", "AG.LND.AGRI.ZS", "SN.ITK.DEFC.ZS"],
			colors: colorRanges[2].slice(1)
		}		
	];
	
	function setChartData(){
		
		// $("#sec-indicators-by-country #title h4").html(WDI.chartInfo[WDI.indIdx].title);
		return range(0,2).map(i => {
			var cInfo = WDI.chartInfo[WDI.indIdx];
			var labels = cInfo.labels[i];
			var colors = cInfo.colors;
			return {
				label: labels,
				data: range(WDI.yearMin, WDI.yearMax).map(d => WDI.nData[cInfo.country]
																																[cInfo.inds[i]]
																																[0][d]),
				fill: false,
				borderColor: colors[i],
				pointBorderColor: colors[i],
				pointBackgroundColor: colors[i],
				backgroundColor: colors[i] 
			}
		});
	}
	
	//~ $('#indicators-back').click(function() {
		//~ WDI.indIdx--;
		//~ if (WDI.indIdx < 0) WDI.indIdx = WDI.chartInfo.length - 1;
		//~ WDI.chart.config.data.datasets = setChartData();
		//~ WDI.chart.update();
	//~ });
	
	//~ $('#indicators-frwd').click(function() { 
		//~ WDI.indIdx++;
		//~ if (WDI.indIdx >= WDI.chartInfo.length) WDI.indIdx = 0;
		//~ WDI.chart.config.data.datasets = setChartData();
		//~ WDI.chart.update();
	//~ });
	
	//TODO
	// Make interface to multiple indicators
	// Look at indiv WDI indicators / scale them by some year
	// Look at IIAG
	// Look at CROP DATA Pauline gave me
	// Add SDG funding indicators
	
	// Individual Indicators
	//~ var ctx = $("#sec-indicators-by-country #indicators")[0].getContext('2d');
	//~ var cfg = jQuery.extend(true, {}, defCfgLineGraph);
	//~ cfg.data.labels = range(WDI.yearMin, WDI.yearMax);
	//~ cfg.data.datasets = setChartData();
	//~ WDI.chart = new Chart(ctx, cfg);
	// WDI.chart.update();

	// SDG Contrasting Indicators
	var ctx = $("#sec-sdg-funding #indicators")[0].getContext('2d');
	var cfg = jQuery.extend(true, {}, defCfgLineGraph);
	cfg.data.labels = range(WDI.yearMin, WDI.yearMax);
	cfg.data.datasets = setChartData();
	WDI.SDGchart = new Chart(ctx, cfg);	

}
