import React from "react";
import MasterScreen from "../master-screen/MasterScreen";
import { ScreenType } from "../../../interfaces/screen/screen.interface";

export interface IWelcomeScreenProps {}

export default function WelcomeScreen(props?: IWelcomeScreenProps) {
  return (
    <MasterScreen type={ScreenType.Welcome}>
      <span>WELCOME</span>
    </MasterScreen>
  );
}
