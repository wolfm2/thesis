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

// search filter
// grouping ö (none, group, dataset, only selected)
// year filter
// read real dataset
// onclick indicatorname -> info
// "similar to" menu
// set get
class accordionSelector {
  constructor(selector, id, headers, state) {
    this.id = id;
    $(selector).append(`<div id="${id}"><h2>Selections:</h2></div>`);
    
    headers.forEach((d) => {
      $("#" + id).append(`<div id="${d}" class="submenu"><div class="header"><h3>${d}</h3></div></div>`);
      });   

    $("#" + id + " .header").on("click", function(e) {
      $(this).siblings().toggleClass("ui-collapse");
      });
      

  }
  
  filter(header, text) {
  }
  
  addItems(header, items) {
    items.forEach((d) => {
      $("#" + header).append(`<div class="item ui-collapse"><label class="checkbox"><h5 class="checklabel">${d}</h3></label></div>`);
      });     
      
      $("#" + header + " .checkbox").click(function(){ 
        $(this).toggleClass('checked') 
      });
  }
  // get, set
}
