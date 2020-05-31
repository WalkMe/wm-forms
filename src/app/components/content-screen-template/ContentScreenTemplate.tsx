import React, { useEffect } from "react";

import { IFormScreenBE } from "../../interfaces/form/form.interface";
import { ScreenType } from "../../interfaces/screen/screen.interface";

import RouteButton from "../buttons/route-button/RouteButton";
import { ButtonType } from "../buttons/Button";
import SummaryScreen from "../../layout/screens/summary-screen/SummaryScreen";

interface IContentScreenTemplate {
  type?: ScreenType;
  buttonTargetRoute?: string;
  buttonType?: ButtonType;
}

export default function ContentScreenTemplate(
  props: IFormScreenBE & IContentScreenTemplate
) {
  const {
    title,
    description,
    buttonText,
    buttons,
    buttonTargetRoute = "/",
    buttonType = ButtonType.Default,
  } = props;
  const includeContent = Boolean(description);
  const includeFooter = buttons || Boolean(buttonText);

  const getLabel = () => {
    return buttons && buttons.length ? buttons[0].text : buttonText;
  };

  return (
    <>
      <header className="temp-header">
        <h2 className="screen-title">
          <span className="text">{title}</span>
        </h2>
      </header>
      {includeContent && (
        <div className="temp-content">
          <div className="description">
            <p>{description}</p>
          </div>
        </div>
      )}
      {includeFooter && (
        <footer className="temp-footer">
          <RouteButton
            id={`temp-button`}
            buttonType={buttonType}
            label={getLabel()}
            linkTo={buttonTargetRoute}
          ></RouteButton>
        </footer>
      )}
    </>
  );
}
