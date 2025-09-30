async function readCSV(url){
    const response = await fetch(url);
    const data = await response.text();
    return parseCSVData(data);
}

function parseCSVData(data){
    var rawdata = data.split("\r\n")
    var lines = []
    rawdata.forEach(line => {
        lines.push([line.split(", ", 5)])
    })
    return lines
}

// function sort2DArray(array){
//     var sorted = []
//     while(sorted.length < array.length){

//     }
// }

const rankings = await (readCSV("/rankings_18Sept2025.csv"))
// console.log(rankings)

function addCodeAndRankToList(list, rankings){
    var full_list = []
    list.forEach(e => {
        rankings.forEach(r => {
            if(e === r[0][4]){
                full_list.push(r[0])
            }
        })
    })
    return full_list
}

function decidePlayoffWinners(list, rankings, num){
    return list
}

// #######
// # AFC #
// #######

var afc_qualified_teams = ["Australia", "Iran", "Japan", "Jordan", "South Korea", "Uzbekistan"]

// # No games have been played as of 9/23/2025 so I'll use fifa rankings to decide winners and runner-ups
var afc_current_group_winners = ["Qatar", "Iraq"]

var afc_current_runner_ups = ["UAE", "Saudi Arabia"]

var afc_inter_confederation_team = decidePlayoffWinners(afc_current_runner_ups, rankings, 1)

// #######
// # CAF #
// #######

var caf_group_winners = ["Egypt", "Senegal", "South Africa", "Cape Verde", "Morocco", "Ivory Coast", "Algeria", "Tunisia", "Ghana"]

var caf_top_4_runner_ups = ["Gabon", "Madagascar", "DR Congo", "Burkina Faso"]

var caf_inter_confederation_team = decidePlayoffWinners(caf_top_4_runner_ups, rankings, 1)

// ############
// # CONCACAF #
// ############

var concacaf_group_winners = ["Suriname", "Jamaica", "Honduras"]

var concacaf_runner_ups = ["El Salvador", "Curacao", "Costa Rica"]

var concacaf_inter_confederation_teams = decidePlayoffWinners(concacaf_runner_ups, rankings, 2)

// ############
// # CONMEBOL #  QUALIFICATIONS ARE FINISHED
// ############

var conmebol_qualified_teams = ["Argentina", "Ecuador", "Colombia", "Uruguay", "Brazil", "Paraguay"]

var conmebol_inter_confederation_team = ["Bolivia"]

var conmebol_inter_confederation_team = addCodeAndRankToList(conmebol_inter_confederation_team, rankings)

// #######
// # OFC #  QUALIFICATIONS ARE FINISHED
// #######

var ofc_qualified_team = ["New Zealand"]

var ofc_inter_confederation_team = ["New Caledonia"]

var ofc_inter_confederation_team = addCodeAndRankToList(ofc_inter_confederation_team, rankings)

// ########
// # UEFA #
// ########

var uefa_group_winners = ["Slovakia", 
                      "Switzerland",
                      "Denmark",
                      "France",
                      "Portugal",
                      "Spain",
                      "Netherlands",
                      "Bosnia and Herzegovina",
                      "Norway",
                      "North Macedonia",
                      "England",
                      "Croatia"]

var uefa_runner_ups = ["Northern Ireland",
                                 "Kosovo",
                                 "Scotland",
                                 "Iceland",
                                 "Georgia",
                                 "Armenia",
                                 "Poland",
                                 "Austria",
                                 "Italy",
                                 "Belgium",
                                 "Albania",
                                 "Czechia"]

var uefa_nations_league_group_winners = ["Spain",
                                     "Germany",
                                     "Portugal",
                                     "France",
                                     "England",
                                     "Norway",
                                     "Wales",
                                     "Czechia",
                                     "Romania",
                                     "Sweden",
                                     "North Macedonia",
                                     "Northern Ireland",
                                     "Moldova",
                                     "San Marino"]

var a = new Set(uefa_nations_league_group_winners)
var b = new Set(uefa_runner_ups)
var c = new Set(uefa_group_winners)

a = a.difference(b)
a = a.difference(c)

a = Array.from(a)

a = addCodeAndRankToList(a, rankings)


console.log(a)