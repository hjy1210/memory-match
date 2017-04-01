import React, { Component } from 'react';
import  Square from './Square'
export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state={
      completed:[false,false,false,false,false,false,false,false,false],
      clicked:[false,false,false,false,false,false,false,false,false],
      pairs:[],
      squares:[1,1,2,2,3,3,4,4,5],
      count:0,
      busy:false
    }
    this.onClick=this.onClick.bind(this)
  }
  onClick(i){
    if (this.state.busy || this.state.completed[i] || this.state.clicked[i]) return
    var clk=[...this.state.clicked]
    clk[i]=true
    //this.setState({clicked:clk,pairs:[...this.state.pairs,i]})
    this.setState(prevState=>{
      let x=[...prevState.pairs,i]
      return {clicked:clk,pairs:[...prevState.pairs,i]}
    })
    if (this.state.pairs.length===2){
      if (this.state.squares[this.state.pairs[0]]===this.state.squares[this.state.pairs[1]]){
        var cmp=[...this.state.completed]
        cmp[this.state.pairs[0]]=true
        cmp[this.state.pairs[1]]=true
        this.setState({completed:cmp,count:this.state.count+2,pairs:[]})
      } else {
        let clk=[...this.state.clicked]
        clk[i]=true
        this.setState({clicked:clk})
        setTimeout(()=>{
          let clk=[...this.state.clicked]
          clk[this.state.pairs[0]]=false
          clk[this.state.pairs[1]]=false
          this.setState({clicked:clk,pairs:[]})
        },500)
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
      </div>
    )
  }
}