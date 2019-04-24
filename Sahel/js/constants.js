
var sahelNames = ["Burkina Faso", "Cameroon", "Chad", "Gambia", "Guinea", "Mali", "Mauritania", "Niger", "Nigeria", "Senegal"];

var colorRanges = [Chart.colorschemes.brewer.OrRd4, Chart.colorschemes.brewer.RdPu4, Chart.colorschemes.brewer.PuBuGn4, Chart.colorschemes.brewer.BuGn4, Chart.colorschemes.office.Berlin6];

var sdgCopy = [
		{title:`Goal 1: No Poverty`,
			targets:`
				By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day.
				By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions.
				Implement nationally appropriate social protection systems and measures for all, including floors, and by 2030 achieve substantial coverage of the poor and the vulnerable.
				By 2030, ensure that all men and women, in particular the poor and the vulnerable, have equal rights to economic resources, as well as access to basic services, ownership and control over land and other forms of 13 property, inheritance, natural resources, appropriate new technology and financial services, including micro-finance.
				By 2030, build the resilience of the poor and those in vulnerable situations and reduce their exposure and vulnerability to climate-related extreme events and other economic, social and environmental shocks and disasters.
				Ensure significant mobilization of resources from a variety of sources, including through enhanced development cooperation, in order to provide adequate and predictable means for developing countries, in particular least developed countries, to implement programmes and policies to end poverty in all its dimensions.
				Create sound policy frameworks at the national, regional and international levels, based on pro-poor and gender-sensitive development strategies, to support accelerated investment in poverty eradication actions
			`},
		{title:`Goal 2: Zero Hunger`,
			targets:`
			By 2030, end hunger and ensure access by all people, in particular the poor and people in vulnerable situations, including infants, to safe, nutritious and sufficient food all year round.
By 2030, end all forms of malnutrition, including achieving, by 2025, the internationally agreed targets on stunting and wasting in children under 5 years of age, and address the nutritional needs of adolescent girls, pregnant and lactating women and older persons
By 2030, double the agricultural productivity and incomes of small-scale food producers, in particular women, indigenous peoples, family farmers, pastoralists and fishers, including through secure and equal access to land, other productive resources and inputs, knowledge, financial services, markets and opportunities for value addition and non-farm employment
By 2030, ensure sustainable food production systems and implement resilient agricultural practices that increase productivity and production, that help maintain ecosystems, that strengthen capacity for adaptation to climate change, extreme weather, drought, flooding and other disasters and that progressively improve land and soil quality
By 2020, maintain the genetic diversity of seeds, cultivated plants and farmed and domesticated animals and their related wild species, including through soundly managed and diversified seed and plant banks at the national, regional and international levels, and promote access to and fair and equitable sharing of benefits arising from the utilization of genetic resources and associated traditional knowledge, as internationally agreed
Increase investment, including through enhanced international cooperation, in rural infrastructure, agricultural research and extension services, technology development and plant and livestock gene banks 
Adopt measures to ensure the proper functioning of food commodity markets and their derivatives and facilitate timely access to market information, including on food reserves, in order to help limit extreme food price volatility
			`},
		{title:`Goal 3: Good Health and Well-being`,
			targets:`
			By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births
By 2030, end preventable deaths of newborns and children under 5 years of age, with all countries aiming to reduce neonatal mortality to at least as low as 12 per 1,000 live births and under-5 mortality to at least as low as 25 per 1,000 live births
By 2030, end the epidemics of AIDS, tuberculosis, malaria and neglected tropical diseases and combat hepatitis, water-borne diseases and other communicable diseases
By 2030, reduce by one third premature mortality from non-communicable diseases through prevention and treatment and promote mental health and well-being
Strengthen the prevention and treatment of substance abuse, including narcotic drug abuse and harmful use of alcohol
By 2020, halve the number of global deaths and injuries from road traffic accidents 3.7
By 2030, ensure universal access to sexual and reproductive health-care services, including for family planning, information and education, and the integration of reproductive health into national strategies and programmes
Achieve universal health coverage, including financial risk protection, access to quality essential health-care services and access to safe, effective, quality and affordable essential medicines and vaccines for all
By 2030, substantially reduce the number of deaths and illnesses from hazardous chemicals and air, water and soil pollution and contamination
Strengthen the implementation of the World Health Organization Framework Convention on Tobacco Control in all countries, as appropriate
Support the research and development of vaccines and medicines for the communicable and noncommunicable diseases that primarily affect developing countries, provide access to affordable essential medicines and vaccines, in accordance with the Doha Declaration on the TRIPS Agreement and Public Health, which affirms the right of developing countries to use to the full the provisions in the Agreement on Trade Related Aspects of Intellectual Property Rights
Substantially increase health financing and the recruitment, development, training and retention of the health workforce in developing countries, especially in least developed countries and small island developing States
Strengthen the capacity of all countries, in particular developing countries, for early warning, risk reduction and management of national and global health risks
			`},
		{title:`Goal 4: Quality Education`,
			targets:`
			By 2030, ensure that all girls and boys complete free, equitable and quality primary and secondary education leading to relevant and Goal-4 effective learning outcomes
By 2030, ensure that all girls and boys have access to quality early childhood development, care and preprimary education so that they are ready for primary education
By 2030, ensure equal access for all women and men to affordable and quality technical, vocational and tertiary education, including university
By 2030, substantially increase the number of youth and adults who have relevant skills, including technical and vocational skills, for employment, decent jobs and entrepreneurship
By 2030, eliminate gender disparities in education and ensure equal access to all levels of education and vocational training for the vulnerable, including persons with disabilities, indigenous peoples and children in vulnerable situations
By 2030, ensure that all youth and a substantial proportion of adults, both men and women, achieve literacy and numeracy
By 2030, ensure that all learners acquire the knowledge and skills needed to promote sustainable development, including, among others, through education for sustainable development and sustainable lifestyles, human rights, gender equality, promotion of a culture of peace and non-violence, global citizenship and appreciation of cultural diversity and of culture’s contribution to sustainable development
Build and upgrade education facilities that are child, disability and gender sensitive and provide safe, nonviolent, inclusive and effective learning environments for all
By 2020, substantially expand globally the number of scholarships available to developing countries, in particular least developed countries, small island developing States and African countries, for enrolment in higher education, including vocational training and information and communications technology, technical, engineering and scientific programmes, in developed countries and other developing countries
By 2030, substantially increase the supply of qualified teachers, including through international cooperation for teacher training in developing countries, especially least developed countries and small island developing states
			`},
		{title:`Goal 5: Gender Equality`,
			targets:`
			End all forms of discrimination against all women and girls everywhere
Eliminate all forms of violence against all women and girls in the public and private spheres, including trafficking and sexual and other types of exploitation
Eliminate all harmful practices, such as child, early and forced marriage and female genital mutilation
Recognize and value unpaid care and domestic work through the provision of public services, infrastructure and social protection policies and the promotion of shared responsibility within the household and the family as nationally appropriate
Ensure women’s full and effective participation and equal opportunities for leadership at all levels of decision making in political, economic and public life
Ensure universal access to sexual and reproductive health and reproductive rights as agreed in accordance with the Programme of Action of the International Conference on Population and Development and the Beijing Platform for Action and the outcome documents of their review conferences
Undertake reforms to give women equal rights to economic resources, as well as access to ownership and control over land and other forms of property, financial services, inheritance and natural resources, in accordance with national laws
Enhance the use of enabling technology, in particular information and communications technology, to promote the empowerment of women
Adopt and strengthen sound policies and enforceable legislation for the promotion of gender equality and the empowerment of all women and girls at all levels
			`},
		{title:`Goal 6: Clean Water and Sanitation`,
			targets:`
			By 2030, achieve universal and equitable access to safe and affordable drinking water for all
By 2030, achieve access to adequate and equitable sanitation and hygiene for all and end open defecation, paying special attention to the needs of women and girls and those in vulnerable situations
By 2030, improve water quality by reducing pollution, eliminating dumping and minimizing release of hazardous chemicals and materials, halving the proportion of untreated wastewater and substantially increasing recycling and safe reuse globally
By 2030, substantially increase water-use efficiency across all sectors and ensure sustainable withdrawals and supply of freshwater to address water scarcity and substantially reduce the number of people suffering from water scarcity
By 2030, implement integrated water resources management at all levels, including through transboundary cooperation as appropriate
By 2020, protect and restore water-related ecosystems, including mountains, forests, wetlands, rivers, aquifers and lakes
By 2030, expand international cooperation and capacity-building support to developing countries in water- and sanitation-related activities and programmes, including water harvesting, desalination, water efficiency, wastewater treatment, recycling and reuse technologies
Support and strengthen the participation of local communities in improving water and sanitation management
			`},
		{title:`Goal 7: Affordable and Clean Energy`,
			targets:`
			By 2030, ensure universal access to affordable, reliable and modern energy services
By 2030, increase substantially the share of renewable energy in the global energy mix
By 2030, double the global rate of improvement in energy efficiency
By 2030, enhance international cooperation to facilitate access to clean energy research and technology, including renewable energy, energy efficiency and advanced and cleaner fossil-fuel technology, and promote investment in energy infrastructure and clean energy technology
By 2030, expand infrastructure and upgrade technology for supplying modern and sustainable energy services for all in developing countries, in particular least developed countries, small island developing States, and land-locked developing countries, in accordance with their respective programmes of support
			`},
		{title:`Goal 8: Decent Work and Economic Growth`,
			targets:`
			Sustain per capita economic growth in accordance with national circumstances and, in particular, at least 7 per cent gross domestic product growth per annum in the least developed countries
Achieve higher levels of economic productivity through diversification, technological upgrading and innovation, including through a focus on high-value added and labour-intensive sectors
Promote development-oriented policies that support productive activities, decent job creation, entrepreneurship, creativity and innovation, and encourage the formalization and growth of micro-, small- and medium-sized enterprises, including through access to financial services
Improve progressively, through 2030, global resource efficiency in consumption and production and endeavour to decouple economic growth from environmental degradation, in accordance with the 10-year framework of programmes on sustainable consumption and production, with developed countries taking the lead
By 2030, achieve full and productive employment and decent work for all women and men, including for young people and persons with disabilities, and equal pay for work of equal value
By 2020, substantially reduce the proportion of youth not in employment, education or training
Take immediate and effective measures to eradicate forced labour, end modern slavery and human trafficking and secure the prohibition and elimination of the worst forms of child labour, including recruitment and use of child soldiers, and by 2025 end child labour in all its forms
Protect labour rights and promote safe and secure working environments for all workers, including migrant workers, in particular women migrants, and those in precarious employment
By 2030, devise and implement policies to promote sustainable tourism that creates jobs and promotes local culture and products
Strengthen the capacity of domestic financial institutions to encourage and expand access to banking, insurance and financial services for all
Increase Aid for Trade support for developing countries, in particular least developed countries, including through the Enhanced Integrated Framework for Trade-Related Technical Assistance to Least Developed Countries
By 2020, develop and operationalize a global strategy for youth employment and implement the Global Jobs Pact of the International Labour Organization
			`},
		{title:`Goal 9: Industry, Innovation and Infrastructure`,
			targets:`
			Develop quality, reliable, sustainable and resilient infrastructure, including regional and transborder infrastructure, to support economic development and human well-being, with a focus on affordable and equitable access for all
Promote inclusive and sustainable industrialization and, by 2030, significantly raise industry’s share of employment and gross domestic product, in line with national circumstances, and double its share in least developed countries
Increase the access of small-scale industrial and other enterprises, in particular in developing countries, to financial services, including affordable credit, and their integration into value chains and markets
By 2030, upgrade infrastructure and retrofit industries to make them sustainable, with increased resource-use efficiency and greater adoption of clean and environmentally sound technologies and industrial processes, with all countries taking action in accordance with their respective capabilities
Enhance scientific research, upgrade the technological capabilities of industrial sectors in all countries, in particular developing countries, including, by 2030, encouraging innovation and substantially increasing the number of research and development workers per 1 million people and public and private research and development spending
Facilitate sustainable and resilient infrastructure development in developing countries through enhanced financial, technological and technical support to African countries, least developed countries, landlocked developing countries and small island developing States 18
Support domestic technology development, research and innovation in developing countries, including by ensuring a conducive policy environment for, inter alia, industrial diversification and value addition to commodities
Significantly increase access to information and communications technology and strive to provide universal and affordable access to the Internet in least developed countries by 2020
			`},
		{title:`Goal 10: Reduce Inequalities`,
			targets:`
			By 2030, progressively achieve and sustain income growth of the bottom 40 per cent of the population at a rate higher than the national average
By 2030, empower and promote the social, economic and political inclusion of all, irrespective of age, sex, disability, race, ethnicity, origin, religion or economic or other status
Ensure equal opportunity and reduce inequalities of outcome, including by eliminating discriminatory laws, policies and practices and promoting appropriate legislation, policies and action in this regard
Adopt policies, especially fiscal, wage and social protection policies, and progressively achieve greater equality
Improve the regulation and monitoring of global financial markets and institutions and strengthen the implementation of such regulations
Ensure enhanced representation and voice for developing countries in decision-making in global international economic and financial institutions in order to deliver more effective, credible, accountable and legitimate institutions
Facilitate orderly, safe, regular and responsible migration and mobility of people, including through the implementation of planned and well-managed migration policies
Implement the principle of special and differential treatment for developing countries, in particular least developed countries, in accordance with World Trade Organization agreements
Encourage official development assistance and financial flows, including foreign direct investment, to States where the need is greatest, in particular least developed countries, African countries, small island developing States and landlocked developing countries, in accordance with their national plans and programmes
By 2030, reduce to less than 3 per cent the transaction costs of migrant remittances and eliminate remittance corridors with costs higher than 5 per cent
			`},
		{title:`Goal 11: Sustainable Cities and Communities`,
			targets:`
			By 2030, ensure access for all to adequate, safe and affordable housing and basic services and upgrade slums
By 2030, provide access to safe, affordable, accessible and sustainable transport systems for all, improving road safety, notably by expanding public transport, with special attention to the needs of those in vulnerable situations, women, children, persons with disabilities and older persons
By 2030, enhance inclusive and sustainable urbanization and capacity for participatory, integrated and sustainable human settlement planning and management in all countries
Strengthen efforts to protect and safeguard the world’s cultural and natural heritage
By 2030, significantly reduce the number of deaths and the number of people affected and substantially decrease the direct economic losses relative to global gross domestic product caused by disasters, including water-related disasters, with a focus on protecting the poor and people in vulnerable situations
By 2030, reduce the adverse per capita environmental impact of cities, including by paying special attention to air quality and municipal and other waste management
By 2030, provide universal access to safe, inclusive and accessible, green and public spaces, in particular for women and children, older persons and persons with disabilities
Support positive economic, social and environmental links between urban, peri-urban and rural areas by strengthening national and regional development planning
By 2020, substantially increase the number of cities and human settlements adopting and implementing integrated policies and plans towards inclusion, resource efficiency, mitigation and adaptation to climate change, resilience to disasters, and develop and implement, in line with the Sendai Framework for Disaster Risk Reduction 2015-2030, holistic disaster risk management at all levels
Support least developed countries, including through financial and technical assistance, in building sustainable and resilient buildings utilizing local materials
			`},
		{title:`Goal 12: Responsible Consumption and Production`,
			targets:`
			Implement the 10-year framework of programmes on sustainable consumption and production, all countries taking action, with developed countries taking the lead, taking into account the development and capabilities of developing countries
By 2030, achieve the sustainable management and efficient use of natural resources
By 2030, halve per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains, including post-harvest losses
By 2020, achieve the environmentally sound management of chemicals and all wastes throughout their life cycle, in accordance with agreed international frameworks, and significantly reduce their release to air, water and soil in order to minimize their adverse impacts on human health and the environment
By 2030, substantially reduce waste generation through prevention, reduction, recycling and reuse
Encourage companies, especially large and transnational companies, to adopt sustainable practices and to integrate sustainability information into their reporting cycle
Promote public procurement practices that are sustainable, in accordance with national policies and priorities
By 2030, ensure that people everywhere have the relevant information and awareness for sustainable development and lifestyles in harmony with nature
Support developing countries to strengthen their scientific and technological capacity to move towards more sustainable patterns of consumption and production
Develop and implement tools to monitor sustainable development impacts for sustainable tourism that creates jobs and promotes local culture and products
Rationalize inefficient fossil-fuel subsidies that encourage wasteful consumption by removing market distortions, in accordance with national circumstances, including by restructuring taxation and phasing out those harmful subsidies, where they exist, to reflect their environmental impacts, taking fully into account the specific needs and conditions of developing countries and minimizing the possible adverse impacts on their development in a manner that protects the poor and the affected communities
			`},
		{title:`Goal 13: Climate Action`,
			targets:`
			Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries
Integrate climate change measures into national policies, strategies and planning
Improve education, awareness-raising and human and institutional capacity on climate change mitigation, adaptation, impact reduction and early warning
Implement the commitment undertaken by developed-country parties to the United Nations Framework Convention on Climate Change to a goal of mobilizing jointly $100 billion annually by 2020 from all sources to address the needs of developing countries in the context of meaningful mitigation actions and transparency on implementation and fully operationalize the Green Climate Fund through its capitalization as soon as possible
Promote mechanisms for raising capacity for effective climate change-related planning and management in least developed countries and small island developing States, including focusing on women, youth and local and marginalized communities
			`},
		{title:`Goal 14: Life Below Water`,
			targets:`
			By 2025, prevent and significantly reduce marine pollution of all kinds, in particular from land-based activities, including marine debris and nutrient pollution
By 2020, sustainably manage and protect marine and coastal ecosystems to avoid significant adverse impacts, including by strengthening their resilience, and take action for their restoration in order to achieve healthy and productive oceans
Minimize and address the impacts of ocean acidification, including through enhanced scientific cooperation at all levels
By 2020, effectively regulate harvesting and end overfishing, illegal, unreported and unregulated fishing and destructive fishing practices and implement science-based management plans, in order to restore fish stocks in the shortest time feasible, at least to levels that can produce maximum sustainable yield as determined by their biological characteristics
By 2020, conserve at least 10 per cent of coastal and marine areas, consistent with national and international law and based on the best available scientific information
By 2020, prohibit certain forms of fisheries subsidies which contribute to overcapacity and overfishing, eliminate subsidies that contribute to illegal, unreported and unregulated fishing and refrain from introducing new such subsidies, recognizing that appropriate and effective special and differential treatment for developing and least developed countries should be an integral part of the World Trade Organization fisheries subsidies negotiation
By 2030, increase the economic benefits to Small Island developing States and least developed countries from the sustainable use of marine resources, including through sustainable management of fisheries, aquaculture and tourism
Increase scientific knowledge, develop research capacity and transfer marine technology, taking into account the Intergovernmental Oceanographic Commission Criteria and Guidelines on the Transfer of Marine Technology, in order to improve ocean health and to enhance the contribution of marine biodiversity to the development of developing countries, in particular small island developing States and least developed countries
Provide access for small-scale artisanal fishers to marine resources and markets
Enhance the conservation and sustainable use of oceans and their resources by implementing international law as reflected in UNCLOS, which provides the legal framework for the conservation and sustainable use of oceans and their resources, as recalled in paragraph 158 of The Future We Want
			`},
		{title:`Goal 15: Life On Land`,
			targets:`
			By 2020, ensure the conservation, restoration and sustainable use of terrestrial and inland freshwater ecosystems and their services, in particular forests, wetlands, mountains and drylands, in line with obligations under international agreements
By 2020, promote the implementation of sustainable management of all types of forests, halt deforestation, restore degraded forests and substantially increase afforestation and reforestation globally
By 2030, combat desertification, restore degraded land and soil, including land affected by desertification, drought and floods, and strive to achieve a land degradation-neutral world
By 2030, ensure the conservation of mountain ecosystems, including their biodiversity, in order to enhance their capacity to provide benefits that are essential for sustainable development
Take urgent and significant action to reduce the degradation of natural habitats, halt the loss of biodiversity and, by 2020, protect and prevent the extinction of threatened species
Promote fair and equitable sharing of the benefits arising from the utilization of genetic resources and promote appropriate access to such resources, as internationally agreed
Take urgent action to end poaching and trafficking of protected species of flora and fauna and address both demand and supply of illegal wildlife products
By 2020, introduce measures to prevent the introduction and significantly reduce the impact of invasive alien species on land and water ecosystems and control or eradicate the priority species
By 2020, integrate ecosystem and biodiversity values into national and local planning, development processes, poverty reduction strategies and accounts
Mobilize and significantly increase financial resources from all sources to conserve and sustainably use biodiversity and ecosystems
Mobilize significant resources from all sources and at all levels to finance sustainable forest management and provide adequate incentives to developing countries to advance such management, including for conservation and reforestation
Enhance global support for efforts to combat poaching and trafficking of protected species, including by increasing the capacity of local communities to pursue sustainable livelihood opportunities
			`},
		{title:`Goal 16: Peace, Justice and Strong Institutions`,
			targets:`
			Significantly reduce all forms of violence and related death rates everywhere.
End abuse, exploitation, trafficking and all forms of violence against and torture of children.
Promote the rule of law at the national and international levels and ensure equal access to justice for all.
By 2030, significantly reduce illicit financial and arms flows, strengthen the recovery and return of stolen assets and combat all forms of organised crime.
Substantially reduce corruption and bribery in all their forms.
Develop effective, accountable and transparent institutions at all levels.
Ensure responsive, inclusive, participatory and representative decision-making at all levels.
Broaden and strengthen the participation of developing countries in the institutions of global governance.
By 2030, provide legal identity for all, including birth registration.
Ensure public access to information and protect fundamental freedoms, in accordance with national legislation and international agreements.
Strengthen relevant national institutions, including through international cooperation, for building capacity at all levels, in particular in developing countries, to prevent violence and combat terrorism and crime.
Promote and enforce non-discriminatory laws and policies for sustainable development.
			`},
		{title:`Goal 17: Partnerships for the Goals`,
			targets:`



Finance: Strengthen domestic resource mobilization, including through international support to developing countries, to improve domestic capacity for tax and other revenue collection
Finance: Developed countries to implement fully their official development assistance commitments, including the commitment by many developed countries to achieve the target of 0.7 per cent of ODA/GNI to developing countries and 0.15 to 0.20 per cent of ODA/GNI to least developed countries ODA providers are encouraged to consider setting a target to provide at least 0.20 per cent of ODA/GNI to least developed countries
Finance: Mobilize additional financial resources for developing countries from multiple sources
Finance: Assist developing countries in attaining long-term debt sustainability through coordinated policies aimed at fostering debt financing, debt relief and debt restructuring, as appropriate, and address the external debt of highly indebted poor countries to reduce debt distress
Finance: Adopt and implement investment promotion regimes for least developed countries

Technology: Enhance North-South, South-South and triangular regional and international cooperation on and access to science, technology and innovation and enhance knowledge sharing on mutually agreed terms, including through improved coordination among existing mechanisms, in particular at the United Nations level, and through a global technology facilitation mechanism
Technology: Promote the development, transfer, dissemination and diffusion of environmentally sound technologies to developing countries on favourable terms, including on concessional and preferential terms, as mutually agreed
Technology: Fully operationalize the technology bank and science, technology and innovation capacity-building mechanism for least developed countries by 2017 and enhance the use of enabling technology, in particular information and communications technology

Capacity building: Enhance international support for implementing effective and targeted capacity-building in developing countries to support national plans to implement all the sustainable development goals, including through North-South, South-South and triangular cooperation

Trade: Promote a universal, rules-based, open, non-discriminatory and equitable multilateral trading system under the World Trade Organization, including through the conclusion of negotiations under its Doha Development Agenda
Trade: Significantly increase the exports of developing countries, in particular with a view to doubling the least developed countries’ share of global exports by 2020
Trade: Realize timely implementation of duty-free and quota-free market access on a lasting basis for all least developed countries, consistent with World Trade Organization decisions, including by ensuring that preferential rules of origin applicable to imports from least developed countries are transparent and simple, and contribute to facilitating market access

Policy and institutional coherence: Enhance global macroeconomic stability, including through policy coordination and policy coherence
Policy and institutional coherence: Enhance policy coherence for sustainable development
Policy and institutional coherence: Respect each country’s policy space and leadership to establish and implement policies for poverty eradication and sustainable development


Multi-stakeholder partnerships: Enhance the global partnership for sustainable development, complemented by multi-stakeholder partnerships that mobilize and share knowledge, expertise, technology and financial resources, to support the achievement of the sustainable development goals in all countries, in particular developing countries
Multi-stakeholder partnerships: Encourage and promote effective public, public-private and civil society partnerships, building on the experience and resourcing strategies of partnerships


Data, monitoring and accountability: By 2020, enhance capacity-building support to developing countries, including for least developed countries and small island developing States, to increase significantly the availability of high-quality, timely and reliable data disaggregated by income, gender, age, race, ethnicity, migratory status, disability, geographic location and other characteristics relevant in national contexts
Data, monitoring and accountability: By 2030, build on existing initiatives to develop measurements of progress on sustainable development that complement gross domestic product, and support statistical capacity-building in developing countries
			`}	
];


Chart.defaults.global.tooltips.mode = 'nearest';
Chart.defaults.global.defaultFontFamily = "Open Sans";
Chart.defaults.global.animation.animationDuration = 500;
Chart.defaults.global.animation.easing = "linear";
Chart.defaults.global.elements.point.pointStyle = "cross";
Chart.defaults.global.elements.point.radius = 6;
Chart.defaults.global.legend.labels.boxWidth = 20;

defCfgLineGraph = {	
	type: 'line',
	data: {
		//labels: range(FSI.yearMin, FSI.yearMax),
		//datasets: setChartData(),
	},
	options: {
		legend: {
			 onClick: (e) => e.stopPropagation()
		},
		//~ plugins: {
			//~ colorschemes: {
				//~ scheme: 'brewer.Blues4'
			//~ }
		//~ },  
		annotation: {
			annotations: [
				{
					type: "line",
					mode: "vertical",
					scaleID: "x-axis-0",
					// value: FSI.yearCur,
					borderColor: 'rgba(0, 0, 0, 0.5)',
					borderWidth: 3
				}
			]
		},     
		tooltips: {
			mode: "x-axis",
		},
		animation: {
			duration: 200// general animation time
		},
		hover: {
			animationDuration: 0 // duration of animations when hovering an item
		}, 
		elements: {
			line: {
				tension: 0 // disables bezier curves
			}
		}
	}
}

defCfgLineGraph.options.tooltips.callbacks = {
            label: function(tooltipItem, data) {
								return maxSign(parseFloat(tooltipItem.yLabel), 2);
								}
        };

// Deep copy
var defCfgStackedLineGraph = jQuery.extend(true, {}, defCfgLineGraph);
defCfgStackedLineGraph.options.scales = {yAxes: [{stacked: true,
																									ticks: {
																											beginAtZero:true,
																											ccallback: function(value, index, values) {
																												return '$' + (value / 1000000) + 'M'
																													//~ if(parseInt(value) >= 1000){
																														 //~ return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
																													//~ } else {
																														 //~ return '$' + value;
																													//~ }
																											},
																											min: 0,
																											display: true, 
																											userCallback: function (tick) {																												
																												var value = parseInt(tick) / 1000000;
																												if(value >= 1000){
																													 return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'M';
																												} else {
																													 return '$' + value + 'M';
																												}
																											},
																									 }
																								 }]};
																								
defCfgStackedLineGraph.options.tooltips.callbacks = {
            label: function(tooltipItem, data) {
								var value = parseInt(tooltipItem.yLabel) / 1000000;
								if(value >= 1000){
									 return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'M';
								} else {
									 return '$' + value + 'M';
								}
            }
        };
    

// defCfgStackedLineGraph.scaleStartValue = 2000000;
// defCfgStackedLineGraph.scaleOverride = true;
defCfgStackedLineGraph.aspectRatio = 3.33;
defCfgStackedLineGraph.maintainAspectRatio = false;

// IIAG FULL
//~ var IIAG_FULL_METRICS = [
		//~ {
			//~ title: "Business",
			//~ labels: ["restrict frgn invest", "Customs", "Bus regulatory env", "Good banks"],
			//~ inds: ['AbsRestForInvWEF', 'CustProcWEF', 'CompEnvWB', 'SoundBanksWEF'],
			//~ colors: colorRanges[4],
			//~ yearMin: IIAG.yearMin,
			//~ yearMax: IIAG.yearMax
		//~ },
		//~ {
			//~ title: "Government",
			//~ labels: ["Constraints on GovPower","Absence Judicial Corruption","Free Fair Elections"],
			//~ inds: ["ConsGovPowerVDEM", "AbsJudCorrVDEM", "FreeFairElecVDEM"],
			//~ colors: colorRanges[4],
			//~ yearMin: IIAG.yearMin,
			//~ yearMax: IIAG.yearMax
		//~ },
		//~ {
			//~ title: "Education",
			//~ labels: ["Edu mgmt", "Secondary enroll", "gen bal", "tert enroll", "primary complet"],
			//~ inds: ['EducSysMgmtWEF', 'SecEducEnroUNESCO', 'GenBalEducUNESCO', 'TertEducEnroUNESCO', 'PrimScholCompWB'],
			//~ colors: colorRanges[4],
			//~ yearMin: IIAG.yearMin,
			//~ yearMax: IIAG.yearMax
		//~ },
		//~ {
			//~ title: "Gender",
			//~ labels: ["women parliment", "women empowerment"],
			//~ inds: ['WomLabForPartWB', 'WomPolEmpowerVDEM'],
			//~ colors: colorRanges[4],
			//~ yearMin: IIAG.yearMin,
			//~ yearMax: IIAG.yearMax
		//~ },
		//~ {
			//~ title: "Infrastructure",
			//~ labels: ["Electric", "Air", "executive transparency and account", "Roads"],
			//~ inds: ['ElecSuppWEF', 'QualAirTransWEF', 'ExecAccTransWB', 'RoadNetWEF'],
			//~ colors: colorRanges[4],
			//~ yearMin: IIAG.yearMin,
			//~ yearMax: IIAG.yearMax
		//~ },
		//~ {
			//~ title: "Pol 1",
			//~ labels: ["Diversion pub funds", "Fed budget", "Abs Gov Favoritism", "Constraints gov pwr", "Abs Jud Corrupt", "Free fair elect"],
			//~ inds: ['AbsDivPubFundWEF', 'BudgMgmtWB','AbsFavGovDecWEF', 'ConsGovPowerVDEM','AbsJudCorrVDEM', 'FreeFairElecVDEM',],
			//~ colors: colorRanges[4],
			//~ yearMin: IIAG.yearMin,
			//~ yearMax: IIAG.yearMax
		//~ },
		//~ {
			//~ title: "Pol 2",
			//~ labels: ["jud autonomy", "free fair elect", "Abs legi corrupt", "Access to justice", "agr budget cost", "abs of refugees"],
			//~ inds: ['JudAutWEF', 'FreeFairExecElecCDD', 'AbsLegCorrVDEM', 'AccJusticeVDEM', 'AgPolCostWEF', 'PolRefUNHCR'],
			//~ colors: colorRanges[4],
			//~ yearMin: IIAG.yearMin,
			//~ yearMax: IIAG.yearMax
		//~ },
		//~ {
			//~ title: "Safety 1",
			//~ labels: ["Food Dep", "media impartial", "Abs Violent Crime", "Human Traf", "Pol Services reliability"],
			//~ // not great data , 'WatDepAFR'
			//~ inds: ['FooDepAFR', 'MedImpVDEM', 'ViolCrimeEIU', 'HumTraffUSDS', 'PolServWEF'],
			//~ colors: colorRanges[4],
			//~ yearMin: IIAG.yearMin,
			//~ yearMax: IIAG.yearMax
		//~ },		
		//~ {
			//~ title: "Safety 2",
			//~ labels: ["IDPs", "Prot prop rights", "welfare svs", "riots/protests"],
			//~ // 'LivStanPoorAFR', not great data
			//~ inds: ['IntDisPeoIDMC', 'ProtPropRigWEF', 'WelfServWB', 'RiotsProtestsACLED'], 
			//~ colors: colorRanges[4],
			//~ yearMin: IIAG.yearMin,
			//~ yearMax: IIAG.yearMax
		//~ }, 
	//~ ]

VIS0indicators = [
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"EN.POP.DNST",
		label:"Pop density",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"SP.POP.GROW",
		label:"Population Growth",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: ["Nigeria"],
		dset:"WDI",
		name:"SM.POP.REFG.OR",
		keyName:"nigeria:SM.POP.REFG.OR",
		label:"Nigerian Refugees",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: ["Mali"],
		dset:"WDI",
		name:"SM.POP.REFG.OR",
		keyName:"mali:SM.POP.REFG.OR",
		label:"Malian Refugees",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: ["Chad"],
		dset:"WDI",
		name:"SM.POP.REFG",
		keyName:"chad:SM.POP.REFG",
		label:"Chad Asylum Granted",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: ["Cameroon"],
		dset:"WDI",
		name:"SM.POP.REFG",
		keyName:"cameroon:SM.POP.REFG",
		label:"Cameroon Asylum Granted",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"SH.STA.BASS.RU.ZS",
		label:"rural sanit svc",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"SH.STA.BASS.ZS",
		label:"All Sanitation Svc",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"MS.MIL.XPND.CD",
		label:"military expenditure",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: ["Nigeria"],
		dset:"WDI",
		name:"VC.IDP.NWDS",
		label:"IDPs Fleeing Disasters",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: ["Nigeria"],
		dset:"WDI",
		name:"VC.IDP.NWCV",
		label:"IDPs Fleeing Violence",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"SH.XPD.CHEX.PC.CD",
		label:"per capita health expend",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"SP.DYN.TFRT.IN",
		label:"Per Woman Births",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"AG.PRD.FOOD.XD",
		label:"Food Production",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"FP.CPI.TOTL.ZG",
		label:"Percent Inflation",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"SP.ADO.TFRT",
		label:"ado fertility rate",
		func:"getRaw"
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"AG.LND.ARBL.HA.PC",
		label:"ariable land",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"AG.PRD.CREL.MT",
		label:"Cerial Yield",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"WDI",
		name:"AG.YLD.CREL.KG",
		label:"cerial yield kg",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"FreeFairElecVDEM",
		label:"Free/Fair Elections",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"AbsLegCorrVDEM",
		label:"Lack of Legislative Corruption",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"ConsGovPowerVDEM",
		label:"Constraints on Government Power",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"RiotsProtestsACLED",
		label:"Lack of Riots/Protests",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"PrimScholCompWB",
		label:"Primary Edu. Completion",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"SecEducEnroUNESCO",
		label:"Secondary Edu Enrollment",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"TertEducEnroUNESCO",
		label:"Tertiary Edu. Enrollment",
		func:"relAgg",
		fArgs:{relYear:2009}
	},
	{
		years: range(2009, 2016),
		countries: sahelNames,
		dset:"IIAG",
		name:"RoadNetWEF",
		label:"Road Quality",
		func:"relAgg",
		fArgs:{relYear:2009}
	}
	
]

VIS0sections = [
	{
		title: "Food & Population",
		inds: ["WDI:SP.POP.GROW", "WDI:AG.PRD.FOOD.XD", "WDI:AG.PRD.CREL.MT"],
		infoText: "Following the 2010 drought food production in general and cereal yields in specific across the Sahel in 2012 dropped more than 10%, the population continued to grow. (Sahel Average, 2009=100%)",
		colors: Chart.colorschemes.brewer.YlGnBu4.slice(1)
	},
	{
		title: "Inflation Spike",
		inds: ["WDI:FP.CPI.TOTL.ZG"],
		infoText: "At this time commodities inflation worldwide contributed to an already difficult situation. Unfortunately, after the world markets recovered, Sahel did not until mid 2014.  (Sahel Average)",
		colors: Chart.colorschemes.brewer.Reds3.slice(2)
	},
	{
		title: "Birth Rate",
		inds: ["WDI:SP.DYN.TFRT.IN"],
		infoText: "While fertility metrics across the Sahel have reduced in the last decade, in 2016 they still hover at over 5 children per woman. (Sahel Average)",
		colors: Chart.colorschemes.brewer.Reds3.slice(1)
	},
	{
		title: "Government Legitimacy",
		inds: ['IIAG:FreeFairElecVDEM', 'IIAG:AbsLegCorrVDEM', 'IIAG:ConsGovPowerVDEM', 'IIAG:RiotsProtestsACLED'],
		infoText: "During this period, trust in the the electoral process declined due to corruption, and abuses of power while protests and riots surged. (Sahel Average, 2009=100%)",
		colors: Chart.colorschemes.brewer.YlOrBr5.slice(1)
	},
	{
		title: "Government Services",
		inds: ['IIAG:PrimScholCompWB', 'IIAG:SecEducEnroUNESCO', 'IIAG:TertEducEnroUNESCO', 'WDI:SH.STA.BASS.ZS', 'IIAG:RoadNetWEF'],
		infoText: "The growing electorate distrust was only amplified by a degredation in government services such as education, roads and sanitation. (Sahel Average, 2009=100%)",
		colors: Chart.colorschemes.brewer.Blues7.slice(1)
	},
	{
		title: "The Refugees Crisis",
		inds: ["WDI:nigeria:SM.POP.REFG.OR", "WDI:mali:SM.POP.REFG.OR", "WDI:cameroon:SM.POP.REFG", "WDI:chad:SM.POP.REFG"],
		infoText: "The resulting destabilization created a regional refugee crisis.  Most came from Mali and Nigeria.  Most found asylum from the already stressed governments of Chad and Cameroon. (Reported Numbers)",
		colors: Chart.colorschemes.brewer.RdYlGn6.slice(1)
	},
	{
		title: "Nigerian Internally Displaced Peoples (IDPs)",
		inds: ["WDI:VC.IDP.NWDS", "WDI:VC.IDP.NWCV"],
		infoText: "These numbers, while staggering, pale in comparison to the millions who fled their homes during this period due to state and climate destabilizations in Nigeria alone. (Reported Numbers)",
		colors: Chart.colorschemes.brewer.BuPu5.slice(2)
	}	
];

UNSDG_VIS0indicators = [
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.ODA.ALLD.CD",
		label:"UN Development and Aid Funds Total",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.FAOG.CD",
		label:"UN Food and Agriculture",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.IAEA.CD",
		label:"IAEA",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.IFAD.CD",
		label:"Intl. Fund for Agricultural Development",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.ILOG.CD",
		label:"ILOG",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNAI.CD",
		label:"UNAI",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNDP.CD",
		label:"UN Development Program",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNEC.CD",
		label:"UNEC",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNFP.CD",
		label:"UN Population Fund",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNCR.CD",
		label:"UN Commission for Refugees",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNCF.CD",
		label:"UN Cooperation Framework",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNPB.CD",
		label:"UN Aids Working Group",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNRW.CD",
		label:"UNRW",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNTA.CD", 
		label:"UN Transitional Authority",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.UNWT.CD",
		label:"UNWT",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.WFPG.CD",
		label:"UN Women's Foreign Policy Group",
		func:"getSum"
	},
	{
		years: range(2000, 2017),
		countries: sahelNames,
		dset:"WDI",
		name:"DT.NFL.WHOL.CD",
		label:"UN World Health Organization",
		func:"getSum"
	}
];
// GrayWarm20.slice(2)
UNSDG_VIS0sections = [
	{
		title: "Total Sahel Funding",
		inds: ["WDI:DT.ODA.ALLD.CD"],
		colors: Chart.colorschemes.tableau.ClassicGray5
	},
	{
		title: "Funding By Agency",
		inds: ["WDI:DT.NFL.UNPB.CD", "WDI:DT.NFL.UNTA.CD","WDI:DT.NFL.FAOG.CD"],
		colors: Chart.colorschemes.tableau.ClassicGray5
	},
	{
		title: "Funding By Agency",
		inds: ["WDI:DT.NFL.IFAD.CD", "WDI:DT.NFL.UNDP.CD", "WDI:DT.NFL.UNFP.CD"],
		colors: Chart.colorschemes.tableau.ClassicGray5
	},
	{
		title: "Funding By Agency",
		inds: ["WDI:DT.NFL.UNCF.CD"],
		colors: Chart.colorschemes.tableau.ClassicGray5
	},
	{
		title: "Funding By Agency",
		inds: ["WDI:DT.NFL.UNCR.CD", "WDI:DT.NFL.WFPG.CD", "WDI:DT.NFL.WHOL.CD"],
		colors: Chart.colorschemes.tableau.ClassicGray5
	}
];
