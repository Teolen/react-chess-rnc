import React, { useEffect, useState } from 'react';
import { Chess } from './classes/Chess';
import logo from './logo.svg';
import './App.css';
import BoardComponent from './components/BoardComponent';
import { Square } from './classes/Square';

function App() {

  const [chess, setChess] = useState(new Chess())
  const [board, setBoard] = useState(chess.storage);

  useEffect(()=> {
    start();
  },[]);

  const update = () => {
    const temp = chess.getStorage();
    setBoard(temp);
    if(temp.length) {
      localStorage.setItem('savedStorage', JSON.stringify(temp));
    }
    console.log('update-saving', temp);
  };

  const clearData = () => {
    localStorage.removeItem('savedStorage');
    chess.initializalion(null);
    update();
  };

  function start() {
    const savedJson = localStorage.getItem('savedStorage');
    const saved = savedJson ? JSON.parse(savedJson) : null;
    console.log('saved', saved)
    chess.initializalion(saved);
    update();
  }

  return (
    <div>
      <button onClick={() => clearData()}>Remove saved data</button>
      <div className="App">
        <BoardComponent chess={chess} storage = {board} update = {update}/>
      </div>
    </div>

  );
}

export default App;
