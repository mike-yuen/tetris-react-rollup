import React, { FC } from "react";
import { TileProps } from "./Title.types";

import "./Tile.scss";

const Tile: FC<TileProps> = ({ color, filled, animated, size }) => {
  return (
    <div
      className={`tr-tile ${color ? `tr-tile--${color}` : ""} ${
        filled ? "tr-tile--filled" : ""
      } ${animated ? "tr-tile--animated" : ""} ${
        size === "sm" ? "tr-tile--sm" : ""
      }`}
    ></div>
  );
};

export default Tile;
