import React, { useState, useEffect } from "react";

export function ProgressBar({
  percentCompletion = 0,
  showTitle = false,
  customTitle,
  showPercentages = false,
}: {
  percentCompletion: number;
  showTitle?: boolean;
  customTitle?: string;
  showPercentages?: boolean;
}) {
  const [progressValue, setProgressValue] = useState(percentCompletion);
  const percentages = `${progressValue}%`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(percentCompletion);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setProgressValue(percentCompletion);
  }, [percentCompletion]);

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-info">
        {showTitle && (
          <div className="title">
            <span>{customTitle || "OVERALL PROGRESS"}</span>
          </div>
        )}
        {showPercentages && <span className="percentages">{percentages}</span>}
      </div>
      <div className="progress-bar">
        <div className="value" style={{ width: percentages }}></div>
      </div>
    </div>
  );
}
