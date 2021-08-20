import React, { FC } from "react";
import { ScoreProps } from "./Score.types";

import "./Score.scss";

const Score: FC<ScoreProps> = ({ score }) => {
  return (
    <div className="tr-score">
      <div className="tr-score__heading">Score</div>
      <div className="tr-score__board">{score}</div>
    </div>
  );
};

export default Score;
