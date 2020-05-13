interface IConfig {
  debug: boolean;
  debug_appVersion: number;
  timeoutIfUiTreeNotFound: number;
  searchInputDelay: number;
}

export const config: IConfig = {
  debug: false,
  debug_appVersion: 0.12,
  timeoutIfUiTreeNotFound: 10000,
  searchInputDelay: 250,
};
