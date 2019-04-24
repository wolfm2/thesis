WDI = {
	nData: null
}

function WDI_init(errors, rows) {

	// get series for one country / indicator
	WDI.getRaw = function(i) {
		return i.years.map(d => WDI.nData[i.countries[0]][i.name][0][d])
	}

	// get summed info for all countries
	WDI.getSum = function(i) {
		return (
			i.years.map(y => {
				return d3.sum(i.countries.map(c => {
						return WDI.nData[c][i.name][0][y]
				}));
			})
		);
	}
	
	// aggregated relative series for several countries / one indicator
	WDI.relAgg = function(ind) {
		
		var len = ind.countries.length;
		var caveats = []; // countries lacking data for a year
		var total = Array(len).fill(0);
		var avgBy = Array(len).fill(0);
		
		ind.countries.forEach (c => {
			var relVal = WDI.nData[c][ind.name][0][ind.fArgs.relYear]; // makes '.' == NaN
			if (isNaN(relVal) || relVal == 0) {
				caveats.push({i:ind, c:c, p:ind.fArgs.relYear});
				return;
			}
		
		var row = ind.years.map(d => WDI.nData[c][ind.name][0][d]);
		
		row.forEach((d,i)=> {
				if (d != '.' && d != 0 && !isNaN(d)) {
					total[i] += (relVal/+d) * 100;
					avgBy[i]++;
				} else caveats.push({i:ind.name, c:c, p:ind.years[i]});
				});
			});
			
		total.forEach((d,i)=> {
			total[i] = d/avgBy[i];
			});
		
		ind.caveats = caveats;
		return total
	}

	console.log("WDI");
	WDI.nData = d3.nest().key(k=>k["Country Name"]).key(k=>k["Indicator Code"]).object(rows); // cname, iname, year
	WDI.yearMin = 2007;
	WDI.yearMax = 2016;

	glueRegister(VIS0, "WDI", {getRaw:WDI.getRaw, relAgg:WDI.relAgg});
	glueRegister(UNSDG_VIS0, "WDI", {getRaw:WDI.getRaw, relAgg:WDI.relAgg, getSum:WDI.getSum});
}
