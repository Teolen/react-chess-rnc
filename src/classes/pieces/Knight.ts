import { Piece } from "./Piece";
import { Color } from "../Color";
import { Square } from "../Square";
import { PieceTypes } from "./PieceTypes";
import blackKnight from "../../logos/bN.png";
import whiteKnight from "../../logos/wN.png";

export class Knight extends Piece {
    constructor(color: Color) {
        super(PieceTypes.KNIGTH, color, color === Color.WHITE ? whiteKnight : blackKnight);
    }

    public checkRules(fromSquare: Square, toSquare: Square): boolean {
        console.log('hi');
        const dx = Math.abs(toSquare.x - fromSquare.x);
        const dy = Math.abs(toSquare.y - fromSquare.y)
        if((dx === 1 && dy === 2) || (dx === 2 && dy ===1)) {
            return true;
        }
        return false;
    }
}


