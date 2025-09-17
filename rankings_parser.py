import re

# Read 'rankings.txt'
file = open("rankings.txt", "r")

rankings = []

for line in file:
    rank = line.strip()
    country = file.readline().strip()
    rating = file.readline().strip().split('\t')[0]
    rankings.append([rank, country, rating])

for rank, country, rating in rankings:
    print(rank, country, rating)



# file cleanup

file.close()


countries = []

confederations = ["conmebol", "concacaf", "caf", "uefa", "afc", "ofc"]


for confederation in confederations:
    filename = confederation + ".txt"
    file = open(filename, "r")
    for line in file:
        # print(line.strip().split(None, 1))
        code = line.strip().split(None, 1)[0]
        name = line.strip().split(None, 1)[1]
        countries.append([code, name, confederation.upper()])

for code, country, confederation in countries:
    print(code, country, confederation)


for i in range(len(rankings)):
    for j in range(len(countries)):
        if rankings[i][1] == countries[j][1]:
            rankings[i].append(countries[j][0])
            rankings[i].append(countries[j][2])

for rank, country, rating, code, confederation in rankings:
    print(rank, rating, code, confederation, country)
 

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

as_it_stands_teams = ["Slovakia", "Switzerland", "Denmark", "France", "Portugal", "Spain", "Netherlands", "Bosnia and Herzegovina", "Norway", "North Macedonia", "England", "Croatia", #UEFA 
                      ]
