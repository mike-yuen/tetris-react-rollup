import { Piece } from "@/interface/piece/Piece";
import { Shapes } from "@/interface/piece/Shape";
import { PieceRotation, PieceTypes } from "@/interface/piece/PieceEnum";

const SHAPES_I: Shapes = [];
SHAPES_I[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 1, 1]
];

SHAPES_I[PieceRotation.Deg90] = [
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0]
];

export class PieceI extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceTypes.I;
    this.next = [
      [0, 0, 0, 0],
      [1, 1, 1, 1]
    ];
    this.setShapes(SHAPES_I);
  }
}
