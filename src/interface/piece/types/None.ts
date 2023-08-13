import { Piece } from "@/interface/piece/Piece";
import { PieceRotation, PieceTypes } from "@/interface/piece/PieceEnum";
import { Shapes } from "@/interface/piece/Shape";

const NONE_SHAPE: Shapes = [];
NONE_SHAPE[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export class NonePiece extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceTypes.None;
    this.next = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.setShapes(NONE_SHAPE);
  }
}
