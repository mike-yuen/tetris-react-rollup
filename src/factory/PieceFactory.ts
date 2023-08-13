import { Piece } from "@/interface/piece/Piece";
import { PieceI } from "@/interface/piece/types/I";
import { PieceJ } from "@/interface/piece/types/J";
import { PieceL } from "@/interface/piece/types/L";
import { NonePiece } from "@/interface/piece/types/None";
import { PieceO } from "@/interface/piece/types/O";
import { PieceS } from "@/interface/piece/types/S";
import { PieceT } from "@/interface/piece/types/T";
import { PieceZ } from "@/interface/piece/types/Z";

export const SPAWN_POSITION_X = 4;
export const SPAWN_POSITION_Y = -4;

export class PieceFactory {
  private available: (typeof Piece)[] = [];
  private currentBag: (typeof Piece)[] = [];

  constructor() {
    this.available.push(PieceI);
    this.available.push(PieceJ);
    this.available.push(PieceL);
    this.available.push(PieceO);
    this.available.push(PieceS);
    this.available.push(PieceT);
    this.available.push(PieceZ);
  }

  getRandomPiece(x = SPAWN_POSITION_X, y = SPAWN_POSITION_Y): Piece {
    if (this.currentBag.length === 0) {
      this.generateNewBag();
    }
    const nextPiece = this.currentBag.pop()!;
    return new nextPiece(x, y);
  }

  getNonePiece(x = SPAWN_POSITION_X, y = SPAWN_POSITION_Y): Piece {
    return new NonePiece(x, y);
  }

  generateNewBag() {
    this.currentBag = this.available.slice();
    this.shuffleArray(this.currentBag);
  }

  shuffleArray(array: (typeof Piece)[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
