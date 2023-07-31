import React, { FC } from "react";
import { ScoreProps } from "./Score.types";

import "./Score.scss";

const Score: FC<ScoreProps> = ({ score, theme }) => {
  return (
    <div className={`tr-score tr-score--${theme}`}>
      <div className="tr-score__heading">Score</div>
      <div className="tr-score__board">{score}</div>
    </div>
  );
};

export default Score;
