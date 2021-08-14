import React, { FC, useContext } from "react";
import { KeyboardProps } from "./Keyboard.types";
import Button from "@/components/Button";

import "./Keyboard.scss";

const Keyboard: FC<KeyboardProps> = ({ onMouseDown, onMouseUp }) => {
  return (
    <div className="tr-keyboard">
      <Button
        size={60}
        iconSize={26}
        theme="light"
        type="up"
        onMouseDown={() => onMouseDown("up")}
        onMouseUp={() => onMouseUp("up")}
        onTouchStart={() => onMouseDown("up")}
        onTouchEnd={() => onMouseUp("up")}
      />
      <Button
        size={60}
        iconSize={26}
        theme="light"
        type="down"
        onMouseDown={() => onMouseDown("down")}
        onMouseUp={() => onMouseUp("down")}
        onTouchStart={() => onMouseDown("down")}
        onTouchEnd={() => onMouseUp("down")}
      />
      <Button
        size={60}
        iconSize={26}
        theme="light"
        type="left"
        onMouseDown={() => onMouseDown("left")}
        onMouseUp={() => onMouseUp("left")}
        onTouchStart={() => onMouseDown("left")}
        onTouchEnd={() => onMouseUp("left")}
      />
      <Button
        size={60}
        iconSize={26}
        theme="light"
        type="right"
        onMouseDown={() => onMouseDown("right")}
        onMouseUp={() => onMouseUp("right")}
        onTouchStart={() => onMouseDown("right")}
        onTouchEnd={() => onMouseUp("right")}
      />
      <Button
        size={120}
        iconSize={32}
        theme="light"
        type="refresh"
        onMouseDown={() => onMouseDown("space")}
        onMouseUp={() => onMouseUp("space")}
        onTouchStart={() => onMouseDown("space")}
        onTouchEnd={() => onMouseUp("space")}
      />
    </div>
  );
};

export default Keyboard;
