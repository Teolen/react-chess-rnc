import { Square } from "../classes/Square";
import { Color } from "../classes/Color"
import PieceComponent from "./PieceComponent";

interface SquareProps {
    userColor: Color
    square: Square
    handleDragStart: (e: any, square: Square) => void
    handleDragEnd: (e: any) => void
    handleDragEnter: (e: any, square: Square) => void
    handleDrop: (e: any, square: Square) => void
    handleDragLeave: (e: any) => void
}

function SquareComponent({userColor, square, handleDragStart, handleDragEnd, handleDragEnter, handleDrop, handleDragLeave}: SquareProps) {


    return(<div className={[
            'square',
            square.color, 
            square.accessible && square.piece !== null ? 'attackable' : '',
        ].join(' ')} 
        onDrop={(e)=>handleDrop(e,square)} 
        onDragEnter={(e) => handleDragEnter(e, square)} 
        onDragEnd={(e) => handleDragEnd(e)} 
        onDragLeave={(e) => handleDragLeave(e)}
        onDragOver={(e)=>{if(square.accessible) e.preventDefault()}}>
        { square.accessible && square.piece === null && <div className="accessible"/>}
        { square.piece 
            && <img 
                src={square.piece.image} 
                title={square.piece.type} 
                draggable={userColor === square.piece.color}
                onDragStart={(e)=>handleDragStart(e,square)}
                onDragEnter={(e)=>e.preventDefault()}
                onDragLeave={(e)=>e.preventDefault()}
            />
        } 
    </div>);
}

export default SquareComponent;