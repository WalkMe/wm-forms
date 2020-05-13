import { WalkMeApp, ISdk } from "@walkme/sdk/dist/interfaces/sdk";

export interface IAppState {
  initiated: boolean;
  debugError: string;
  platformType: string;
}

export interface sidebarOptions {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAppContext {
  appState: IAppState;
  walkmeSDK: ISdk;
}
