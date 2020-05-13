import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ScreenType } from "../../../interfaces/screen/screen.interface";
import MasterScreen from "../master-screen/MasterScreen";

type FormParams = { passmark: string };

export interface IResultsScreenProps {
  match: RouteComponentProps<FormParams>;
}

export default function SummaryScreen(props: IResultsScreenProps) {
  return (
    <MasterScreen type={ScreenType.Summary}>
      <span>Summary</span>
    </MasterScreen>
  );
}
