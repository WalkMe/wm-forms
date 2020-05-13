import React, { ReactElement } from "react";
import Header from "../../header/Header";
import { ScreenType } from "../../../interfaces/screen/screen.interface";

export interface IMasterScreenProps {
  className?: string;
  type?: ScreenType;
  header?: ReactElement;
  children: ReactElement;
}

export default function MasterScreen(props: IMasterScreenProps) {
  const { className = "", header, children, type = ScreenType.Default } = props;
  return (
    <div className={`screen ${type} ${className}`}>
      <Header type={type}>{header}</Header>
      <div className="screen-content">{children}</div>
    </div>
  );
}
