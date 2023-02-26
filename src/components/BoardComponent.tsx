import { Chess } from '../classes/Chess';
import SquareComponent from './SquareComponent';
import { Square } from '../classes/Square';
import { Color } from '../classes/Color';

interface ChessboardProps {
    storage: Square[],
    update: () =>  void,
    chess: Chess,
    swapColor: () => void,
    currentColor: Color
}

function BoardComponent({storage, chess, update, swapColor, currentColor} : ChessboardProps) {

    const handleDragStart = (e: any, square: Square) => {
        e.dataTransfer.setData('startSquare', JSON.stringify(square));
        chess.setAccessibleSquares(square);
        update();
    };    
    const handleDragEnd = (e: any) => {
        chess.clearAccessibles();
        update();
    };
    const handleOnDrop = (e: any, square: Square) => {
        const startSquareJSON = e.dataTransfer.getData('startSquare');
        const startSquare = JSON.parse(startSquareJSON);
        chess.movePiece(startSquare, square);
        chess.clearAccessibles();
        update();
        swapColor();
    }
    
    return (
        <div data-testid={'Board_'+ storage.length}
         className={[
            "board",
            currentColor === Color.BLACK ? "currentBlack" : ''
            ].join(' ')}>
            {
                storage.map(item => <SquareComponent 
                        square={item} 
                        key={item.key} 
                        handleDragStart={handleDragStart} 
                        handleDragEnd={handleDragEnd} 
                        handleDrop={handleOnDrop} 
                        userColor={currentColor}
                    />)
            }
        </div>
    );
}

export default BoardComponent;