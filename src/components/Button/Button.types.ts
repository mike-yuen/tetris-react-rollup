import { ReactNode } from "react";

export interface ButtonProps {
  children?: ReactNode;
  size: number;
  theme: "light" | "dark";
  type: "up" | "down" | "left" | "right" | "refresh",
  onClick?: () => void;
}

export interface IconProps {
  type: string;
  size?: number;
  color?: string;
}
