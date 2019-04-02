SDG = {
	copy: [
		`fsda`,
		`fsda`,
		`fsda`,
		`fsdafsda`,
		`fsdafsdafsda`,
		`fsdafsda`,
		`fsdafsdafsda`,
		`fsda`,
		`fsda`,
		`fsda`,
		``,
		``,
		``,
		``,
		``,
		``,
		``
		]
}

function sdg_init(){
	for (var i=0; i<18; i++) {
		if (i==0) {
			// insert big
			continue;
		}
		var zero="0";
		if (i>9) zero = "";
		$("#sdg-grid-inner").append(`<div class="sdg-img" data-idx="${i-1}"><img src="img/SDG/sdg-icon-goal-${zero+i}.png"></div>`)
	}
	
	// $("#sdg-grid-outer #vis-big-txt").hide();
		
	$("#sdg-grid-inner").mouseout(function(e) {
		$("#sdg-grid-outer #vis-big").fadeIn(300);
		});
	
	$("#sdg-grid-inner .sdg-img").click(function(e) {
		var i = parseInt($(this).attr("data-idx"));
		$("#sdg-grid-outer #vis-big-txt").html(SDG.copy[i]);
		$("#sdg-grid-outer #vis-big").fadeOut(300);
		});
		
}
