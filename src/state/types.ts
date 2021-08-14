import { GameState } from "@/interface/GameState";
import { Piece } from "@/interface/piece/Piece";
import { Speed } from "@/interface/Speed";
import { Tile } from "@/interface/tile/Tile";
import { TetrisState } from "./state";

export enum ActionType {
  Start,
  SetMatrix,
  SetCurrent,
  SetNext,
  SetPoints,
  SetLocked,
  SetSound,
  SetInitSpeed,
  SetSpeed,
  SetInitLine,
  SetClearedLines,
  SetGameState,
  SetSaved,
  SetMax,
}

export interface Start {
  type: ActionType.Start;
  payload: TetrisState;
}

export interface SetMatrix {
  type: ActionType.SetMatrix;
  payload: Tile[];
}

export interface SetCurrent {
  type: ActionType.SetCurrent;
  payload: Piece | null;
}

export interface SetNext {
  type: ActionType.SetNext;
  payload: Piece;
}

export interface SetPoints {
  type: ActionType.SetPoints;
  payload: number;
}

export interface SetLocked {
  type: ActionType.SetLocked;
  payload: boolean;
}

export interface SetSound {
  type: ActionType.SetSound;
  payload: boolean;
}

export interface SetInitSpeed {
  type: ActionType.SetInitSpeed;
  payload: Speed;
}

export interface SetSpeed {
  type: ActionType.SetSpeed;
  payload: Speed;
}

export interface SetInitLine {
  type: ActionType.SetInitLine;
  payload: number;
}

export interface SetClearedLines {
  type: ActionType.SetClearedLines;
  payload: number;
}

export interface SetGameState {
  type: ActionType.SetGameState;
  payload: GameState;
}

export interface SetSaved {
  type: ActionType.SetSaved;
  payload: TetrisState | null;
}

export interface SetMax {
  type: ActionType.SetMax;
  payload: number;
}

export type TetrisActions =
  | Start
  | SetMatrix
  | SetCurrent
  | SetNext
  | SetPoints
  | SetLocked
  | SetSound
  | SetInitSpeed
  | SetSpeed
  | SetInitLine
  | SetClearedLines
  | SetGameState
  | SetSaved
  | SetMax;
