import React, { useContext } from "react";
import pluralize from "pluralize";

import { ScreenType } from "../../../interfaces/screen/screen.interface";
import { AppContext } from "../../../App";
import MasterScreen from "../master-screen/MasterScreen";
import ContentScreenTemplate from "../../../components/content-screen-template/ContentScreenTemplate";
import FormProperties from "../../../components/form-properties/FormProperties";

export interface IWelcomeScreenProps {}

export default function WelcomeScreen(props?: IWelcomeScreenProps) {
  const { appState } = useContext(AppContext);
  const { welcomeScreen } = appState.form;

  return (
    <>
      <MasterScreen isAnimatedScreen type={ScreenType.Welcome}>
        <>
          <ContentScreenTemplate
            {...welcomeScreen}
            buttonTargetRoute="/form/1"
          />
          <FormProperties />
        </>
      </MasterScreen>
    </>
  );
}
