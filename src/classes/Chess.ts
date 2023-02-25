import { Square } from "./Square";
import { Color } from "./Color";
import { Piece } from "./pieces/Piece";
import { Pawn } from "./pieces/Pawn";
import { King } from "./pieces/King";
import { Queen } from "./pieces/Queen";
import { Bishop } from "./pieces/Bishop";
import { Knight } from "./pieces/Knight";
import { Rook } from "./pieces/Rook";
import { RulesEngine } from "./pieces/RulesEngine";
import { PieceTypes } from "./pieces/PieceTypes";

export class Chess {
    storage: Square[];
    rules: RulesEngine
    
    constructor() {
        this.storage = [];
        this.rules = new RulesEngine();
    }

    public initializalion(saved: Square[] | null) {
        if(saved && saved.length === 64) {
            this.storage = saved.map(item => {
                item.piece = this.restorePiece(item.piece);
                return item;
            })
            // this.storage = saved;
        } else {
            let storage = [];
            for(let y = 0; y < 8; y++) {
                for (let x = 0; x < 8; x++) {
                    storage.push(new Square(x,y));
                }
            }
            this.storage = storage;
            this.arrangeFigures();
        }
    }

    public arrangeFigures(): void {
        for(let i = 0; i < 8; i++) {
            this.getSquare(i,1).piece = new Pawn(Color.BLACK)
            this.getSquare(i,6).piece = new Pawn(Color.WHITE)
        }
        this.getSquare(0,0).piece = new Rook(Color.BLACK);
        this.getSquare(7,0).piece = new Rook(Color.BLACK);
        this.getSquare(0,7).piece = new Rook(Color.WHITE);
        this.getSquare(7,7).piece = new Rook(Color.WHITE);

        this.getSquare(1,0).piece = new Knight(Color.BLACK);
        this.getSquare(6,0).piece = new Knight(Color.BLACK);
        this.getSquare(1,7).piece = new Knight(Color.WHITE);
        this.getSquare(6,7).piece = new Knight(Color.WHITE);

        this.getSquare(2,0).piece = new Bishop(Color.BLACK);
        this.getSquare(5,0).piece = new Bishop(Color.BLACK);
        this.getSquare(2,7).piece = new Bishop(Color.WHITE);
        this.getSquare(5,7).piece = new Bishop(Color.WHITE);

        this.getSquare(3,0).piece = new Queen(Color.BLACK);
        this.getSquare(3,7).piece = new Queen(Color.WHITE);

        this.getSquare(4,0).piece = new King(Color.BLACK);
        this.getSquare(4,7).piece = new King(Color.WHITE);
    }

    public getSquare(x: number, y:number): Square {
        return this.storage[y*8+x];
    }

    public movePiece(fromSquare: Square, toSquare: Square): void {
        const piece = this.getSquare(fromSquare.x, fromSquare.y).piece;
        this.getSquare(fromSquare.x, fromSquare.y).piece = null;
        this.getSquare(toSquare.x, toSquare.y).piece = piece;
    }

    public setAccessibleSquares(square: Square): void {
        if(square.piece === null) return;
        this.storage.forEach(item => {
            if(item.piece === null || (item.piece.color !== square.piece?.color)) {
                if (square.piece?.checkRules(square, item)) {
                    item.accessible = true
                }
            }
        });
    }

    public clearAccessibles(): void {
        this.storage.forEach(item => {
                item.accessible = false
            });
    }

    public getStorage(): Square[] {
        return [...this.storage];
    }
    private restorePiece(piece: Piece | null): Piece | null {
        if(piece === null) return null;
        switch(piece.type) {
            case PieceTypes.KING:
                return new King(piece.color);
                break;
            case PieceTypes.QUEEN:
                return new Queen(piece.color);
                break;
            case PieceTypes.BISHOP:
                return new Bishop(piece.color);
                break;
            case PieceTypes.KNIGTH:
                return new Knight(piece.color);
                break;
            case PieceTypes.ROOK:
                return new Rook(piece.color);
                break;
            case PieceTypes.PAWN:
                return new Pawn(piece.color);
                break;
            default:
                return null;
        }
    }
}