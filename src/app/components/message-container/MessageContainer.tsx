import React, { useEffect, useRef } from "react";
import useViewManager from "../../hooks/useViewManager";

export default function MessageContainer({
  message,
  className = "",
  animateConfig,
}: {
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
      <span className="text">{message}</span>
    </div>
  );
}
