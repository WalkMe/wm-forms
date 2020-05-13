import React from "react";

export default function MessageContainer({
  message,
  className = "disabled-message",
}: {
  message: string;
  className: string;
}) {
  return (
    <div className={`container-message ${className}`}>
      <span className="text">{message}</span>
    </div>
  );
}
