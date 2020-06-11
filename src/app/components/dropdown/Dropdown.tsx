import React, { useState, ReactElement } from "react";

import Button, { ButtonType } from "../buttons/Button";

export default function Dropdown<T>({
  id,
  title,
  children,
  className,
  isOpen,
  isCollapsible = true,
}: {
  id: string;
  title: string;
  children: ReactElement;
  className?: string;
  isOpen?: boolean;
  isCollapsible?: boolean;
}) {
  const [open, setOpen] = useState(isOpen);
  const collapsibleClass = isCollapsible ? "collapsible" : "";
  const dropdownToggle = open ? "open" : "close";

  const handlerClicked = () => {
    if (isCollapsible) {
      setOpen((prevOpen) => !prevOpen);
    }
  };

  return (
    <div
      className={`dropdown-wrapper ${className} ${collapsibleClass} ${dropdownToggle}`}
    >
      <header className={`dropdown-handler ${open ? "open" : "close"}`}>
        <Button
          id={id}
          tmButtonType={ButtonType.NoBorder}
          buttonClicked={handlerClicked}
        >
          <h4>{title}</h4>
        </Button>
      </header>
      <div className={`dropdown-items ${open ? "open" : "close"}`}>
        {children}
      </div>
    </div>
  );
}
