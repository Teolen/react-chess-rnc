import { Piece } from "./Piece";
import { Color } from "../Color";
import { Square } from "../Square";
import { Chess } from "../Chess";
import { PieceTypes } from "./PieceTypes";
import blackRook from "../../logos/bR.png";
import whiteRook from "../../logos/wR.png";

export class Rook extends Piece {
    constructor(color: Color) {
        super(PieceTypes.ROOK, color, color === Color.WHITE ? whiteRook : blackRook);
    }
    
    public setAccessibleSquares(fromSquare: Square, chess: Chess): void {
       this.setAccessibleHorizontal(fromSquare, chess);
       this.setAccessibleVertical(fromSquare, chess);
    }
}


