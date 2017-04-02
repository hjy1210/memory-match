import React, { PureComponent } from 'react';
import  Square from './Square'
export default class Board extends PureComponent {
  constructor(props) {
    super(props);
    this.state=this.initialObject()
    this.start=false
    this.timer=undefined
    this.onClick=this.onClick.bind(this)
    this.adjustClicked=this.adjustClicked.bind(this)
    this.newGame=this.newGame.bind(this)
  }
  randomAnswers(){
    var answers = [1,1,2,2,3,3,4,4,5];
    var items = answers.map(x=>{return{code:x,value:Math.random()}})
    items.sort(function(item1,item2){
        return item1.value-item2.value;
    })
    return items.map(item=>item.code);
  }
  adjustClicked(clicked,pairs){
    var clk=[...clicked]
    clk[pairs[0]]=false
    clk[pairs[1]]=false
    this.setState({clicked:clk,pairs:[],busy:false})
  }
  initialObject(){
    return {
      completed:[false,false,false,false,false,false,false,false,false],
      clicked:[false,false,false,false,false,false,false,false,false],
      pairs:[],
      squares:this.randomAnswers(),
      count:0,
      busy:false,
      time:0
    }
  }
  newGame(){
    this.setState(this.initialObject())
    this.start=false
    this.timer=undefined
  }
  onClick(i){
    if (this.state.busy || this.state.completed[i] || this.state.clicked[i]) return
    if (!this.start){
      this.timer=setInterval(()=>{
        this.setState({time:this.state.time+1})
      },1000)
      this.start=true
    }
    var clicked=[...this.state.clicked]
    var completed=[...this.state.completed]
    var pairs=[...this.state.pairs]
    var squares=[...this.state.squares]
    clicked[i]=true
    pairs.push(i)
    if (pairs.length===1){
      this.setState({clicked:clicked,pairs:pairs})
    } else {  // equivalent pairs.length===2
      if (squares[pairs[0]]===squares[pairs[1]]){
        completed[pairs[0]]=true
        completed[pairs[1]]=true
        // setState is async operation
        this.setState({completed:completed,count:this.state.count+2,pairs:[]},()=>{
          if (this.state.count===8) {
            clearInterval(this.timer)
          }
        })
      } else {
        this.setState({clicked:clicked,pairs:pairs,busy:true})
        setTimeout(()=>this.adjustClicked(clicked,pairs),500)
      }
    }
  }
  renderSquare(i) {
    return <Square value={this.state.squares[i]} completed={this.state.completed[i]} clicked={this.state.clicked[i]}
             onClick={() => this.onClick(i)}/>;
  }
  render() {
    return (
      <div className="App-intro">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <span> Time elpased {this.state.time} </span>
        <button onClick={this.newGame}>New Game </button>
      </div>
    )
  }
}