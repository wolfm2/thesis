// warn about adding same id twice
// warn about bad state versions
// state version logic

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

var test;
function init () {
  d3.selectAll("#button").on("click", function() {
    console.log("clicked");
    appStateEncode();
  });
  
  // create UI ELEMENTS
  // var fb = new filterBar("testid", "testcl", {cx:100, cy:100, width:300, height:20, x:200, y:200});   
  
  appStateDecode();
  
  var headers = ["Country", "Dataset", "Indicator"];
  var items = [["test","this","thatasdfasdfasdfasdfasdfasdfasdfa"],["test", "that"],["test","this","that"]];
  
  var sb = new sideBar(".navigation-menuUI", headers, items);
  test = sb;
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
