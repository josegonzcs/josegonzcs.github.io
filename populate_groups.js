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

function sort2DArray(array){
    var sorted = []
    while(sorted.length < array.length){

    }
}

const rankings = await (readCSV("/rankings_18Sept2025.csv"))

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
    list = addCodeAndRankToList(list, rankings)
    list.sort((x, y) => x[0] - y[0])
    list = list.splice(0,num)
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

var hosts = ["Canada", "Mexico", "USA"]
hosts = addCodeAndRankToList(hosts, rankings)

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

a.sort((x, y) => x[0] - y[0])

a = a.splice(0,4)


uefa_runner_ups = addCodeAndRankToList(uefa_runner_ups, rankings)

var uefa_playoff_teams = [...a, ...uefa_runner_ups]

uefa_playoff_teams.sort((x,y) => x[0] - y[0])

uefa_playoff_teams.splice(4,12)

var uefa_playoff_holder = ["UEFA Playoff",
                           "UEFA Playoff",
                           "UEFA Playoff",
                           "UEFA Playoff"]

var inter_playoff_holder = ["Inter Playoff",
                            "Inter Playoff"]





var inter_playoff_teams = [...afc_inter_confederation_team,
                           ...caf_inter_confederation_team,
                           ...concacaf_inter_confederation_teams,
                           ...conmebol_inter_confederation_team,
                           ...ofc_inter_confederation_team]

inter_playoff_teams.sort((x, y) => x[0] - y[0])

inter_playoff_teams.splice(0,2)



var qualified_teams = [...afc_qualified_teams,
                       ...afc_current_group_winners,
                       ...caf_group_winners, 
                       ...concacaf_group_winners, 
                       ...conmebol_qualified_teams,
                       ...ofc_qualified_team, 
                       ...uefa_group_winners]
                    //    ...uefa_playoff_holder,
                    //    ...inter_playoff_holder]

qualified_teams = addCodeAndRankToList(qualified_teams, rankings)
qualified_teams.sort((x, y) => x[0] - y[0])

qualified_teams = [...hosts, ...qualified_teams, ...uefa_playoff_teams, ...inter_playoff_teams]

var pot_1 = qualified_teams.slice(3,12)
var pot_2 = qualified_teams.slice(12,24)
var pot_3 = qualified_teams.slice(24,36)
var pot_4 = qualified_teams.slice(36,48)

var pots = [pot_1,
            pot_2,
            pot_3,
            pot_4]


var group_A = [qualified_teams[1]]
var group_B = [qualified_teams[0]]
var group_C = []
var group_D = [qualified_teams[2]]
var group_E = []
var group_F = []
var group_G = []
var group_H = []
var group_I = []
var group_J = []
var group_K = []
var group_L = []

var groups = [group_A,
              group_B,
              group_C,
              group_D,
              group_E,
              group_F,
              group_G,
              group_H,
              group_I,
              group_J,
              group_K,
              group_L]


function checkGroupAvailability(group, conf, num){
    if(group.length > num){
        return false
    }
    
    var confederations = []
    group.forEach(team => {
        confederations.push(team[3])
    })

    confederations.forEach(confederation => {
        if(conf == confederation){
            return false
        }
    })

    return true
}

function drawFromPot(pot, pot_number){
    while(pot.length > 0){
        var team_index = Math.floor(Math.random() * pot.length)
        var team = pot[team_index]
        var conf = team[3]
        for(var ix = 0; ix < groups.length; ix=ix+1){
            var cur_group = groups[ix]
            if(checkGroupAvailability(cur_group, conf, pot_number)){
                pot.splice(team_index, 1)
                cur_group.push(team)
                break
            }
        }
    }
}


export function populateThirdPlaceColumn(){
    var group_elements = document.querySelectorAll(".group-container:not(.thirdplace-column)")
    var thirdplace_teams = []
    
    group_elements.forEach(group => {
        var team_copy = group.children[2].cloneNode(true)
        team_copy.classList.remove("dragging")

        team_copy.addEventListener("dragstart", () => {
          team_copy.classList.add("dragging")
        })

        team_copy.addEventListener("dragend", () => {
          team_copy.classList.remove("dragging")
        })
        team_copy.setAttribute("id", "thirdplace")
        thirdplace_teams.push(team_copy)
    })
    
    var container = document.querySelector(".thirdplace-column")
    for(var ix = 0; ix<12; ix=ix+1){
        container.children[ix].replaceWith(thirdplace_teams[ix])
    }
}

function updateGroups(){
    var group_elements = document.querySelectorAll(".group-container:not(.thirdplace-column)")
    for(var ix = 0; ix < group_elements.length; ix=ix+1){
        var group_element = group_elements[ix]
        for(var jx = 0; jx < group_element.children.length; jx=jx+1){
            var element = group_element.children[jx]
            var team_code = groups[ix][jx][2]
            element.children[0].setAttribute("value", team_code)
            element.children[0].setAttribute("country", groups[ix][jx][4])
            element.children[0].setAttribute("rank", groups[ix][jx][0])
        }
    }

    populateThirdPlaceColumn()
}

var letters = ["A",
               "B",
               "C",
               "D",
               "E",
               "F",
               "G",
               "H",
               "I",
               "J",
               "K",
               "L"]

for(var pot_index = 0; pot_index < pots.length; pot_index=pot_index+1){
    drawFromPot(pots[pot_index], pot_index)
}

updateGroups()

var codes = document.querySelectorAll(".code")
var flags = document.querySelectorAll(".flag")

codes.forEach(code => {
  code.textContent = code.getAttribute("value")
})


async function changeFlagImage(element){
  var placeholder_flag = "images/placeholder_flag.png";
  var file = element.previousElementSibling.getAttribute("value")
  file = "png/" + file + ".png"
  
  try {
    const response = await fetch(file)
    
    if (!response.ok){
      element.src = placeholder_flag
    } else {
      element.src = file
    }
  } 
  catch(err) {
  }
}

flags.forEach(flag => {
  changeFlagImage(flag)
})

var tooltips = document.querySelectorAll(".tooltip")
tooltips.forEach(tooltip => {
    tooltip.textContent = tooltip.previousElementSibling.previousElementSibling.getAttribute("country")+" - Rank: "+tooltip.previousElementSibling.previousElementSibling.getAttribute("rank")
})





