import { Piece } from "./Piece";
import { Color } from "../Color";
import { Square } from "../Square";
import { PieceTypes } from "./PieceTypes";
import { Chess } from "../Chess";
import blackBishop from "../../logos/bB.png";
import whiteBishop from "../../logos/wB.png";

export class Bishop extends Piece {
    constructor(color: Color) {
        super(PieceTypes.BISHOP, color, color === Color.WHITE ? whiteBishop : blackBishop);
    }

    public setAccessibleSquares(fromSquare: Square, chess: Chess): void {
        this.setAccessibleDiagonal(fromSquare, chess);
    }
}


