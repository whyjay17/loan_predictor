import React, { Component } from 'react';
import logo from './house-logo.svg';
import './App.css';
import axios from 'axios';
import Processor from './Processor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Home Loan Eligibility Detector
          </h1>
        </header>
        <p className="App-intro">
        </p>
        <Processor/>
      </div>
    );
  }
}

export default App;
