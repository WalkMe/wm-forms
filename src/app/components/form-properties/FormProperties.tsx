import React, { useContext } from "react";
import pluralize from "pluralize";

import { AppContext } from "../../App";
import useIconManager, { Icon } from "../../hooks/useIconManager";
import { ScreenType } from "../../interfaces/screen/screen.interface";

export interface IFormProperties {
  passmark?: number;
}

export default function FormProperties({
  customProperties,
}: {
  customProperties?: IFormProperties;
}) {
  const { getIconByType } = useIconManager();

  const getPassmark = (passmark: number) => {
    let content = <span className="text">Passmark: {passmark}</span>;

    if (customProperties) {
      content = <span className="text">Score: {passmark}</span>;
    }

    return (
      <div className="passmark-info">
        {getIconByType(Icon.Check)}
        {content}
      </div>
    );
  };

  const getWelcomeProperties = () => {
    const { appState } = useContext(AppContext);
    const { questions, properties } = appState.form;
    const { passmark } = properties;

    return (
      <>
        <div className="question-counter">
          {getIconByType(Icon.Question)}
          <span className="text">
            {pluralize("Question", questions.length, true)}
          </span>
        </div>
        {passmark && getPassmark(passmark)}
      </>
    );
  };

  const getCustomProperties = () => {
    if (customProperties && Number.isInteger(customProperties.passmark)) {
      return <>{getPassmark(customProperties.passmark)}</>;
    }
  };

  if (!customProperties) {
    return <div className="form-properties">{getWelcomeProperties()}</div>;
  }

  return <div className="form-properties">{getCustomProperties()}</div>;
}
