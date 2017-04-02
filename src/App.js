import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board'
// https://facebook.github.io/react/docs/optimizing-performance.html
// Use PureComponent to avoid unnecessary reconciliation to speed up rendering.
// Key point : don't mutate original state when produce new state.
class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Board />
      </div>
    );
  }
}

export default App;
