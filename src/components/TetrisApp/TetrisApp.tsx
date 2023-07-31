import React, { FC, useCallback, useEffect, useReducer } from "react";
import Keyboard from "@/components/Keyboard/Keyboard";
import Matrix from "@/components/Matrix/Matrix";
import Score from "@/components/Score/Score";
import { PieceFactory } from "@/factory/PieceFactory";
import { GameState } from "@/interface/GameState";
import * as soundService from "@/services/sound.services";
import { TetrisContext } from "@/state/context";
import {
  auto,
  drop,
  moveDown,
  moveLeft,
  moveRight,
  rotate,
  start,
  tetrisReducer,
} from "@/state/reducer";
import { initialTetrisState, TetrisState } from "@/state/state";
import { MatrixUtils } from "@/utils/MatrixUtils";

import Loader from "../Loader/Loader";
import NextHold from "../NextHold/NextHold";
import "./TetrisApp.scss";
import { TetrisAppProps } from "./TetrisApp.types";

const TetrisApp: FC<TetrisAppProps> = ({ theme = "light" }) => {
  const [state, dispatch] = useReducer(
    tetrisReducer,
    initialTetrisState(new PieceFactory())
  );

  const handleKeyDown = useCallback(
    (event) => {
      const { key } = event;
      switch (key.toLowerCase()) {
        case " ":
          handleSpaceDown(state);
          break;
        case "arrowleft":
        case "a":
          handleLeftDown(state);
          break;
        case "arrowright":
        case "d":
          handleRightDown(state);
          break;
        case "arrowup":
        case "w":
          handleUpDown(state);
          break;
        case "arrowdown":
        case "s":
          handleDownDown(state);
          break;
        default:
          break;
      }
    },
    [state]
  );

  const handleSpaceDown = (state: TetrisState) => {
    if (state.current) {
      soundService.fall();
      dispatch(drop());
      return;
    }
    soundService.start();
    dispatch(start());
  };

  const handleLeftDown = (state: TetrisState) => {
    soundService.move();
    if (state.current) {
      dispatch(moveLeft());
    } else {
      // this._tetrisService.decreaseLevel();
    }
  };

  const handleUpDown = (state: TetrisState) => {
    soundService.rotate();
    if (state.current) {
      dispatch(rotate());
    } else {
      // this._tetrisService.increaseStartLine();
    }
  };

  const handleDownDown = (state: TetrisState) => {
    soundService.move();
    if (state.current) {
      dispatch(moveDown());
    } else {
      // this._tetrisService.decreaseStartLine();
    }
  };

  const handleRightDown = (state: TetrisState) => {
    soundService.move();
    if (state.current) {
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
      dispatch(auto(MatrixUtils.getSpeedDelay(state.initSpeed)));
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
    <TetrisContext.Provider value={{ state, dispatch }}>
      <div className={`tr-app tr-app--${theme}`}>
        <div className="tr-app__react">
          <div className="tr-app__view">
            <div className="tr-app__next-hold">
              <NextHold next={state.next} hold={state.next} theme={theme} />
            </div>
            <div className="tr-app__score">
              <Score score={state.points} theme={theme} />
            </div>
          </div>
          <div className="tr-app__screen">
            {state.gameState === GameState.Loading && (
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
    </TetrisContext.Provider>
  );
};

export default TetrisApp;
