import React, { useEffect, useRef, ReactElement } from "react";

import { ScreenType } from "../../interfaces/screen/screen.interface";

import useViewManager from "../../hooks/useViewManager";
import { AppAnimation } from "../../interfaces/walkme-app/walkmeApp.interface";

export interface IHeaderProps {
  type?: ScreenType;
  children?: ReactElement;
}

export default function Header(props: IHeaderProps) {
  const { children, type = ScreenType.Default } = props;
  const { animateCoreElements } = useViewManager();
  const innerHeader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (children) {
      animateCoreElements({
        elements: [innerHeader.current],
        animateClassName: AppAnimation.FadeInDown,
        timeout: 300,
      });
    }
  }, [children]);

  return (
    <div className={`header ${type}`}>
      {children && (
        <div ref={innerHeader} className="header-inner topElement">
          {children}
        </div>
      )}
    </div>
  );
}
