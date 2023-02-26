import React from 'react';
import { render, screen } from '@testing-library/react';
import { getByAltText } from '@testing-library/dom';
import App from './App';
import BoardComponent from './components/BoardComponent';
import { Chess } from './classes/Chess';
import { Color } from './classes/Color';
import { Square } from './classes/Square';
import SquareComponent from './components/SquareComponent';
import { Rook } from './classes/pieces/Rook';

test('renders checkbox', () => {
  render(<App />);
  const checkboxElement = screen.getByRole('checkbox');
  expect(checkboxElement).toBeInTheDocument();
});

test('renders Current', () => {
  render(<App />);
  const currentElement = screen.getByText(/Current:/);
  expect(currentElement).toBeInTheDocument();
});

test('renders button', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
})

test('renders Board', () => {
  const chess = new Chess();
  chess.initializalion(null);
  const board = chess.storage;
  const update = () => {};
  const swapColor = () => {};
  const currentColor = Color.WHITE;
  const {container} = render(<BoardComponent chess={chess} storage = {board} update = {update} swapColor={swapColor} currentColor={currentColor} />);
  const boardElement = screen.getByTestId("Board_64");
  expect(boardElement).toBeInTheDocument();
  expect(container.getElementsByClassName("white").length).toBe(32);
  expect(container.getElementsByClassName("black").length).toBe(32);
  expect(container.querySelectorAll('[title="Rook"]').length).toBe(4);

})

test('rendres Rook', () => {
  const item = new Square(1,1);
  item.piece = new Rook(Color.WHITE);
  render(<SquareComponent                         
      square={item} 
      handleDragStart={()=>{}} 
      handleDragEnd={()=>{}} 
      handleDrop={()=>{}} 
      userColor={Color.WHITE} 
    />);

 expect(screen.getByAltText("Rook")).toBeInTheDocument();  
 expect(screen.getByTitle("Rook")).toBeInTheDocument();
 expect(screen.getByTestId("piece_Rook")).toBeInTheDocument();
 expect(screen.queryByTitle("Knight")).not.toBeInTheDocument();

});