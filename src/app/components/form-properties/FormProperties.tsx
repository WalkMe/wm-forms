import React, { useContext, ReactElement } from "react";
import pluralize from "pluralize";

import { AppContext } from "../../App";
import useIconManager, { Icon } from "../../hooks/useIconManager";
import PropertyLabel from "../property-label/PropertyLabel";

export interface IFormPropertiesConfig {
  passmark?: boolean;
  questions?: boolean;
}

export default function FormProperties({
  children,
  config,
}: {
  children?: ReactElement;
  config?: IFormPropertiesConfig;
}) {
  const { getIconByType } = useIconManager();
  const { appState } = useContext(AppContext);
  const {
    data: { questions, properties },
  } = appState.formSDK;
  const { passmark } = properties;

  return (
    <div className="form-properties">
      {config.questions && (
        <div className="question-counter">
          {getIconByType(Icon.Question)}
          <span className="questions-label text">
            {pluralize("Question", questions.length, true)}
          </span>
        </div>
      )}
      {config.passmark && (
        <PropertyLabel iconType={Icon.Success} className="passmark-info">
          <>
            <span className="label">Passmark: </span>
            <span className="text">{passmark}</span>
          </>
        </PropertyLabel>
      )}
      {children && <div className="additional-properties">{children}</div>}
    </div>
  );
}
