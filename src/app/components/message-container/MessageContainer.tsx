import React, { useEffect, useRef } from "react";
import useViewManager from "../../hooks/useViewManager";

export default function MessageContainer({
  message,
  className = "",
  animateConfig,
  title,
  subTitle,
}: {
  title?: string;
  subTitle?: string;
  message: string;
  className?: string;
  animateConfig?: { animateClass: string; timeout: number };
}) {
  const { animateCoreElements } = useViewManager();
  const ref = useRef<HTMLDivElement>(null);
  const animateClass = animateConfig ? `animate-element` : "";

  useEffect(() => {
    if (animateConfig) {
      animateCoreElements({
        elements: [ref.current],
        animateClassName: animateConfig.animateClass,
        timeout: animateConfig.timeout,
      });
    }
  }, []);

  return (
    <div ref={ref} className={`container-message ${className} ${animateClass}`}>
      {title && <h3 className="title">{title}</h3>}
      {subTitle && <span className="sub-title bold">{subTitle}</span>}
      <p className="text">{message}</p>
    </div>
  );
}
