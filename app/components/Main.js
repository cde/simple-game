import React from 'react';
import ReactDOM from 'react-dom';
import StartsFrame from './StartsFrame';
import ButtonFrame from './ButtonFrame';
import AnswerFrame from './AnswerFrame';
import NumbersFrame from './NumbersFrame';
 
export default class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      numberOfStars: Math.floor(Math.random()*9) + 1,
      selectedNumbers: []
    }
  }
  selectNumber(clickedNumber){
    if(this.state.selectedNumbers.indexOf(clickedNumber) < 0 ) {
      this.setState(
        { selectedNumbers: this.state.selectedNumbers.concat(clickedNumber) }
      );    
    }
  }
  unselectNumber(clickedNumber){
    let selectedNumbers = this.state.selectedNumbers;
    let indexOfNumber = selectedNumbers.indexOf(clickedNumber);
    
    selectedNumbers.splice(indexOfNumber,1);
    this.setState({ selectedNumbers: selectedNumbers });
  }
  render(){
    let selectedNumbers = this.state.selectedNumbers;
    
    return (
      <div id="game">
        <h2>Play Nine</h2>
       
        <hr />
        <div className="clearfix">
          <StartsFrame numberOfStars={this.state.numberOfStars}/>
          <ButtonFrame selectedNumbers={selectedNumbers}/>
          <AnswerFrame selectedNumbers={selectedNumbers} 
                      unselectNumber={this.unselectNumber.bind(this)}
           />
        </div>
        <NumbersFrame selectedNumbers={this.state.selectedNumbers} 
                     selectNumber={this.selectNumber.bind(this)}/>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('container'));