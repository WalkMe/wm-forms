import React, { ReactElement } from "react";

export enum ButtonType {
  NoBorder = "no-border",
  None = "none",
  Default = "default",
  Danger = "danger",
  Warning = "warning",
  Help = "help",
  Visited = "visited",
  Completed = "completed",
}

interface IButtonProps {
  id: string;
  className?: string;
  tmButtonType?: ButtonType;
  type?: "button" | "submit" | "reset";
  buttonClicked?: (id: string) => void;
  children: ReactElement;
}

export default function Button(props: IButtonProps) {
  const {
    id,
    tmButtonType = ButtonType.None,
    type = "button",
    children,
    className = "",
    buttonClicked,
  } = props;

  const handleClick = () => {
    if (buttonClicked) {
      buttonClicked(id);
    }
  };

  return (
    <button
      id={`button-${id}`}
      className={`btn ${className} ${tmButtonType}`}
      type={type}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
