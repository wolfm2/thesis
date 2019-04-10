
function ACLED_init(errors, rows) {
	console.log("ACLED")
}

var acledMap = new Datamap({
            scope: 'world',
            element: document.getElementById('container1'),
						responsive: true,
            geographyConfig: {
              popupOnHover: false,
              highlightOnHover: false,
              borderColor: '#444',
              borderWidth: 0.5
            },
            bubblesConfig: {
              popupTemplate: function(geography, data) {
                return '<div class="hoverinfo">Sahel data about ' + data.centered + '</div>'
              },
              fillOpacity: 0.2
            },
            fills: {
              'Visited': '#306596',
              'neato': '#0fa0fa',
              'Trouble': '#bada55',
              defaultFill: '#dddddd'
            },
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

					// Show Sahel only
					sahelMap = ["BFA", "CMR", "TCD", "GIN", "GMB", "MLI","NER", "NGA", "MRT", "SEN"];
					d3.selectAll(".datamaps-subunit").filter(function() {
						var result = true;
						this.classList.forEach(d=>{
							if (sahelMap.includes(d)) result = false;
							});
						return result;
					})	
					.style("display", "none");
					
					mwBubbles = [
            {
							radius: 25,
							latitude: 47.2538,
							longitude: -69.4455,
							fillKey: 'neato',	
						}];
						
          acledMap.bubbles([
            {
							radius: 25,
							latitude: 17.57,
							longitude: -3.99,
							fillKey: 'neato',	
							name: 'Joe 4',
							yield: 400,
							country: 'USSR',
							//fillKey: 'RUS',
							significance: 'First fusion weapon test by the USSR (not "staged")',
							date: '1953-08-12'
						}, 
						// {
            // popupTemplate: function(geography, data) {
            //   return '<div class="hoverinfo">Some data about ' + data.centered + '</div>'
            // }
          ]);
