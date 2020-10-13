interface IConfig {
	debug: boolean;
	debug_appVersion: number;
	timeoutIfUiTreeNotFound: number;
	searchInputDelay: number;
	successConfetti?: boolean;

	// Form configuration
	showResultsOnSubmit?: boolean; // show result indicator to selected option on submit
	showUnselectedResultsOnSubmit?: boolean; // show result indicator to unselected option on submit
	showExplanationOnSubmit?: boolean; // show explanation section on submit

	// UI configuration
	appSize: number;
	formHeaderMaxHeight: number;
}

export const config: IConfig = {
	debug: false,
	debug_appVersion: 0.12,
	timeoutIfUiTreeNotFound: 10000,
	searchInputDelay: 250,
	successConfetti: true, // TODO: add to quiz settings in teachme-admin
	showResultsOnSubmit: false, // TODO: add to quiz settings in teachme-admin
	showUnselectedResultsOnSubmit: false, // TODO: add to quiz settings in teachme-admin
	showExplanationOnSubmit: false, // TODO: add to quiz settings in teachme-admin
	appSize: 500,
	formHeaderMaxHeight: 150,
};
