import { Piece } from "../classes/pieces/Piece";
import { Color } from "../classes/Color";

interface PieceProps {
    piece: Piece
    onDragStart: (e: any) => void
    onDragEnd: (e: any) => void
    onDragEnter: (e: any) => void
    onDrop: (e: any) => void
}

export default function PieceComponent({piece, onDragStart, onDragEnd, onDragEnter, onDrop}: PieceProps) {


    return (
        <img src={piece.image} title={piece.type} draggable onDragStart={()=>onDragStart(piece)} onDragEnd={onDragEnd} onDragEnter={onDragEnter} onDrop={()=>{console.log('drop')}}/>
    )
}