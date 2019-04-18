var ACLED = {
	nData: null,
	map: null,
	month: 0,
	year: 2011,
	action:'play',
	yearMin: 2011,
	yearMax: 2018
}


function ACLED_init(errors, rows) {
	console.log("ACLED")
	
	ACLED.deadMin = d3.min(rows, d => d.FATALITIES);
	ACLED.deadMax = d3.max(rows, d => d.FATALITIES);
	// ACLED.yearMin = d3.min(rows, d => new Date(d.EVENT_DATE).getFullYear());
	// ACLED.yearMax = d3.max(rows, d => new Date(d.EVENT_DATE).getFullYear());
	
	var byActor = d3.nest().key(k => k.ACTOR1).entries(rows); // calc kills
	ACLED.minActorSeverity = Math.sqrt(d3.min(byActor, d=>d3.sum(d.values, s=>s.FATALITIES)));
	ACLED.maxActorSeverity = Math.sqrt(d3.max(byActor, d=>d3.sum(d.values, s=>s.FATALITIES)));
	
	// severity scale
	var colorScale = d3.scaleLinear()
    .domain([ACLED.minActorSeverity, ACLED.maxActorSeverity])
    .range([0, 1]);
  
  var colorInterp = d3.interpolateLab("#FFF4EF", "#6D0012"); // interpolation
    
  // compile actor colors by severity
  var colorBySeverity = {defaultFill: '#dddddd'};
  byActor.forEach(d=>{
		var rootSumScale = colorScale(Math.sqrt(d3.sum(d.values, e=>e.FATALITIES)));
		colorBySeverity[d.key] = colorInterp(rootSumScale);
		});
	
	ACLED.nData = d3.nest()
		.key(k=>new Date(k.EVENT_DATE).getFullYear())
		.key(k=>new Date(k.EVENT_DATE).getMonth())
		.object(rows);
	
	var countryActivityByMonth = d3.nest()
		.key(k=>new Date(k.EVENT_DATE).getFullYear())
		.key(k=>new Date(k.EVENT_DATE).getMonth())
		.key(k=>k.COUNTRY)
		.entries(rows);
		
	ACLED.maxActivity = d3.max(countryActivityByMonth, y=>{ // year
			return d3.max(y.values, m=>{ // month
				return d3.max(m.values, c=>{ // country
					return c.values.length;
				});
			});
		});
	ACLED.maxActivity = Math.sqrt(ACLED.maxActivity);
		
	ACLED.minActivity = d3.min(countryActivityByMonth, y=>{ // year
			return d3.min(y.values, m=>{ // month
				return d3.min(m.values, c=>{ // country
					return c.values.length;
				});
			});
		});
		
	// country activity by month scale
	var activityScale = d3.scaleLinear()
    .domain([ACLED.minActivity, ACLED.maxActivity])
    .range([0, 1]);
	
	ACLED.map = new Datamap({
		scope: 'world',
		element: document.getElementById('violence-map'),
		responsive: true,
		geographyConfig: {
			popupOnHover: false,
			highlightOnHover: false,
			borderColor: '#434',
			borderWidth: 2
		},
		bubblesConfig: {
			popupTemplate: function(geography, data) {
				return '<div class="hoverinfo">Country: ' + data.c + '<br>Event: ' + data.e + '<br>Actors: ' + data.a + '<br>Deaths: ' + data.d + '</div>'
			},
      borderWidth: 0,
      animationSpeed: 200,
			fillOpacity: 0.9
		},
		fills: colorBySeverity,
		setProjection: function(element) {
			var projection = d3v3.geo.equirectangular()
				.center([9, 14])
				.rotate([4.4, 0])
				.scale(700)
				.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
			var path = d3v3.geo.path()
				.projection(projection);

			return {path: path, projection: projection};
		}
	});
	
	sahelMap = ["BFA", "CMR", "TCD", "GIN", "GMB", "MLI","NER", "NGA", "MRT", "SEN"];
	d3.selectAll(".datamaps-subunit").filter(function() {
		var result = true;
		this.classList.forEach(d=>{
			if (sahelMap.includes(d)) result = false;
			});
		return result;
	})	
	.style("display", "none");
	
	function getData() {
		$("#violence-date").html((ACLED.month+1) + "/" + ACLED.year);
		return ACLED.nData[ACLED.year][ACLED.month].map(d => {
			actors = d.ACTOR1==""?"unclear":d.ACTOR1;
			event = d.EVENT_TYPE==""?"unclear":d.EVENT_TYPE;
			
			return {d:d.FATALITIES, a:actors, c:d.COUNTRY, e:event, radius:Math.sqrt(d.FATALITIES)+5, fillKey:actors, latitude:d.LATITUDE, longitude:d.LONGITUDE};
		});
	}

	function violenceUpdate() {
		ACLED.map.bubbles(getData());
		
		var cConvert = {"Burkina Faso":"BFA", "Cameroon":"CMR", "Chad":"TCD", "Guinea":"GIN", "Gambia":"GMB", "Mali":"MLI","Niger":"NER", "Nigeria":"NGA", "Mauritania":"MRT", "Senegal":"SEN"};
		var activity = {"BFA":0, "CMR":0, "TCD":0, "GIN":0, "GMB":0, "MLI":0,"NER":0, "NGA":0, "MRT":0, "SEN":0};
		ACLED.nData[ACLED.year][ACLED.month].forEach(d=>{
			activity[cConvert[d.COUNTRY]]++;
			});
			
		Object.keys(activity).forEach(d=>{  // convert to color
			//activity[d] = d3.interpolateInferno(activityScale(Math.sqrt(activity[d])));

			activity[d] = d3.interpolateViridis(activityScale(Math.sqrt(activity[d])));
			})
			
		ACLED.map.updateChoropleth(activity);
	}

	// Set up first bubbles
	violenceUpdate();
	
	  // hook up controls
  function acledForward() {
		ACLED.month++;
		
		if (ACLED.month>11) {
			ACLED.year++;
			ACLED.month = 0;
		}
		
		if (ACLED.year > ACLED.yearMax) ACLED.year = ACLED.yearMin;
		
		violenceUpdate();
	}
	
	$("#violence-back").click(d=>{
		ACLED.month--;
		
		if (ACLED.month<0) {
			ACLED.year--;
			ACLED.month = 11;
		}
		
		if (ACLED.year < ACLED.yearMin) ACLED.year = ACLED.yearMax;
		
		violenceUpdate();
		});

	
  $("#violence-ctrl").click(function(){
		if (ACLED.action == "play") {
			ACLED.intervalCookie = setInterval(acledForward, 300);
			ACLED.action = "pause";
			$(this).attr("src", "img/pause-circle-solid.svg");
			return;
		}
		
		if (ACLED.action == "pause") {
			clearInterval(ACLED.intervalCookie);
			ACLED.action = "play"
			$(this).attr("src", "img/play-circle-solid.svg");
			return;
		}
			
		});
		
  $("#violence-frwd").click(acledForward);
  
}



