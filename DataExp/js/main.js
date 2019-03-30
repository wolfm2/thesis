// TODO

// APPSTATE:
// warn about adding same id twice
// warn about bad state versions
// state version logic
// VAL GETS BACK NAME OF ELEMENT
// DOUBLE CALL TO DECODE because selectors CREATE filters

//~ var popUpHandle = window.open();
//~ popUpHandle.document.body.append("test")
//~ popUpHandle.jQuery("#filter-header-UI").html("sdf")
//~ popUpHandle.document["test"] = 123

// ACCORDION SELECTOR:
// grouping (none, group, dataset, only selected)
// onclick indicatorname -> info
// "similar to" menu
// bug: click on autocomplete string -> filter

// FILTERS:
// categorical: cant do.  assuming all countries in dataset selected
// for "country" only: could turn on and off through vis
// set info
// val

var version = 0.01;
var svg;

$.urlParam = function(name){ // https://www.sitepoint.com/url-parameters-jquery/
  var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
  if (results==null){
     return null;
  }
  else{
     return decodeURI(results[1] || 0);
  }
}

// STUPID 
// Can't get source url from d3.csv callbacks
// HACK make bespoke dataset name -> row hash as returned by the d3.csv accessor function
displayDatasetNames = {
	[JSON.stringify(["Country", "Year", "JudAutWEF", "JudAuthVDEM", "JudIndGI", "ARTPRovPregWomUNAIDS"])]:"IIAG"
};

function dataInit (rows) {
	
  var keys = Object.keys(rows[0]);
  var headers = [displayDatasetNames[JSON.stringify(keys)]];
  // var countries = Object.values(d3.set(rows, function(d) {return d.Country}));
  // 
  var items = [keys.filter(ind => ind !== 'Country')]; // remove all Country and Year indicators from view

  // var yearRange = [d3.min(rows, function(d) { return d.Year; }), d3.max(rows, function(d) { return d.Year; })];
  
  var sb = new sideBar(".navigation-menuUI", headers, items); // , yearRange
  
  $("#filter-UI").append("<div id='filter-filler-msg'>No&nbsp;Indicators&nbsp;Selected<div>");
  
  appStateDecode();
}

// SAHEL Countries:  Burkina Faso, Cameroon, Chad,The Gambia, Guinea, Mali, Mauritania, Niger, Nigeria and Senegal

var ds = new dataset;
// each dataset is preprocessed to contain a country,year col and only the desired indicators
// exceptions values can be Number for default number conversion or bespoke function
var dsImportList = {"IIAG/MW-Sahel-4Indicators-2018_IIAG_RawData.csv":{														// list of all indicators
	exceptions:{JudAutWEF:Number, JudAuthVDEM:Number, JudIndGI:Number, ARTPRovPregWomUNAIDS:Number}	// list of exceptions to default accessor
	}};

function init () {
  d3.selectAll("#button").on("click", function() {
    console.log("clicked");
    appStateEncode();
  });
  
  ds.init(dsImportList, dataInit); // init datasets
}

//////////
// MAIN //
//////////
$(document).ready(function() {
  
  var margin = { top: 50, right: 50, bottom: 50, left: 50 },
     width = 970 - margin.left - margin.right,
     height = 700 - margin.top - margin.bottom;
  
  svg = d3.select("#main")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("width", width + margin.left + margin.right)
    .style("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  init();    
});
