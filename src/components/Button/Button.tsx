import React, { FC, memo } from "react";

export interface ButtonProps {
  text: string;
}

const Button: FC<ButtonProps> = ({ text }) => {
  return <button>{text}</button>;
};

export default memo(Button);
