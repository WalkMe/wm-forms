import React from "react";

import { IFormScreenBE } from "../../interfaces/form/form.interface";
import { ScreenType } from "../../interfaces/screen/screen.interface";

import RouteButton from "../buttons/route-button/RouteButton";
import { ButtonType } from "../buttons/Button";

interface IContentScreenTemplate {
  type?: ScreenType;
  buttonTargetRoute?: string;
}

export default function ContentScreenTemplate(
  props: IFormScreenBE & IContentScreenTemplate
) {
  const { title, description, buttonText, buttonTargetRoute = "/" } = props;
  const includeContent = Boolean(description);
  const includeFooter = Boolean(buttonText);

  const handleClick = () => {
    console.log("ContentTemplate button clicked");
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
            buttonType={ButtonType.Default}
            label={buttonText}
            linkTo={buttonTargetRoute}
          ></RouteButton>
        </footer>
      )}
    </>
  );
}
