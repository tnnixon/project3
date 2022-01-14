import csv
import json
import pandas as pd

csvFilePath1 = './inst.csv'
csvFilePath2 = './indiv.csv'

jsonFilePath1 = './Data_ETL/inst.json'
jsonFilePath2 = './Data_ETL/indiv.json'

df1 = pd.read_csv (csvFilePath1)
df1.to_json (jsonFilePath1)

df2 = pd.read_csv (csvFilePath2)
df2.to_json (jsonFilePath2)

