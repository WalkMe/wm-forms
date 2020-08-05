import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import { AppContext } from "../../../App";
import localization from "../../../consts/localization";
import { ScreenType } from "../../../interfaces/screen/screen.interface";
import MasterScreen from "../master-screen/MasterScreen";
import ContentScreenTemplate from "../../../components/content-screen-template/ContentScreenTemplate";
import FormProperties from "../../../components/form-properties/FormProperties";
import PropertyLabel from "../../../components/property-label/PropertyLabel";
import Button, { ButtonType } from "../../../components/buttons/Button";
import SummaryOverviewScreen from "../summary-overview-screen/SummaryOverviewScreen";
import useSummaryManager, {
  fakeSummary,
} from "../../../hooks/useSummaryManager";

type SummaryParams = { score: string };

export interface IResultsScreenProps
  extends RouteComponentProps<SummaryParams> {}

export default function SummaryScreen(props: IResultsScreenProps) {
  const { appState, setAppState } = useContext(AppContext);
  const { isValidSummaryData } = useSummaryManager();
  const {
    formSDK: {
      data: { successScreen, failScreen, properties },
    },
  } = appState;
  const { passmark, showSummary } = properties;
  const [isOverviewVisible, setIsOverviewVisible] = useState(false);
  const [overviewData, setOverviewData] = useState(null);
  const score = parseInt(props.match.params.score);
  const { overviewButtonLabel } = localization;
  const isSuccess = score >= passmark;
  const screen = isSuccess ? successScreen : failScreen;
  const summaryClassName = isSuccess ? "success" : "fail";

  const getOverviewData = async () => {
    try {
      const summaryData = await appState.formSDK.getSummary(score , isSuccess);

      if (isValidSummaryData(summaryData)) {
        console.log("summaryData ", summaryData);
        setOverviewData(summaryData);
      } else {
        console.log("fakeSummary ", fakeSummary);
        setOverviewData(fakeSummary);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (showSummary) {
      getOverviewData();
    }

    setAppState({
      ...appState,
      percentCompletion: 100,
    });
  }, []);

  return (
    <>
      <MasterScreen
        isAnimatedScreen
        type={ScreenType.Summary}
        className={summaryClassName}
      >
        <>
          <ContentScreenTemplate
            title={screen.title}
            description={screen.description}
            buttonText={!isSuccess && "Try Again"}
            buttonType={ButtonType.Link}
            buttonTargetRoute="/"
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
          {showSummary && (
            <Button
              className="overview-cta"
              id="overview-button"
              tmButtonType={ButtonType.Default}
              buttonClicked={() => {
                setIsOverviewVisible(true);
              }}
            >
              <span className="btn-label">{overviewButtonLabel}</span>
            </Button>
          )}
        </>
      </MasterScreen>
      {showSummary && (
        <SummaryOverviewScreen
          isVisible={isOverviewVisible}
          onClose={() => {
            setIsOverviewVisible(false);
          }}
          overviewData={overviewData}
        />
      )}
    </>
  );
}
