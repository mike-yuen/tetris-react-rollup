import { ReactNode } from "react";

export interface ButtonProps {
  children?: ReactNode;
  size: number;
  iconSize?: number;
  theme: "light" | "dark";
  type: "up" | "down" | "left" | "right" | "refresh",
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
}

export interface IconProps {
  type: string;
  size?: number;
  color?: string;
}
