import React from "react";

export enum Icon {
  ArrowLeft = "arrow-left",
  Check = "check",
}

export type IconType = Icon;

export default function useIconManager(type: IconType) {
  const getIconByType = (type: IconType) => {
    if (type === Icon.ArrowLeft) {
      return <span className="icon arrow-left"></span>;
    } else if (type === Icon.Check) {
      return <span className="icon check"></span>;
    }
  };

  return getIconByType(type);
}
