import React, { FC } from "react";
import Tile from "@/components/Tile";

import "./Matrix.scss";

const temp = new Array(160);
temp.fill(1);

const Matrix: FC = () => {
  return (
    <div className="tr-matrix">
      {temp.map((item) => (
        <Tile color="green" filled animated />
      ))}
    </div>
  );
};

export default Matrix;
