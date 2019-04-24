// TODO
// normalize popups
// extra <> for map/fragility

// Intro - morph effect

// Indicators - choose IIAG

// visGlue
// use chart year for relAgg not indicator year

// ACLED
// Cloropleth wrong 6/2016 ? 
// add new vis to show change over time

// FSI STAR
// popup font, average FSI.minData
// move date
// Star callback before nData initted

// SDG
// Select specific sdgs

// SDG Success
// FIX: ignoring all nonspecific indicator names

// Copenhagen - create

// ATTRIBUTIONS
// WDI, FSI, FONTAWSOME, Pauline, text citations
// attrib and link to https://fontawesome.com/license

// DANIEL
// all charts wide
// legend off to the side
// indicator colors redo  off to the side / more passive colors / possibly icons?

// SAHEL Countries:  Burkina Faso, Cameroon, Chad,The Gambia, Guinea, Mali, Mauritania, Niger, Nigeria and Senegal

var ds = new dataset;

var ds = {
	obj: new dataset,
	FSIcols: ["Year", "C1: Security Apparatus", "C2: Factionalized Elites", "C3: Group Grievance", 
				"E1: Economy", "E2: Economic Inequality", "E3: Human Flight and Brain Drain", 
				"P1: State Legitimacy", "P2: Public Services", "P3: Human Rights", 
				"S1: Demographic Pressures", "S2: Refugees and IDPs", "X1: External Intervention"],
	WDIcols: range(1960, 2018),
	ACLEDcols: ["LATITUDE", "LONGITUDE", "FATALITIES", "TIMESTAMP"],
	UNSDGcols: ["TimePeriod", "Value"]
}
// each dataset is preprocessed to contain a country,year col and only the desired indicators
// exceptions values can be Number for default number conversion or bespoke function
var dsImportList = {				// list of all indicators
		"IIAG/IIAG_2009+.csv":{														
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
		},
		"ACLED/acled_sahel_gt2007.csv":{											
			exceptions:Object.fromEntries(ds.ACLEDcols.map(d => [d, Number])),
			initFcn: ACLED_init
		},
		"UNSDG/UNSDG.csv":{											
			exceptions:Object.fromEntries(ds.UNSDGcols.map(d => [d, Number])),
			initFcn: UNSDG_init
		}
	};

//////////
// MAIN //
//////////
$(document).ready(function() {  
	sdg_init();
  ds.obj.init(dsImportList); // init datasets
});
