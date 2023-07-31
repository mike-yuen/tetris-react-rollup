import React, { FC, useContext } from "react";
import Tile from "@/components/Tile";
import { TetrisContext } from "@/state/context";

import "./Matrix.scss";
import { MatrixProps } from "./Matrix.types";

const Matrix: FC<MatrixProps> = ({ theme = "light" }) => {
  const { state } = useContext(TetrisContext);

  return (
    <div className="tr-matrix">
      {state.matrix.map((item, index) => (
        <Tile
          key={index}
          color={item.color}
          filled={item.isFilled}
          animated={item.isSolid}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default Matrix;
