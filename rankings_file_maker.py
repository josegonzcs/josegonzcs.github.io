#----------------------------------------
#| STEPS TO RUN WITH NEW FIFA RANKINGS |
#----------------------------------------

# COPY RANKINGS FROM fotmob.com/fifaranking?gender=men IN A .TXT FILE

file = open("rankings.txt", "r") 

rankings = []

for line in file:
    rank = line.strip()
    country = file.readline().strip()
    rating = file.readline().strip().split('\t')[0]
    rankings.append([rank, country, rating])

# for rank, country, rating in rankings:
#     print(rank, country, rating)

file.close()

old = open("rankings_10July2025.txt", "r") # RENAME TO LAST RANKINGS FILE

old_rankings = []

for line in old:
    rank = line.strip().split(None, 4)[0]
    ranking = line.strip().split(None, 4)[1]
    code = line.strip().split(None, 4)[2]
    confederation = line.strip().split(None, 4)[3]
    country = line.strip().split(None, 4)[4]
    old_rankings.append([rank, ranking, code, confederation, country])

file.close()

# for rank, ranking, code, confederation, country in old_rankings:
#     print(rank, ranking, code, confederation, country)

new_rankings = [] 

for rank, country, ranking in rankings:
    for old_rank, old_ranking, code, confederation, old_country in old_rankings:
        if country == old_country:
            new_rankings.append([rank, ranking, code, confederation, country])

# COPY OUTPUT FROM FOR LOOP BELOW AND SAVE IN A TEXT FILE
            
# for rank, ranking, code, confederation, country in new_rankings: 
#     print(rank, ranking, code, confederation, country)

import os

contents = os.listdir("png")

file = open("data.csv")

isos = {}

for line in file:
    name = line[:-4]
    iso = line[-3:-1].lower()
    # print(iso)
    isos[iso] = name

file.close()

# for item in isos:
#     print(item, isos[item])

for rank, ranking, code, confederation, country in new_rankings: 
    # print(country)
    for file in contents:
        filename = "png/" + file
        # print(filename)
        # print("filename = ", filename)
        try:
            # print(isos[file[:-4]])
            if isos[file[:-4]] == country:
                newfilename = code + ".png"
                # print("newfilename = ", newfilename)
                try:
                    os.rename(filename, newfilename)
                    # print(filename, " renamed to ", newfilename)
                except OSError as err:
                    print(err)

        except:
            pass
        