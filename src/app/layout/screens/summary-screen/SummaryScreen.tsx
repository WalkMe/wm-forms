import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import { AppContext } from "../../../App";
import localization from "../../../consts/localization";
import { ScreenType } from "../../../interfaces/screen/screen.interface";
import MasterScreen from "../master-screen/MasterScreen";
import ContentScreenTemplate from "../../../components/content-screen-template/ContentScreenTemplate";
import FormProperties from "../../../components/form-properties/FormProperties";
import PropertyLabel from "../../../components/property-label/PropertyLabel";
import { ButtonType } from "../../../components/buttons/Button";
import RouteButton from "../../../components/buttons/route-button/RouteButton";

type SummaryParams = { score: string };

export interface IResultsScreenProps
  extends RouteComponentProps<SummaryParams> {}

export default function SummaryScreen(props: IResultsScreenProps) {
  const { appState } = useContext(AppContext);
  const score = parseInt(props.match.params.score);
  const { overviewButtonLabel } = localization;
  const {
    form: { successScreen, failScreen, properties },
    isLoadedInIframe,
  } = appState;
  const { passmark } = properties;
  const isSuccess = score >= passmark;
  const screen = isSuccess ? successScreen : failScreen;
  const summaryClassName = isSuccess ? "success" : "fail";

  return (
    <MasterScreen
      isAnimatedScreen
      type={ScreenType.Summary}
      percentCompletion={100}
      className={summaryClassName}
    >
      <>
        <ContentScreenTemplate
          // {...screen}
          // temporary solution preventing render RouteButton
          title={screen.title}
          description={screen.description}
          buttons={!isLoadedInIframe ? screen.buttons : undefined}
          buttonText={!isLoadedInIframe ? screen.buttonText : undefined}
          buttonTargetRoute="/"
          buttonType={ButtonType.Link}
        />
        <PropertyLabel className="score-info">
          <>
            <span className="label">Score: </span>
            <span className="text">
              <span className="score"> {score} </span> / {passmark}
            </span>
          </>
        </PropertyLabel>
        <FormProperties config={{ passmark: true, questions: true }} />
        <RouteButton
          className="overview-cta"
          buttonType={ButtonType.Default}
          id="overview-button"
          label={overviewButtonLabel}
          linkTo="/overview"
        />
      </>
    </MasterScreen>
  );
}
