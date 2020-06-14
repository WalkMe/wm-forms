import { ISdk } from "@walkme/sdk/dist/interfaces/sdk";
import { IFormSDK } from "../form/form.interface";

export interface IAppState {
  initiated: boolean;
  debugError: string;
  platformType: string;
  formSDK: IFormSDK;
  isLoadedInIframe?: boolean;
  percentCompletion?: number;
}

export interface IAppContext {
  appState: IAppState;
  walkmeSDK: ISdk;
  setAppState: (updated: IAppState) => void;
}

export enum AppAnimation {
  FadeInLeft = "fade-in-left",
  FadeInRight = "fade-in-right",
  FadeInUp = "fade-in-up",
  FadeInDown = "fade-in-down",
}
