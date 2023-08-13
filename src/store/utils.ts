import { PieceFactory } from "@/factory/PieceFactory";
import { EmptyTile } from "@/interface/tile/EmptyTile";
import { FilledTile } from "@/interface/tile/FilledTile";
import { Tile } from "@/interface/tile/Tile";
import { GameState } from "@/interface/GameState";
import { Speed } from "@/interface/Speed";
import * as soundService from "@/services/sound.services";
import { MatrixUtils } from "@/utils/MatrixUtils";

import { IAppState } from "./interface";

const pieceFactory: PieceFactory = new PieceFactory();

export const updateMatrix = (matrix: Tile[], position: number, tile: Tile) => {
  matrix[position] = tile;
  return matrix;
};

export const loopThroughPiecePosition = (
  state: IAppState,
  callback: Function
) => {
  if (state.current) {
    state.current.positionOnGrid.forEach((position) => {
      callback(position);
    });
  }
};

export const clearPiece = (state: IAppState) => {
  let newMatrix = [...state.matrix];
  state.current = state.current ? state.current.clearStore() : state.current;
  loopThroughPiecePosition(state, (position: number) => {
    newMatrix = updateMatrix(newMatrix, position, new EmptyTile());
  });
  return newMatrix;
};

export const drawPiece = (state: IAppState) => {
  let newMatrix = [...state.matrix];
  state.current = state.current ? state.current.clearStore() : state.current;
  loopThroughPiecePosition(state, (position: number) => {
    const { isSolid } = state.matrix[position];
    const color = state.current?.color;
    newMatrix = updateMatrix(
      newMatrix,
      position,
      new FilledTile(isSolid, color)
    );
  });
  return newMatrix;
};

export const update = (state: IAppState) => {
  if (state.locked) {
    return;
  }

  state.locked = true;
  state.current = state.current ? state.current.revert() : state.current;
  state.matrix = clearPiece(state);
  state.current = state.current ? state.current.store() : state.current;
  state.current = state.current ? state.current.moveDown() : state.current;

  if (isCollidesBottom(state)) {
    state.current = state.current ? state.current.revert() : state.current;
    state.matrix = markAsSolid(state);
    state.matrix = drawPiece(state);
    const { matrix, numberOfClearedLines } = clearFullLines(state);
    if (numberOfClearedLines) {
      const { points, clearedLines, speed } = setPointsAndSpeed(
        state,
        numberOfClearedLines
      );
      state.points = points;
      state.clearedLines = clearedLines;
      state.speed = speed;
    }
    state.matrix = matrix;
    state.current = state.next;
    state.next = pieceFactory.getRandomPiece();
    if (isGameOver(state)) {
      onGameOver();
      state.matrix = MatrixUtils.getStartBoard();
      state.current = null;
      state.next = pieceFactory.getRandomPiece();
      state.points = 0;
      state.locked = true;
      state.sound = true;
      state.initLine = 0;
      state.clearedLines = 0;
      state.initSpeed = 1;
      state.speed = 1;
      state.gameState = GameState.Over;
      state.saved = null;
      state.max = 0;
    }
  }

  state.matrix = drawPiece(state);
  state.locked = false;
};

export const isCollidesBottom = (state: IAppState) => {
  if (state.current && state.current.bottomRow >= MatrixUtils.height) {
    return true;
  }
  return collides(state);
};

export const isCollidesLeft = (state: IAppState) => {
  if (state.current && state.current.leftCol < 0) {
    return true;
  }
  return collides(state);
};

export const isCollidesRight = (state: IAppState) => {
  if (state.current && state.current.rightCol >= MatrixUtils.width) {
    return true;
  }
  return collides(state);
};

export const collides = (state: IAppState): boolean => {
  if (state.current) {
    return state.current.positionOnGrid.some(
      (position: number) => state.matrix[position].isSolid
    );
  }
  return false;
};

export const markAsSolid = (state: IAppState) => {
  let newMatrix = [...state.matrix];
  loopThroughPiecePosition(state, (position: number) => {
    const color = state.matrix[position].color;
    newMatrix = updateMatrix(newMatrix, position, new FilledTile(true, color));
  });
  return newMatrix;
};

export const clearFullLines = (state: IAppState) => {
  let numberOfClearedLines = 0;
  const newMatrix = [...state.matrix];
  for (let row = MatrixUtils.height - 1; row >= 0; row--) {
    const pos = row * MatrixUtils.width;
    const fullRowTiles = newMatrix.slice(pos, pos + MatrixUtils.width);
    const isFullRow = fullRowTiles.every((x) => x.isSolid);
    if (isFullRow) {
      numberOfClearedLines++;
      const topPortion = newMatrix.slice(0, row * MatrixUtils.width);
      newMatrix.splice(
        0,
        ++row * MatrixUtils.width,
        ...MatrixUtils.EmptyRow.concat(topPortion)
      );
    }
  }
  // setPointsAndSpeed(numberOfClearedLines);
  return { matrix: newMatrix, numberOfClearedLines: numberOfClearedLines };
};

export const setPointsAndSpeed = (
  state: IAppState,
  numberOfClearedLines: number
) => {
  soundService.clear();
  const { points, clearedLines, speed, initSpeed } = state;
  const newLines = clearedLines + numberOfClearedLines;
  const newPoints = getPoints(numberOfClearedLines, points);
  const newSpeed = getSpeed(newLines, initSpeed);

  return {
    points: newPoints,
    clearedLines: newLines,
    speed: newSpeed,
  };

  //   if (newSpeed !== speed) {
  //     this._unsubscribe();
  //     this.auto(MatrixUtil.getSpeedDelay(newSpeed));
  //   }
};

export const isGameOver = (state: IAppState) => {
  state.current = state.current?.store();
  state.current = state.current?.moveDown();
  if (isCollidesBottom(state)) {
    return true;
  }
  return false;
};

export const getSpeed = (totalLines: number, initSpeed: number): Speed => {
  const addedSpeed = Math.floor(totalLines / MatrixUtils.height);
  let newSpeed = (initSpeed + addedSpeed) as Speed;
  newSpeed = newSpeed > 6 ? 6 : newSpeed;
  return newSpeed;
};

export const getPoints = (
  numberOfClearedLines: number,
  points: number
): number => {
  const addedPoints = MatrixUtils.points[numberOfClearedLines - 1];
  const newPoints = points + addedPoints;
  return newPoints > MatrixUtils.maxPoint ? MatrixUtils.maxPoint : newPoints;
};

export const onGameOver = () => {
  // this.pause();
  soundService.gameOver();
  // const { points, max, sound } = this._query.raw;
  // const maxPoint = Math.max(points, max);
  // LocalStorageService.setMaxPoint(maxPoint);
  // this._store.update({
  //   ...createInitialState(this._pieceFactory),
  //   max: maxPoint,
  //   gameState: GameState.Over,
  //   sound
  // });
};
