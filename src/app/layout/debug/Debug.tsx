import React, { useContext } from "react";
import { AppContext } from "../../App";

export default function Debug() {
  const appContext = useContext(AppContext);
  const { debugError } = appContext.appState;
  if (Boolean(debugError)) {
    return null;
  }
  return (
    <div
      className="debug"
      style={{
        position: "absolute",
      }}
    >
      <span>{debugError}</span>
    </div>
  );
}
