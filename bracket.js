// read matchups csv

import { readMatchups } from "./populate_groups.js";

const matchups = await readMatchups("/matchups.csv");

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

var top8ThirplaceNextMatch = ["79", "85", "81", "74", "82", "77", "87", "80"];

// 1Aopponent,
// 1Bopponent,
// 1Dopponent,
// 1Eopponent,
// 1Gopponent,
// 1Iopponent,
// 1Kopponent,
// 1Lopponent

var group_elements = document.querySelectorAll(
  ".group-container:not(.thirdplace-column)",
);

function seedTeam(team, nextMatchId, option) {
  var ko_team = document.querySelector(`[matchid='${nextMatchId}']`).children[
    option
  ];
  ko_team.setAttribute(
    "src",
    `images/${team.children[0].getAttribute("value")}.png`,
  );
  ko_team.setAttribute("value", team.children[0].getAttribute("value"));
  ko_team.setAttribute("country", team.children[0].getAttribute("country"));
  ko_team.setAttribute("rank", team.children[0].getAttribute("rank"));
}

function seedGroupWinners() {
  var group_winners = [];

  // Loop through every group
  for (var ix = 0; ix < group_elements.length; ix += 1) {
    // Grab group winner and find which round of 32 match they will play in
    group_winners.push(group_elements[ix].children[0]);
  }
  // Update match
  for (var ix = 0; ix < group_winners.length; ix += 1) {
    // var code = group_winners[ix].children[0].getAttribute("value");
    seedTeam(group_winners[ix], groupWinnerNextMatch[ix], 0);
  }
}

function seedRunnersUp() {
  var group_runnersup = [];

  // Loop through every group
  for (var ix = 0; ix < group_elements.length; ix += 1) {
    // Grab group winner and find which round of 32 match they will play in
    group_runnersup.push(group_elements[ix].children[1]);
  }
  // Update match
  for (var ix = 0; ix < group_runnersup.length; ix += 1) {
    // var code = group_winners[ix].children[0].getAttribute("value");
    seedTeam(
      group_runnersup[ix],
      groupRunnerupNextMatch[ix],
      groupRunnerupNextMatchOption[ix],
    );
  }
}

function seedThirdPlaceTeams() {
  // Get the groups from the top 8 teams from the 12 third place teams
  var top8 = topThirdPlaceTeams().sort().join("");
  var matchup = matchups.get(top8);

  // loop through matchup array
  for (var ix = 0; ix < matchup.length; ix += 1) {
    var matchup_group = matchup[ix];
    for (var jx = 0; jx < group_elements.length; jx += 1) {
      if (group_elements[jx].getAttribute("id") == matchup_group) {
        seedTeam(group_elements[jx].children[2], top8ThirplaceNextMatch[ix], 1);
      }
    }
  }
  // loop through list of groups and find matching group with matchup array

  // add third place team from group to bracket
}

function removeFlag(matchid, flag) {
  var teams = document.getElementsByClassName("small-flag");
  for (var ix = 0; ix < teams.length; ix += 1) {
    var t = teams[ix];
    if (
      Number(t.parentNode.getAttribute("matchid")) > Number(matchid) &&
      t.getAttribute("src") == flag
    ) {
      t.setAttribute("src", "images/placeholder_flag.png");
      t.classList.remove("chosen");
      t.removeAttribute("country");
      t.removeAttribute("rank");
      t.removeAttribute("value");
    } else if (matchid == -1) {
      t.setAttribute("src", "images/placeholder_flag.png");
      t.classList.remove("chosen");
      t.removeAttribute("country");
      t.removeAttribute("rank");
      t.removeAttribute("value");
    }
  }
}

function clearBracket() {
  removeFlag(-1, "");
}

function populateBracket() {
  clearBracket();
  seedGroupWinners();
  seedRunnersUp();
  seedThirdPlaceTeams();
}

var btn = document.getElementById("populateBracket");
btn.addEventListener("click", () => {
  populateBracket();

  // document.querySelector(".groupstage-container").style.display = "none";
  // document.getElementById("populateBracket").style.display = "none";

  document.querySelector(".bracket").style.display = "flex";
});

function highlightChosenTeam(matchid, option, nextMatchID, nextOption) {
  var team = document.querySelector(`[matchid='${matchid}']`);
  var team_flag = team.children[option];
  var not_chosen_flag = team.children[1 - option];
  team_flag.classList.toggle("chosen");

  var winning_team_flag = team_flag.getAttribute("src");
  var winning_team_name = team_flag.getAttribute("country");
  var winning_team_rank = team_flag.getAttribute("rank");
  var winning_team_value = team_flag.getAttribute("value");
  var losing_team_flag = not_chosen_flag.getAttribute("src");
  if (not_chosen_flag.classList.contains("chosen")) {
    not_chosen_flag.classList.remove("chosen");
    removeFlag(matchid, losing_team_flag);
  }

  var nextMatch = document.querySelector(`[matchid='${nextMatchID}']`);

  if (winning_team_flag != "images/placeholder_flag.png") {
    nextMatch.children[nextOption].setAttribute("src", winning_team_flag);
    nextMatch.children[nextOption].setAttribute("country", winning_team_name); // add team's name
    nextMatch.children[nextOption].setAttribute("rank", winning_team_rank); // add team's rank
    nextMatch.children[nextOption].setAttribute("value", winning_team_value); // add team's value
  }

  if (!team_flag.classList.contains("chosen")) {
    // find every other instance of the flag and change it to the default flag
    removeFlag(matchid, winning_team_flag);
  }
}

var bracket_teams = document.querySelectorAll(".small-flag");

bracket_teams.forEach((team) => {
  var m = team.parentNode.getAttribute("matchid");
  var n = team.parentNode.getAttribute("nextMatch");
  var p;
  var o;
  if (team.getAttribute("id") == "option1") {
    o = 0;
  } else {
    o = 1;
  }

  if (team.parentNode.getAttribute("nextOption") == "0") {
    p = 0;
  } else {
    p = 1;
  }
  team.addEventListener("click", function () {
    highlightChosenTeam(m, o, n, p);
  });
});

/* write onclick function which would create a modal and
   grab the information about the match like, match name, teams, team ranks, location 
*/
function openModal(element) {
  const team1_code = element.childNodes[1].getAttribute("value");
  const team2_code = element.childNodes[3].getAttribute("value");

  const team1_name = element.childNodes[1].getAttribute("country");
  const team2_name = element.childNodes[3].getAttribute("country");

  const team1_rank = element.childNodes[1].getAttribute("rank");
  const team2_rank = element.childNodes[3].getAttribute("rank");

  const modal = document.getElementById("modal");

  document.getElementById("modal-container").style.display = "flex";
  modal.class = "modal";

  document.getElementById("modal-round").textContent =
    element.getAttribute("round");
  document.getElementById("modal-matchid").textContent =
    "Match " + element.getAttribute("matchid");
  document.getElementById("modal-date").textContent =
    element.getAttribute("date");
  document.getElementById("modal-time").textContent =
    element.getAttribute("time");
  document.getElementById("modal-stadium").textContent =
    element.getAttribute("stadium");

  if (team1_code != null) {
    document
      .getElementById("modal-team1")
      .setAttribute("src", "images/" + team1_code + ".png");
  } else {
    document
      .getElementById("modal-team1")
      .setAttribute("src", "images/placeholder_flag.png");
  }

  if (team2_code != null) {
    document
      .getElementById("modal-team2")
      .setAttribute("src", "images/" + team2_code + ".png");
  } else {
    document
      .getElementById("modal-team2")
      .setAttribute("src", "images/placeholder_flag.png");
  }

  if (team1_name != null) {
    document.getElementById("modal-team1-name").textContent = team1_name;
  } else {
    document.getElementById("modal-team1-name").textContent =
      element.getAttribute("team1");
  }

  if (team2_name != null) {
    document.getElementById("modal-team2-name").textContent = team2_name;
  } else {
    document.getElementById("modal-team2-name").textContent =
      element.getAttribute("team2");
  }

  if (team1_rank != null) {
    document.getElementById("modal-team1-rank").textContent = team1_rank;
  } else {
    document.getElementById("modal-team1-rank").textContent = "";
  }

  if (team2_rank != null) {
    document.getElementById("modal-team2-rank").textContent = team2_rank;
  } else {
    document.getElementById("modal-team2-rank").textContent = "";
  }

  document.body.addEventListener("mouseup", () => {
    document.querySelector(".modal-container").style.display = "none";
  });
}

// grab every element with the class match-header
var match_headers = document.querySelectorAll(".match-header");

// apply a click event listener
match_headers.forEach((e) => {
  e.addEventListener("click", () => {
    openModal(e.nextElementSibling);
  });
});
