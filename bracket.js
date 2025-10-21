// read matchups csv

import { readMatchups } from "./populate_groups.js";

const matchups = await readMatchups("/matchups.csv");

console.log(matchups.get("ABCDEFGH"));
// make a list of passing team combinations and map them to the correct matchup
// update bracket

function topThirdPlaceTeams() {
  var teams = document.getElementsByClassName("thirdplace-column")[0].children;
  var top_8_groups = [];
  for (var ix = 0; ix < 8; ix += 1) {
    top_8_groups.push(teams[ix].children[0].getAttribute("group"));
  }
  return top_8_groups;
}

var groupWinnerNextMatch = [
  "79",
  "85",
  "76",
  "81",
  "74",
  "75",
  "82",
  "84",
  "77",
  "86",
  "87",
  "80",
];

var groupRunnerupNextMatch = [
  "73",
  "73",
  "75",
  "88",
  "78",
  "76",
  "88",
  "86",
  "78",
  "84",
  "83",
  "83",
];
var groupRunnerupNextMatchOption = [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1];

var group_elements = document.querySelectorAll(
  ".group-container:not(.thirdplace-column)"
);

function seedTeam(team, nextMatchId, option) {
  var ko_team = document.querySelector(`[matchid='${nextMatchId}']`).children[
    option
  ];
  ko_team.setAttribute(
    "src",
    `images/${team.children[0].getAttribute("value")}.png`
  );
  ko_team.setAttribute("value", team.children[0].getAttribute("value"));
  console.log(ko_team);
}

function printWinners() {
  var group_winners = [];

  for (var ix = 0; ix < group_elements.length; ix += 1) {
    group_winners.push(group_elements[ix].children[0]);
  }

  console.log(group_winners[11]);

  for (var ix = 0; ix < group_winners.length; ix += 1) {
    // var code = group_winners[ix].children[0].getAttribute("value");
    seedTeam(group_winners[ix], groupWinnerNextMatch[ix], 0);
  }
}

function seedGroupWinners() {
  // Loop through every group
  var group;
  // Grab group winner and find which round of 32 match they will play in
  // Update match
}

function seedRunnersUp() {}

function populateBracket() {
  printWinners();
  // Get the groups from the top 8 teams from the 12 third place teams
  var top8 = topThirdPlaceTeams().sort().join("");
  var matchup = matchups.get(top8);

  // Create a sorted string from the 8 groups
  console.log(top8);
  // Find the matching matchup array
  console.log(matchup);
  // Call a function that correctly populates the bracket matchups
}

var btn = document.getElementById("populateBracket");
btn.addEventListener("click", () => {
  populateBracket();
});

function highlightChosenTeam(matchid, option) {
  var team = document.querySelector(`[matchid='${matchid}']`);
  var team_flag = team.children[option];
  var not_chosen_flag = team.children[1 - option];
  team_flag.classList.toggle("chosen");
  not_chosen_flag.classList.remove("chosen");
}

var bracket_teams = document.querySelectorAll(".small-flag");

bracket_teams.forEach((team) => {
  var m = team.parentNode.getAttribute("matchid");
  var o;
  if (team.getAttribute("id") == "option1") {
    o = 0;
  } else {
    o = 1;
  }
  team.addEventListener("click", function () {
    highlightChosenTeam(m, o);
  });
});

// 1Aopponent,
// 1Bopponent,
// 1Dopponent,
// 1Eopponent,
// 1Gopponent,
// 1Iopponent,
// 1Kopponent,
// 1Lopponent
