import { TetrisState } from "./state";
import { ActionType, Start, TetrisActions } from "./types";
import { MatrixUtils } from "@/utils/MatrixUtils";
import { GameState } from "@/interface/GameState";
import {
  setCurrent,
  setGameState,
  setMatrix,
  setNext,
  setPoints,
  setSpeed,
} from "./actions";
import { PieceFactory } from "@/factory/PieceFactory";

const pieceFactory: PieceFactory = new PieceFactory();

export function tetrisReducer(
  state: TetrisState,
  action: TetrisActions
): TetrisState {
  switch (action.type) {
    case ActionType.Start:
      return action.payload;
    case ActionType.SetMatrix:
      return { ...state, matrix: action.payload };
    case ActionType.SetCurrent:
      return { ...state, current: action.payload };
    case ActionType.SetNext:
      return { ...state, next: action.payload };
    case ActionType.SetPoints:
      return { ...state, points: action.payload };
    case ActionType.SetLocked:
      return { ...state, locked: action.payload };
    case ActionType.SetSound:
      return { ...state, sound: action.payload };
    case ActionType.SetInitSpeed:
      return { ...state, initSpeed: action.payload };
    case ActionType.SetSpeed:
      return { ...state, speed: action.payload };
    case ActionType.SetInitLine:
      return { ...state, initLine: action.payload };
    case ActionType.SetClearedLines:
      return { ...state, clearedLines: action.payload };
    case ActionType.SetGameState:
      return { ...state, gameState: action.payload };
    case ActionType.SetSaved:
      return { ...state, saved: action.payload };
    case ActionType.SetMax:
      return { ...state, max: action.payload };
    default:
      return state;
  }
}

export const start = (state: TetrisState): Start => {
  const newState: TetrisState = Object.assign({}, state);
  if (!state.current) {
    newState.current = state.next;
    newState.next = pieceFactory.getRandomPiece();
  }
  const { initLine, initSpeed } = state;

  newState.points = 190;
  newState.gameState = GameState.Started;
  newState.matrix = MatrixUtils.getStartBoard(initLine);
  newState.speed = initSpeed;

  return { type: ActionType.Start, payload: newState };

  // this._unsubscribe();
  // this.auto(MatrixUtil.getSpeedDelay(initSpeed));
  // this._setLocked(false);
};
