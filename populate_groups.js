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

var uefa_a; // Italy, Northern Ireland, Wales, Bosnia and Herzegovina
var uefa_b; // Ukraine, Sweden, Poland, Albania
var uefa_c; // Turkey, Romania, Slovakia, Kosovo
var uefa_d; // Denmark, North Macedonia, Czechia, Ireland
var inter_1; // DR Congo, Jamaica, New Caledonia
var inter_2; // Iraq, Bolivia, Suriname

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

function appearancesInList(element, list) {
  var count = 0;
  for (var index = 0; index < list.length; index += 1) {
    if (list[index] == element) {
      count += 1;
    }
  }
  return count;
}

function checkGroupAvailability(group, conf, num) {
  if (group.length > num) {
    return false;
  }

  var confederations = [];
  group.forEach((team) => {
    confederations.push(team[3]);
  });

  for (
    var conf_index = 0;
    conf_index < confederations.length;
    conf_index = conf_index + 1
  ) {
    var confederation = confederations[conf_index];
    if (conf == confederation) {
      if (conf == "UEFA" && appearancesInList("UEFA", confederations) < 2) {
        return true;
      } else {
        return false;
      }
    }
  }

  return true;
}

function drawFromPot(pot, pot_number) {
  var iterations = 0;
  var pot_copy = pot;
  while (pot_copy.length > 0 && iterations < 25) {
    iterations += 1;
    // console.log(iterations)
    var team_index = Math.floor(Math.random() * pot_copy.length);
    var team = pot_copy[team_index];
    var conf = team[3];
    for (var ix = 0; ix < groups.length; ix = ix + 1) {
      var cur_group = groups[ix];
      if (checkGroupAvailability(cur_group, conf, pot_number)) {
        pot_copy.splice(team_index, 1);
        cur_group.push(team);
        break;
      }
    }
  }
  if (iterations == 25) {
    // console.log("returning false")
    return false;
  }
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

function callDrawFunctionUntilFinished() {
  var not_finished = true;
  while (not_finished) {
    for (
      var pot_index = 0;
      pot_index < pots.length;
      pot_index = pot_index + 1
    ) {
      var result = drawFromPot(pots[pot_index], pot_index);
      if (result == false) {
        not_finished = false;
        console.log("Drawing did not work");
        window.location.reload();
        return false;
      }
    }
    not_finished = false;
  }
  return true;
}

// callDrawFunctionUntilFinished();

updateGroups();

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
      "country"
    );
  rank.textContent =
    "Rank: " +
    tooltip.previousElementSibling.previousElementSibling.getAttribute("rank");
  tooltip.appendChild(name);
  tooltip.appendChild(rank);
});
