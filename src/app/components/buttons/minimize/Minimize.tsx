import React, { useContext } from "react";

import { AppContext } from "../../../App";

export default function Minimize() {
  const appContext = useContext(AppContext);
  const { walkmeSDK } = appContext;

  const handleClick = (e: any) => {
    e.preventDefault();
    walkmeSDK.platform.closeMe();
  };

  return (
    <a className="minimize" onClick={handleClick}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 20.2 19.4"
      >
        <g id="right">
          <polygon className="st0" points="11,1.8 18.2,9.1 11,9.2" />
          <path className="st1" d="M13,6.9l5.2-5.1" />
        </g>
        <g id="left">
          <polygon className="st0" points="9.3,10.7 2,10.8 9.3,18" />
          <path className="st1" d="M7.1,12.9l-5,5.1" />
        </g>
      </svg>
    </a>
  );
}
