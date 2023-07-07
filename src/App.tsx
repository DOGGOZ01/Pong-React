import React from 'react';
import Game from './components/Game'
import './App.css';
import { ImportsNotUsedAsValues } from 'typescript';

class App extends React.Component {

  constructor(props : any) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <Game/>
      </div>
    ); 
  }
  
}

export default App;
