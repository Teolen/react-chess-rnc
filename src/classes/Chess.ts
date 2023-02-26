import { Square } from "./Square";
import { Color } from "./Color";
import { Piece } from "./pieces/Piece";
import { Pawn } from "./pieces/Pawn";
import { King } from "./pieces/King";
import { Queen } from "./pieces/Queen";
import { Bishop } from "./pieces/Bishop";
import { Knight } from "./pieces/Knight";
import { Rook } from "./pieces/Rook";
import { PieceTypes } from "./pieces/PieceTypes";

export class Chess {
    storage: Square[];
    
    constructor() {
        this.storage = [];
    }

    // Заполняет доску фигурами (если в параметре - Square[] - восстанавливает массив объектов, если null - массив 'для старта')
    public initializalion(saved: Square[] | null) {
        if(saved && saved.length === 64) {
            this.storage = saved.map((item, index) => {
                item = this.restoreSquare(item, index);
                return item;
            })
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

    // расстановка фигур в положение для начала игры
    public arrangeFigures(): void {
        for(let i = 0; i < 8; i++) {
            this.setSquarePiece(i,1, new Pawn(Color.BLACK));
            this.setSquarePiece(i,6, new Pawn(Color.WHITE));
        }
        this.setSquarePiece(0,0, new Rook(Color.BLACK));
        this.setSquarePiece(7,0, new Rook(Color.BLACK));
        this.setSquarePiece(0,7, new Rook(Color.WHITE));
        this.setSquarePiece(7,7, new Rook(Color.WHITE));

        this.setSquarePiece(1,0, new Knight(Color.BLACK));
        this.setSquarePiece(6,0, new Knight(Color.BLACK));
        this.setSquarePiece(1,7, new Knight(Color.WHITE));
        this.setSquarePiece(6,7, new Knight(Color.WHITE));

        this.setSquarePiece(2,0, new Bishop(Color.BLACK));
        this.setSquarePiece(5,0, new Bishop(Color.BLACK));
        this.setSquarePiece(2,7, new Bishop(Color.WHITE));
        this.setSquarePiece(5,7, new Bishop(Color.WHITE));

        this.setSquarePiece(3,0, new Queen(Color.BLACK));
        this.setSquarePiece(3,7, new Queen(Color.WHITE));

        this.setSquarePiece(4,0, new King(Color.BLACK));
        this.setSquarePiece(4,7, new King(Color.WHITE));
    }

    // возвращает элемент внутреннего массива доски с проверкой на null, undefined и корректность координат
    public getSquare(x: number, y: number): Square | null {
        if(Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x < 8 && y >= 0 && y < 8) {
            return this.storage[y*8+x];
        } else {
            return null;
        }
    }

    // возвращает фигуру, установленную в клетке доски с проверкой на null, undefined и корректность координат
    public getSquarePiece(x: number, y:number) : Piece | null {
        const piece = this.getSquare(x,y)?.piece;
        return piece ? piece : null;
    }

    // устанавливает элемент внутреннего массива доски с проверкой на null, undefined и корректность координат
    public setSquare(x: number, y: number, square: Square): void {
        if(Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x < 8 && y >= 0 && y < 8) {
            this.storage[y*8+x] = square;
        }
    }

    // устанавливает фигуру, установленную в клетке доски с проверкой на null, undefined и корректность координат
    public setSquarePiece(x: number, y: number, piece: Piece | null) : void {
        if(Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x < 8 && y >= 0 && y < 8) {
            this.storage[y*8+x].piece = piece; 
        }
    }   

    // устанавливает клетку в доступный для перетаскивания режим
    public setAccessible(x: number, y:number): void {
        if(Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x < 8 && y >= 0 && y < 8) {
            this.storage[y*8+x].accessible = true;
        }
    }

    // перемещает фигуру из одной клетки в другую (если там была фигура - возвращает её)
    public movePiece(from: Square, to: Square): Piece | null {
        const piece = this.getSquarePiece(from.x, from.y);
        if(piece) {
            this.setSquarePiece(from.x, from.y, null);
            const removedPiece = this.getSquarePiece(to.x,to.y);
            this.setSquarePiece(to.x,to.y,piece);
            return removedPiece ? removedPiece : null;
        }
        return null;
    }

    // запускает метод установки доступных клеток для фигуры в указанной клетке 
    public setAccessibleSquares(square: Square): void {
        if(square.piece === null) return;
        square.piece.setAccessibleSquares(square, this);
    }

    // устанавливает все клетки доски в недоступный режим
    public clearAccessibles(): void {
        this.storage.forEach(item => {
                item.accessible = false
            });
    }

    // возврарщает массив клеток
    public getStorage(): Square[] {
        return [...this.storage];
    }

    // возвращает новосозданный объект фигуры(для востановления методов после сохранения)  
    private restorePiece(piece: Piece | null): Piece | null {
        if(piece === null) return null;
        switch(piece.type) {
            case PieceTypes.KING:
                return new King(piece.color);
            case PieceTypes.QUEEN:
                return new Queen(piece.color);
            case PieceTypes.BISHOP:
                return new Bishop(piece.color);
            case PieceTypes.KNIGTH:
                return new Knight(piece.color);
            case PieceTypes.ROOK:
                return new Rook(piece.color);
            case PieceTypes.PAWN:
                return new Pawn(piece.color);
            default:
                return null;
        }
    }

    // восстанавливает клетку и фигуру на ней, возвращает клетку с фигурой (для восстановления после сохранения)
    restoreSquare(square: Square | null | undefined, index: number): Square {
        const y: number = Math.floor(index / 8);
        const x: number = index % 8;
        if(square === null || square === undefined || typeof square.x !== 'number' || typeof square.y !== 'number') { 
            return new Square(x,y);
        } else {
            const newSquare = new Square(square.x, square.y);
            newSquare.piece = this.restorePiece(square.piece);
            return newSquare;
        }
    }
}