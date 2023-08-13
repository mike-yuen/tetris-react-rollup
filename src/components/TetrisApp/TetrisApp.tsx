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
  moveDown,
  moveLeft,
  moveRight,
  rotate,
  start,
} from "@/store/slice";
import { RootState, store } from "@/store/store";
import { MatrixUtils } from "@/utils/MatrixUtils";

import "./TetrisApp.scss";
import { TetrisAppProps } from "./TetrisApp.types";

const Tetris: FC<TetrisAppProps> = ({ theme = "light" }) => {
  const dispatch = useDispatch();
  const { current, initSpeed, next, points, gameState } = useSelector(
    (state: RootState) => state.app
  );

  const handleKeyDown = (event) => {
    const { key } = event;
    switch (key.toLowerCase()) {
      case " ":
        handleSpaceDown();
        break;
      case "arrowleft":
      case "a":
        handleLeftDown();
        break;
      case "arrowright":
      case "d":
        handleRightDown();
        break;
      case "arrowup":
      case "w":
        handleUpDown();
        break;
      case "arrowdown":
      case "s":
        handleDownDown();
        break;
      default:
        break;
    }
  };

  const handleSpaceDown = () => {
    if (current) {
      soundService.fall();
      dispatch(drop());
      return;
    }
    soundService.start();
    dispatch(start());
  };

  const handleLeftDown = () => {
    soundService.move();
    if (current) {
      dispatch(moveLeft());
    } else {
      // this._tetrisService.decreaseLevel();
    }
  };

  const handleUpDown = () => {
    soundService.rotate();
    if (current) {
      dispatch(rotate());
    } else {
      // this._tetrisService.increaseStartLine();
    }
  };

  const handleDownDown = () => {
    soundService.move();
    if (current) {
      dispatch(moveDown());
    } else {
      // this._tetrisService.decreaseStartLine();
    }
  };

  const handleRightDown = () => {
    soundService.move();
    if (current) {
      dispatch(moveRight());
    } else {
      // this._tetrisService.decreaseLevel();
    }
  };

  const onMouseDown = (key: string) => {
    const event = { key };
    handleKeyDown(event);
  };

  const onMouseUp = (key: string) => {};

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(auto({ delay: MatrixUtils.getSpeedDelay(initSpeed) }));
    }, 700);
    return () => clearInterval(interval);
  }, []);

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
              <NextHold next={next} hold={next} theme={theme} />
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
