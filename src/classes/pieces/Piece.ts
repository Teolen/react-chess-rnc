import { Color } from "../Color"
import { Square } from "../Square";
import { PieceTypes } from "./PieceTypes";

export class Piece {
    readonly color: Color;
    readonly image: string;
    readonly type: string

    constructor(type: PieceTypes, color: Color, image: string) {
        this.color = color;
        this.image = image;
        this.type = type;
    }

    public checkRules(fromSquare: Square, toSquare: Square): boolean {
        console.log('hi');
        return true;
    }
}