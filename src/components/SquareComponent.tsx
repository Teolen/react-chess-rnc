import { Square } from "../classes/Square";
import { Color } from "../classes/Color"

interface SquareProps {
    userColor: Color
    square: Square
    handleDragStart: (e: any, square: Square) => void
    handleDragEnd: (e: any) => void
    handleDrop: (e: any, square: Square) => void
}

function SquareComponent({userColor, square, handleDragStart, handleDragEnd, handleDrop}: SquareProps) {

    return(<div className={[
            'square',
            square.color, 
            square.accessible && square.piece !== null ? 'attackable' : '',
        ].join(' ')} 
        onDrop={(e)=>handleDrop(e,square)} 
        onDragEnd={(e) => handleDragEnd(e)} 
        onDragOver={(e)=>{if(square.accessible) e.preventDefault()}}>
        { square.accessible && square.piece === null && <div className="accessible"/>}
        { square.piece 
            && <img 
                data-testid={"piece_" + square.piece.type}
                src={square.piece.image} 
                title={square.piece.type}
                alt={square.piece.type} 
                draggable={userColor === square.piece.color}
                onDragStart={(e)=>handleDragStart(e, square)}
            />
        } 
    </div>);
}

export default SquareComponent;