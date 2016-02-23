import React from 'react';
import ReactDOM from 'react-dom';
 

export default class ButtonFrame extends React.Component {

  render(){
    let disabled = (this.props.selectedNumbers.length === 0)
    return (
      <div id="button-frame">
        <button className="btn btn-primary" disabled={disabled}>=</button>
      </div>

    );
  }
}

