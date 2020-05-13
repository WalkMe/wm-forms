import React, { useState } from "react";

import Button, { ButtonType } from "../buttons/Button";
import List from "../list/List";
import { IListItem } from "../list/list-item/ListItem";

export default function Dropdown<T>({
  id,
  title,
  items,
  className,
  isOpen,
  isCollapsible = true,
}: {
  id: string;
  title: string;
  items: IListItem<T>[];
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
        <List className="dropdown-list" items={items} />
      </div>
    </div>
  );
}
