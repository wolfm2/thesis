// data to chart glue

VIS0 = {
	container: "#sec-indicators-by-country",
	indIdx: 0,
	datadep: ["WDI", "IIAG"],
	indicators: VIS0indicators,
	sections: VIS0sections,
	yearMin: 2009,
	yearMax: 2016,
	graphCfg: defCfgLineGraph,
	accessors: {},
	fill: false
}

UNSDG_VIS0 = {
	container: "#sec-sdg-funding",
	indIdx: 0,
	datadep: ["WDI"],
	indicators: UNSDG_VIS0indicators,
	sections: UNSDG_VIS0sections,
	yearMin: 2000,
	yearMax: 2017,
	graphCfg: defCfgStackedLineGraph,
	accessors: {},
	fill: true
}

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

function glueRegister(obj, ds, accessors) {
	obj.datadep = obj.datadep.filter((d) => {
    return d != ds; // deletes dataset string
		});
		
	obj.accessors[ds] = accessors
		
	if (obj.datadep.length == 0) glueInit(obj); // if no more deps, init
}

function glueSetChartData(obj, action){
	
	var idx = obj.indIdx;
	var overlay = $(obj.container + " canvas#indicators + #overlay");
	obj.indIdx = numRotate(obj.indIdx, obj.sections.length - 1, action);
	
  var cInfo = obj.sections[obj.indIdx];
  
  if (cInfo.infoText == undefined) {
		$(obj.container + "  #title h4").html(cInfo.title);

		var datasets = range(0,cInfo.inds.length-1).map(i => {
			var colors = cInfo.colors;
			var indInfo = obj.indicators[obj.indKey[cInfo.inds[i]]]
			return {
				label: indInfo.label,
				data: obj.accessors[indInfo.dset][indInfo.func](indInfo),
				fill: obj.fill,
				borderColor: colors[i],
				pointBorderColor: colors[i],
				pointBackgroundColor: colors[i],
				backgroundColor: colors[i] 
			}
		});
			
		obj.chart.config.data.datasets = datasets;
		obj.chart.update();
		return;
	}
  
	if (cInfo.infoText != undefined && overlay.css("display") == "none") {
		
		overlay.css("width", $(obj.container + " canvas#indicators").width());
		overlay.css("height", $(obj.container + " canvas#indicators").height());
		overlay.fadeIn(100);
		overlay.css("display", "flex");
		$(obj.container + " canvas#indicators + #overlay #copy").html(cInfo.infoText);
		
		$(obj.container + "  #title h4").html(cInfo.title);
		
		var datasets = range(0,cInfo.inds.length-1).map(i => {
			var colors = cInfo.colors;
			var indInfo = obj.indicators[obj.indKey[cInfo.inds[i]]]
			return {
				label: indInfo.label,
				data: obj.accessors[indInfo.dset][indInfo.func](indInfo),
				fill: false,
				borderColor: colors[i],
				pointBorderColor: colors[i],
				pointBackgroundColor: colors[i],
				backgroundColor: colors[i] 
			}
		});
			
		obj.chart.config.data.datasets = datasets;
		obj.chart.update();
		
	} else {
		//overlay.css("display","none");
		overlay.fadeOut(100);
		obj.indIdx = idx;	// dont advance	
	}
}

glueInit = function(obj) {
	obj.indKey = {};
	obj.indicators.forEach((d,i)=> {
		if ("keyName" in d) obj.indKey[d.dset + ":" + d.keyName] = i;
		else obj.indKey[d.dset + ":" + d.name] = i;
		}) 
	// TODO use keyname if existing
	// use default countries, years, dset, func if not existing
	
	// TODO setup html from template
	var ctx = $(obj.container + " #indicators")[0].getContext('2d');
	var cfg = jQuery.extend(true, {}, obj.graphCfg);
	cfg.data.labels = range(obj.yearMin, obj.yearMax);
	obj.chart = new Chart(ctx, cfg);
	glueSetChartData(obj, 0);
	
	$(obj.container + ' #back').click(function() {
		glueSetChartData(obj, '-');
	});
	
	$(obj.container + ' #frwd').click(function() { 
		glueSetChartData(obj, '+');
	});
	
	$( window ).resize(function() {
		var overlay = $(obj.container + " canvas#indicators + #overlay")

		overlay.css("width", $(obj.container + " canvas#indicators").width());
		overlay.css("height", $(obj.container + " canvas#indicators").height());
	});
}
