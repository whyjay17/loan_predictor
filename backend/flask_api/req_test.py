# -*- coding: utf-8 -*-
"""
Created on Sun Sep 16 23:00:46 2018

@author: YJ
"""

import json
import requests
import pandas as pd

"""Setting the headers to send and accept json responses
"""
header = {'Content-Type': 'application/json', \
                  'Accept': 'application/json'}

"""Reading test batch
"""
df = pd.read_csv(r'C:\Users\YJ\Desktop\loan_detector_proj\backend\flask_api\data\test.csv', encoding="utf-8-sig")
df = df.head()

"""Converting Pandas Dataframe to json
"""
data = df.to_json(orient='records')

resp = requests.post("http://0.0.0.0:5000/predict", \
                    data = json.dumps(data),\
                    headers= header)