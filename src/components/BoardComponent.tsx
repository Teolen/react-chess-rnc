import {useState} from 'react';
import { Chess } from '../classes/Chess';
import SquareComponent from './SquareComponent';
import { Square } from '../classes/Square';
import { Color } from '../classes/Color';

interface ChessboardProps {
    storage: Square[],
    update: () =>  void,
    chess: Chess,
}

function BoardComponent({storage, chess, update} : ChessboardProps) {

    const [currentUser, setCurrentUser] = useState(Color.WHITE);
    
    const swapUserColor = () => {
        setCurrentUser(prev => prev === Color.WHITE ? Color.BLACK : Color.WHITE);
    };
    
    const handleDragEnter = (e: any) => {
        // e.preventDefault();
        console.log(e,'drag enter');
        // e.currentTarget.classList.add('hover-on');

    };
    const handleDragLeave = (e: any) => {
        // e.preventDefault();
        console.log(e,'drag leave');
        // e.currentTarget.classList.remove('hover-on');
    };

    const handleDragStart = (e: any, square: Square) => {
        e.dataTransfer.setData('startSquare', JSON.stringify(square));
        console.log(e,'drag start');
        chess.setAccessibleSquares(square);
        update();
    };    
    const handleDragEnd = (e: any) => {
        // e.preventDefault();
        // e.stopPropagation();
        chess.clearAccessibles();
        update();
        console.log(e,'drag end');
    };
    const handleOnDrop = (e: any, square: Square) => {
        e.currentTarget.classList.remove('hover-on');
        const startSquareJSON = e.dataTransfer.getData('startSquare');
        const startSquare = JSON.parse(startSquareJSON);
        console.log('dropData', startSquare);
        chess.movePiece(startSquare, square);
        console.log(e, 'drop');
        chess.clearAccessibles();
        update();
        swapUserColor();
    }
    
    return (
        <div className={[
            "board",
            currentUser === Color.BLACK ? "currentBlack" : ''
            ].join(' ')}>
            {
                storage.map(item => <SquareComponent 
                        square={item} 
                        key={item.key} 
                        handleDragStart={handleDragStart} 
                        handleDragEnd={handleDragEnd} 
                        handleDragEnter={handleDragEnter} 
                        handleDrop={handleOnDrop} 
                        handleDragLeave={handleDragLeave}
                        userColor={currentUser}
                    />)
            }
        </div>
    );
}

export default BoardComponent;