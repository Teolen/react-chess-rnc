import { Piece } from "./Piece";
import { Color } from "../Color";
import { Square } from "../Square";
import { PieceTypes } from "./PieceTypes";
import blackKing from "../../logos/bK.png";
import whiteKing from "../../logos/wK.png";
import { Chess } from "../Chess";

export class King extends Piece {
    constructor(color: Color) {
        super(PieceTypes.KING, color, color === Color.WHITE ? whiteKing : blackKing);
    }

    public setAccessibleSquares(fromSquare: Square, chess: Chess): void {
        const x = fromSquare.x;
        const y = fromSquare.y;

        for(let forX = x-1; forX <= x+1; forX++) {
            for(let forY = y-1; forY <= y+1; forY++) {
                let checkablePiece = chess.getSquarePiece(forX,forY);
                if(!checkablePiece || this.isEnemy(checkablePiece)) {
                    chess.setAccessible(forX, forY);            
                }
            }
        }
    }
}


