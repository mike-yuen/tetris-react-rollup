import React, { FC, useCallback, useEffect, useReducer } from "react";
import Keyboard from "@/components/Keyboard/Keyboard";
import Matrix from "@/components/Matrix/Matrix";
import Score from "@/components/Score/Score";
import { PieceFactory } from "@/factory/PieceFactory";
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
import { TetrisAppProps } from "./TetrisApp.types";
import sound from "../../assets/tetris-sound.mp3";

import "./TetrisApp.scss";

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
    // this._keyboardService.setKeỵ({
    //   drop: true
    // });
    if (state.current) {
      // this._soundManager.fall();
      dispatch(drop());
      return;
    }
    // this._soundManager.start();
    dispatch(start());
  };

  const handleLeftDown = (state: TetrisState) => {
    // this._soundManager.move();
    // this._keyboardService.setKeỵ({
    //   left: true
    // });
    if (state.current) {
      dispatch(moveLeft());
    } else {
      // this._tetrisService.decreaseLevel();
    }
  };

  const handleUpDown = (state: TetrisState) => {
    // this._soundManager.rotate();
    // this._keyboardService.setKeỵ({
    //   up: true
    // });
    if (state.current) {
      dispatch(rotate());
    } else {
      // this._tetrisService.increaseStartLine();
    }
  };

  const handleDownDown = (state: TetrisState) => {
    // this._soundManager.move();
    // this._keyboardService.setKeỵ({
    //   down: true
    // });
    if (state.current) {
      dispatch(moveDown());
    } else {
      // this._tetrisService.decreaseStartLine();
    }
  };

  const handleRightDown = (state: TetrisState) => {
    // this._soundManager.move();
    // this._keyboardService.setKeỵ({
    //   left: true
    // });
    if (state.current) {
      dispatch(moveRight());
    } else {
      // this._tetrisService.decreaseLevel();
    }
  };

  const onMouseDown = (data: string) => {
    // console.log("down: ", data);
    dispatch(moveLeft());
  };

  const onMouseUp = (data: string) => {
    // console.log("up: ", data);
  };

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

  const audioTune = new Audio(sound);
  useEffect(() => {
    audioTune.load();
    console.log("===== ", audioTune.duration);
  }, []);

  const playSound = () => {
    audioTune.play();
  };

  // pause audio sound
  const pauseSound = () => {
    audioTune.pause();
  };

  return (
    <TetrisContext.Provider value={{ state, dispatch }}>
      <button onClick={playSound}>Play</button>
      <button onClick={pauseSound}>Pause</button>
      <div className={`tr-app tr-app--${theme}`}>
        <div className="tr-app__react">
          <div className="tr-app__view">
            <div className="tr-app__next-hold"></div>
            <div className="tr-app__score">
              <Score />
            </div>
          </div>
          <div className="tr-app__screen">
            <Matrix />
          </div>
        </div>
        <div className="tr-app__keyboard">
          <Keyboard onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
        </div>
      </div>
    </TetrisContext.Provider>
  );
};

export default TetrisApp;
