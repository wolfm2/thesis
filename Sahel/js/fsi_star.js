
var FSI = {
	data:null,
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
	rankColor:null
};

function starUpdate() {
	FSI.updateList.forEach((d,i) => {
		fsi_star_cb(d.t, d.isSmall);
		});
}

// iframe onload callback 
// t == this
// isSmall == true for small stars
function fsi_star_cb(t,isSmall) {
	// var iC = window.frames["vis-ifs-lvl0-big"].contentWindow;
	var iC = t.contentWindow
	
	if (isSmall) {
		var country = $(t).attr("data-name");
		var d = FSI.data.filter(d => {return (d.Year == FSI.yearCur && d.Country == country)})[0];
		var chartColor = FSI.rankColor(parseInt(d.Rank)); // previously "#41b6c4";
		iC.RadarChart.defaultConfig.color = function() {return chartColor};
		iC.chart.config({factor: .85, maxValue: FSI.dataMax, minValue: FSI.dataMin, axisText: false, levels: 0, circles: false});
		
		// if not registered - register for iframe clicks
		if (! FSI.updateList.includes(t)) {
			$(t).contents().on("click", function(e){
				var country = $(t).attr("data-name");
				FSI.bigCountry = country;
				$("#vis-ifs-lvl0-big").each(function() { // should only be one
					fsi_star_cb(this, false);
					});
				});	
		}
		
		$(`#grid-inner h6[data-name="${d.Country}"]`).html(`Rank: ${d.Rank}`);
	} else {
		$("#vis-big-title").html(`${FSI.bigCountry} - ${FSI.bigIsComposite?"Composite":"Individual"}`);
		var d = FSI.data.filter(d => {return (d.Year == FSI.yearCur && d.Country == FSI.bigCountry)})[0];
		iC.RadarChart.defaultConfig.color = function() {return "#7fcdbb"};
		iC.chart.config({factor: .75, maxValue: FSI.dataMax, minValue: FSI.dataMin, radius: 6});		
		
		$("#grid-inner-bg").html(FSI.yearCur); // Update year
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

function FSI_init(rows) {
	console.log("FSI");
	
	FSI.data = rows;
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
}
