import re

# Read 'rankings.txt'
file = open("rankings.txt", "r")

rankings = []

for line in file:
    rank = line.strip()
    country = file.readline().strip()
    rating = file.readline().strip().split('\t')[0]
    rankings.append([rank, country, rating])

# print(rankings)



# file cleanup

file.close()

file = open("ofc.txt", "r")

test = []

for line in file:
    t = line.strip().split('\t')
    test.append(t)

print(test)