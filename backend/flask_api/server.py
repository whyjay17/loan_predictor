# -*- coding: utf-8 -*-
"""
Created on Fri Sep 14 22:06:38 2018

@author: YJ
"""

import os
import pandas as pd
from sklearn.externals import joblib
from flask import Flask, jsonify, request

import dill as pickle

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
        #test_json = request.get_json()
        test_json='[{"Loan_ID":"xxxx",\
                    "Gender":"Female",\
                    "Married":"No",\
                    "Dependents":"0",\
                    "Education":"Not Graduate",\
                    "Self_Employed":"No",\
                    "ApplicantIncome":100,\
                    "CoapplicantIncome":0,\
                    "LoanAmount":11000.0,\
                    "Loan_Amount_Term":0.0,\
                    "Credit_History":1.0,\
                    "Property_Area":"Rural"}]'
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
        with open(clf,'rb') as f:
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
        print(responses, 'res')
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

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000)