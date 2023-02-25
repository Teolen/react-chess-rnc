import { Piece } from "./Piece";
import { Color } from "../Color";
import { Square } from "../Square";
import { PieceTypes } from "./PieceTypes";
import blackBishop from "../../logos/bB.png";
import whiteBishop from "../../logos/wB.png";

export class Bishop extends Piece {
    constructor(color: Color) {
        super(PieceTypes.BISHOP, color, color === Color.WHITE ? whiteBishop : blackBishop);
    }

    public checkRules(locatedIn: Square): boolean {
        return true;
    }
}


