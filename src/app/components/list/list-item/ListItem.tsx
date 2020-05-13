import React, { ReactElement, useContext } from "react";

import useListItemManager from "../../../hooks/useListItemManager";
import { AppContext } from "../../../App";

export interface IItemComponentProps<T> {
  onSelect: () => void;
  item: IListItem<T>;
}

export interface IListItem<T> {
  id: string;
  courseId?: string;
  title: string;
  subTitle?: string;
  description?: string;
  link?: string;
  clickable?: boolean;
  useWalkMeSdk?: boolean;
  state?: string;
  data?: T;
  disabledMsg?: string;
  tasks?: IListItem<{}>[];
  primaryBtn?: {
    label: string;
  };
}

export interface IListItemProps<T> {
  item: IListItem<T>;
  className?: string;
  state?: string;
  onSelect?: (selected: IListItem<T>) => void;
  itemComponent?: (props?: IItemComponentProps<T>) => ReactElement;
}

export default function ListItem<T>({
  item,
  className = "",
  onSelect,
  state,
  itemComponent,
}: IListItemProps<T>) {
  const { walkmeSDK } = useContext(AppContext);
  const { handleListItemClick } = useListItemManager(walkmeSDK);
  const { title, subTitle, primaryBtn } = item;

  const stateClass = state || "";
  const itemContent = (
    <>
      <header>
        <span className="title">
          <span className="text">{title}</span>
        </span>
        {subTitle && <span className="sub-title">{subTitle}</span>}
      </header>
    </>
  );

  const listItemClick = () => {
    if (onSelect) {
      onSelect(item);
    } else {
      handleListItemClick(item);
    }
  };

  if (itemComponent) {
    return (
      <li className={`list-item ${className} ${stateClass}`}>
        {itemComponent({
          onSelect: listItemClick,
          item,
        })}
      </li>
    );
  }

  return (
    <li className={`list-item ${className}`}>
      <div className={`item ${stateClass}`}>
        <article className="item-info">
          <div
            className="item-handler"
            onClick={() => {
              if (!item.primaryBtn) {
                listItemClick();
              }
            }}
          >
            {itemContent}
          </div>
          {primaryBtn && (
            <footer>
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  listItemClick();
                }}
              >
                {primaryBtn.label}
              </button>
            </footer>
          )}
        </article>
      </div>
    </li>
  );
}
