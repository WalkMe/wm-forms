import React, { useContext, useEffect, useState, memo } from "react";
import ProgressBar from "../../components/progress-bar/ProgressBar";
import { AppContext } from "../../App";

export default function FooterProgressBar() {
  const { appState } = useContext(AppContext);
  const { percentCompletion } = appState;

  return (
    <footer className="footer">
      <ProgressBar percentCompletion={percentCompletion} showPercentages />
    </footer>
  );
}
