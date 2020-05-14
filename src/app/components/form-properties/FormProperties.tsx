import React, { useContext } from "react";
import pluralize from "pluralize";

import { AppContext } from "../../App";
import useIconManager, { Icon } from "../../hooks/useIconManager";

export default function FormProperties() {
  const { getIconByType } = useIconManager();
  const { appState } = useContext(AppContext);
  const { questions, properties } = appState.form;
  const { passmark } = properties;

  return (
    <div className="form-properties">
      <div className="question-counter">
        {getIconByType(Icon.Question)}
        <span className="text">
          {pluralize("Question", questions.length, true)}
        </span>
      </div>
      {passmark && (
        <div className="passmark-info">
          {getIconByType(Icon.Check)}
          <span className="text">Passmark: {passmark}</span>
        </div>
      )}
    </div>
  );
}
