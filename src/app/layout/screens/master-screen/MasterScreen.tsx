import React, { ReactElement, useRef, useEffect, RefObject } from "react";

import Header from "../../header/Header";
import { ScreenType } from "../../../interfaces/screen/screen.interface";
import useViewManager from "../../../hooks/useViewManager";
import { AppAnimation } from "../../../interfaces/walkme-app/walkmeApp.interface";

export interface IMasterScreenProps {
  className?: string;
  type?: ScreenType;
  header?: ReactElement;
  children: ReactElement;
  isAnimatedScreen?: boolean;
  hideHeader?: boolean;
  scrollForwardedRef?: RefObject<HTMLDivElement>;
}

export interface IScreenAnimationConfig {
  topSection?: number;
  containerMessage?: number;
  options?: number;
  footer?: number;
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
    hideHeader,
    scrollForwardedRef,
  } = props;

  const animatedClass = isAnimatedScreen ? "animated-screen" : "";

  useEffect(() => {
    animateCoreElements({
      elements: [screenContent.current],
      animateClassName: AppAnimation.FadeInUp,
      timeout: 300,
    });
  }, []);

  return (
    <div className={`screen ${type} ${animatedClass} ${className}`}>
      <div ref={scrollForwardedRef} className="screen-scroll-wrapper">
        {!hideHeader && <Header type={type}>{header}</Header>}
        <div ref={screenContent} className="screen-content">
          {children}
        </div>
      </div>
    </div>
  );
}
