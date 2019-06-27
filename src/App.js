import React, { Component } from 'react';

import GenerateButtons from './generateButtons';
import CalcButton from './calcButton';

import './App.css';

const calculatorStyle = {
  borderRadius: '1px',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.2)',
  fontSize: '1.8rem',
  letterSpacing: '5px',
  margin: '1rem auto',
  padding: '16px',
  width: '25rem'
}

class App extends Component {
  state = {
    result: '0',
    operators: [
      {value: '+'},
      {value: '-'},
      {value: '*'},
      {value: '/'}
    ],
    topRow: [
      {value: '7'},
      {value: '8'},
      {value: '9'},
    ],
    middleRow: [
      {value: '4'},
      {value: '5'},
      {value: '6'},
    ],
    bottomRow: [
      {value: '1'},
      {value: '2'},
      {value: '3'},
    ]
  }

  handleClick = value => {
    const { result } = this.state;
    
    this.setState({
      result: result === '0' ? value : result + value
    })
  }

  calculateResult = () => {
    const input = this.state.result;

    const operators = input.replace(/[0-9]|\./g, "").split("");
    const numbersStringArray = input.split(/\+|-|\*|\//g);
    
    let numbers = [];
    numbersStringArray.forEach(function(number){
      numbers.push(Number(number));
    });
    
    let multiply = operators.indexOf("*");
    while (multiply !== -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("*");
    }

    let divide = operators.indexOf("/");
    while (divide !== -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("/");
    }

    let add = operators.indexOf("+");
    while (add !== -1) {
        // using parseFloat is necessary, otherwise it will result in string concatenation :)
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    let subtract = operators.indexOf("-")
    while (subtract !== -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    this.setState({
      result: numbers[0]
    })
  }

  clearDisplay = () => {
    this.setState({
      result: '0'
    })
  }

  render() {
    const { operators, topRow, middleRow, bottomRow, result } = this.state;

    return (
      <div className="App calculator" style={calculatorStyle}>
        <div className="input">{result}</div>
        <div className="buttons">
          <div className="operators">
            <GenerateButtons buttons={operators} clickAction={(value) => this.handleClick(value)}/>
          </div>
          <div className="leftPanel">
            <div className="numbers">
              <GenerateButtons buttons={topRow} clickAction={(value) => this.handleClick(value)}/>
            </div>
            <div className="numbers">
              <GenerateButtons buttons={middleRow} clickAction={(value) => this.handleClick(value)}/>
            </div>
            <div className="numbers">
              <GenerateButtons buttons={bottomRow} clickAction={(value) => this.handleClick(value)}/> 
            </div>
            <div className="numbers">
              <CalcButton type="operator" value="C" onPress={this.clearDisplay} />
              <CalcButton type="number" value="0" onPress={(value) => this.handleClick(value)} />
              <CalcButton type="number" value="." onPress={(value) => this.handleClick(value)} />
            </div>
          </div>
          <CalcButton type="equal" value="=" onPress={this.calculateResult} />
        </div>
      </div>
    );
  }
}

export default App;
