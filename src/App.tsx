import React, { useState } from 'react';
import './App.scss';
import Board from './components/board/board.component'

function App() {
  const [difficulty, setDifficulty] = useState({difficulty: 50})

  return (
    <div className="app">
      <header>
        <h1>Fibonacci</h1>
      </header>

      <Board {...difficulty}/>
    </div>
  );
}

export default App;
