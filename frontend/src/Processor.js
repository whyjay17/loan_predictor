import React from 'react';
import axios from 'axios';

export default class Processor extends React.Component {
  state = {
    name: '',
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name
    };

    console.log('ss', user.name)
    axios.post('http://localhost:5000/predict', `[{
      "Loan_ID":"555",
        "Gender":"Male",
        "Married":"Yes",
        "Dependents":"1",
        "Education":"Graduate",
        "Self_Employed":"No",
        "ApplicantIncome":4583,
        "CoapplicantIncome":1508,
        "LoanAmount":128,
        "Loan_Amount_Term":360,
        "Credit_History":0,
        "Property_Area":"Rural"
    }]`, {
      headers: { 'Content-Type': 'text/plain' }
    })
    .then(function (response) {
        //handle success
        console.log(JSON.parse((response.data.predictions).substr(1).slice(0, -1))[1]);
        //console.log(response.data)
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Input:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Go</button>
        </form>
      </div>
    )
  }
}