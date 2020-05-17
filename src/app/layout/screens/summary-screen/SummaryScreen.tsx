import React, { useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ScreenType } from "../../../interfaces/screen/screen.interface";
import MasterScreen from "../master-screen/MasterScreen";
import ContentScreenTemplate from "../../../components/content-screen-template/ContentScreenTemplate";
import { AppContext } from "../../../App";
import FormProperties from "../../../components/form-properties/FormProperties";

type SummaryParams = { passmark: string };

export interface IResultsScreenProps
  extends RouteComponentProps<SummaryParams> {}

export default function SummaryScreen(props: IResultsScreenProps) {
  const { appState } = useContext(AppContext);
  const passmark = parseInt(props.match.params.passmark);

  const { successScreen, failScreen } = appState.form;

  let screenProps = passmark === 100 ? successScreen : failScreen;

  screenProps.description = screenProps.description.replace(/&#39;/, "'");

  return (
    <MasterScreen
      isAnimatedScreen
      type={ScreenType.Summary}
      percentCompletion={100}
    >
      <>
        <ContentScreenTemplate {...screenProps} buttonTargetRoute="/" />
        <FormProperties customProperties={{ passmark }} />
      </>
    </MasterScreen>
  );
}
