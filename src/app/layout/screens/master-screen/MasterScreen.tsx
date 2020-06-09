import React, { ReactElement, useRef, useState, useEffect } from "react";

import { config } from "../../../config";
import Header from "../../header/Header";
import { ScreenType } from "../../../interfaces/screen/screen.interface";
import { ProgressBar } from "../../../components/progress-bar/ProgressBar";
import useViewManager from "../../../hooks/useViewManager";

export interface IMasterScreenProps {
  className?: string;
  type?: ScreenType;
  header?: ReactElement;
  children: ReactElement;
  isAnimatedScreen?: boolean;
  percentCompletion?: number;
}

export default function MasterScreen(props: IMasterScreenProps) {
  const { animateCoreElements } = useViewManager();
  const screenContent = useRef<HTMLDivElement>(null);
  const {
    className = "",
    isAnimatedScreen,
    header,
    children,
    type = ScreenType.Default,
    percentCompletion = 0,
  } = props;

  const animatedClass = isAnimatedScreen ? "animated-screen" : "";

  useEffect(() => {
    animateCoreElements({
      elements: [screenContent.current],
      animateClassName: "fadeInUp",
      timeout: 300,
    });
  }, []);

  return (
    <div className={`screen ${type} ${animatedClass} ${className}`}>
      <div className="screen-scroll-wrapper">
        <Header type={type}>{header}</Header>
        <div ref={screenContent} className="screen-content">
          {children}
        </div>
      </div>
      <footer className={`footer ${type}`}>
        <ProgressBar percentCompletion={percentCompletion} showPercentages />
      </footer>
    </div>
  );
}
