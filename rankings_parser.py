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

# for rank, rating, code, confederation, country in rankings:
#     print(rank, rating, code, confederation, country)

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

hosts = ["Canada", "Mexico", "USA"]

def printList(list):
    for line in list:
        print(line)

def sortList(list, sorting_column_index): # sorts 2d list by specified column in ascending order
    sorted_list = []
    while len(sorted_list) < len(list):
        lowest_value_index = 0
        lowest_value = 10000
        for current_index in range(len(list)):
            value = int(list[current_index][sorting_column_index])
            if value < lowest_value:
                lowest_value_index = current_index
                lowest_value = value

        entry = list[lowest_value_index]
        sorted_list.append(entry)
        list[lowest_value_index] = [9999]

    return sorted_list

def addCodeAndRankToList(list, master):
    new_list = []
    for index in range(len(list)):
        for rank, ranking, code, confederation, country in master:
            if list[index] == code or list[index] == country:
                new_list.append([rank, ranking, code, confederation, country])
        
    return new_list

def decidePlayoffWinners(list, master, qualifying_team_amount):
    full_list = addCodeAndRankToList(list, master)
    full_list = sortList(full_list, 0) # Sort list by team rank by default
    full_list = full_list[0:qualifying_team_amount]
    return full_list

#######
# AFC #
#######

afc_qualified_teams = ["Australia", "Iran", "Japan", "Jordan", "South Korea", "Uzbekistan"]

# No games have been played as of 9/23/2025 so I'll use fifa rankings to decide winners and runner-ups
afc_current_group_winners = ["Qatar", "Iraq"]

afc_current_runner_ups = ["UAE", "Saudi Arabia"]

afc_inter_confederation_team = decidePlayoffWinners(afc_current_runner_ups, rankings, 1)

#######
# CAF #
#######

caf_group_winners = ["Egypt", "Senegal", "South Africa", "Cape Verde", "Morocco", "Ivory Coast", "Algeria", "Tunisia", "Ghana"]

caf_top_4_runner_ups = ["Gabon", "Madagascar", "DR Congo", "Burkina Faso"]

caf_inter_confederation_team = decidePlayoffWinners(caf_top_4_runner_ups, rankings, 1)

############
# CONCACAF #
############

concacaf_group_winners = ["Suriname", "Jamaica", "Honduras"]

concacaf_runner_ups = ["El Salvador", "Curacao", "Costa Rica"]

concacaf_inter_confederation_teams = decidePlayoffWinners(concacaf_runner_ups, rankings, 2)

############
# CONMEBOL #  QUALIFICATIONS ARE FINISHED
############

conmebol_qualified_teams = ["Argentina", "Ecuador", "Colombia", "Uruguay", "Brazil", "Paraguay"]

conmebol_inter_confederation_team = ["Bolivia"]

conmebol_inter_confederation_team = addCodeAndRankToList(conmebol_inter_confederation_team, rankings)

#######
# OFC #  QUALIFICATIONS ARE FINISHED
#######

ofc_qualified_team = ["New Zealand"]

ofc_inter_confederation_team = ["New Caledonia"]

ofc_inter_confederation_team = addCodeAndRankToList(ofc_inter_confederation_team, rankings)

########
# UEFA #
########

uefa_group_winners = ["Slovakia", 
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

uefa_runner_ups = ["Northern Ireland",
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

        
# UEFA PLAYOFF PROCESS
# I'm assuming they will use fifa rankings to determine UEFA playoff pot seeding per https://www.uefa.com/european-qualifiers/news/0292-1c1a655f1be0-84538c15a736-1000--european-qualifiers-for-the-2026-fifa-world-cup-all-you-ne/#:~:text=The%2016%20teams%20who%20enter%20the%20play%2Doffs%20will%20be%20drawn%20into%20four%20play%2Doff%20paths%2C%20with%20four%20teams%20in%20each.%20Play%2Doff%20matches%20will%20be%20played%20in%20single%2Dleg%20semi%2Dfinals%20followed%20by%20single%2Dleg%20finals%20within%20the%20same%20international%20window%20in%20March%202026.

# Check which teams won their nations league group but did not come in 1st or 2nd in WC qualifying groups
remaining_nations_league_group_winners = list((set(uefa_nations_league_group_winners) - set(uefa_group_winners)) - set(uefa_runner_ups))
# 16 teams will play in the UEFA playoffs in March, 4 will directly qualify for the world cup
uefa_playoff_teams = list(uefa_runner_ups + remaining_nations_league_group_winners)

uefa_remaining_qualified_teams = decidePlayoffWinners(uefa_playoff_teams, rankings, 4)

current_qualified_teams = list(afc_qualified_teams + afc_current_group_winners + caf_group_winners + concacaf_group_winners + conmebol_qualified_teams + ofc_qualified_team + uefa_group_winners)

current_qualified_teams = addCodeAndRankToList(current_qualified_teams, rankings)

current_qualified_teams = sortList(current_qualified_teams, 0)

hosts = addCodeAndRankToList(hosts, rankings)

inter_confederation_playoff_teams = sortList(list(afc_inter_confederation_team + caf_inter_confederation_team + concacaf_inter_confederation_teams + conmebol_inter_confederation_team + ofc_inter_confederation_team), 0)[0:2]

inter_confederation_playoff_teams[0][3] = "INTER"
inter_confederation_playoff_teams[1][3] = "INTER"


print("INTER", inter_confederation_playoff_teams)

world_cup_teams = list(hosts + current_qualified_teams + uefa_remaining_qualified_teams + inter_confederation_playoff_teams)
print(len(world_cup_teams))
printList(world_cup_teams)




################################
# WORLD CUP GROUP DRAW PROCESS #
################################

# SPLIT 48 TEAMS INTO 4 POTS
# POT 1 - 3 HOSTS + TOP 9 RATED TEAMS
# POT 2 - NEXT TOP 12 RATED TEAMS
# POT 3 - NEXT TOP 12 RATED TEAMS
# POT 4 - NEXT TOP 6 RATED TEAMS + 4 UEFA PLAYOFF TEAMS + 2 INTER-CONFEDERATION PLAYOFF TEAMS 

pot_1 = world_cup_teams[0:12]
pot_2 = world_cup_teams[12:24]
pot_3 = world_cup_teams[24:36]
pot_4 = world_cup_teams[36:48]

print("POT 1")
printList(pot_1)
print("POT 2")
printList(pot_2)
print("POT 3")
printList(pot_3)
print("POT 4")
printList(pot_4)
print(len(pot_4))


group_A = []
group_B = []
group_C = []
group_D = []
group_E = []
group_F = []
group_G = []
group_H = []
group_I = []
group_J = []
group_K = []
group_L = []

groups = [group_A,
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

group_A.append(pot_1[1]) # Add Mexico to Group A
group_B.append(pot_1[0]) # Add Canada to Group B
group_D.append(pot_1[2]) # Add USA to Group D

print(len(pot_1))
printList(pot_1)
pot_1 = pot_1[3:]

print(len(pot_1))
printList(pot_1)

print(group_A)
print(group_B)
print(group_D)



def checkGroupAvailability(confederation_in_question, group_in_question, max_amount_of_teams):
    if len(group_in_question) > max_amount_of_teams:
        return False
    group_confederations = []
    for rank, ranking, code, confederation, name in group_in_question:
        group_confederations.append(confederation)
    for confederation in group_confederations:
        if confederation_in_question == confederation:
            if confederation == 'UEFA':
                return True
            else:
                return False
    return True


import random
# Following the 2022 World Cup draw process I will go through the groups in alphabetical order and random draw a team
# If a team from the same confederation is already in the chosen group I will move on to the next group until a group is found

def drawFromPot(pot, pot_number):
    while len(pot) > 0:
        team = random.choice(pot)
        for index in range(len(groups)):
            cur_group = groups[index]
            if checkGroupAvailability(team[3], cur_group, pot_number):
                cur_group.append(team)
                pot.remove(team)
                break

pots = [pot_1, pot_2, pot_3, pot_4]

for index in range(len(pots)):
    drawFromPot(pots[index], index)
'''
# POT 1

# go down the list of groups
for index in range(len(groups)):
    cur_group = groups[index]
    if cur_group == []:
        # select random team from pot 1
        team = random.choice(pot_1)
        cur_group.append(team)
        pot_1.remove(team)

# POT 2

# go down the list of teams 
for count in range(len(pot_2)):
    # select random team in pot 2
    team = random.choice(pot_2)
    # then find a group for the team with no other team from the same conference except for UEFA teams
    for index in range(len(groups)):
        cur_group = groups[index]
        if checkGroupAvailability(team[3], cur_group, 2):
            cur_group.append(team)
            pot_2.remove(team)
            break

# POT 3

# go down the list of teams in pot 3
while len(pot_3) > 0:
    # select random team
    team = random.choice(pot_3)
    # find a group that works
    for index in range(len(groups)):
        cur_group = groups[index]
        if checkGroupAvailability(team[3], cur_group, 3):
            cur_group.append(team)
            pot_3.remove(team)
            break


#############
# TODO : At times, usually when there is one team left from the pot, the last group is not available because of the double confederation rule. This may happen in the actual draw so I'm
# thinking FIFA might go down the list of groups that have already been drawn and replace a team that was in the same pot as the remaining team until all teams are placed in a group
# Im curious to see what FIFA has planned in case such scenario happens. Might have to do more research and see if it's happened before.
###############

# POT 4

# go down the list of teams in pot 4
while len(pot_4) > 0:
    # select random team
    team = random.choice(pot_4)
    # find a group that works
    for index in range(len(groups)):
        cur_group = groups[index]
        if checkGroupAvailability(team[3], cur_group, 4):
            cur_group.append(team)
            pot_4.remove(team)
            break

'''


letters = ['A','B','C','D','E','F','G','H','I','J','K','L']

for index in range(len(groups)):
    print("Group", letters[index])
    # print(groups[index])
    printList(groups[index])





'''
Randomly selecting team and group

# Draw POT 1 into their groups

for ix in range(len(pot_1)):
    # randomly select a team from pot 1
    team = random.choice(pot_1)
    # then randomly add it to a group that is empty 
    while True:
        group = random.choice(groups)
        if group == []:
            group.append(team)
            break
    pot_1.remove(team)

# Draw POT 2 into groups, make sure there are NOT 2 teams from the same confederation (rule doesn't apply to UEFA teams)

def checkGroupAvailability(confederation_in_question, group_in_question, max_amount_of_teams):
    if len(group_in_question) >= max_amount_of_teams:
        return False
    group_confederations = []
    for rank, ranking, code, confederation, name in group_in_question:
        group_confederations.append(confederation)
    for confederation in group_confederations:
        if confederation_in_question == confederation:
            if confederation == 'UEFA':
                return True
            else:
                return False
    return True


for ix in range(len(pot_2)):
    team = random.choice(pot_2)
    confederation = team[3]
    while True:
        group = random.choice(groups)
        if checkGroupAvailability(confederation, group, 2):
            group.append(team)
            break
    pot_2.remove(team)

print("pot 2", pot_2)
printList(groups)


# Draw POT 3 into groups, make sure there are NOT 2 teams from the same confederation (rule doesn't apply to UEFA teams)

for ix in range(len(pot_3)):
    team = random.choice(pot_3)
    confederation = team[3]
    while True:
        group = random.choice(groups)
        if checkGroupAvailability(confederation, group, 3):
            group.append(team)
            break
    pot_3.remove(team)

printList(groups)

# Draw POT 4 into groups, make sure there are NOT 2 teams from the same confederation (rule doesn't apply to UEFA teams)


for ix in range(len(pot_4)):
    team = random.choice(pot_4)
    confederation = team[3]
    while True:
        group = random.choice(groups)
        if checkGroupAvailability(confederation, group, 4):
            group.append(team)
            break
    pot_4.remove(team)

printList(groups)

Working Example of World Cup Groups

Mexico      South Korea  North Macedonia  Cape Verde           
Canada      Denmark      Tunisia          New Zealand
Spain       Egypt        Jordan           Austria
USA         Ecuador      Algeria          Saudi Arabia
England     Uruguay      Ivory Coast      Italy
Morocco     Colombia     Uzbekistan       Jamaica
Brazil      Japan        Honduras         Bosnia and Herzegovina
Croatia     Norway       Iraq             Germany
Portugal    Switzerland  Slovakia         Belgium
Netherlands Australia    South Africa     Suriname
France      Iran         Paraguay         Ghana
Argentina   Senegal      Qatar            Costa Rica
'''
