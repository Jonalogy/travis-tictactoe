import React from 'react';
import './App.css';
import { TicTacToe } from './features/tictactoe/TicTacToe';

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <TicTacToe />
    </div>
  );
}

export default App;
