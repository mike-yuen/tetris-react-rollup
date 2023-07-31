export interface TileProps {
  // "blue" | "cyan" | "green" | "purple" | "red" | "yellow"
  color: string | undefined;
  filled: boolean;
  animated: boolean;
  size?: string;
  theme: "light" | "dark";
}
