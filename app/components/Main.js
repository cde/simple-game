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
      selectedNumbers: [],
      correct: null
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
  sumOfSelectedNumbers() {
    let total = this.state.selectedNumbers.reduce((a, b) => a + b, 0);
    return total;
  }
  checkAnswer(){
    let correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
    this.setState( { correct: correct });
  }
  
  render(){
    let selectedNumbers = this.state.selectedNumbers;
    let correct = this.state.correct;
    return (
      <div id="game">
        <h2>Play Nine</h2>
       
        <hr />
        <div className="clearfix">
          <StartsFrame numberOfStars={this.state.numberOfStars}/>
          <ButtonFrame selectedNumbers={selectedNumbers} correct={correct}
                       checkAnswer={this.checkAnswer.bind(this)}/>
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