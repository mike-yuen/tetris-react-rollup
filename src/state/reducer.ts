import { initialTetrisState, TetrisState } from "./state";
import {
  ActionType,
  Auto,
  Drop,
  MoveDown,
  MoveLeft,
  MoveRight,
  Rotate,
  Start,
  TetrisActions,
} from "./actions";
import { MatrixUtils } from "@/utils/MatrixUtils";
import { GameState } from "@/interface/GameState";
import { PieceFactory } from "@/factory/PieceFactory";
import { Tile } from "@/interface/tile/Tile";
import { EmptyTile } from "@/interface/tile/EmptyTile";
import { FilledTile } from "@/interface/tile/FilledTile";
import * as soundService from "@/services/sound.services";
import { Speed } from "@/interface/Speed";

const pieceFactory: PieceFactory = new PieceFactory();

export function tetrisReducer(
  state: TetrisState,
  action: TetrisActions
): TetrisState {
  switch (action.type) {
    case ActionType.Start:
      return startReducer(state);
    case ActionType.Auto:
      return autoReducer(state);
    case ActionType.MoveLeft:
      return moveLeftReducer(state);
    case ActionType.MoveRight:
      return moveRightReducer(state);
    case ActionType.MoveDown:
      return moveDownReducer(state);
    case ActionType.Rotate:
      return rotateReducer(state);
    case ActionType.Drop:
      return dropReducer(state);
    default:
      return state;
  }
}

const startReducer = (state: TetrisState): TetrisState => {
  const newState: TetrisState = Object.assign({}, state);
  if (!state.current) {
    newState.current = state.next;
    newState.next = pieceFactory.getRandomPiece();
  }
  const { initLine, initSpeed } = state;

  newState.points = 0;
  newState.gameState = GameState.Started;
  newState.matrix = MatrixUtils.getStartBoard(initLine);
  newState.speed = initSpeed;

  // this._unsubscribe();
  // auto(MatrixUtils.getSpeedDelay(initSpeed));
  newState.locked = false;
  return newState;
};

const autoReducer = (state: TetrisState): TetrisState => {
  const newState: TetrisState = Object.assign({}, state);
  return update(newState);
};

const moveLeftReducer = (state: TetrisState): TetrisState => {
  const newState: TetrisState = Object.assign({}, state);
  if (state.locked) {
    return state;
  }
  newState.matrix = clearPiece(newState);
  newState.current = newState.current?.store();
  newState.current = newState.current?.moveLeft();
  if (isCollidesLeft(newState)) {
    newState.current = newState.current?.revert();
  }
  newState.matrix = drawPiece(newState);
  return newState;
};

const moveRightReducer = (state: TetrisState): TetrisState => {
  const newState: TetrisState = Object.assign({}, state);
  if (state.locked) {
    return state;
  }
  newState.matrix = clearPiece(newState);
  newState.current = newState.current?.store();
  newState.current = newState.current?.moveRight();
  if (isCollidesRight(newState)) {
    newState.current = newState.current?.revert();
  }
  newState.matrix = drawPiece(newState);
  return newState;
};

const moveDownReducer = (state: TetrisState): TetrisState => {
  const newState: TetrisState = Object.assign({}, state);
  return update(newState);
};

export const rotateReducer = (state: TetrisState): TetrisState => {
  const newState: TetrisState = Object.assign({}, state);
  if (state.locked) {
    return state;
  }
  newState.matrix = clearPiece(newState);
  newState.current = newState.current?.store();
  newState.current = newState.current?.rotate();
  while (isCollidesRight(newState)) {
    newState.current = newState.current?.moveLeft();
    if (isCollidesLeft(newState)) {
      newState.current = newState.current?.revert();
      break;
    }
  }
  newState.matrix = drawPiece(newState);
  return newState;
};

export const dropReducer = (state: TetrisState): TetrisState => {
  const newState: TetrisState = Object.assign({}, state);
  if (state.locked) {
    return state;
  }
  while (!isCollidesBottom(newState)) {
    newState.matrix = clearPiece(newState);
    newState.current = newState.current?.store();
    newState.current = newState.current?.moveDown();
  }
  newState.current = newState.current?.revert();
  newState.matrix = drawPiece(newState);
  return newState;
};

export const start = (): Start => {
  return { type: ActionType.Start, payload: null };
};

export const auto = (delay: number): Auto => {
  return { type: ActionType.Auto, payload: delay };
};

export const moveLeft = (): MoveLeft => {
  return { type: ActionType.MoveLeft, payload: null };
};

export const moveRight = (): MoveRight => {
  return { type: ActionType.MoveRight, payload: null };
};

export const moveDown = (): MoveDown => {
  return { type: ActionType.MoveDown, payload: null };
};

export const rotate = (): Rotate => {
  return { type: ActionType.Rotate, payload: null };
};

export const drop = (): Drop => {
  return { type: ActionType.Drop, payload: null };
};

/** Private helper functions */

const updateMatrix = (matrix: Tile[], position: number, tile: Tile) => {
  matrix[position] = tile;
  return matrix;
};

const loopThroughPiecePosition = (state: TetrisState, callback: Function) => {
  if (state.current) {
    state.current.positionOnGrid.forEach((position) => {
      callback(position);
    });
  }
};

const clearPiece = (state: TetrisState) => {
  let newMatrix = [...state.matrix];
  state.current = state.current ? state.current.clearStore() : state.current; //
  loopThroughPiecePosition(state, (position: number) => {
    newMatrix = updateMatrix(newMatrix, position, new EmptyTile());
  });
  return newMatrix;
};

const drawPiece = (state: TetrisState) => {
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

const update = (state: TetrisState): TetrisState => {
  if (state.locked) {
    return state;
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
      state = {
        ...initialTetrisState(pieceFactory),
        gameState: GameState.Over,
      };
      return state;
    }
  }

  state.matrix = drawPiece(state);
  state.locked = false;
  return state;
};

const isCollidesBottom = (state: TetrisState): boolean => {
  if (state.current && state.current.bottomRow >= MatrixUtils.height) {
    return true;
  }
  return collides(state);
};

const isCollidesLeft = (state: TetrisState): boolean => {
  if (state.current && state.current.leftCol < 0) {
    return true;
  }
  return collides(state);
};

const isCollidesRight = (state: TetrisState): boolean => {
  if (state.current && state.current.rightCol >= MatrixUtils.width) {
    return true;
  }
  return collides(state);
};

const collides = (state: TetrisState): boolean => {
  if (state.current) {
    return state.current.positionOnGrid.some(
      (position: number) => state.matrix[position].isSolid
    );
  }
  return false;
};

const markAsSolid = (state: TetrisState): Tile[] => {
  let newMatrix = [...state.matrix];
  loopThroughPiecePosition(state, (position: number) => {
    const color = state.matrix[position].color;
    newMatrix = updateMatrix(newMatrix, position, new FilledTile(true, color));
  });
  return newMatrix;
};

const clearFullLines = (
  state: TetrisState
): { matrix: Tile[]; numberOfClearedLines: number } => {
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

const setPointsAndSpeed = (
  state: TetrisState,
  numberOfClearedLines: number
): {
  points: number;
  clearedLines: number;
  speed: Speed;
} => {
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

const isGameOver = (state: TetrisState): boolean => {
  state.current = state.current?.store();
  state.current = state.current?.moveDown();
  if (isCollidesBottom(state)) {
    return true;
  }
  return false;
};

const getSpeed = (totalLines: number, initSpeed: number): Speed => {
  const addedSpeed = Math.floor(totalLines / MatrixUtils.height);
  let newSpeed = (initSpeed + addedSpeed) as Speed;
  newSpeed = newSpeed > 6 ? 6 : newSpeed;
  return newSpeed;
};

const getPoints = (numberOfClearedLines: number, points: number): number => {
  const addedPoints = MatrixUtils.points[numberOfClearedLines - 1];
  const newPoints = points + addedPoints;
  return newPoints > MatrixUtils.maxPoint ? MatrixUtils.maxPoint : newPoints;
};

const onGameOver = () => {
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
