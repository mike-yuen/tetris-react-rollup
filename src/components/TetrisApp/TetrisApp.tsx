import { FC, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import Keyboard from "@/components/Keyboard/Keyboard";
import Loader from "@/components/Loader/Loader";
import Matrix from "@/components/Matrix/Matrix";
import NextHold from "@/components/NextHold/NextHold";
import Score from "@/components/Score/Score";
import { GameState } from "@/interface/GameState";
import * as soundService from "@/services/sound.services";
import {
  auto,
  drop,
  holdPiece,
  moveDown,
  moveLeft,
  moveRight,
  pause,
  resume,
  rotate,
  start,
} from "@/store/slice";
import { RootState, store } from "@/store/store";
import { MatrixUtils } from "@/utils/MatrixUtils";

import "./TetrisApp.scss";
import { TetrisAppProps } from "./TetrisApp.types";
import { TetrisKeyboard } from "@/interface/Keyboard";

let tickInterval: NodeJS.Timer | null = null;

const Tetris: FC<TetrisAppProps> = ({ theme = "light" }) => {
  const dispatch = useDispatch();
  const { current, initSpeed, next, hold, points, gameState, speed } =
    useSelector((state: RootState) => state.app);

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    switch (key.toLowerCase() as TetrisKeyboard) {
      case TetrisKeyboard.Space:
        handleSpace();
        break;
      case TetrisKeyboard.ArrowLeft:
      case TetrisKeyboard.A:
        handleLeft();
        break;
      case TetrisKeyboard.ArrowRight:
      case TetrisKeyboard.D:
        handleRight();
        break;
      case TetrisKeyboard.ArrowUp:
      case TetrisKeyboard.W:
        handleUp();
        break;
      case TetrisKeyboard.ArrowDown:
      case TetrisKeyboard.S:
        handleDown();
        break;
      case TetrisKeyboard.P:
        handlePause();
        break;
      case TetrisKeyboard.C:
        handleHold();
        break;
      default:
        break;
    }
  };

  const handleSpace = () => {
    if (current) {
      soundService.fall();
      dispatch(drop());
      return;
    }
    soundService.start();
    tickInterval = setInterval(() => {
      dispatch(auto());
    }, MatrixUtils.getSpeedDelay(initSpeed));
    dispatch(start());
  };

  const handleLeft = () => {
    soundService.move();
    if (current) {
      dispatch(moveLeft());
    } else {
      // this._tetrisService.decreaseLevel();
    }
  };

  const handleUp = () => {
    soundService.rotate();
    if (current) {
      dispatch(rotate());
    } else {
      // this._tetrisService.increaseStartLine();
    }
  };

  const handleDown = () => {
    soundService.move();
    if (current) {
      dispatch(moveDown());
    } else {
      // this._tetrisService.decreaseStartLine();
    }
  };

  const handleRight = () => {
    soundService.move();
    if (current) {
      dispatch(moveRight());
    } else {
      // this._tetrisService.decreaseLevel();
    }
  };

  const handlePause = () => {
    soundService.move();
    if (gameState !== GameState.Started) {
      dispatch(resume());
      tickInterval = setInterval(() => {
        dispatch(auto());
      }, MatrixUtils.getSpeedDelay(speed));
    } else {
      if (tickInterval) {
        clearInterval(tickInterval);
        // tickInterval = null;
      }
      dispatch(pause());
    }
  };

  const handleHold = () => {
    soundService.move();
    dispatch(holdPiece());
  };

  const onMouseDown = (key: string) => {
    const event = { key } as KeyboardEvent;
    handleKeyDown(event);
  };

  const onMouseUp = (key: string) => {};

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Provider store={store}>
      <div className={`tr-app tr-app--${theme}`}>
        <div className="tr-app__react">
          <div className="tr-app__view">
            <div className="tr-app__next-hold">
              <NextHold next={next} hold={hold} theme={theme} />
            </div>
            <div className="tr-app__score">
              <Score score={points} theme={theme} />
            </div>
          </div>
          <div className="tr-app__screen">
            {gameState === GameState.Loading && (
              <div className="tr-app__loader">
                <Loader />
                <p>Press "Space" to start</p>
              </div>
            )}
            <Matrix theme={theme} />
          </div>
        </div>
        <div className="tr-app__keyboard">
          <Keyboard
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            theme={theme}
          />
        </div>
      </div>
    </Provider>
  );
};

const TetrisApp: FC<TetrisAppProps> = ({ theme = "light" }) => {
  return (
    <Provider store={store}>
      <Tetris theme={theme}></Tetris>
    </Provider>
  );
};

export default TetrisApp;
