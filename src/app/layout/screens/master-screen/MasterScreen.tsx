import React, { ReactElement } from "react";
import Header from "../../header/Header";
import { ScreenType } from "../../../interfaces/screen/screen.interface";

export interface IMasterScreenProps {
  className?: string;
  type?: ScreenType;
  children: ReactElement;
}

export default function MasterScreen(props: IMasterScreenProps) {
  const { className = "", children, type = ScreenType.Default } = props;
  return (
    <div className={`screen ${type} ${className}`}>
      <Header type={type} />
      <div className="screen-content">{children}</div>
    </div>
  );
}
