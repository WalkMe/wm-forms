import React, { useEffect, useRef, ReactElement, useState } from "react";
import { config } from "../../config";
import useViewManager from "../../hooks/useViewManager";
import { ScreenType } from "../../interfaces/screen/screen.interface";

export interface IHeaderProps {
  type?: ScreenType;
  children?: ReactElement;
}

export default function Header(props: IHeaderProps) {
  const { children, type = ScreenType.Default } = props;
  const { animateCoreElements } = useViewManager();
  const [headerPosition, setHeaderPosition] = useState("");
  const innerHeader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (children) {
      animateCoreElements({
        elements: [innerHeader.current],
        animateClassName: "fadeInDown",
        timeout: 300,
      });

      // header position - depend on header content height
      const headerHeight = innerHeader.current.offsetHeight;
      setHeaderPosition(
        headerHeight > config.formHeaderMaxHeight ? "static" : "sticky"
      );
    }
  }, [children]);

  return (
    <div className={`header ${type} ${headerPosition}`}>
      {children && (
        <div ref={innerHeader} className="header-inner topElement">
          {children}
        </div>
      )}
    </div>
  );
}
