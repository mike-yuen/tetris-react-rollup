import React, { FC, useReducer } from "react";
import Keyboard from "@/components/Keyboard/Keyboard";
import Matrix from "@/components/Matrix/Matrix";
import Score from "@/components/Score/Score";
import { PieceFactory } from "@/factory/PieceFactory";
import { TetrisContext } from "@/state/context";
import { start, tetrisReducer } from "@/state/reducer";
import { initialTetrisState } from "@/state/state";
import { TetrisAppProps } from "./TetrisApp.types";

import "./TetrisApp.scss";

document.addEventListener("keydown", (event) => {
  let code: number = event.keyCode || event.which;
  console.log("----- keycode: ", code);
});

const TetrisApp: FC<TetrisAppProps> = ({ theme = "light" }) => {
  const [state, dispatch] = useReducer(
    tetrisReducer,
    initialTetrisState(new PieceFactory())
  );

  const startGame = () => {
    dispatch(start(state));
  };

  const onMouseDown = (data: string) => {
    // console.log("down: ", data);
    startGame();
  };

  const onMouseUp = (data: string) => {
    // console.log("up: ", data);
  };

  return (
    <TetrisContext.Provider value={{ state, dispatch }}>
      <div className={`tr-app tr-app--${theme}`}>
        <div className="tr-app__react">
          <div className="tr-app__view">
            <div className="tr-app__next-hold">{state.points}</div>
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
