import React from "react";
import { ISelectInput } from "../input.interface";
import useIconManager from "../../../hooks/useIconManager";

export default function RadioInput(props: ISelectInput) {
  const { getIconByType } = useIconManager();
  const {
    id,
    value,
    name,
    className,
    disabled,
    checked,
    handleChange,
    iconType,
  } = props;
  return (
    <>
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        name={name}
        className={className}
        disabled={disabled}
        onChange={handleChange}
      />
      <label htmlFor={id}>
        <span className="text">
          {iconType && getIconByType(iconType)}
          {value}
        </span>
      </label>
    </>
  );
}
