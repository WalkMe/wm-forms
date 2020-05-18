import React from "react";
import useIconManager, { IconType } from "../../hooks/useIconManager";

interface IPropertyLabelProps {
  label: string;
  value: string | number;
  className: string;
  iconType?: IconType;
}

export default function PropertyLabel(props: IPropertyLabelProps) {
  const { getIconByType } = useIconManager();
  const { label, value, className = "", iconType } = props;
  return (
    <div className={className}>
      {iconType && getIconByType(iconType)}
      <span className="text">
        {label} {value}
      </span>
    </div>
  );
}
