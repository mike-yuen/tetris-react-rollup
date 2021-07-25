import { ReactNode } from "react";

export interface ButtonProps {
  children?: ReactNode;
  size: string;
  theme: "primary" | "secondary";
  onClick?: () => void;
}
