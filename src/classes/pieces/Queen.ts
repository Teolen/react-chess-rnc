import { Piece } from "./Piece";
import { Color } from "../Color";
import { Square } from "../Square";
import { PieceTypes } from "./PieceTypes";
import blackQueen from "../../logos/bQ.png";
import whiteQueen from "../../logos/wQ.png";

export class Queen extends Piece {
    constructor(color: Color) {
        super(PieceTypes.QUEEN, color, color === Color.WHITE ? whiteQueen : blackQueen);
    }

    public checkRules(locatedIn: Square): boolean {
        return true;
    }
}


