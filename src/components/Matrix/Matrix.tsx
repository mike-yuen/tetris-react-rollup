import React, { FC } from "react";
import Tile from "@/components/Tile";

import "./Matrix.scss";

const temp = new Array(160);
temp.fill(1);

// const getMatrix = () => {
//   return combineLatest([this._tetrisQuery.gameState$, this._tetrisQuery.matrix$]).pipe(
//     untilDestroyed(this),
//     switchMap(([gameState, matrix]) => {
//       if (gameState !== GameState.Over && gameState !== GameState.Loading) {
//         return of(matrix);
//       }
//       const newMatrix = [...matrix];
//       const rowsLength = MatrixUtil.Height * 2;
//       const animatedMatrix$: Observable<Tile[]> = timer(0, rowsLength).pipe(
//         map((x) => x + 1),
//         takeWhile((x) => x <= rowsLength + 1),
//         switchMap((idx) => {
//           const gridIndex = idx - 1;
//           if (gridIndex < MatrixUtil.Height) {
//             newMatrix.splice(
//               gridIndex * MatrixUtil.Width,
//               MatrixUtil.Width,
//               ...MatrixUtil.FullRow
//             );
//           }
//           if (gridIndex > MatrixUtil.Height && gridIndex <= rowsLength) {
//             const startIdx =
//               (MatrixUtil.Height - (gridIndex - MatrixUtil.Height)) * MatrixUtil.Width;
//             newMatrix.splice(startIdx, MatrixUtil.Width, ...MatrixUtil.EmptyRow);
//           }

//           return of(newMatrix);
//         })
//       );
//       return animatedMatrix$;
//     })
//   );
// }

const Matrix: FC = () => {
  return (
    <div className="tr-matrix">
      {temp.map((item) => (
        <Tile color="purple" filled={true} animated />
      ))}
    </div>
  );
};

export default Matrix;
