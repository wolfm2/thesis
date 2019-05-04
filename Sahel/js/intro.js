// https://bl.ocks.org/veltman/4d1413aa5fd3bb5af1a806c146870031

  var svg = d3.select("#morph"),
      path = svg.append("path"),
      circles = svg.append("g");

  //// d3.json("us.topo.json", function(err, topo){
	//sahelNames = ["Senegal", "Mali", "Gambia", "Chad", "Mauritania", "Cameroon", "Niger", "Nigeria", "Guinea", "Burkina Faso"]
	sdgColors =  [
		`#F6002A`,
		`#D7A02F`,
		
		`#009E4D`,// double green
		`#009E4D`,
		`#CB0033`,
		`#FA3229`,
		`#00ACD8`,
		
		`#FFB61E`,
		`#437942`,// `#950039`,
		`#FD6725`,
		`#EB0081`,
		`#FF9B2A`,
		`#D48C2E`,

		`#437942`,
		`#007ABA`,
		`#1EB34E`,
		`#005489`,
		`#163668`
		]
	
	var stateNames;	
  d3.json("data/topojson/africa.json", function(err, topo){

		// Get Sahel Countries
		var geo = topo.objects.continent_Africa_subunits.geometries.filter(d => d.type=="Polygon" && sahelNames.includes(d.properties.geounit));	
		topo.objects.continent_Africa_subunits.geometries = geo; // filter the nulls
		
		var stateNames = geo.map(d => d.properties.geounit);
		stateNames.push("Chad");
		
    var states = topojson.feature(topo, topo.objects.continent_Africa_subunits).features.map(function(d){
      return d.geometry.coordinates[0];
    });

		var maxStates = states.length;

    // d3.shuffle(states);
		states.push(states[9]); // double the last element
		
		$("#sec-title #txt-country").html(stateNames[0]);
    setTimeout(draw, 100);
		
    function draw() {

				//~ setTimeout(d=> {
					//~ $("#sec-title #txt-country").html(stateNames[11-states.length]);
				//~ }, 10);
			
			if (states.length == 1) {
				$("#morph, #sec-title #txt-country").fadeTo(2000,0, d=> {
					$("#sec-title #txt-country").html("Sahel").css("font-size", "7rem");
					$("#sec-title #txt-country").fadeTo(800, 1);
					//$("#sec-title div #map").fadeTo(800,0.2);
					$("#sec-title div #map").fadeTo(800,1);
					$("#introBg").fadeTo(800,.2);
						});
				return;
			}

      var a = states[0].slice(0),
          b = states[1].slice(0);

      // Same number of points on each ring
      if (a.length < b.length) {
        addPoints(a, b.length - a.length);
      } else if (b.length < a.length) {
        addPoints(b, a.length - b.length);
      }

      // Pick optimal winding
      a = wind(a, b);

      path.attr("d", join(a));

      // Redraw points
      circles.datum(a)
        .call(updateCircles);

      // Morph
      var t = d3.transition()
        .duration(1000);

      path.transition(t)
        .style("fill", sdgColors[states.length])
        .on("end", function(){
					states.shift(); // mw
          // states.push(states.shift());
          $("#sec-title #txt-country").html(stateNames[11-states.length]);
          setTimeout(draw, 100);
        })
        .attr("d", join(b));

      circles.selectAll("circle").data(b)
        .transition(t)
        .attr("cx",function(d){
          return d[0];
        })
        .attr("cy",function(d){
          return d[1];
        });

    }

  });

  function updateCircles(sel) {

    var circles = sel.selectAll("circle")
      .data(function(d){ return d; });

    var merged = circles.enter()
      .append("circle")
      .attr("r", 2)
      .merge(circles);

    merged.classed("added", function(d){
        return d.added;
      })
      .attr("cx",function(d){
        return d[0];
      })
      .attr("cy",function(d){
        return d[1];
      });

    circles.exit().remove();

  }

  function addPoints(ring, numPoints) {

    var desiredLength = ring.length + numPoints,
        step = d3.polygonLength(ring) / numPoints;

    var i = 0,
        cursor = 0,
        insertAt = step / 2;

    do {

      var a = ring[i],
          b = ring[(i + 1) % ring.length];

      var segment = distanceBetween(a, b);

      if (insertAt <= cursor + segment) {
        ring.splice(i + 1, 0, pointBetween(a, b, (insertAt - cursor) / segment));
        insertAt += step;
        continue;
      }

      cursor += segment;
      i++;

    } while (ring.length < desiredLength);

  }

  function pointBetween(a, b, pct) {

    var point = [
      a[0] + (b[0] - a[0]) * pct,
      a[1] + (b[1] - a[1]) * pct
    ];

    point.added = true;
    return point;

  }

  function distanceBetween(a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
  }

  function join(d) {
    return "M" + d.join("L") + "Z";
  }

  function wind(ring, vs) {

    var len = ring.length,
        min = Infinity,
        bestOffset,
        sum;

    for (var offset = 0, len = ring.length; offset < len; offset++) {

      var sum = d3.sum(vs.map(function(p, i){
        var distance = distanceBetween(ring[(offset + i) % len], p);
        return distance * distance;
      }));

      if (sum < min) {
        min = sum;
        bestOffset = offset;
      }

    }

    return ring.slice(bestOffset).concat(ring.slice(0, bestOffset));

  }
