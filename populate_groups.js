// Read Knockout Matchups

export async function readMatchups(url) {
  const response = await fetch(url);
  const data = await response.text();
  return parseMatchupCSV(data);
}

function parseMatchupCSV(data) {
  var rawdata = data.split("\r\n");
  var matchups = new Map();
  rawdata.forEach((line) => {
    var qualifying_teams = line.split(",");
    var matchup_teams = qualifying_teams.splice(8, 8);
    matchups.set(qualifying_teams.join(""), matchup_teams);
  });
  return matchups;
}

// Read Team Rankings

async function readCSV(url) {
  const response = await fetch(url);
  const data = await response.text();
  return parseCSVData(data);
}

function parseCSVData(data) {
  var rawdata = data.split("\r\n");
  var lines = [];
  rawdata.forEach((line) => {
    lines.push([line.split(", ", 5)]);
  });
  return lines;
}

const rankings = await readCSV("/rankings_19Nov2025.csv");

// Playoff Teams and Groups

var playoff_teams = document.querySelectorAll(`[class = playoff-img]`);

playoff_teams.forEach((obj) => {
  obj.addEventListener("click", () => {
    var path = obj.parentElement.parentElement.children;
    for (var i = 0; i < path.length; i += 1) {
      path[i].children[0].classList.remove("chosen");
    }
    obj.classList.toggle("chosen");
  });
});

var uefa_a; // Italy, Northern Ireland, Wales, Bosnia and Herzegovina
var uefa_b; // Ukraine, Sweden, Poland, Albania
var uefa_c; // Turkey, Romania, Slovakia, Kosovo
var uefa_d; // Denmark, North Macedonia, Czechia, Ireland
var inter_1; // DR Congo, Jamaica, New Caledonia
var inter_2; // Iraq, Bolivia, Suriname

var predicted_playoff_teams = [
  uefa_a,
  uefa_b,
  uefa_c,
  uefa_d,
  inter_1,
  inter_2,
];

var group_A = ["Mexico", "South Africa", "South Korea", uefa_d];
var group_B = ["Canada", uefa_a, "Qatar", "Switzerland"];
var group_C = ["Brazil", "Morocco", "Haiti", "Scotland"];
var group_D = ["USA", "Paraguay", "Australia", uefa_c];
var group_E = ["Germany", "Curacao", "Ivory Coast", "Ecuador"];
var group_F = ["Netherlands", "Japan", uefa_b, "Tunisia"];
var group_G = ["Belgium", "Egypt", "Iran", "New Zealand"];
var group_H = ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"];
var group_I = ["France", "Senegal", inter_2, "Norway"];
var group_J = ["Argentina", "Algeria", "Austria", "Jordan"];
var group_K = ["Portugal", inter_1, "Uzbekistan", "Colombia"];
var group_L = ["England", "Croatia", "Panama", "Ghana"];

var groups = [
  group_A,
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
  group_L,
];

export function populateThirdPlaceColumn() {
  var group_elements = document.querySelectorAll(
    ".group-container:not(.thirdplace-column)",
  );
  var thirdplace_teams = [];

  group_elements.forEach((group) => {
    var team_copy = group.children[2].cloneNode(true);
    team_copy.classList.remove("dragging");

    team_copy.addEventListener("dragstart", () => {
      team_copy.classList.add("dragging");
    });

    team_copy.addEventListener("dragend", () => {
      team_copy.classList.remove("dragging");
    });

    team_copy.addEventListener("touchmove", () => {
      team_copy.classList.add("dragging");
    });

    team_copy.addEventListener("touchend", () => {
      team_copy.classList.remove("dragging");
    });

    team_copy.setAttribute("id", "thirdplace");
    thirdplace_teams.push(team_copy);
  });

  var container = document.querySelector(".thirdplace-column");

  var group_names = [
    "A",
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
    "L",
  ];

  for (var ix = 0; ix < 12; ix = ix + 1) {
    for (var jx = 0; jx < 12; jx = jx + 1) {
      if (
        container.children[jx].children[0].getAttribute("group") ==
        group_names[ix]
      ) {
        container.children[jx].replaceWith(thirdplace_teams[ix]);
      }
    }
  }
}

function updateGroups() {
  var group_elements = document.querySelectorAll(
    ".group-container:not(.thirdplace-column)",
  );
  // console.log(group_elements);

  for (var ix = 0; ix < group_elements.length; ix += 1) {
    var group_element = group_elements[ix];
    for (var jx = 0; jx < group_element.children.length; jx += 1) {
      var element = group_element.children[jx];
      var team_code = groups[ix][jx][1];
      var country = groups[ix][jx][0];
      // console.log(team_code);
      element.children[0].textContent = country;
      element.children[0].setAttribute("value", team_code);
      element.children[0].setAttribute("country", country);
      element.children[0].setAttribute("rank", groups[ix][jx][2]);
      element.children[0].setAttribute("group", element.getAttribute("id"));
    }
  }

  populateThirdPlaceColumn();

  setImages();
}

function findTeamInRankings(team_name) {
  for (var index = 0; index < rankings.length; index += 1) {
    if (rankings[index][0][4] == team_name) {
      return rankings[index][0];
    }
  }
}

function addTeamInfo() {
  for (var group_index = 0; group_index < groups.length; group_index += 1) {
    for (
      var team_index = 0;
      team_index < groups[group_index].length;
      team_index += 1
    ) {
      var team_name = groups[group_index][team_index];
      var team_info_arr = findTeamInRankings(team_name);
      // console.log(team_name, team_info_arr);
      var team_code = team_info_arr[2];
      var ranking = team_info_arr[0];
      groups[group_index][team_index] = [team_name, team_code, ranking];
    }
  }
  // console.log(groups);

  updateGroups();
}

var continue_button = document.getElementById("continue");

continue_button.addEventListener("click", () => {
  var chosen_playoff_teams = document.getElementsByClassName("chosen");
  if (chosen_playoff_teams.length < 6) {
    return;
  }
  group_B[1] = chosen_playoff_teams[0].name;
  group_F[2] = chosen_playoff_teams[1].name;
  group_D[3] = chosen_playoff_teams[2].name;
  group_A[3] = chosen_playoff_teams[3].name;
  group_K[1] = chosen_playoff_teams[4].name;
  group_I[2] = chosen_playoff_teams[5].name;

  addTeamInfo();
  //call function that adds team codes to every group
  // same function calls to update group elements and
  document.querySelector(".playoff-matches").style.display = "none";
  document.getElementById("continue").style.display = "none";

  document.querySelector(".groupstage-container").style.display = "flex";
  document.getElementById("populateBracket").style.display = "flex";
  document.querySelector(".bracket").style.display = "flex";
});

function setImages() {
  var flags = document.querySelectorAll(".flag");

  async function changeFlagImage(element) {
    var placeholder_flag = "images/placeholder_flag.png";
    var file = element.previousElementSibling.getAttribute("value");
    file = "images/" + file + ".png";

    try {
      const response = await fetch(file);

      if (!response.ok) {
        element.src = placeholder_flag;
      } else {
        element.src = file;
      }
    } catch (err) {}
  }

  flags.forEach((flag) => {
    changeFlagImage(flag);
  });

  var tooltips = document.querySelectorAll(".tooltip");
  tooltips.forEach((tooltip) => {
    var name = document.createElement("span");
    var rank = document.createElement("span");
    name.textContent =
      tooltip.previousElementSibling.previousElementSibling.getAttribute(
        "country",
      );
    rank.textContent =
      "Rank: " +
      tooltip.previousElementSibling.previousElementSibling.getAttribute(
        "rank",
      );
    tooltip.appendChild(name);
    tooltip.appendChild(rank);
  });
}
