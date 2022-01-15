import requests
import json
from config import api_key
from pprint import pprint

startdate = '2021-03-01'
enddate = '2021-03-10'
tag = "financial results"
url = 'https://eodhistoricaldata.com/api/news?api_token='+api_key+'&t='+tag+'&offset=0&limit=1&from='+startdate+'&to='+enddate
response = requests.get(url)
data = response.json()
pprint(data)

outString = json.dumps(data)

writeFile = open('./article.json', 'w')
writeFile.write(outString)
writeFile.close()
