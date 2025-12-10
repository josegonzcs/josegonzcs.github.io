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

var continue_button = document.getElementById("continue");

continue_button.addEventListener("click", () => {
  var chosen_playoff_teams = document.getElementsByClassName("chosen");
  for (var i = 0; i < predicted_playoff_teams.length; i += 1) {
    predicted_playoff_teams[i] = chosen_playoff_teams[i].name;
  }
  console.log(predicted_playoff_teams);
});

var group_A = ["Mexico", "South Africa", "Korea Republic", uefa_d];
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
var group_L = ["England", "Croatia", , "Panama", "Ghana"];

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

for (var i = 0; i < groups.length; i += 1) {
  // add
}

export function populateThirdPlaceColumn() {
  var group_elements = document.querySelectorAll(
    ".group-container:not(.thirdplace-column)"
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
      // console.log(container.children[jx].getAttribute("group"));
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
    ".group-container:not(.thirdplace-column)"
  );
  for (var ix = 0; ix < group_elements.length; ix = ix + 1) {
    var group_element = group_elements[ix];
    for (var jx = 0; jx < group_element.children.length; jx = jx + 1) {
      var element = group_element.children[jx];
      var team_code = groups[ix][jx][2];
      element.children[0].setAttribute("value", team_code);
      element.children[0].setAttribute("country", groups[ix][jx][4]);
      element.children[0].setAttribute("rank", groups[ix][jx][0]);
      element.children[0].setAttribute("group", element.getAttribute("id"));
    }
  }

  populateThirdPlaceColumn();
}

// updateGroups();

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

// flags.forEach((flag) => {
//   changeFlagImage(flag);
// });

var tooltips = document.querySelectorAll(".tooltip");
tooltips.forEach((tooltip) => {
  var name = document.createElement("span");
  var rank = document.createElement("span");
  name.textContent =
    tooltip.previousElementSibling.previousElementSibling.getAttribute(
      "country"
    );
  rank.textContent =
    "Rank: " +
    tooltip.previousElementSibling.previousElementSibling.getAttribute("rank");
  tooltip.appendChild(name);
  tooltip.appendChild(rank);
});
