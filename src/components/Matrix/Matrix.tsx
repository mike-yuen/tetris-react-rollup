import React, { FC, useContext } from "react";
import Tile from "@/components/Tile";
import { TetrisContext } from "@/state/context";

import "./Matrix.scss";

const Matrix: FC = () => {
  const { state } = useContext(TetrisContext);

  return (
    <div className="tr-matrix">
      {state.matrix.map((item, index) => (
        <Tile
          key={index}
          color={item.color}
          filled={item.isFilled}
          animated={item.isSolid}
        />
      ))}
    </div>
  );
};

export default Matrix;
