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
  Link = "link",
}

interface IButtonProps {
  id: string;
  className?: string;
  tmButtonType?: ButtonType;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  buttonClicked?: (id: string) => void;
  children: ReactElement;
  loading?: boolean;
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
    loading,
  } = props;

  const loadingClass = loading ? "loading" : "";
  const handleClick = () => {
    if (buttonClicked) {
      buttonClicked(id);
    }
  };

  return (
    <button
      id={`button-${id}`}
      className={`btn ${tmButtonType} ${loadingClass} ${className}`}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
