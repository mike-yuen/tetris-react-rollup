import React from "react";
import { PieceFactory } from "@/factory/PieceFactory";
import { TetrisState, initialTetrisState } from "./state";
import { TetrisActions } from "./types";

export const TetrisContext = React.createContext<{
  state: TetrisState;
  dispatch: React.Dispatch<TetrisActions>;  
}>({
  state: initialTetrisState(new PieceFactory),
  dispatch: () => undefined,
});
