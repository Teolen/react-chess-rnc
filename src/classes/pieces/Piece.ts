import { Chess } from "../Chess";
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

    // проверка другой фигуры на врага
    public isEnemy(another: Piece): boolean {
        return this.color !== another.color;
    }

    // проверка другой фигуры на союзника
    public isAlly(another: Piece) {
        return this.color === another.color;
    }
    
    // устанавливает горизонтальную доступность для фигуры в указанной клетке: для Ладьи(Туры) и Ферзя(Королевы)
    protected setAccessibleHorizontal(fromSquare: Square, chess: Chess) {
        const x = fromSquare.x;
        const y = fromSquare.y;

        for(let forX = x+1; forX < 8; forX++) {
            let targetSquare = chess.getSquare(forX, y);
            if(targetSquare) {
                if(targetSquare.piece) {
                    if(this.isEnemy(targetSquare.piece)) {
                        chess.setAccessible(forX, y);
                    }
                    break;
                } else {
                    chess.setAccessible(forX, y);
                }
            } else {
                break;
            }
        }
        for(let forX = x-1; forX >= 0; forX--) {
            let targetSquare = chess.getSquare(forX, y);
            if(targetSquare) {
                if(targetSquare.piece) {
                    if(this.isEnemy(targetSquare.piece)) {
                        chess.setAccessible(forX, y);
                    }
                    break;
                } else {
                    chess.setAccessible(forX, y);
                }
            } else {
                break;
            }
        }
    }

    // устанавливает веритикальную доступность для фигуры в указанной клетке: для Ладьи(Туры) и Ферзя(Королевы) 
    protected setAccessibleVertical(fromSquare: Square, chess: Chess) {
        const x = fromSquare.x;
        const y = fromSquare.y;

        for(let forY = y+1; forY < 8; forY++) {
            let targetSquare = chess.getSquare(x, forY);
            if(targetSquare) {
                if(targetSquare.piece) {
                    if(this.isEnemy(targetSquare.piece)) {
                        chess.setAccessible(x,forY);
                    }
                    break;
                } else {
                    chess.setAccessible(x ,forY);
                }
            } else {
                break;
            }
        }
        for(let forY = y-1; forY >= 0; forY--) {
            let targetSquare = chess.getSquare(x, forY);
            if(targetSquare) {
                if(targetSquare.piece) {
                    if(this.isEnemy(targetSquare.piece)) {
                        chess.setAccessible(x, forY);
                    }
                    break;
                } else {
                    chess.setAccessible(x, forY);
                }
            } else {
                break;
            }
        }
    }    

    // устанавливает диагональную доступность для фигуры в указанной клетке: Слона и Ферзя(Королевы)
    protected setAccessibleDiagonal(fromSquare: Square, chess: Chess) {
        const x = fromSquare.x;
        const y = fromSquare.y;

        for(let forX = x+1, forY = y+1; forX < 8 && forY < 8 ; forX++, forY++) {
            let targetSquare = chess.getSquare(forX, forY);
            if(targetSquare) {
                if(targetSquare.piece) {
                    if(this.isEnemy(targetSquare.piece)) {
                        chess.setAccessible(forX,forY);
                    }
                    break;
                } else {
                    chess.setAccessible(forX ,forY);
                }
            } else {
                break;
            }
        }   
        for(let forX = x-1, forY = y+1; forX >= 0 && forY < 8; forX--, forY++) {
            let targetSquare = chess.getSquare(forX, forY);
            if(targetSquare) {
                if(targetSquare.piece) {
                    if(this.isEnemy(targetSquare.piece)) {
                        chess.setAccessible(forX,forY);
                    }
                    break;
                } else {
                    chess.setAccessible(forX ,forY);
                }
            } else {
                break;
            }
        }   
        for(let forX = x+1, forY = y-1; forX < 8 && forY >= 0; forX++, forY--) {
            let targetSquare = chess.getSquare(forX, forY);
            if(targetSquare) {
                if(targetSquare.piece) {
                    if(this.isEnemy(targetSquare.piece)) {
                        chess.setAccessible(forX,forY);
                    }
                    break;
                } else {
                    chess.setAccessible(forX ,forY);
                }
            } else {
                break;
            }
        }   
        for(let forX = x-1, forY = y-1; forX >=0 && forY >= 0; forX--, forY--) {
            let targetSquare = chess.getSquare(forX, forY);
            if(targetSquare) {
                if(targetSquare.piece) {
                    if(this.isEnemy(targetSquare.piece)) {
                        chess.setAccessible(forX,forY);
                    }
                    break;
                } else {
                    chess.setAccessible(forX ,forY);
                }
            } else {
                break;
            }
        }   
    }

    // Общее правило: если не установлены остальные. Переопределяется в наследниках
    public setAccessibleSquares(fromSquare: Square, chess: Chess): void {
        chess.storage = chess.storage.map(elem => {
            if(fromSquare.piece !== null && (elem.piece === null || elem.piece?.color !== fromSquare.piece.color)) {
                elem.accessible = true;
            }
            return elem;
        });
    }
}