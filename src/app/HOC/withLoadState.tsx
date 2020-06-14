import React, { ComponentType, useEffect, useState } from "react";

/**
 * This HOC Wraps the component with animated div class
 */
export default function withLoadState<P extends object>(
  Component: ComponentType<P>,
  loadingTimeOut?: number
): ComponentType<P> {
  return function WithLoadState(props: P) {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadClassName, setLoadClassName] = useState("");

    useEffect(() => {
      setLoadClassName("loading");

      setTimeout(
        () => {
          setIsLoaded(true);
          setIsLoading(false);
          setLoadClassName("loaded");
        },
        loadingTimeOut ? loadingTimeOut * 1000 : 2000
      );

      return () => {
        setIsLoaded(false);
        setIsLoading(true);
        setLoadClassName("");
      };
    }, []);

    return (
      <Component
        loadClasses={loadClassName}
        loadState={{ isLoading, isLoaded }}
        {...(props as P)}
      />
    );
  };
}
