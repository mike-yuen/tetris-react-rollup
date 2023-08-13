import { FC, useContext } from "react";
import { useSelector } from "react-redux";

import Tile from "@/components/Tile";
import { RootState } from "@/store/store";

import "./Matrix.scss";
import { MatrixProps } from "./Matrix.types";

const Matrix: FC<MatrixProps> = ({ theme = "light" }) => {
  const { matrix } = useSelector((state: RootState) => state.app);

  return (
    <div className="tr-matrix">
      {matrix.map((item, index) => (
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
