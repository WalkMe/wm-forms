import React, { useEffect, useRef, ReactElement } from "react";

import useViewManager from "../../hooks/useViewManager";
import { ScreenType } from "../../interfaces/screen/screen.interface";

export interface IHeaderProps {
  type?: ScreenType;
  children?: ReactElement;
}

export default function Header(props: IHeaderProps) {
  const { children, type = ScreenType.Default } = props;
  const { animateCoreElements } = useViewManager();
  const innerHeader = useRef();

  useEffect(() => {
    if (children) {
      animateCoreElements({
        elements: [innerHeader.current],
        animateClassName: "fadeInDown",
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
