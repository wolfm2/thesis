
var FSI = {
	nData:null,
	dataMin:null,
	dataMax:null,
	yearCur:null,
	yearMin:null,
	yearMax:null,
	bigCountry:null,
	bigIsComposite:true,
	updateList:[],
	action:"play",
	intervalCookie:null,
	rankColor:null,
	chart: null,
	chartDataIdx: 0,
	starLabels: ["Cohesion", "Economic", "Political", "Social"]
};

function starUpdate() {
	FSI.updateList.forEach((d,i) => {
		fsi_star_cb(d.t, d.isSmall);
		});
		
	FSI.chart.config.options.annotation.annotations[0].value = FSI.yearCur;
	FSI.chart.update();
}

// iframe onload callback 
// t == this
// isSmall == true for small stars
function fsi_star_cb(t,isSmall) {
	// var iC = window.frames["vis-ifs-lvl0-big"].contentWindow;
	var iC = t.contentWindow
	
	if (isSmall) {
		var d = FSI.nData[FSI.yearCur][$(t).data()["name"]][0];
		var chartColor = FSI.rankColor(parseInt(d.Rank)); // previously "#41b6c4";
		iC.RadarChart.defaultConfig.color = function() {return chartColor};
		iC.chart.config({factor: .85, maxValue: FSI.dataMax, minValue: FSI.dataMin, axisText: false, levels: 0, circles: false});
		
		// if not registered - register for iframe clicks
		if (! FSI.updateList.includes(t)) {
			$(t).contents().on("click", function(e){
				FSI.bigCountry = $(t).data()["name"];
				$("#vis-ifs-lvl0-big").each(function() { // should only be one
					fsi_star_cb(this, false);
					});
				});	
		}
		
		$(`#grid-inner h6[data-name="${d.Country}"]`).html(`Rank: ${d.Rank}`);
	} else {
		$("#vis-big-title").html(`${FSI.bigCountry} - ${FSI.bigIsComposite?"Composite":"Individual"}`);
		var d = FSI.nData[FSI.yearCur][FSI.bigCountry][0];
		iC.RadarChart.defaultConfig.color = function() {return "#7fcdbb"};
		iC.chart.config({factor: .75, maxValue: FSI.dataMax, minValue: FSI.dataMin, radius: 6});		
		
		$("#fsi-star-year-bg").html(FSI.yearCur); // Update year
		
		// iframe big star label hover
		iC.mw.mouseoverFcn = function(d) {
			var l = d3.select(this).html()
			var idx = FSI.starLabels.indexOf(l);
			
			if (FSI.chartDataIdx != idx) {
				FSI.chartDataIdx = idx;
				FSI.chart.config.data.datasets = setChartData();
				FSI.chart.update();
			}
			};
	}
	
	var cohesion = (d["C1: Security Apparatus"] + d["C2: Factionalized Elites"] + d["C3: Group Grievance"])/3;
	var economic = (d["E1: Economy"] + d["E2: Economic Inequality"] + d["E3: Human Flight and Brain Drain"])/3;
	var political = (d["P1: State Legitimacy"] + d["P2: Public Services"] + d["P3: Human Rights"])/3;
	var social = (d["S1: Demographic Pressures"] + d["S2: Refugees and IDPs"] + d["X1: External Intervention"])/3;
	
	var starData = [{
		className: FSI.bigCountry,
		axes: [
			{axis: "Cohesion", value: maxSign(cohesion), yOffset: 15}, //xOffset: -20   does not work
			{axis: "Economic", value: maxSign(economic)}, 
			{axis: "Political", value: maxSign(political), yOffset: -15},  
			{axis: "Social", value: maxSign(social)},  
		]
	}];
	
	iC.data = starData;
	iC.render();
	
	if (FSI.updateList.filter((d) => {return d.t == t}).length == 0) { // register for updates
		FSI.updateList.push({t:t, isSmall:isSmall});
	} 
}

var colorRanges = [Chart.colorschemes.brewer.OrRd4, Chart.colorschemes.brewer.RdPu4, Chart.colorschemes.brewer.PuBuGn4, Chart.colorschemes.brewer.BuGn4];
var colNames = [["C1: Security Apparatus", "C2: Factionalized Elites", "C3: Group Grievance"], 
								["E1: Economy", "E2: Economic Inequality", "E3: Human Flight and Brain Drain"], 
								["P1: State Legitimacy", "P2: Public Services", "P3: Human Rights"], 
								["S1: Demographic Pressures", "S2: Refugees and IDPs", "X1: External Intervention"]];

function setChartData(){
	var colorSet = range(0,3).map(d => colorRanges[d].slice(1)); // take last 3 colors
	
	return range(0,2).map(i => {
		var labels = colNames[FSI.chartDataIdx];
		var colors = colorSet[FSI.chartDataIdx];
		return {
			label: labels[i],
			data: range(FSI.yearMin, FSI.yearMax).map(d => FSI.nData[d][FSI.bigCountry][0][labels[i]]),
			fill: false,
			borderColor: colors[i],
			pointBorderColor: colors[i],
			pointBackgroundColor: colors[i],
			backgroundColor: colors[i] 
		}
	});
}

function FSI_init(rows) {
	console.log("FSI");
	
	FSI.nData = d3.nest().key(k=>k.Year).key(k=>k.Country).object(rows); // nested
	
	FSI.dataMin =d3.min(rows, d => {return d3.min([
		d["C1: Security Apparatus"], d["C2: Factionalized Elites"], d["C3: Group Grievance"],
		d["E1: Economy"], d["E2: Economic Inequality"], d["E3: Human Flight and Brain Drain"],
		d["P1: State Legitimacy"], d["P2: Public Services"], d["P3: Human Rights"],
		d["S1: Demographic Pressures"], d["S2: Refugees and IDPs"], d["X1: External Intervention"]
		])
		});	
	FSI.dataMax =d3.max(rows, d => {return d3.max([
		d["C1: Security Apparatus"], d["C2: Factionalized Elites"], d["C3: Group Grievance"],
		d["E1: Economy"], d["E2: Economic Inequality"], d["E3: Human Flight and Brain Drain"],
		d["P1: State Legitimacy"], d["P2: Public Services"], d["P3: Human Rights"],
		d["S1: Demographic Pressures"], d["S2: Refugees and IDPs"], d["X1: External Intervention"]
		])
		});
	FSI.yearMin = d3.min(rows, d => {return d["Year"]});
	FSI.yearMax = d3.max(rows, d => {return d["Year"]});
	FSI.yearCur = FSI.yearMax;
	FSI.bigCountry = "Mali"; // sahelNames[0];
  
  // create rank color ramp
  //~ var rankColors = ["#FF0000", "#FFFF00", "#00FF00"];

	//~ FSI.rankColor = d3.scaleLinear()
		//~ .domain(d3.range(1, 180, 180.0 / rankColors.length))
		//~ .range(rankColors);
  
  //~ FSI.rankColor = d3.scaleSequential(d3.interpolateLab("#FF0000", "#00FF00"))
    //~ .domain([1, 180])
  
  FSI.rankColor = d3.scaleSequential(d3.interpolateHsl("#FF0000", "#00FF00"))
    .domain([1, 180])
  
  // create big data structure - chop off floating point
	$("#grid-inner").append(`
		<div id="fsi-title-0" class="fsi-organizer"></div>
		<div id="fsi-iframe-0" class="fsi-organizer"></div>
		<div id="fsi-title-1" class="fsi-organizer"></div>
		<div id="fsi-iframe-1" class="fsi-organizer"></div>
		`)
		  
  // create iframes programatically https://stackoverflow.com/questions/3142837/capture-iframe-load-complete-event
  // wait for onload callback
	sahelNames.forEach((d,i) => {
				
				var row = parseInt(i/5);
				var col = (i%5)+1;
				var title = `<div class="grid-item grid-title" style="grid-area:${row?3:1}/${col};"><h5>${d}</h5><h6 data-name="${d}">Rank:</h6></div>`;
				var iframe = `<div class="grid-item grid-vis" style="grid-area:${row?4:2}/${col};"> <iframe id="vis-ifs-lvl0-${d}" class="vis vis-star" src="addons/star" data-name="${d}" onload="fsi_star_cb(this,true)"></iframe> </div>`
				
				var idx = parseInt(i/5); 
				$(`#grid-inner #fsi-title-${idx}`).append(title);
				$(`#grid-inner #fsi-iframe-${idx}`).append(iframe);
		});
		
		
  $("#grid-inner .fsi-organizer .grid-item").unwrap(); // remove organizers
  $("#grid-inner h5, #grid-inner h6").css("margin", "0px"); // get rid of margins
  
  resizr( ".grid-vis", ".vis", 400, 400, true); // resize all star graphs    
  
  // hook up controls
  function starForward() {
		FSI.yearCur++;
		if (FSI.yearCur > FSI.yearMax) FSI.yearCur = FSI.yearMin;
		starUpdate();
	}
	
  $("#star-back").click(d=>{
		FSI.yearCur--;
		if (FSI.yearCur < FSI.yearMin) FSI.yearCur = FSI.yearMax;
		starUpdate();
		});
	

  $("#star-ctrl").click(function(){
		if (FSI.action == "play") {
			FSI.intervalCookie = setInterval(starForward, 500);
			FSI.action = "pause";
			$(this).attr("src", "img/pause-circle-solid.svg");
			return;
		}
		
		if (FSI.action == "pause") {
			clearInterval(FSI.intervalCookie);
			FSI.action = "play"
			$(this).attr("src", "img/play-circle-solid.svg");
			return;
		}
			
		});
		
  $("#star-frwd").click(starForward);
  
  
  // chart
  var ctx = document.getElementById('fsi-star-individual-bg').getContext('2d');

	Chart.defaults.global.tooltips.mode = 'nearest';
	Chart.defaults.global.defaultFontFamily = "Open Sans";
	Chart.defaults.global.animation.animationDuration = 500;
	Chart.defaults.global.animation.easing = "linear";
	Chart.defaults.global.elements.point.pointStyle = "cross";
	Chart.defaults.global.elements.point.radius = 6;
	Chart.defaults.global.legend.labels.boxWidth = 20;
	
	// TODO 
	// fix iframes
	// test of ff / osx
	
	$("#vis-ifs-lvl0-big").mouseenter(d => {
		$("#grid-inner .grid-item").addClass("hidden");
		$("#fsi-star-individual-bg").removeClass("hidden");
		
		FSI.chart.config.data.datasets = setChartData();
		FSI.chart.update();
	});

	$("#vis-ifs-lvl0-big").mouseout(d => {
		$("#grid-inner .grid-item").removeClass("hidden");
		$("#fsi-star-individual-bg").addClass("hidden");
	});
	
	
	
	FSI.chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: range(FSI.yearMin, FSI.yearMax),
			//datasets: setChartData(),
		},
		options: {
			legend: {
				 onClick: (e) => e.stopPropagation()
			},
			//~ plugins: {
				//~ colorschemes: {
					//~ scheme: 'brewer.Blues4'
				//~ }
			//~ },  
			annotation: {
					annotations: [
						{
							type: "line",
							mode: "vertical",
							scaleID: "x-axis-0",
							value: FSI.yearCur,
							borderColor: 'rgba(0, 0, 0, 0.5)',
							borderWidth: 3
						}
					]
			 },     
			tooltips: {
				mode: "x-axis",
			},
			animation: {
				duration: 200// general animation time
			},
			hover: {
        animationDuration: 0 // duration of animations when hovering an item
      }, 
			elements: {
				line: {
					tension: 0 // disables bezier curves
				}
			}
		}
	});
}
