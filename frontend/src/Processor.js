import React from 'react';
import axios from 'axios';
import './App.css'
import { Button, ButtonIcon } from 'rmwc/Button';
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';
import { Select } from '@rmwc/select';
import { Radio } from '@rmwc/radio';
import 'material-components-web/dist/material-components-web.min.css';
export default class Processor extends React.Component {
  state = {
    name: '',
    income: '',
    married: 'yes',
    graduated: 'no',
  }

	getIncome = event => {
		this.setState({income: event.target.value})
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
      <div className>
      {/*
        <form onSubmit={this.handleSubmit}>
          <label>
            Input:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Go</button>

        </form>
      */}
        <Select
          label="Gender"
          placeholder=""
          options={['Male', 'Female']}
        />
        <br/>
        <TextField
          className="outlinedText"
          label="Income"
          onChange={this.getIncome}
        />
        <br/>
        <p>Are you married?</p> 
        <Radio
          value="yes"
          checked={this.state.married === "yes"}
          onChange={evt => this.setState({married: evt.target.value})}>
          Yes
        </Radio>
        <Radio
          value="no"
          checked={this.state.married === "no"}
          onChange={evt => this.setState({married: evt.target.value})}>
          No
        </Radio>
        <br/>
        <p>Have you finished your education?</p> 
        <Radio
          value="yes"
          checked={this.state.graduated === "yes"}
          onChange={evt => this.setState({graduated: evt.target.value})}>
          Yes
        </Radio>
        <Radio
          value="no"
          checked={this.state.graduated === "no"}
          onChange={evt => this.setState({graduated: evt.target.value})}>
          No
        </Radio>
        <br/>
        <p>Are you self-employed?</p> 
        <Radio
          value="yes"
          checked={this.state.graduated === "yes"}
          onChange={evt => this.setState({graduated: evt.target.value})}>
          Yes
        </Radio>
        <Radio
          value="no"
          checked={this.state.graduated === "no"}
          onChange={evt => this.setState({graduated: evt.target.value})}>
          No
        </Radio>
        <br/>
        <TextField
          className="outlinedText"
          label="Monthly Income($)"
          onChange={this.getIncome}
        />
        <TextFieldHelperText>What is your monthly income($)?</TextFieldHelperText>
        <br/>
        <TextField
          className="outlinedText"
          label="Coappliant Income($)"
          onChange={this.getIncome}
        />
        <TextFieldHelperText>What is your coappliant's monthly income($)?</TextFieldHelperText>
        <br/>
        <TextField
          className="outlinedText"
          label="Loan Amount($)"
          onChange={this.getIncome}
        />
        <TextFieldHelperText>What is your loan amount($) in thousands?</TextFieldHelperText>
        <br/>
        <TextField
          className="outlinedText"
          label="Loan Term"
          onChange={this.getIncome}
        />
        <TextFieldHelperText>What is your term of loan in months?</TextFieldHelperText>
        <br/>
        <Select
          label="Credit Score"
          placeholder=""
          options={['300-579', '580-669', '670-739', '740-799', '800-850']}
        />
        <br/>
        <Select
          label="Property Area"
          placeholder=""
          options={['Urban', 'Semi-urban', 'Rural']}
        />
        <br/>
        
        <br/>
        
        <br/>
        
        <br/>
        
      </div>
    )
  }
}