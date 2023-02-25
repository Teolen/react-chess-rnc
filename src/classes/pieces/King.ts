import { Piece } from "./Piece";
import { Color } from "../Color";
import { Square } from "../Square";
import { PieceTypes } from "./PieceTypes";
import blackKing from "../../logos/bK.png";
import whiteKing from "../../logos/wK.png";

export class King extends Piece {
    constructor(color: Color) {
        super(PieceTypes.KING, color, color === Color.WHITE ? whiteKing : blackKing);
    }

    public checkRules(locatedIn: Square): boolean {
        return true;
    }
}


