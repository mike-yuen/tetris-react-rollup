import { MatrixUtils } from "@/utils/MatrixUtils";
import { PieceRotation, PieceTypes, Color, randomEnumKey } from "./PieceEnum";
import { Shape, Shapes } from "./Shape";

export class Piece {
  x: number;
  y: number;
  rotation = PieceRotation.Deg0;
  type: PieceTypes;
  shape: Shape;
  next: Shape;
  color: string = randomEnumKey(Color);

  private _shapes: Shapes;
  private lastConfig: Partial<Piece> | null;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  store(): Piece {
    this.lastConfig = {
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      shape: this.shape,
      color: this.color,
    };
    return this._newPiece();
  }

  clearStore(): Piece {
    this.lastConfig = null;
    return this._newPiece();
  }

  revert(): Piece {
    if (this.lastConfig) {
      for (const key in this.lastConfig) {
        if (this.lastConfig.hasOwnProperty(key)) {
          this[key] = this.lastConfig[key];
        }
      }
      this.lastConfig = null;
    }
    return this._newPiece();
  }

  rotate(): Piece {
    const keys = Object.keys(this._shapes);
    const idx = keys.indexOf(this.rotation.toString());
    const isTurnOver = idx >= keys.length - 1;
    this.rotation = Number(isTurnOver ? keys[0] : keys[idx + 1]);
    this.shape = this._shapes[this.rotation];
    return this._newPiece();
  }

  reset(): Piece {
    this.rotation = PieceRotation.Deg0;
    this.shape = this._shapes[this.rotation];
    return this._newPiece();
  }

  moveDown(step = 1): Piece {
    this.y = this.y + step;
    return this._newPiece();
  }

  moveRight(): Piece {
    this.x++;
    return this._newPiece();
  }

  moveLeft(): Piece {
    this.x--;
    return this._newPiece();
  }

  isNone(): boolean {
    return this.type === PieceTypes.None;
  }

  get positionOnGrid(): number[] {
    const positions: number[] = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.shape[row][col]) {
          const position = (this.y + row) * MatrixUtils.width + this.x + col;
          if (position >= 0) {
            positions.push(position);
          }
        }
      }
    }
    return positions;
  }

  get bottomRow() {
    return this.y + 3;
  }

  get rightCol() {
    let col = 3;
    while (col >= 0) {
      for (let row = 0; row <= 3; row++) {
        if (this.shape[row][col]) {
          return this.x + col;
        }
      }
      col--;
    }
    return col;
  }

  get leftCol() {
    return this.x;
  }

  protected setShapes(shapes: Shapes) {
    this._shapes = shapes;
    this.shape = shapes[this.rotation];
  }

  private _newPiece(): Piece {
    const piece = new Piece(this.x, this.y);
    piece.rotation = this.rotation;
    piece.type = this.type;
    piece.next = this.next;
    piece.setShapes(this._shapes);
    piece.color = this.color;
    piece.lastConfig = this.lastConfig;
    return piece;
  }
}
