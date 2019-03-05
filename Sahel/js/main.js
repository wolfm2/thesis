// TODO

// warn about adding same id twice
// warn about bad state versions
// state version logic

// ACCORDION SELECTOR
// grouping ö (none, group, dataset, only selected)
// onclick indicatorname -> info
// "similar to" menu
// bug: click on autocomplete string -> filter

// Filters
// categorical
// range

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
  // create UI ELEMENTS
  // var fb = new filterBar("testid", "testcl", {cx:100, cy:100, width:300, height:20, x:200, y:200});   
  
  //~ var headers = ["Dataset", "Country", "Indicator"];
  //~ var countries = Object.values(d3.set(rows, function(d) {return d.Country}));
  //~ var keys = Object.keys(rows[0]);
  //~ var items = [[displayDatasetNames[JSON.stringify(keys)]],
							//~ countries,
							//~ keys.filter(ind => ind !== 'Country' && ind !== 'Year')]; // remove all Country and Year indicators from view
							
  var keys = Object.keys(rows[0]);
  var headers = [displayDatasetNames[JSON.stringify(keys)]];
  // var countries = Object.values(d3.set(rows, function(d) {return d.Country}));
  // 
  var items = [keys.filter(ind => ind !== 'Country' && ind !== 'Year')]; // remove all Country and Year indicators from view

  var yearRange = [d3.min(rows, function(d) { return d.Year; }), d3.max(rows, function(d) { return d.Year; })];
  
  var sb = new sideBar(".navigation-menuUI", headers, items, yearRange);
  
  appStateDecode();
}

// SAHEL Countries:  Burkina Faso, Cameroon, Chad,The Gambia, Guinea, Mali, Mauritania, Niger, Nigeria and Senegal

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
  
  $(".main-contentUI").append(`<div id="filter-container"></div>`);  // filter container
  
  dsImport(dsImportList, dataInit);
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
