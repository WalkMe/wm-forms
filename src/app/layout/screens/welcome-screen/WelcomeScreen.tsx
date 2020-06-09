import React, { useContext } from "react";

import { ScreenType } from "../../../interfaces/screen/screen.interface";
import { AppContext } from "../../../App";
import MasterScreen from "../master-screen/MasterScreen";
import ContentScreenTemplate from "../../../components/content-screen-template/ContentScreenTemplate";
import FormProperties from "../../../components/form-properties/FormProperties";

export interface IWelcomeScreenProps {}

export default function WelcomeScreen(props?: IWelcomeScreenProps) {
  const { appState } = useContext(AppContext);
  const {
    data: { welcomeScreen },
  } = appState.formSDK;

  return (
    <>
      <MasterScreen isAnimatedScreen type={ScreenType.Welcome}>
        <>
          <ContentScreenTemplate
            {...welcomeScreen}
            buttonText={welcomeScreen.buttons[0].text}
            buttonTargetRoute="/form/1/0"
          />
          <FormProperties config={{ passmark: true, questions: true }} />
        </>
      </MasterScreen>
    </>
  );
}
