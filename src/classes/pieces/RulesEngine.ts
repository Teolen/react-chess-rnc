import { Square } from "../Square";
import { Piece } from "./Piece";
import { PieceTypes } from "./PieceTypes";

export class RulesEngine {
    public checkAccess(fromSquare: Square, toSquare:Square): boolean {
        if(fromSquare.piece === null) return false;
        return true;
        // switch fromSquare.piece
    }
}