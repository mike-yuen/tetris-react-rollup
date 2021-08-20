import React, { FC } from "react";
import { NextHoldProps } from "./NextHold.types";

import "./NextHold.scss";
import Tile from "../Tile";

const NextHold: FC<NextHoldProps> = ({ next, hold }) => {
  const { next: nextPiece, color } = next;
  return (
    <div className="tr-next-hold">
      <div className="tr-next-hold__heading">
        <div>Next</div>
        <div>Hold</div>
      </div>
      <div className="tr-next-hold__pieces">
        {/* {JSON.stringify(next)} */}
        <div>
          {nextPiece.map((line, index) => (
            <div key={index}>
              {line.map((item, index) => (
                <Tile
                  key={index}
                  color={color}
                  filled={!!item}
                  animated={false}
                  size="sm"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NextHold;
