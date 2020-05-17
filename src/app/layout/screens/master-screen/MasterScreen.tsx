import React, { ReactElement, useEffect, useState } from "react";
import Header from "../../header/Header";
import { ScreenType } from "../../../interfaces/screen/screen.interface";
import { ProgressBar } from "../../../components/progress-bar/ProgressBar";
import { IFormContext } from "../form-screen/FormScreen";

export interface IMasterScreenProps {
  className?: string;
  type?: ScreenType;
  header?: ReactElement;
  children: ReactElement;
  isAnimatedScreen?: boolean;
  percentCompletion?: number;
}

export default function MasterScreen(props: IMasterScreenProps) {
  const {
    className = "",
    isAnimatedScreen,
    header,
    children,
    type = ScreenType.Default,
    percentCompletion = 0,
  } = props;
  const animatedClass = isAnimatedScreen ? "animated-screen" : "";

  return (
    <div className={`screen ${type} ${animatedClass} ${className}`}>
      <Header type={type}>{header}</Header>
      <div className="screen-content">{children}</div>
      <footer className={`footer ${type}`}>
        <ProgressBar percentCompletion={percentCompletion} showPercentages />
      </footer>
    </div>
  );
}
