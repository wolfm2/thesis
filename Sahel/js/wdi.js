WDI = {
	nData: null,
	chart: null
}

function WDI_init(errors, rows) {
	console.log("WDI");
	WDI.nData = d3.nest().key(k=>k["Country Name"]).key(k=>k["Indicator Code"]).object(rows); // cname, iname, year
	WDI.yearMin = 2007;
	WDI.yearMax = 2016;
	
	var inds = [["AG.PRD.CROP.XD", "AG.LND.AGRI.ZS", "SN.ITK.DEFC.ZS"]];
	
	function setChartData(){
		var colorSet = range(0,3).map(d => colorRanges[d].slice(1)); // take last 3 colors
		
		return range(0,2).map(i => {
			var labels = inds[0][i];
			var colors = colorSet[0];
			return {
				label: labels,
				data: range(WDI.yearMin, WDI.yearMax).map(d => WDI.nData["Mali"][inds[0][i]][0][d]),
				fill: false,
				borderColor: colors[i],
				pointBorderColor: colors[i],
				pointBackgroundColor: colors[i],
				backgroundColor: colors[i] 
			}
		});
	}


	//TODO
	// Make interface to multiple indicators
	// Look at indiv WDI indicators / scale them by some year
	// Look at IIAG
	// Look at CROP DATA Pauline gave me
	// Add SDG funding indicators
	
	// Individual Indicators
	var ctx = $("#sec-indicators-by-country #indicators")[0].getContext('2d');
	var cfg = jQuery.extend(true, {}, defCfgLineGraph);
	cfg.data.labels = range(WDI.yearMin, WDI.yearMax);
	cfg.data.datasets = setChartData();
	WDI.chart = new Chart(ctx, cfg);
	// WDI.chart.update();

	// SDG Contrasting Indicators
	var ctx = $("#sec-sdg-funding #indicators")[0].getContext('2d');
	var cfg = jQuery.extend(true, {}, defCfgLineGraph);
	cfg.data.labels = range(WDI.yearMin, WDI.yearMax);
	cfg.data.datasets = setChartData();
	WDI.chart = new Chart(ctx, cfg);	

}
