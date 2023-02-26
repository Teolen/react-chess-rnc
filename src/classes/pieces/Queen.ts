import { Piece } from "./Piece";
import { Color } from "../Color";
import { Square } from "../Square";
import { PieceTypes } from "./PieceTypes";
import { Chess } from "../Chess";
import blackQueen from "../../logos/bQ.png";
import whiteQueen from "../../logos/wQ.png";

export class Queen extends Piece {
    constructor(color: Color) {
        super(PieceTypes.QUEEN, color, color === Color.WHITE ? whiteQueen : blackQueen);
    }

    public setAccessibleSquares(fromSquare: Square, chess: Chess): void {      
        this.setAccessibleHorizontal(fromSquare, chess);
        this.setAccessibleVertical(fromSquare, chess);
        this.setAccessibleDiagonal(fromSquare, chess);
    }
}


