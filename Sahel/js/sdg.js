SDG = {
	copyIdx:null,
	targetIdx:0,
	copy: sdgCopy,
	color: [
		`#F6002A`,
		`#D7A02F`,
		`#009E4D`,
		`#CB0033`,
		`#FA3229`,
		`#00ACD8`,
		
		`#FFB61E`,
		`#950039`,
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
}

function sdg_init(){
	
	for (var i=0; i<17; i++) {
		var zero = (i>8)?"":"0";
		
		var copy = SDG.copy[i].targets;
		SDG.copy[i].targets = copy.split("\n");
		SDG.copy[i].targets = SDG.copy[i].targets.map((d,j) => {
			return d.trim();
			});
		SDG.copy[i].targets = SDG.copy[i].targets.filter((d) => {
			return d.length > 0;
			});
		
		var gwid = 6;
		var gcol = (i%gwid)+1;
		var grow = parseInt((i/gwid)+1);
		$("#sdg-grid").append(`<div class="sdg-img" style="grid-area: ${grow}/${gcol};" data-idx="${i}"><img src="img/SDG/sdg-icon-goal-${zero+(i+1)}.png"></div>`)
	}
	
	$("#sdg-grid").append(`<div class="sdg-img" style="grid-area: 3/6;" data-idx="18"><img src="img/SDG/E_SDG_goals_icons-rgb-18.jpg"></div>`)
	
	$("#sdg-grid").mouseout(function(e) {
		//$("#sdg-txt").fadeOut(300);
		});
	
	function genCopy() {	
		var c = SDG.copy[SDG.copyIdx];
		$("#sdg-grid #sdg-txt").html(`
			<h4>${c.title}</h4><br> 
			<h5>Target (${SDG.targetIdx+1} of ${c.targets.length}):	
			</h5><br>
			<div id="sdg-txt-target">${c.targets[SDG.targetIdx]}<div>`);
	}
	
	$("#sdg-txt-container").fadeOut(100); // init
	
	$("#sdg-grid .sdg-img").click(function(e) {
		if (i>17) return;
		SDG.copyIdx = parseInt($(this).attr("data-idx"));
		SDG.targetIdx = 0;
		
		genCopy();
		$("#sdg-grid #sdg-txt-container").css("background", SDG.color[SDG.copyIdx]);
		$("#sdg-grid #sdg-txt-container").fadeIn(200);
		$("#sdg-back, #sdg-frwd").css("filter", "none");
		});
		
		
	$("#sdg-txt-container").click(function(e) { 
		$("#sdg-txt-container").fadeOut(100);
		$("#sdg-back, #sdg-frwd").css("filter", "invert(100%)");
		})
			
	$("#sdg-back").click(function(e) {
		len = SDG.copy[SDG.copyIdx].targets.length
		if (--SDG.targetIdx < 0) SDG.targetIdx = len-1;
		genCopy();
		});
		
	$("#sdg-frwd").click(function(e) {
		len = SDG.copy[SDG.copyIdx].targets.length
		if (++SDG.targetIdx > len-1) SDG.targetIdx = 0;
		genCopy();
		});
}	
