import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ScreenType } from "../../../interfaces/screen/screen.interface";
import MasterScreen from "../master-screen/MasterScreen";
import ContentScreenTemplate from "../../../components/content-screen-template/ContentScreenTemplate";
import { AppContext } from "../../../App";
import FormProperties from "../../../components/form-properties/FormProperties";
import PropertyLabel from "../../../components/property-label/PropertyLabel";
import { ButtonType } from "../../../components/buttons/Button";

export interface IOverviewScreenProps {}

export default function OverviewScreen(props: IOverviewScreenProps) {
  const { appState } = useContext(AppContext);
  const {
    data: { properties },
  } = appState.formSDK;

  const getSummary = async () => {
    try {
      const summary = await appState.formSDK.getSummary();
      console.log("summary ", summary);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <MasterScreen
      isAnimatedScreen
      type={ScreenType.Overview}
      percentCompletion={100}
    >
      <>Overview Screen</>
    </MasterScreen>
  );
}
