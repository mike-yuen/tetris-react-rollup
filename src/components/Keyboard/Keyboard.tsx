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
        onMouseDown={() => onMouseDown("arrowup")}
        onMouseUp={() => onMouseUp("arrowup")}
        onTouchStart={() => onMouseDown("arrowup")}
        onTouchEnd={() => onMouseUp("arrowup")}
      />
      <Button
        size={60}
        iconSize={26}
        theme="light"
        type="down"
        onMouseDown={() => onMouseDown("arrowdown")}
        onMouseUp={() => onMouseUp("arrowdown")}
        onTouchStart={() => onMouseDown("arrowdown")}
        onTouchEnd={() => onMouseUp("arrowdown")}
      />
      <Button
        size={60}
        iconSize={26}
        theme="light"
        type="left"
        onMouseDown={() => onMouseDown("arrowleft")}
        onMouseUp={() => onMouseUp("arrowleft")}
        onTouchStart={() => onMouseDown("arrowleft")}
        onTouchEnd={() => onMouseUp("arrowleft")}
      />
      <Button
        size={60}
        iconSize={26}
        theme="light"
        type="right"
        onMouseDown={() => onMouseDown("arrowright")}
        onMouseUp={() => onMouseUp("arrowright")}
        onTouchStart={() => onMouseDown("arrowright")}
        onTouchEnd={() => onMouseUp("arrowright")}
      />
      <Button
        size={120}
        iconSize={32}
        theme="light"
        type="refresh"
        onMouseDown={() => onMouseDown(" ")}
        onMouseUp={() => onMouseUp(" ")}
        onTouchStart={() => onMouseDown(" ")}
        onTouchEnd={() => onMouseUp(" ")}
      />
    </div>
  );
};

export default Keyboard;
