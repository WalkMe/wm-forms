import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ScreenType } from "../../../interfaces/screen/screen.interface";
import MasterScreen from "../master-screen/MasterScreen";

type SummaryParams = { passmark: string };

export interface IResultsScreenProps
  extends RouteComponentProps<SummaryParams> {}

export default function SummaryScreen(props: IResultsScreenProps) {
  return (
    <MasterScreen type={ScreenType.Summary}>
      <span>Summary</span>
    </MasterScreen>
  );
}
