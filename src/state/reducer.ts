import { TetrisState } from "./state";
import { ActionType, SetMax, TetrisActions } from "./actions";

export function tetrisReducer(
  state: TetrisState,
  action: TetrisActions
): TetrisState {
  switch (action.type) {
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

export const setMax = (max: number): SetMax => ({
  type: ActionType.SetMax,
  payload: max,
});
