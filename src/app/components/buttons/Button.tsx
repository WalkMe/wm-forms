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
  disabled?: boolean;
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
    disabled,
  } = props;

  const disabledClass = disabled ? "disabled" : "";

  const handleClick = () => {
    if (buttonClicked) {
      buttonClicked(id);
    }
  };

  return (
    <button
      id={`button-${id}`}
      className={`btn ${tmButtonType} ${disabledClass} ${className}`}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
