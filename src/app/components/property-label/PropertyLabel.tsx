import React, { ReactElement } from "react";
import useIconManager, { IconType } from "../../hooks/useIconManager";

interface IPropertyLabelProps {
  className: string;
  iconType?: IconType;
  children: ReactElement;
}

export default function PropertyLabel(props: IPropertyLabelProps) {
  const { getIconByType } = useIconManager();
  const { children, className = "", iconType } = props;
  return (
    <div className={className}>
      {iconType && getIconByType(iconType)}
      {children}
    </div>
  );
}
