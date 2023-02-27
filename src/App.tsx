import React, { useEffect, useState } from 'react';
import { Chess } from './classes/Chess';
import './App.css';
import BoardComponent from './components/BoardComponent';
import { Color } from './classes/Color';

function App() {

  const [chess, setChess] = useState(new Chess())
  const [board, setBoard] = useState(chess.storage);
  const [changingSides, setChangingSides] = useState(false);
  const [currentColor, setCurrentColor] = useState(Color.WHITE);

  useEffect(()=> {
    start();
  },[]);

  const update = () => {
    const temp = chess.getStorage();
    setBoard(temp);
    if(temp.length) {
      localStorage.setItem('savedStorage', JSON.stringify(temp));
    }
    localStorage.setItem('savedColor', (currentColor).toString())
  };

  const clearData = () => {
    localStorage.removeItem('savedStorage');
    chess.initializalion(null);
    setCurrentColor(Color.WHITE);
    update();
  };

  const start = () => {
    const savedJson = localStorage.getItem('savedStorage');
    const saved = savedJson ? JSON.parse(savedJson) : null;
    chess.initializalion(saved);
    const savedColor = localStorage.getItem('savedColor');
    if(savedColor) {
      setCurrentColor(savedColor == Color.BLACK ? Color.BLACK : Color.WHITE);
    }
    const savedChanging = localStorage.getItem('changingSides');
    if(savedChanging) {
      setChangingSides(() => savedChanging.toLowerCase() === "true")
    }
    update();
  }

  const swapColor = () => {
    if(changingSides) {
        setCurrentColor(prev => {
          const color = prev === Color.WHITE ? Color.BLACK : Color.WHITE
          localStorage.setItem('savedColor', color);
          return color;
        }); 
    }
  };

  return (
    <div className='App'>
        <div className='info'>
          <span>Current: {currentColor}</span>
          <button onClick={() => clearData()}>Restart</button>
          <div className="clickable" onClick={() => setChangingSides(prev => {localStorage.setItem('changingSides', (!prev).toString()); return !prev;})}>
            <input type="checkbox" checked={changingSides} readOnly/> Changing sides
          </div>
        </div>
      <div className="chess">
        <BoardComponent chess={chess} storage = {board} update = {update} swapColor={swapColor} currentColor={currentColor}/>
      </div>
    </div>

  );
}

export default App;
