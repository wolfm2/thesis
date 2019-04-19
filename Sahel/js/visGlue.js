// data to chart glue

VIS0 = {
	container: "#sec-sdg-funding",
	indIdx: 0,
	datadep: ["WDI"],
	indicators: VIS0indicators,
	sections: VIS0sections,
	yearMin: 2007,
	yearMax: 2016,
	accessors: {}
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
	switch(action) {
		case '-':
			idx--;
			if (idx < 0) idx = obj.sections.length - 1;
			break;
		case '+':
			idx++;
			if (idx >= obj.sections.length) idx = 0
			break;
		default:
			obj.indIdx = action;
	}

	var cInfo = obj.sections[obj.indIdx];
	var overlay = $(obj.container + " canvas#indicators + #overlay")
	
	if (cInfo.infoText != undefined && overlay.css("display") == "none") {
		overlay.css("width", $(obj.container + " canvas#indicators").width());
		overlay.css("height", $(obj.container + " canvas#indicators").height());
		overlay.fadeIn(100);
		overlay.css("display", "flex");
		$(obj.container + " canvas#indicators + #overlay #copy").html(cInfo.infoText);
		
		$(obj.container + "  #title h4").html(obj.sections[obj.indIdx].title);
	} else {
		//overlay.css("display","none");
		overlay.fadeOut(100);
		obj.indIdx = idx;		
		return;
	}
	
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
}

glueInit = function(obj) {
	obj.indKey = {};
	obj.indicators.forEach((d,i)=>obj.indKey[d.dset + ":" + d.name] = i) 
	// TODO use keyname if existing
	// use default countries, years, dset, func if not existing
	
	// TODO setup html from template
	var ctx = $(obj.container + " #indicators")[0].getContext('2d');
	var cfg = jQuery.extend(true, {}, defCfgLineGraph);
	cfg.data.labels = range(obj.yearMin, obj.yearMax);
	obj.chart = new Chart(ctx, cfg);
	glueSetChartData(obj, 0);
	
	$(obj.container + ' #change-back').click(function() {
		glueSetChartData(obj, '-');
	});
	
	$(obj.container + ' #change-frwd').click(function() { 
		glueSetChartData(obj, '+');
	});
}