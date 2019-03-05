var stateCallbacks = []; // All elements wanting to store state will list their functions here

// called to change state of element
function stateChange(version, id, obj) {
  var f = stateCallbacks.filter((d) => {  // find object by id
    return d.id == id;
  });
  
  if (f.length > 1) console.error("Element: ID NOT UNIQUE");
  
  f[0].that.setState(obj); // WRITE GENERIC SETSTATE 
}

// all apps that have state to change register here
function appStateRegister(id, that) {
  stateCallbacks.push({id:id, that:that}); // the unique id string and object "this"
}

// create state encoded for URI
function appStateEncode() {
  //~ var state = [{version:0.01}];
  
  //~ stateCallbacks.forEach(function (o) {
    //~ state.push({id:o["id"], state:o["that"].val()});
  //~ });
  
  //~ var opts = encodeURI(JSON.stringify(state));
  //~ console.log(window.location.href.match(/^[^\#\?]+/)[0] + "?state=" + opts);
  var state = {};
  state['version'] = version;
  
  stateCallbacks.forEach(function (o) {
    state[o["id"]] = o["that"].val();
  });
  
  var opts = encodeURI(JSON.stringify(state));
  console.log(window.location.href.match(/^[^\#\?]+/)[0] + "?state=" + opts);
}

// decode state from URI
function appStateDecode() {
  var state = JSON.parse($.urlParam("state"));
  if (state != null)
		stateCallbacks.forEach(function (o) {
			o["that"].val(state[o["id"]]);
		});
    //~ state.forEach((d) => {
      //~ if (d.version != null)
        //~ version = d.version;
      //~ else
        //~ stateChange(version, d.id, d.state);
      //~ });
}
