// TODO

function IIAG_init(rows) {
	console.log("IIAG");
}

var iframe_data;

function frameInit(e) {
  // var iC = window.frames["vis-ifs-lvl0-big"].contentWindow;
  var iC = e.contentWindow
  iC.data = iframe_data;
  iC.chart.config({factor: .85, maxValue: 30});
	iC.render();
}

function FSI_init(rows) {
	console.log("FSI");
	
	var bf = rows.filter((d) => {
		return d.Year == 2018 && d.Country == "Burkina Faso"
		})
	
	
	var cohesion = (bf[0]["C1: Security Apparatus"] + bf[0]["C2: Factionalized Elites"] + bf[0]["C3: Group Grievance"])/3;
	var economic = (bf[0]["E1: Economy"] + bf[0]["E2: Economic Inequality"] + bf[0]["E3: Human Flight and Brain Drain"])/3;
	var political = (bf[0]["P1: State Legitimacy"] + bf[0]["P2: Public Services"] + bf[0]["P3: Human Rights"])/3;
	var social = (bf[0]["S1: Demographic Pressures"] + bf[0]["S2: Refugees and IDPs"] + bf[0]["X1: External Intervention"])/3;
	// send to star
	
	iframe_data = [{
    className: 'chad',
    axes: [
      {axis: "Cohesion", value: cohesion}, //xOffset: -20
      {axis: "Economic", value: economic}, 
      {axis: "Political", value: political},  
      {axis: "Social", value: social},  
    ]
  }];
  
  //~ containerClass: 'radar-chart', // target with css, the default stylesheet targets .radar-chart
  //~ w: 600,
  //~ h: 600,
  //~ factor: 0.95,
  //~ factorLegend: 1,
  //~ levels: 3,
  //~ maxValue: 0,
  //~ minValue: 0,
  //~ radians: 2 * Math.PI,
  //~ color: d3.scale.category10(), // pass a noop (function() {}) to decide color via css
  //~ axisLine: true,
  //~ axisText: true,
  //~ circles: true,
  //~ radius: 5,
  
  // create big data structure - chop off floating point
  // create iframes programatically https://stackoverflow.com/questions/3142837/capture-iframe-load-complete-event
  // get callback on load
}

// STUPID 
// Can't get source url from d3.csv callbacks
// HACK make bespoke dataset name -> row hash as returned by the d3.csv accessor function
displayDatasetNames = {
	[JSON.stringify(["Country", "Year", "JudAutWEF", "JudAuthVDEM", "JudIndGI", "ARTPRovPregWomUNAIDS"])]:IIAG_init,
	[JSON.stringify(["", "Country", "Year", "Rank", "Total", "C1: Security Apparatus", "C2: Factionalized Elites", "C3: Group Grievance", "E1: Economy", "E2: Economic Inequality", "E3: Human Flight and Brain Drain", "P1: State Legitimacy", "P2: Public Services", "P3: Human Rights", "S1: Demographic Pressures", "S2: Refugees and IDPs", "X1: External Intervention"])]:FSI_init
};

// callback from dataset reader object
function dataInit (rows) {
	
  var keys = Object.keys(rows[0]);
  var dataset_init = displayDatasetNames[JSON.stringify(keys)];
  
  dataset_init(rows); // call your specific handler
}

// SAHEL Countries:  Burkina Faso, Cameroon, Chad,The Gambia, Guinea, Mali, Mauritania, Niger, Nigeria and Senegal

var ds = new dataset;
// each dataset is preprocessed to contain a country,year col and only the desired indicators
// exceptions values can be Number for default number conversion or bespoke function
var dsImportList = {				// list of all indicators
		"IIAG/MW-Sahel-4Indicators-2018_IIAG_RawData.csv":{														
			exceptions:{
				JudAutWEF:Number, JudAuthVDEM:Number, JudIndGI:Number, ARTPRovPregWomUNAIDS:Number
			}	// list of exceptions to default accessor
		},
		"FSI/fsi_sahel_allYears.csv":{											
			exceptions:{"C1: Security Apparatus":Number, "C2: Factionalized Elites":Number, "C3: Group Grievance":Number, 
				"E1: Economy":Number, "E2: Economic Inequality":Number, "E3: Human Flight and Brain Drain":Number, 
				"P1: State Legitimacy":Number, "P2: Public Services":Number, "P3: Human Rights":Number, 
				"S1: Demographic Pressures":Number, "S2: Refugees and IDPs":Number, "X1: External Intervention":Number
			}
		}
	};

function init () {

  ds.init(dsImportList, dataInit); // init datasets
  resizr( ".grid-vis", ".vis", 400, 400, true); // resize all star graphs
}

//////////
// MAIN //
//////////
$(document).ready(function() {
  
  //~ var margin = { top: 50, right: 50, bottom: 50, left: 50 },
     //~ width = 970 - margin.left - margin.right,
     //~ height = 700 - margin.top - margin.bottom;
  
  //~ svg = d3.select("#main")
    //~ .append("svg")
    //~ .attr("width", width + margin.left + margin.right)
    //~ .attr("height", height + margin.top + margin.bottom)
    //~ .style("width", width + margin.left + margin.right)
    //~ .style("height", height + margin.top + margin.bottom)
    //~ .append("g")
    //~ .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  init();    
});
