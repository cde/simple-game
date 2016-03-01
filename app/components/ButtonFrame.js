import React from 'react';
import ReactDOM from 'react-dom';
 
class Button extends React.Component {
  render(){
    return (
      <button className={this.className} disabled={this.props.disabled}>=</button>
    );
  }
}
export default class ButtonFrame extends React.Component {

  render(){
    let button, disabled;
    let correct = this.props.correct;
    // console.log(this.props.acceptAnswer);
    switch(correct){
      case true:
        button = (
          <button className="btn btn-success btn-lg"
                  onClick={this.props.acceptAnswer}>
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        );
        break;
      case false:
        button = (
          <button className="btn btn-danger btn-lg">
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        );
        break
      default:
        disabled = (this.props.selectedNumbers.length === 0);
        button = (
          <button className="btn btn-primary" disabled={disabled}
                  onClick={this.props.checkAnswer}>
                  =
          </button>
        )
    }
    
    return (
      <div id="button-frame">
        {button}
        <br /> <br />
        <button className="btn btn-warning btn-xs" 
                onClick={this.props.redraw}>
          <span className="glyphicon glyphicon-refresh"></span>
      </button>
      </div>
  
    );
  }
}

