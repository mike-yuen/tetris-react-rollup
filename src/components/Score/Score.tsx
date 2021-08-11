import React, { FC } from "react";

import "./Score.scss";

const Score: FC = () => {
  return (
    <div className="tr-score">
      <div className="tr-score__heading">Score</div>
      <div className="tr-score__board">25</div>
    </div>
  );
};

export default Score;
