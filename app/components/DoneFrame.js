import React from 'react';
import ReactDOM from 'react-dom';

export default class DoneFrame extends React.Component {
  render(){
    let status = this.props.doneStatus
    return(
      <div id="done-frame">
        <div className="well text-center">
          <h3>{status}</h3>
        </div>
      </div>
      
      
    )
    
  }
}