import React, { FC } from "react";

import "./Loader.scss";

const Loader: FC = () => {
  return (
    <div className="wrapper">
      <div className="block mover"></div>
      <div className="block jumper"></div>
      <div className="block jumper"></div>
      <div className="block jumper"></div>
    </div>
  );
};

export default Loader;
