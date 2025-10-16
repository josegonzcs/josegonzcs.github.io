// read matchups csv
async function readMatchups(url) {
  const response = await fetch(url);
  const data = await response.text();
  return parseCSV(data);
}

function parseCSV(data) {
  var rawdata = data.split("\r\n");
  var matchups = new Map();
  rawdata.forEach((line) => {
    var qualifying_teams = line.split(",");
    var matchup_teams = qualifying_teams.splice(8, 8);
    matchups.set(qualifying_teams.join(""), matchup_teams);
  });
  console.log(matchups.get("EFGHIJKL"));
  return matchups;
}

const rankings = await readMatchups("/matchups.csv");
// make a list of passing team combinations and map them to the correct matchup
// update bracket

// 1Aopponent,
// 1Bopponent,
// 1Dopponent,
// 1Eopponent,
// 1Gopponent,
// 1Iopponent,
// 1Kopponent,
// 1Lopponent
