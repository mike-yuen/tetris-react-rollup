import React, { FC } from "react";
import { KeyboardProps } from "./Keyboard.types";
import Button from "@/components/Button";

import "./Keyboard.scss";

const Keyboard: FC<KeyboardProps> = ({ onMouseDown, onMouseUp }) => {
  return (
    <div className="tr-keyboard">
      <Button
        size={32}
        theme="light"
        type="up"
        onMouseDown={onMouseDown("up")}
        onMouseUp={onMouseUp("up")}
        onTouchStart={onMouseDown("up")}
        onTouchEnd={onMouseUp("up")}
      />
    </div>
  );
};

export default Keyboard;
