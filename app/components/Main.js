import React from 'react';
import ReactDOM from 'react-dom';
import StartsFrame from './StartsFrame';
import ButtonFrame from './ButtonFrame';
import AnswerFrame from './AnswerFrame';
import NumbersFrame from './NumbersFrame';
import DoneFrame from './DoneFrame';


let possibleCombinationSum = (arr, n) => {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
}
 
export default class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      numberOfStars: Math.floor(Math.random()*9) + 1,
      selectedNumbers: [],
      usedNumbers: [],
      correct: null,
      redraws: 5,
      doneStatus: null
    }
  }
  resetGame(){
    this.setState({
      numberOfStars: Math.floor(Math.random()*9) + 1,
      selectedNumbers: [],
      usedNumbers: [],
      correct: null,
      redraws: 5,
      doneStatus: null
    });
  }
  randomNumber(){
    return (Math.floor(Math.random()*9) + 1);
  }
  selectNumber(clickedNumber){
    if ((this.state.selectedNumbers.indexOf(clickedNumber) < 0 && 
       this.state.usedNumbers.indexOf(clickedNumber) < 0 )) {
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
    
    this.setState({
      selectedNumbers: [],
      usedNumbers: usedNumbers,
      correct: null,
      numberOfStars: this.randomNumber()//Math.floor(Math.random()*9) + 1
    },  _=> { this.updateDoneStatus() });
  }
  redraw(){
    if(this.state.redraws > 0){
      this.setState({
           numberOfStars: this.randomNumber(),
           correct: null,
           selectedNumbers: [], 
           redraws: this.state.redraws - 1
         }, _=> { this.updateDoneStatus() });
    }
  }
  possibleSolutions(){
    var numberOfStars = this.state.numberOfStars,
        possibleNumbers = [],
        usedNumbers = this.state.usedNumbers;
    for (var i=1; i<=9; i++) {
      if (usedNumbers.indexOf(i) < 0) {
        possibleNumbers.push(i);
      }
    }
    return possibleCombinationSum(possibleNumbers, numberOfStars);   
  }
  updateDoneStatus(){
    let possibleSolutions = this.possibleSolutions()
    if(this.state.usedNumbers.length === 9){
      this.setState({ doneStatus: 'Well Done!'});
      return
    }
    console.log(possibleSolutions)
    if (this.state.redraws === 0 && !this.possibleSolutions()) {
      this.setState({ doneStatus: 'Game Over'});
      return;
    }
  }
  
  render(){
    let selectedNumbers = this.state.selectedNumbers;
    let usedNumbers = this.state.usedNumbers;
    let correct = this.state.correct;
    let redraws = this.state.redraws,
        doneStatus = this.state.doneStatus,
        bottomFrame;
        
    if(doneStatus){
      bottomFrame = <DoneFrame doneStatus={this.state.doneStatus}
                               resetGame={this.resetGame.bind(this)}/> ;
    } else {
      bottomFrame =   <NumbersFrame selectedNumbers={this.state.selectedNumbers}
                      usedNumbers={this.state.usedNumbers}
                      selectNumber={this.selectNumber.bind(this)} />;
    }
       
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
        {bottomFrame}      
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('container'));