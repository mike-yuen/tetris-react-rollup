import React, { FC } from "react";
import { TileProps } from "./Title.types";

import "./Tile.scss";

const Tile: FC<TileProps> = ({ color, filled, animated }) => {
  return (
    <div
      className={`tr-tile ${color ? `tr-tile--${color}` : ""} ${
        filled ? "tr-tile--filled" : ""
      } ${animated ? "tr-tile--animated" : ""}`}
    ></div>
  );
};

export default Tile;
