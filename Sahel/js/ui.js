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

// grouping ö (none, group, dataset, only selected)
// year filter
// read real dataset
// onclick indicatorname -> info
// "similar to" menu
// set
// resize dropdown for largest text
class accordionSelector {
  constructor(selector, id, headers, state) {
    this.id = id;
    this.collapsed=true;
    $(selector).append(`<div id="${id}"><h2>Selections:</h2></div>`);
    
    headers.forEach((d) => {
      $("#" + id).append(
        `<div id="${d}" class="submenu">
          <div class="header"> <h3>${d}</h3> </div> 
          <div class="search-container item ui-collapse"><input class="search" placeholder="Search" autocomplete="on"/> <div class="search-cancel"></div> </div>
        </div>`); //<img class="search-cancel"/>
      });   

    $("#" + id + " .header").on("click", {parent: this}, function(e) {
      //$(this).siblings().toggleClass("ui-collapse");
      
      if (e.data.parent.collapsed) {
        $(this).siblings().removeClass('ui-collapse'); 
        // e.data.parent.filter(header, $("#" + header + ".search").val()$(this).siblings().find(".search").val());
        var header = $(this).children().html();
        //$(this).siblings().find(".search").val()
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
      $("#" + header).append(`<div class="item ui-collapse search-content"><label class="checkbox"><h5 class="checklabel">${d}</h3></label></div>`);
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
        $("#" + id + " > .search-content").each((i,d) => {
           if ($(d).find(".checkbox").hasClass("checked")) {
             var val = $(d).find(".checklabel").html();
             // console.log(id + " " + val);
             if (id in state)
               state[id].push(val);
             else
               state[id] = [val];
           }
          });
        });
        return (state);
    }
  }
}
