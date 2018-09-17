# -*- coding: utf-8 -*-
"""
Created on Fri Sep 14 22:06:38 2018

@author: YJ
"""

import os
import pandas as pd
from sklearn.externals import joblib
from flask import Flask, jsonify, request
import json
import dill as pickle
from flask_cors import CORS

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return 'home here'

@app.route('/predict', methods=['GET', 'POST'])
def api_call():
    """
    API Call
    Pandas dataframe (sent as a payload) from API Call
    """
    try:
        test_json = request.data
        test = pd.read_json(test_json, orient='records')
        print(test)
        #To resolve the issue of TypeError: Cannot compare types 'ndarray(dtype=int64)' and 'str'
        test['Dependents'] = [str(x) for x in list(test['Dependents'])]

        #Getting the Loan_IDs separated out
        loan_ids = test['Loan_ID']

    except Exception as e:
        raise e

    clf = 'loan_predictor.pk'

    if test.empty:
        return(bad_req())
    else:
        #Load the saved model
        print("Loading the model...")
        loaded_model = None
        with open(clf, 'rb') as f:
            loaded_model = pickle.load(f)

        print("The model has been loaded...doing predictions now...")
        predictions = loaded_model.predict(test)
        print('predictions', predictions)

        """Add the predictions as Series to a new pandas dataframe
                                OR
           Depending on the use-case, the entire test data appended with the new files
        """
        prediction_series = list(pd.Series(predictions))

        final_predictions = pd.DataFrame(list(zip(loan_ids, prediction_series)))
        print('final_predictions', final_predictions,'final_predictions')
        """We can be as creative in sending the responses.
           But we need to send the response codes as well.
        """
        responses = jsonify(predictions=final_predictions.to_json(orient="records"))
        responses.status_code = 200
        return (responses)
    
@app.errorhandler(400)
def bad_req(error=None):
	message = {
			'status': 400,
			'message': 'Bad Request: ' + request.url + '--> Please check your data payload...',
	}
	resp = jsonify(message)
	resp.status_code = 400

	return resp

# Cross Origin Resource Sharing (CORS) support for the flask backend
CORS(app=app, supports_credentials=True)

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000)