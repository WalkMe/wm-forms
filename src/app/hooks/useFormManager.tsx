import React from "react";
import { IFormContext } from "../layout/screens/form-screen/FormScreen";
import { ISelectInput } from "../components/inputs/input.interface";
import { IFormAnswerBE, QuestionType } from "../interfaces/form/form.interface";
import { Icon, IconType } from "./useIconManager";
import { config } from "../config";

export default function useFormManager(
	props: IFormContext,
): {
	isCorrectAnswers: () => boolean;
	calculateCompletion: () => number;
	calculateScore: () => number;
	getInput: (data: {
		type: QuestionType;
		option: IFormAnswerBE;
		index: number;
	}) => ISelectInput;
} {
	const {
		currentRouteId,
		questionsLength,
		submitted,
		currentScore,
		selectedAnswers,
		selectedIndexes,
		currentQuestion,
		loading,
	} = props;
	const { showResultsOnSubmit, showUnselectedResultsOnSubmit } = config;

	const isCorrectAnswers = () => {
		const correctAnswers = currentQuestion.answers.filter(
			(answer) => answer.isCorrect,
		);

		const allAnswersAreCorrect = selectedAnswers.every((answer) =>
			correctAnswers.some((correct) => correct.text === answer.text),
		);

		const correctItemsAreEqual =
			correctAnswers.length === selectedAnswers.length;

		return allAnswersAreCorrect && correctItemsAreEqual;
	};

	const calculateCompletion = () => {
		// Default current percentages calculation
		const defaultCalculation =
			((currentRouteId - 1) / questionsLength / 1) * 100;

		// current percentages calculation changing id current question submitted
		const submittedCalculation = (currentRouteId / questionsLength / 1) * 100;

		return submitted && !loading ? submittedCalculation : defaultCalculation;
	};

	const calculateScore = () => {
		// default scoring
		const scoring = 100 / questionsLength;

		if (submitted && isCorrectAnswers()) {
			return Number((currentScore + scoring).toFixed(2));
		}

		return Number(currentScore.toFixed(2));
	};

	const getInputData = ({
		type,
		option,
		index,
	}: {
		type: QuestionType;
		option: IFormAnswerBE;
		index: number;
	}): ISelectInput => {
		const isSingleSelect = type === QuestionType.SingleSelect;
		const optionId = `option-${index}`;
		let iconType;
		let className = "default";
		const isSelected = selectedIndexes.indexOf(index) > -1;

		if (submitted && showResultsOnSubmit) {
			const iconStatus = option.isCorrect ? Icon.Success : Icon.Error;
			const indicatorClass = "show-indicator";
			const unselectedClassName = showUnselectedResultsOnSubmit
				? `${indicatorClass} unselected-${iconStatus}`
				: "";
			className = isSelected
				? `${indicatorClass} ${iconStatus}`
				: unselectedClassName;
			iconType = showUnselectedResultsOnSubmit
				? iconStatus
				: isSelected && iconStatus;
		}

		return {
			id: optionId,
			value: option.text,
			checked: isSelected,
			className,
			disabled: submitted,
			name: isSingleSelect
				? `question-${currentRouteId}`
				: `question-${currentRouteId}-${index}`,
			iconType,
		};
	};

	return {
		isCorrectAnswers,
		calculateCompletion,
		calculateScore,
		getInput: (data: {
			type: QuestionType;
			option: IFormAnswerBE;
			index: number;
		}) => getInputData(data),
	};
}
