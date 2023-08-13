import { FC, memo } from "react";
import { ButtonProps, IconProps } from "./Button.types";

import "./Button.scss";

const iconPaths: { [key: string]: string } = {
  /* prettier-ignore */
  up: "M120.266,95.584c5.301-5.801,4.801-14.801-0.8-20.301l-47.3-47.4c-2.8-2.8-6.5-4.2-10.2-4.2s-7.399,1.4-10.2,4.2 l-47.299,47.3c-5.5,5.5-6.1,14.6-0.8,20.3c5.6,6.101,15.099,6.3,20.9,0.5l30.3-30.3c3.899-3.9,10.2-3.9,14.1,0l30.3,30.3 C105.167,101.883,114.667,101.684,120.266,95.584z",
  /* prettier-ignore */
  down: "M51.802,96.062c2.801,2.801,6.5,4.2,10.2,4.2s7.4-1.399,10.2-4.2l47.3-47.3c5.5-5.5,6.101-14.6,0.8-20.3 c-5.6-6.1-15.1-6.3-20.899-0.5l-30.4,30.3c-3.899,3.9-10.2,3.9-14.1,0l-30.3-30.3c-5.801-5.8-15.301-5.7-20.9,0.5 c-5.3,5.7-4.8,14.8,0.8,20.3L51.802,96.062z",
  /* prettier-ignore */
  left: "M96.059,24.603c5.799-5.801,5.699-15.301-0.5-20.9c-5.801-5.3-14.801-4.8-20.301,0.8l-47.4,47.3 c-2.8,2.801-4.2,6.5-4.2,10.2s1.4,7.4,4.2,10.2l47.3,47.3c5.5,5.5,14.6,6.101,20.3,0.8c6.101-5.6,6.3-15.1,0.5-20.899l-30.2-30.3 c-3.9-3.9-3.9-10.2,0-14.101L96.059,24.603z",
  /* prettier-ignore */
  right: "M27.961,99.367c-5.8,5.8-5.7,15.3,0.5,20.899c5.8,5.301,14.8,4.801,20.3-0.8l47.3-47.3c2.8-2.8,4.2-6.5,4.2-10.2 s-1.4-7.399-4.2-10.2l-47.2-47.3c-5.5-5.5-14.6-6.1-20.3-0.8c-6.1,5.6-6.3,15.1-0.5,20.9l30.2,30.399c3.9,3.9,3.9,10.2,0,14.101 L27.961,99.367z",
  /* prettier-ignore */
  refresh: "M446.709,166.059c-4.698-7.51-14.73-9.243-21.724-4.043l-48.677,36.519c-6.094,4.585-7.793,13.023-3.926,19.6 C384.73,239.156,391,261.656,391,285.02C391,359.464,330.443,422,256,422s-135-62.536-135-136.98 c0-69.375,52.588-126.68,120-134.165v44.165c0,12.434,14.266,19.357,23.994,11.997l120-90c8.006-5.989,7.994-18.014,0-23.994 l-120-90C255.231-4.37,241,2.626,241,15.02v45.498C123.9,68.267,31,166.001,31,285.02C31,409.093,131.928,512,256,512 s225-102.907,225-226.98C481,243.038,469.135,201.905,446.709,166.059z",
};

const Icon: FC<IconProps> = ({ type, size, color }) => {
  const viewBox = type === "refresh" ? 512 : 124;
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox={`0 0 ${viewBox} ${viewBox}`}
      fill={color}
    >
      <path d={iconPaths[type]} />
    </svg>
  );
};

const Button: FC<ButtonProps> = ({
  size = 32,
  iconSize = 18,
  theme = "light",
  type,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
}) => {
  const iconColor = theme === "light" ? "#023f76" : "#edeae9";
  return (
    <button
      className={`tr-button tr-button--${theme}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="children">
        <Icon type={type} size={iconSize} color={iconColor} />
      </div>
    </button>
  );
};

export default memo(Button);
