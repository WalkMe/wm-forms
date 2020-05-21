interface IConfig {
  debug: boolean;
  debug_appVersion: number;
  timeoutIfUiTreeNotFound: number;
  searchInputDelay: number;
  successConfetti?: boolean;
}

export const config: IConfig = {
  debug: false,
  debug_appVersion: 0.12,
  timeoutIfUiTreeNotFound: 10000,
  searchInputDelay: 250,
  successConfetti: true,
};
