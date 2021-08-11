import React, { FC } from "react";
import { TetrisAppProps } from "./TetrisApp.types";
import Keyboard from "@/components/Keyboard/Keyboard";

import "./TetrisApp.scss";

const onMouseDown = (data: string) => {
  console.log("down: ", data);
};

const onMouseUp = (data: string) => {
  console.log("up: ", data);
};

const TetrisApp: FC<TetrisAppProps> = ({ theme = "light" }) => {
  return (
    <div className={`tr-app tr-app--${theme}`}>
      <div className="tr-app__react">
        <div className="tr-app__view"></div>
        <div className="tr-app__screen"></div>
      </div>
      <div className="tr-app__keyboard">
        <Keyboard onMouseDown={() => onMouseDown} onMouseUp={() => onMouseUp} />
      </div>
    </div>
  );
};

export default TetrisApp;
