import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { GameState } from "@/interface/GameState";
import { PieceFactory } from "@/factory/PieceFactory";
import { MatrixUtils } from "@/utils/MatrixUtils";

import { IAppState } from "./interface";
import {
  clearPiece,
  drawPiece,
  isCollidesBottom,
  isCollidesLeft,
  isCollidesRight,
  update,
} from "./utils";

const appState = (pieceFactory: PieceFactory): IAppState => ({
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
  max: 0,
});

const pieceFactory: PieceFactory = new PieceFactory();

const appSlice = createSlice({
  name: "app",
  initialState: appState(new PieceFactory()),
  reducers: {
    start(state: IAppState) {
      if (!state.current) {
        state.current = state.next;
        state.next = pieceFactory.getRandomPiece();
      }
      const { initLine, initSpeed } = state;
      state.points = 0;
      state.gameState = GameState.Started;
      state.matrix = MatrixUtils.getStartBoard(initLine);
      state.speed = initSpeed;
      state.locked = false;
    },

    auto(state: IAppState, action: PayloadAction<{ delay: number }>) {
      const { delay } = action.payload;
      update(state);
    },

    moveLeft(state: IAppState) {
      if (state.locked) {
        return;
      }
      state.matrix = clearPiece(state);
      state.current = state.current?.store();
      state.current = state.current?.moveLeft();
      if (isCollidesLeft(state)) {
        state.current = state.current?.revert();
      }
      state.matrix = drawPiece(state);
    },

    moveRight(state: IAppState) {
      if (state.locked) {
        return;
      }
      state.matrix = clearPiece(state);
      state.current = state.current?.store();
      state.current = state.current?.moveRight();
      if (isCollidesRight(state)) {
        state.current = state.current?.revert();
      }
      state.matrix = drawPiece(state);
      return state;
    },

    moveDown(state: IAppState) {
      update(state);
    },

    rotate(state: IAppState) {
      if (state.locked) {
        return;
      }
      state.matrix = clearPiece(state);
      state.current = state.current?.store();
      state.current = state.current?.rotate();
      while (isCollidesRight(state)) {
        state.current = state.current?.moveLeft();
        if (isCollidesLeft(state)) {
          state.current = state.current?.revert();
          break;
        }
      }
      state.matrix = drawPiece(state);
    },

    drop(state: IAppState) {
      if (state.locked) {
        return;
      }
      while (!isCollidesBottom(state)) {
        state.matrix = clearPiece(state);
        state.current = state.current?.store();
        state.current = state.current?.moveDown();
      }
      state.current = state.current?.revert();
      state.matrix = drawPiece(state);
    },
  },
});

export const { start, auto, moveLeft, moveRight, moveDown, rotate, drop } =
  appSlice.actions;
export default appSlice.reducer;
