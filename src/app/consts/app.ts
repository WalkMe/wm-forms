import { IAppState } from "../interfaces/walkme-app/walkmeApp.interface";
import { IFormBE } from "../interfaces/form/form.interface";

export enum wmPlatformType {
  Mac = "mac",
  Mock = "mock",
  Web = "web",
  Windows = "windows",
}

export enum tmPlatformType {
  App = "app",
  Web = "web",
}

export const PLATFORM_ERROR =
  "Walkme did not return data, try setting a query param `?platform=mock`";

export const TEACHME_ERROR =
  "Walkme did not return data, try setting a query param `?teachme=mock`";

export const defaultInitialAppState: IAppState = {
  initiated: false,
  isLoadedInIframe: false,
  debugError: "",
  platformType: "",
  form: null as IFormBE,
};
