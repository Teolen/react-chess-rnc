import { Piece } from "./Piece";
import { Color } from "../Color";
import { Square } from "../Square";
import { PieceTypes } from "./PieceTypes";
import blackPawn from "../../logos/bP.png";
import whitePawn from "../../logos/wP.png";

export class Pawn extends Piece {
    constructor(color: Color) {
        super(PieceTypes.PAWN, color, color === Color.WHITE ? whitePawn : blackPawn);
    }

    public checkRules(locatedIn: Square): boolean {
        return true;
    }
}


