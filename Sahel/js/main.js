// TODO
// send THIS to read csv / get rid of ds in class, displayDatasetNames

// FSI STAR
// popup font, average FSI.minData

// ATTRIBUTIONS
// WDI, FSI, FONTAWSOME, Pauline, text citations
// attrib and link to https://fontawesome.com/license

sahelNames = ["Burkina Faso", "Cameroon", "Chad", "Gambia", "Guinea", "Mali", "Mauritania", "Niger", "Nigeria", "Senegal"];

function IIAG_init(rows) {
	console.log("IIAG");
}

// STUPID 
// Can't get source url from d3.csv callbacks
// HACK make bespoke dataset name -> row hash as returned by the d3.csv accessor function
displayDatasetNames = {
	[JSON.stringify(["Country", "Year", "JudAutWEF", "JudAuthVDEM", "JudIndGI", "ARTPRovPregWomUNAIDS"])]:IIAG_init,
	[JSON.stringify(["", "Country", "Year", "Rank", "Total", "C1: Security Apparatus", "C2: Factionalized Elites", "C3: Group Grievance", "E1: Economy", "E2: Economic Inequality", "E3: Human Flight and Brain Drain", "P1: State Legitimacy", "P2: Public Services", "P3: Human Rights", "S1: Demographic Pressures", "S2: Refugees and IDPs", "X1: External Intervention"])]:FSI_init
};

// SAHEL Countries:  Burkina Faso, Cameroon, Chad,The Gambia, Guinea, Mali, Mauritania, Niger, Nigeria and Senegal

var ds = new dataset;

// each dataset is preprocessed to contain a country,year col and only the desired indicators
// exceptions values can be Number for default number conversion or bespoke function
var dsImportList = {				// list of all indicators
		"IIAG/MW-Sahel-4Indicators-2018_IIAG_RawData.csv":{														
			exceptions:{
				JudAutWEF:Number, JudAuthVDEM:Number, JudIndGI:Number, ARTPRovPregWomUNAIDS:Number
			}	// list of exceptions to default accessor
		},
		"FSI/fsi_sahel_allYears.csv":{											
			exceptions:{"C1: Security Apparatus":Number, "C2: Factionalized Elites":Number, "C3: Group Grievance":Number, 
				"E1: Economy":Number, "E2: Economic Inequality":Number, "E3: Human Flight and Brain Drain":Number, 
				"P1: State Legitimacy":Number, "P2: Public Services":Number, "P3: Human Rights":Number, 
				"S1: Demographic Pressures":Number, "S2: Refugees and IDPs":Number, "X1: External Intervention":Number
			}
		}
	};

//////////
// MAIN //
//////////
$(document).ready(function() {  
	sdg_init();
  ds.init(dsImportList); // init datasets
});
