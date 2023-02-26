import { Piece } from "./Piece";
import { Color } from "../Color";
import { Square } from "../Square";
import { PieceTypes } from "./PieceTypes";
import blackKnight from "../../logos/bN.png";
import whiteKnight from "../../logos/wN.png";
import { Chess } from "../Chess";

export class Knight extends Piece {
    constructor(color: Color) {
        super(PieceTypes.KNIGTH, color, color === Color.WHITE ? whiteKnight : blackKnight);
    }

    public setAccessibleSquares(fromSquare: Square, chess: Chess): void {   
        chess.storage = chess.storage.map(elem => {
            const dx = Math.abs(elem.x - fromSquare.x);
            const dy = Math.abs(elem.y - fromSquare.y);
            if(((dx === 1 && dy === 2) || (dx === 2 && dy ===1)) && elem.piece?.color !== fromSquare.piece?.color) {
                elem.accessible = true;
            }
            return elem
        });
    }
}


