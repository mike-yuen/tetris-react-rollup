import React, { FC } from "react";
import { TileProps } from "./Title.types";

import "./Tile.scss";

const Tile: FC<TileProps> = ({ color, filled, animated, size, theme }) => {
  return (
    <div
      className={`tr-tile  tr-tile--${theme} ${color ? `tr-tile--${color}` : ""} ${
        filled ? "tr-tile--filled" : ""
      } ${animated ? "tr-tile--animated" : ""} ${
        size === "sm" ? "tr-tile--sm" : ""
      }`}
    ></div>
  );
};

export default Tile;
