import React from 'react';
import ReactDOM from 'react-dom';


class Number extends React.Component {
  render(){
    
    let number = this.props.number;
    let selectedNumbers = this.props.selectedNumbers;
    let usedNumbers = this.props.usedNumbers;
    let selectNumber = this.props.selectNumber;
    let className = "number selected-" + (selectedNumbers.indexOf(number) >=0);
    className += " used-" + (usedNumbers.indexOf(number) >=0);
    
    return(
      <div className={className} onClick={selectNumber.bind(this, number)}>
        {number}
      </div> 
    );
  }
}
export default class NumbersFrame extends React.Component {
  render(){
    let numbers = [];
    let selectNumber = this.props.selectNumber;
    for(var i=1; i<=9; i++){
      numbers.push(
        <Number key={i} number={i} 
                selectedNumbers={this.props.selectedNumbers}
                usedNumbers={this.props.usedNumbers}
                selectNumber={selectNumber}
                />
      )
    }
    return(
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
      
    )
  }
  
}