import React from "react";
import { ISelectInput } from "../input.interface";

export default function RadioInput(props: ISelectInput) {
  const { id, value, name, className, disabled, checked, handleChange } = props;
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
      <label htmlFor={id}>{value}</label>
    </>
  );
}
