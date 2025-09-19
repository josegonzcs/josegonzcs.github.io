import re

file = open("rankings_18Sept2025.txt", "r") # UPDATE TO LATEST RANKINGS

rankings = []

for line in file:
    rank = line.strip().split(None, 4)[0]
    ranking = line.strip().split(None, 4)[1]
    code = line.strip().split(None, 4)[2]
    confederation = line.strip().split(None, 4)[3]
    country = line.strip().split(None, 4)[4]
    rankings.append([rank, ranking, code, confederation, country])

for rank, rating, code, confederation, country in rankings:
    print(rank, rating, code, confederation, country)

file.close()

'''
CONFEDERATION - DIRECT SLOTS - PLAYOFF SLOTS
AFC - 8 - 1
CAF - 9 - 1
CONC- 6 - 2
CONM- 6 - 1
OFC - 1 - 1
UEFA- 16- 0
'''

qualified_teams = ["AUS",
                   "IRN",
                   "JPN",
                   "JOR",
                   "KOR",
                   "UZB",
                   "MAR",
                   "TUN",
                   "CAN",
                   "MEX",
                   "USA",
                   "ARG",
                   "BRA",
                   "COL",
                   "ECU",
                   "PAR",
                   "URU",
                   "NZL"]

uefa_current_group_winners = ["Slovakia", 
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

uefa_current_group_runners_up = ["Northern Ireland",
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

uefa_nations_league_group_winners = ["Spain",
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

def addCodeAndRankToList(list, master):
    new_list = []
    for index in range(len(list)):
        for rank, ranking, code, confederation, country in master:
            if list[index] == code or list[index] == country:
                new_list.append([rank, ranking, code, confederation, country])
        
    return new_list

# UEFA PLAYOFF PROCESS
# I'm assuming they will use fifa rankings to determine UEFA playoff pot seeding per https://www.uefa.com/european-qualifiers/news/0292-1c1a655f1be0-84538c15a736-1000--european-qualifiers-for-the-2026-fifa-world-cup-all-you-ne/#:~:text=The%2016%20teams%20who%20enter%20the%20play%2Doffs%20will%20be%20drawn%20into%20four%20play%2Doff%20paths%2C%20with%20four%20teams%20in%20each.%20Play%2Doff%20matches%20will%20be%20played%20in%20single%2Dleg%20semi%2Dfinals%20followed%20by%20single%2Dleg%20finals%20within%20the%20same%20international%20window%20in%20March%202026.

# Check which teams won their nations league group but did not come in 1st or 2nd in WC qualifying groups

uefa_winners_set = set(uefa_current_group_winners)
uefa_runnersup_set = set(uefa_current_group_runners_up)
nations_league_winners_set = set(uefa_nations_league_group_winners)

remaining_nations_league_group_winners = list((nations_league_winners_set - uefa_winners_set) - uefa_runnersup_set)

print(remaining_nations_league_group_winners)

def sortByRanking(list):
    return list[0][0]

uefa_playoff_teams = list(uefa_current_group_runners_up + remaining_nations_league_group_winners)


print(uefa_playoff_teams)
print(len(uefa_playoff_teams))

uefa_playoff_teams = addCodeAndRankToList(uefa_playoff_teams, rankings)
for line in uefa_playoff_teams:
    print(line)
print()
uefa_playoff_teams.sort(key = lambda x:x[0])  # TODO: GET A SORTER FOR 2D LISTS WORKING
for line in uefa_playoff_teams:
    print(line)

# print(qualified_teams)

qualified_teams = addCodeAndRankToList(qualified_teams, rankings)

# print(qualified_teams)


playoff_teams = []