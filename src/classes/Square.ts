import { Color } from "./Color"
import { Piece } from "./pieces/Piece";

export class Square {
    readonly x: number;
    readonly y: number;
    readonly color: Color;
    readonly key: number;
    accessible: boolean = false;
    piece: Piece | null = null;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.color = (x + y) % 2 !== 1 ? Color.WHITE : Color.BLACK;
        this.key = x*8 + y;
    }
}