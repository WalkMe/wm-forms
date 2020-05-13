import React, { ReactElement } from "react";
import ListItem, { IListItem, IItemComponentProps } from "./list-item/ListItem";

export default function List<T>({
  className,
  itemClassName,
  items,
  onSelect,
  itemComponent,
  type = "",
}: {
  className?: string;
  itemClassName?: string;
  type?: string;
  items: IListItem<T>[];
  onSelect?: (selected: IListItem<T>) => void;
  itemComponent?: (props?: IItemComponentProps<T>) => ReactElement;
}) {
  return (
    <ul className={`list ${type} ${className}`}>
      {items.map((item) => {
        return (
          <ListItem
            key={`list-item-${type}-${item.id}`}
            item={item}
            className={itemClassName}
            onSelect={onSelect}
            itemComponent={itemComponent}
            state={item.state}
          />
        );
      })}
    </ul>
  );
}
