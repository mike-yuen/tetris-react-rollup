import { GameState } from "@/interface/GameState";
import { Piece } from "@/interface/piece/Piece";
import { Speed } from "@/interface/Speed";
import { Tile } from "@/interface/tile/Tile";
import { PieceFactory } from "@/factory/PieceFactory";
import { MatrixUtils } from "@/utils/MatrixUtils";

export interface TetrisState {
  matrix: Tile[];
  current: Piece | null;
  next: Piece;
  points: number;
  locked: boolean;
  sound: boolean;
  initSpeed: Speed;
  speed: Speed;
  initLine: number;
  clearedLines: number;
  gameState: GameState;
  saved: TetrisState | null;
  max: number;
}

export const initialTetrisState = (
  pieceFactory: PieceFactory
): TetrisState => ({
  matrix: MatrixUtils.getStartBoard(),
  current: null,
  next: pieceFactory.getRandomPiece(),
  points: 0,
  locked: true,
  sound: true,
  initLine: 0,
  clearedLines: 0,
  initSpeed: 1,
  speed: 1,
  gameState: GameState.Loading,
  saved: null,
  max: 0, // LocalStorageService.maxPoint
});
