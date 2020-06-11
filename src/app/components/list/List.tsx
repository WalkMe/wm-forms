import React, { ReactElement } from "react";

export default function List({
  className,
  children,
}: {
  className?: string;
  children: ReactElement;
}) {
  return <ul className={`list ${className}`}>{children}</ul>;
}
