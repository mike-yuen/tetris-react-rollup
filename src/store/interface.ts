import { GameState } from "@/interface/GameState";
import { Piece } from "@/interface/piece/Piece";
import { Speed } from "@/interface/Speed";
import { Tile } from "@/interface/tile/Tile";

export interface IAppState {
  matrix: Tile[];
  current: Piece | null | undefined;
  next: Piece;
  hold: Piece;
  canHold: boolean;
  points: number;
  locked: boolean;
  sound: boolean;
  initSpeed: Speed;
  speed: Speed;
  initLine: number;
  clearedLines: number;
  gameState: GameState;
  saved: IAppState | null;
  max: number;
}
