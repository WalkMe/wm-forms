import React from "react";

export enum Icon {
  Check = "check",
  Success = "success",
  Error = "error",
  Close = "close",
  Question = "question",
  ArrowLeft = "arrow-left",
  ArrowRight = "arrow-right",
}

export type IconType = Icon;

export default function useIconManager(): {
  getIconByType: (type: IconType) => JSX.Element;
} {
  const getIcon = (type: IconType): JSX.Element => {
    return type && <span className={`icon ${type}`}></span>;
  };

  return {
    getIconByType: (type: IconType) => {
      return getIcon(type);
    },
  };
}
