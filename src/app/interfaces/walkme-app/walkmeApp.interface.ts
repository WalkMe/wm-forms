import { ISdk } from "@walkme/sdk/dist/interfaces/sdk";
import { IFormBE } from "../form/form.interface";

export interface IAppState {
  initiated: boolean;
  debugError: string;
  platformType: string;
  form: IFormBE;
  isLoadedInIframe?: boolean;
}

export interface sidebarOptions {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAppContext {
  appState: IAppState;
  walkmeSDK: ISdk;
}
