// TODO
// send THIS to read csv / get rid of ds in class, displayDatasetNames

// SDG
// Select specific sdgs

// FSI STAR
// popup font, average FSI.minData

// ATTRIBUTIONS
// WDI, FSI, FONTAWSOME, Pauline, text citations
// attrib and link to https://fontawesome.com/license

sahelNames = ["Burkina Faso", "Cameroon", "Chad", "Gambia", "Guinea", "Mali", "Mauritania", "Niger", "Nigeria", "Senegal"];

// returns a range in array form
function range(start, end) {
	var offset = 0;
	if (start != 0) offset = start;
	return Array.from({length: end-start+1}, (v, k) => k+offset);
}

function IIAG_init(errors, rows) {
	console.log("IIAG");
}

// SAHEL Countries:  Burkina Faso, Cameroon, Chad,The Gambia, Guinea, Mali, Mauritania, Niger, Nigeria and Senegal

var ds = new dataset;

var ds = {
	obj: new dataset,
	FSIcols: ["Year", "C1: Security Apparatus", "C2: Factionalized Elites", "C3: Group Grievance", 
				"E1: Economy", "E2: Economic Inequality", "E3: Human Flight and Brain Drain", 
				"P1: State Legitimacy", "P2: Public Services", "P3: Human Rights", 
				"S1: Demographic Pressures", "S2: Refugees and IDPs", "X1: External Intervention"],
	WDIcols: range(1960, 2018)
}
// each dataset is preprocessed to contain a country,year col and only the desired indicators
// exceptions values can be Number for default number conversion or bespoke function
var dsImportList = {				// list of all indicators
		"IIAG/MW-Sahel-4Indicators-2018_IIAG_RawData.csv":{														
			exceptions:{
				JudAutWEF:Number, JudAuthVDEM:Number, JudIndGI:Number, ARTPRovPregWomUNAIDS:Number
			},	// list of exceptions to default accessor
			initFcn: IIAG_init
		},
		"FSI/fsi_sahel_allYears.csv":{											
			exceptions:Object.fromEntries(ds.FSIcols.map(d => [d, Number])),
			initFcn: FSI_init
		},
		"WDI/wdi_sahel_allYears.csv":{											
			exceptions:Object.fromEntries(ds.WDIcols.map(d => [d, Number])),
			initFcn: WDI_init
		}
	};

//////////
// MAIN //
//////////
$(document).ready(function() {  
	sdg_init();
  ds.obj.init(dsImportList); // init datasets
});
