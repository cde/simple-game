import React from 'react';
import ReactDOM from 'react-dom';
 
 class Star extends React.Component {
   render(){
     return(
       <span className="glyphicon glyphicon-star"></span>
     )
   }
 }
export default class StartsFrame extends React.Component {

  render(){

    let stars = [];
    for(var i=0; i< this.props.numberOfStars; i++){
      stars.push(
        <Star key={i} />
      )
    }
    return (
      <div id="stars-frame">
        <div className="well">
          {stars}
        </div>
      </div>

    );
  }
}

