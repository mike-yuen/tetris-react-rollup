import { Piece } from "@/interface/piece/Piece";
import { Shapes } from "@/interface/piece/shape";
import { PieceRotation, PieceTypes } from "@/interface/piece/PieceEnum";

const SHAPES_S: Shapes = [];
SHAPES_S[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 0, 0],
];

SHAPES_S[PieceRotation.Deg90] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [1, 1, 0, 0],
];

export class PieceS extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceTypes.S;
    this.next = [
      [0, 1, 1, 0],
      [1, 1, 0, 0],
    ];
    this.setShapes(SHAPES_S);
  }
}
