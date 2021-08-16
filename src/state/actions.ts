export enum ActionType {
  Start,
  Auto,
  MoveLeft,
  MoveRight,
  MoveDown,
  Rotate,
  Drop,
}

export interface Start {
  type: ActionType.Start;
  payload: any;
}

export interface Auto {
  type: ActionType.Auto;
  payload: number;
}

export interface MoveLeft {
  type: ActionType.MoveLeft;
  payload: any;
}

export interface MoveRight {
  type: ActionType.MoveRight;
  payload: any;
}

export interface MoveDown {
  type: ActionType.MoveDown;
  payload: any;
}

export interface Rotate {
  type: ActionType.Rotate;
  payload: any;
}

export interface Drop {
  type: ActionType.Drop;
  payload: any;
}

export type TetrisActions =
  | Start
  | Auto
  | MoveLeft
  | MoveRight
  | MoveDown
  | Rotate
  | Drop;
