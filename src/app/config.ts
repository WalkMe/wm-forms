interface IConfig {
  debug: boolean;
  debug_appVersion: number;
  timeoutIfUiTreeNotFound: number;
  searchInputDelay: number;
  successConfetti?: boolean;
  appSize: number;
  formHeaderMaxHeight: number;
}

export const config: IConfig = {
  debug: false,
  debug_appVersion: 0.12,
  timeoutIfUiTreeNotFound: 10000,
  searchInputDelay: 250,
  successConfetti: true,
  appSize: 500,
  formHeaderMaxHeight: 150,
};
