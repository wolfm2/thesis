// UI Elements

class filterBar {
  constructor(id, cl, state) {
    this.id = id;
    this.cl = cl;
    this.state = state;
    this.lowX = state.x;
    this.lowY = state.y;
    this.highX = state.x + state.width;
    this.highY = state.x
    
    appStateRegister(this.id, this);
    this.draw();  // draw it
    this.setState(state);  // set init state
  }
  
  getState (){
    return this.state;
  }
  
  setState(o){
    this.state.cx = o.cx;
    this.state.cy = o.cy;
    
    // filter above values
    // then do generic attr set fcn?
    d3.select("#" + this.id)
      .attr("cx", this.state.cx)
      .attr("cy", this.state.cy);
  }
  
  draw () {
    var state=this.state;
    var widget=`
    <g class="uiSlider">
      <line x1="${state.x}" y1="${state.y}" x2="${state.x + state.width}" y2="${state.y}" stroke="gray" stroke-width="5" data-changeType="horizBar"/>
      <circle class="uiDraggable" cx="${state.x}" cy="${state.x}" r="20" data-changeType=${this.horizLowFilter}/>
      <circle class="uiDraggable" cx="${state.x + state.width}" cy="${state.x}" r="20" data-changeType=${this.horizHighFilter}/>
    </g>
    `;
    
    svg.html(widget);
    
    //~ svg.append("circle")
      //~ .attr("id", this.id)
      //~ .attr("class", this.cl)
      //~ .attr("r", 20); 
      
    this.dnd();   // enable DnD
  }
  
  horizLowFilter(e) {
    console.log('hi')
  }
  
  horizHighFilter(e) {
    console.log('ho')
  }
  
  dnd() { // https://octoperf.com/blog/2018/04/18/d3-js-drag-and-drop-tutorial/
    var dragHandler = d3.drag()
      .on("drag", function () {
          //stateChange(version, d3.select(this).attr("id"), {cx:d3.event.x, cy:d3.event.y});
          d3.select(this).attr("data-changeType")();
          console.log("sdf")
      });
      
    

    dragHandler(svg.selectAll(".uiDraggable"));
  }
  
}

// Jquery autocomplete width fixer
//~ jQuery.ui.autocomplete.prototype._resizeMenu = function () {
  //~ var ul = this.menu.element;
  //~ ul.outerWidth(this.element.outerWidth());
//~ }

class accordionSelector {
  constructor(selector, id, headers) {
    this.id = id;
    this.collapsed=true;
    $(selector).append(`<div id="${id}"><h2>Selections:</h2></div>`);
    
    this.headers = headers;
    headers.forEach((d) => {
      $("#" + id).append(
        `<div id="${d}" class="submenu">
          <div class="header"> <h3>${d}</h3> </div> 
          <div class="search-container item ui-collapse"><input class="search" placeholder="Search" autocomplete="on"/> <div class="search-cancel"></div> </div>
        </div>`); //<img class="search-cancel"/>
      });   

   $("#" + id + " .header").on("click", {parent: this}, function(e) { // expose accordion section event
      if (e.data.parent.collapsed) {
        $(this).siblings().removeClass('ui-collapse'); 
        var header = $(this).children().html();
        e.data.parent.filter(header, $("#" + header + " .search").val());
      } else 
        $(this).siblings().addClass('ui-collapse'); 
      e.data.parent.collapsed = !e.data.parent.collapsed;
      });
    
  }
  
  filter(header, text) {
    $("#" + header + " > .search-content").removeClass("ui-collapse");
    $("#" + header + " > .search-content").filter(function (i,d) {
      // console.log($(d).find(".checklabel").val());
      return ! $(d).find(".checklabel").html().includes(text);
      }).addClass("ui-collapse");
  }
  
	addItems(header, items) {
		items.forEach((d) => {
			if (d == undefined) return; // if you parse a bad list of items
			$("#" + header).append(`<div class="item ui-collapse search-content"><label class="checkbox" data-item-name="${d}"><h5 class="checklabel">${d.replace(/ /g, '&nbsp;')}</h3></label></div>`);
		});     
		
		// enable checkbox
		$("#" + header + " .checkbox").click(function(){ 
			$(this).toggleClass('checked'); 
		});
		
		// enable circle-x
		$("#" + header + " .search-cancel").click(function(){ 
			$("#" + header + " .search").val(''); 
			$("#" + header + " > .search-content").removeClass("ui-collapse");
		});
		
		// turn on autocomplete
		$("#" + header + " .search").autocomplete({ source: items });
		
		// enter key event
		$("#" + header + " .search").keyup({parent: this}, function(e) {
			// if (e.key == "Enter") {
				$("#" + header + " .search").autocomplete('close');
				e.data.parent.filter(header, $("#" + header + " .search").val());
			//}
		});
  }
  
  // get set state
  val(state) {
    if (state == undefined) {
      var state = {};
      $("#" + this.id + " .header").children().each((i,d) => {
        var id = $(d).html();
        state[id] = [];
        $("#" + id + " > .search-content").each((i,d) => {
          if ($(d).find(".checkbox").hasClass("checked")) {
           var val = $(d).find(".checklabel").html();
           state[id].push(val);
          }
          });
        });
        return (state);
    } else {
			this.headers.forEach((d) => {
				var items = state[d];
				items.forEach((e) => {
					$(`#${d} .checkbox[data-item-name='${e}']`).addClass("checked")
					})
				})
			
		}
  }
}

var test;
function addFilter() {
	test = new filter("filter-container", "blorch", true, [2000, 2010]);
}

class filter {
	constructor(containerId, indicatorName, isRange, values) {
		if ( $("#" + containerId).length == 0) {
			console.log(containerId + " does not exist.")
		}
		this.yearMin = values[0];
		this.yearMax = values[1]
		this.sliderId = indicatorName;
		// slider
    $("#" + containerId).append(`
      <div id="${this.sliderId}-container">
        <h6><div id="${this.sliderId}-amount">Years: </div></h6>
        <div id="${this.sliderId}"></div>
      </div>
      `);
      
    //~ <div id="rot" style="
    //~ /* width: 90px; */
    //~ color: red;
    //~ transform: rotate(90deg);
//~ ">test&nbsp;this&nbsp;is</div>
  
    $( `#${this.sliderId}-amount` ).html( "Years: " + this.yearMin + " - " + this.yearMax );
    
    $( `#${this.sliderId}` ).slider({
			orientation: "vertical",
      parent: this,
			range: true,
			min: this.yearMin,
			max: this.yearMax,
			values: [ this.yearMin, this.yearMax ],
			slide: function( e, ui ) {
				var sliderId = $(this).attr("id");
				// $( `#${sliderId}-amount` ).html( "Years: " + ui.values[0] + " - " + ui.values[1] );
        }
      }); 
    
    // add label  
    $("#" + this.sliderId).append(`<div id="${this.sliderId}-label" class="range-vfilter">tessdfsdfst&nbsp;this&nbsp;is</div>`)
	}
}

// sidebar
class sideBar {
  constructor(selector, headers, items, yearRange) {
    appStateRegister("Selectors", this);
    
    this.asId = "accordion";
    this.as = new accordionSelector(selector, this.asId, headers)
    headers.forEach((d,i) => {
      this.as.addItems(d,items[i]);
      });
    
    this.sliderId = "slider-year";
    this.yearMin = yearRange[0];
    this.yearMax = yearRange[1];
    
    // slider
    $(".navigation-menuUI").append(`
      <div id="${this.sliderId}-container">
        <h6><div id="${this.sliderId}-amount">Years: </div></h6>
        <div id="${this.sliderId}"></div>
      </div>
      `);
      
    $( `#${this.sliderId}-amount` ).html( "Years: " + this.yearMin + " - " + this.yearMax );
    
    $( `#${this.sliderId}` ).slider({
      parent: this,
        range: true,
        min: this.yearMin,
        max: this.yearMax,
        values: [ this.yearMin, this.yearMax ],
        slide: function( e, ui ) {
					var sliderId = $(this).attr("id");
          $( `#${sliderId}-amount` ).html( "Years: " + ui.values[0] + " - " + ui.values[1] );
        }
      }); 
  }
  
  val(state) {
		if (state == undefined) {
			var val = $(`#${this.sliderId}`).slider("values");
			this.yearMin = val[0];
			this.yearMax = val[1];
			return {[this.asId]:this.as.val(), year:{"low":this.yearMin, "high":this.yearMax}}; // WARNING [] usage might be unique to new browsers!
		} else {
			// accordion state
			this.as.val(state[this.asId]);
			//year
			$( `#${this.sliderId}` ).slider("values", 0, state.year.low);
			$( `#${this.sliderId}` ).slider("values", 1, state.year.high);
			$( `#${this.sliderId}-amount` ).html( "Years: " + state.year.low + " - " + state.year.high );
		}
  }
}
