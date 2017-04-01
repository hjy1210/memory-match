import React, { Component } from 'react';
import '../css/match.css'
export default class Square extends Component {
  getBackground(){
    if (this.props.completed) return {background:"gray"}
    else if (this.props.clicked) return {background:"red"}
    else return {background:"blue"}
  }
  render(){
    return ( 
      <div className="square" onClick={this.props.onClick} style={this.getBackground()}>
        {(this.props.completed || this.props.clicked)?this.props.value:""}
      </div>
    )
  }
}