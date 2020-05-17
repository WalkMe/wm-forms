import React from "react";

export enum Icon {
  ArrowLeft = "arrow-left",
  Check = "check",
  Question = "question",
}

export type IconType = Icon;

export default function useIconManager(): {
  getIconByType: (type: IconType) => JSX.Element;
} {
  const getIcon = (type: IconType): JSX.Element => {
    if (type === Icon.ArrowLeft) {
      return <span className="icon arrow-left"></span>;
    } else if (type === Icon.Check) {
      return <span className="icon check"></span>;
    } else if (type === Icon.Question) {
      return <span className="icon question"></span>;
    }
  };

  return {
    getIconByType: (type: IconType) => {
      return getIcon(type);
    },
  };
}
