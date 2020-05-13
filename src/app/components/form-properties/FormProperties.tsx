import React, { useContext } from "react";
import pluralize from "pluralize";

import { AppContext } from "../../App";

export default function FormProperties() {
  const { appState } = useContext(AppContext);
  const { questions, properties } = appState.form;
  const { passmark } = properties;

  return (
    <div className="form-properties">
      <div className="question-counter">
        <span className="text">
          {pluralize("question", questions.length, true)}
        </span>
      </div>
      {passmark && (
        <div className="passmark-info">
          <span className="text">Passmark: {passmark}</span>
        </div>
      )}
    </div>
  );
}
