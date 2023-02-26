import { Piece } from "./Piece";
import { Color } from "../Color";
import { Square } from "../Square";
import { PieceTypes } from "./PieceTypes";
import blackPawn from "../../logos/bP.png";
import whitePawn from "../../logos/wP.png";
import { Chess } from "../Chess";

export class Pawn extends Piece {
    constructor(color: Color) {
        super(PieceTypes.PAWN, color, color === Color.WHITE ? whitePawn : blackPawn);
    }

    public setAccessibleSquares(fromSquare: Square, chess: Chess): void {
        const sideModifier = fromSquare.piece?.color === Color.WHITE ? -1 : 1;
        const defaultY = fromSquare.piece?.color === Color.WHITE ? 6 : 1;
        const x = fromSquare.x;
        const y = fromSquare.y;
        const frontSquare = chess.getSquare(x, (y + sideModifier));

        if (frontSquare) {
            if(!frontSquare.piece) {
                chess.setAccessible(x, (y + sideModifier));
                if(fromSquare.y === defaultY && !chess.getSquare(x, (y+sideModifier*2))?.piece) {
                    chess.setAccessible(x, (y + sideModifier*2));
                }
            }
        }

        let attackablePiece = chess.getSquarePiece(x-1, y+sideModifier)
        if(attackablePiece && attackablePiece?.color !== fromSquare.piece?.color) {
            chess.setAccessible(x-1, y+sideModifier);
        }
        attackablePiece = chess.getSquarePiece(x+1, y+sideModifier)
        if(attackablePiece && attackablePiece?.color !== fromSquare.piece?.color) {
            chess.setAccessible(x+1, y+sideModifier);
        }
    }
}


