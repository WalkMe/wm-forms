import React from "react";
import { ISelectInput } from "../input.interface";
import useIconManager, { Icon } from "../../../hooks/useIconManager";

export default function CheckboxInput(props: ISelectInput) {
  const { getIconByType } = useIconManager();
  const { id, value, name, className, disabled, checked, handleChange } = props;
  return (
    <>
      <input
        type="checkbox"
        id={id}
        value={value}
        checked={checked}
        name={name}
        className={className}
        disabled={disabled}
        onChange={handleChange}
      />
      <label htmlFor={id}>
        <span className="selection-icon">
          {checked && getIconByType(Icon.Check)}
        </span>
        <span className="text">
          <span className="icon"></span>
          {value}
        </span>
      </label>
    </>
  );
}
