/* eslint-disable no-shadow */
export enum PieceRotation {
  Deg0,
  Deg90,
  Deg180,
  Deg270,
}

export enum PieceTypes {
  Dot = "Dot",
  O = "O",
  I = "I",
  T = "T",
  L = "L",
  J = "J",
  Z = "Z",
  S = "S",
}

export enum Color {
  "red",
  "yellow",
  "blue",
  "green",
  "cyan",
}

export const randomEnumKey = (enumeration: any) => {
  const keys = Object.keys(enumeration).filter(
    (k) => !(Math.abs(Number.parseInt(k)) + 1)
  );
  const enumKey = keys[Math.floor(Math.random() * keys.length)];
  return enumKey;
};
/* eslint-enable no-shadow */
