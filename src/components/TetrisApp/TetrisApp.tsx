import React, { FC, useReducer } from "react";
import Keyboard from "@/components/Keyboard/Keyboard";
import Matrix from "@/components/Matrix/Matrix";
import Score from "@/components/Score/Score";
import { PieceFactory } from "@/factory/PieceFactory";
import { TetrisContext } from "@/state/context";
import { setMax, tetrisReducer } from "@/state/reducer";
import { initialTetrisState } from "@/state/state";
import { TetrisAppProps } from "./TetrisApp.types";

import "./TetrisApp.scss";

const onMouseDown = (data: string) => {
  console.log("down: ", data);
};

const onMouseUp = (data: string) => {
  console.log("up: ", data);
};

const TetrisApp: FC<TetrisAppProps> = ({ theme = "light" }) => {
  const [state, dispatch] = useReducer(
    tetrisReducer,
    initialTetrisState(new PieceFactory())
  );

  const increaseMax = (number: number) => {
    console.log("number: ", number);
    dispatch(setMax(number));
  };

  return (
    <TetrisContext.Provider value={{ state, dispatch }}>
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
