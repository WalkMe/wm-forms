export enum InformationScreenType {
  Error = "error",
  Loading = "loading",
  NoConnection = "no-connection",
  Unknown = "unknown",
}

export interface IInformationScreenData {
  type?: InformationScreenType;
  error?: string;
}
