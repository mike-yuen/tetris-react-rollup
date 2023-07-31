import { Piece } from "@/interface/piece/Piece";
import { Shape } from "@/interface/piece/shape";

export interface NextHoldProps {
  next: Piece;
  hold: Piece;
  theme: "light" | "dark";
}

export interface PreviewPieceProps {
  piece: Shape;
  color: string;
  theme: "light" | "dark";
}
