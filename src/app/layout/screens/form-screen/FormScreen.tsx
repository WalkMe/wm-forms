import React from "react";
import { ScreenType } from "../../../interfaces/screen/screen.interface";
import MasterScreen from "../master-screen/MasterScreen";
import { RouteComponentProps } from "react-router-dom";

type FormParams = { id: string };

export interface IFormScreenProps {
  match: RouteComponentProps<FormParams>;
}

export default function FormScreen(props?: IFormScreenProps) {
  return (
    <MasterScreen type={ScreenType.Form}>
      <span>Form</span>
    </MasterScreen>
  );
}
