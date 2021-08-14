import { GameState } from "@/interface/GameState";
import { Piece } from "@/interface/piece/Piece";
import { Speed } from "@/interface/Speed";
import { Tile } from "@/interface/tile/Tile";
import { TetrisState } from "./state";
import {
  ActionType,
  SetClearedLines,
  SetCurrent,
  SetGameState,
  SetInitLine,
  SetInitSpeed,
  SetLocked,
  SetMatrix,
  SetMax,
  SetNext,
  SetPoints,
  SetSaved,
  SetSound,
  SetSpeed,
} from "./types";

export const setMatrix = (tiles: Tile[]): SetMatrix => ({
  type: ActionType.SetMatrix,
  payload: tiles,
});

export const setCurrent = (piece: Piece | null): SetCurrent => ({
  type: ActionType.SetCurrent,
  payload: piece,
});

export const setNext = (piece: Piece): SetNext => ({
  type: ActionType.SetNext,
  payload: piece,
});

export const setPoints = (points: number): SetPoints => ({
  type: ActionType.SetPoints,
  payload: points,
});

export const setLocked = (isLocked: boolean): SetLocked => ({
  type: ActionType.SetLocked,
  payload: isLocked,
});

export const setSound = (sound: boolean): SetSound => ({
  type: ActionType.SetSound,
  payload: sound,
});

export const setInitSpeed = (speed: Speed): SetInitSpeed => ({
  type: ActionType.SetInitSpeed,
  payload: speed,
});

export const setSpeed = (speed: Speed): SetSpeed => ({
  type: ActionType.SetSpeed,
  payload: speed,
});

export const setInitLine = (line: number): SetInitLine => ({
  type: ActionType.SetInitLine,
  payload: line,
});

export const setClearedLines = (lines: number): SetClearedLines => ({
  type: ActionType.SetClearedLines,
  payload: lines,
});

export const setGameState = (gameState: GameState): SetGameState => ({
  type: ActionType.SetGameState,
  payload: gameState,
});

export const setSaved = (saved: TetrisState | null): SetSaved => ({
  type: ActionType.SetSaved,
  payload: saved,
});

export const setMax = (max: number): SetMax => ({
  type: ActionType.SetMax,
  payload: max,
});
