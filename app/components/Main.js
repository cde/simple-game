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
      usedNumbers: [],
      correct: null,
      redraws: 4
    }
  }
  randomNumber(){
    return (Math.floor(Math.random()*9) + 1);
  }
  selectNumber(clickedNumber){
    if(this.state.selectedNumbers.indexOf(clickedNumber) < 0 ) {
      this.setState(
        { selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
          correct: null }
      );    
    }
  }
  unselectNumber(clickedNumber){
    let selectedNumbers = this.state.selectedNumbers;
    let indexOfNumber = selectedNumbers.indexOf(clickedNumber);
    
    selectedNumbers.splice(indexOfNumber,1);
    this.setState({ selectedNumbers: selectedNumbers, correct: null });
  }
  sumOfSelectedNumbers() {
    let total = this.state.selectedNumbers.reduce((a, b) => a + b, 0);
    return total;
  }
  checkAnswer(){
    let correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
    this.setState( { correct: correct });
  }
  acceptAnswer(){
    let usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    console.log(usedNumbers);
    this.setState({
      selectedNumbers: [],
      usedNumbers: usedNumbers,
      correct: null,
      numberOfStars:  Math.floor(Math.random()*9) + 1
    });
  }
  redraw(){
    if(this.state.redraws > 0){
      this.setState({
           numberOfStars: this.randomNumber(),
           correct: null,
           selectedNumbers: [], 
           redraws: this.state.redraws - 1
         });
    }
  }
  
  render(){
    let selectedNumbers = this.state.selectedNumbers;
    let usedNumbers = this.state.usedNumbers;
    let correct = this.state.correct;
    let redraws = this.state.redraws;
    return (
      <div id="game">
        <h2>Play Nine</h2>
       
        <hr />
        <div className="clearfix">
          <StartsFrame numberOfStars={this.state.numberOfStars}/>
          <ButtonFrame selectedNumbers={selectedNumbers} 
                       correct={correct}
                       redraws={redraws}
                       checkAnswer={this.checkAnswer.bind(this)} 
                       acceptAnswer={this.acceptAnswer.bind(this)}
                       redraw={this.redraw.bind(this)}
                       />
          <AnswerFrame selectedNumbers={selectedNumbers} 
                      unselectNumber={this.unselectNumber.bind(this)}
           />
        </div>
        <NumbersFrame selectedNumbers={this.state.selectedNumbers}
                      usedNumbers={this.state.usedNumbers}
                      selectNumber={this.selectNumber.bind(this)}/>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('container'));