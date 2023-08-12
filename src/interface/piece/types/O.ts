import { Piece } from "@/interface/piece/Piece";
import { Shapes } from "@/interface/piece/Shape";
import { PieceRotation, PieceTypes } from "@/interface/piece/PieceEnum";

const SHAPES_O: Shapes = [];
SHAPES_O[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [1, 1, 0, 0],
];

export class PieceO extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceTypes.O;
    this.next = [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
    ];
    this.setShapes(SHAPES_O);
  }
}
