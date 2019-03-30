//~ var initW  = 800; //ratio i want
//~ var initH  = 450;
//~ var initW  = 50; //ratio i want - orig size of d3test
//~ var initH  = 50;
var initW  = 715; //ratio i want - orig size of d3test
var initH  = 470;
//~ var initW  = 150; //ratio i want - orig size of d3test
//~ var initH  = 150;


var element = ".output-UI";

$(element).css('width', initW);
$(element).css('height', initH);

$(window).resize(function(){
	
	// Note: two iframes wide, filters on bottom
	var w  = ($(".main-contentUI").width() * .98) / 2,  // containing object w/h
			h = $(".main-contentUI").height() * .55;
	
	if ((w/h)-(initW/initH) > 0) // compare ratios: determine axis to scale on
		var sF = h / initH // scale factor
	else
		var sF = w / initW;
	$(element).css('transform', "scale(" + sF + ")");
	
	// push the second iframe
	$(".output-UI:nth-child(1)").css("margin-right",  (initW * sF) - initW + "px")
	
})
.trigger('resize');
	
