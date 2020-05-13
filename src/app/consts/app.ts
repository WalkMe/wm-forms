import { IAppState } from "../interfaces/walkme-app/walkmeApp.interface";

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

export const defaultInitialAppState: IAppState = {
  initiated: false,
  debugError: "",
  platformType: "",
};
