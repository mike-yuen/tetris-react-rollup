import React, { FC, memo } from "react";
import { TetrisAppProps } from "./TetrisApp.types";

import "./TetrisApp.scss";

const TetrisApp: FC<TetrisAppProps> = ({ theme = "light" }) => {
  return (
    <div className={`tr-app tr-app--${theme}`}>
      <div className="tr-app__react">
        <div className="tr-app__view"></div>
        <div className="tr-app__screen"></div>
      </div>
      <div className="tr-app__keyboard"></div>
    </div>
  );
};

export default TetrisApp;
