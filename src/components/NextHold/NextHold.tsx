import React, { FC, Fragment } from "react";
import { NextHoldProps, PreviewPieceProps } from "./NextHold.types";

import "./NextHold.scss";
import Tile from "../Tile";

const PreviewPiece: FC<PreviewPieceProps> = ({ piece, color, theme }) => {
  if (piece[0].length === 4 && piece[0][3] === 0 && piece[1][3] === 0) {
    piece[0].pop();
    piece[1].pop();
  }
  if (piece[0].length === 3 && piece[0][0] === 0 && piece[1][0] === 0) {
    piece[0].shift();
    piece[1].shift();
  }
  return (
    <Fragment>
      {piece.map((line, index) => (
        <div key={index}>
          {line.map((item, index) => (
            <Tile
              key={index}
              color={color}
              filled={!!item}
              animated={false}
              size="sm"
              theme={theme}
            />
          ))}
        </div>
      ))}
    </Fragment>
  );
};

const NextHold: FC<NextHoldProps> = ({ next, hold, theme }) => {
  const { next: nextPiece, color } = next;
  return (
    <div className={`tr-next-hold tr-next-hold--${theme}`}>
      <div className="tr-next-hold__heading">
        <div>Next</div>
        <div>Hold</div>
      </div>
      <div className="tr-next-hold__pieces">
        <div className="tr-next-hold__next">
          <PreviewPiece piece={nextPiece} color={color} theme={theme} />
        </div>
        <div className="tr-next-hold__hold">
          <PreviewPiece piece={nextPiece} color={color} theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default NextHold;
