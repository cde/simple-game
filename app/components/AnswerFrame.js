import React from 'react';
import ReactDOM from 'react-dom';

export default class AnswerFrame extends React.Component {
  render(){
    let props = this.props;
    let selectedNumbers = props.selectedNumbers.map(number => {
      return( <span key={number} onClick={props.unselectNumber}>{number}</span>)
    });
    
    return(
      <div id="answer-frame">
        <div className="well">
          {selectedNumbers}
        </div>
      </div>
      
      
    )
    
  }
}