import React from "react";
import { IFormContext } from "../layout/screens/form-screen/FormScreen";
import { ISelectInput } from "../components/inputs/input.interface";
import { IFormAnswerBE, QuestionType } from "../interfaces/form/form.interface";
import { Icon, IconType } from "./useIconManager";

export default function useFormManager(
  props: IFormContext
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
    currentId,
    questionsLength,
    submitted,
    currentScore,
    selectedAnswers,
    selectedIndexes,
    currentQuestion,
    loading,
  } = props;

  const isCorrectAnswers = () => {
    const correctAnswers = currentQuestion.answers.filter(
      (answer) => answer.isCorrect
    );

    const allAnswersAreCorrect = selectedAnswers.every((answer) =>
      correctAnswers.some((correct) => correct.text === answer.text)
    );

    const correctItemsAreEqual =
      correctAnswers.length === selectedAnswers.length;

    return allAnswersAreCorrect && correctItemsAreEqual;
  };

  const calculateCompletion = () => {
    // Default current percentages calculation
    const defaultCalculation = ((currentId - 1) / questionsLength / 1) * 100;

    // current percentages calculation changing id current question submitted
    const submittedCalculation = (currentId / questionsLength / 1) * 100;

    return submitted && !loading ? submittedCalculation : defaultCalculation;
  };

  const calculateScore = () => {
    // default scoring
    const scoring = 100 / questionsLength;

    if (submitted && isCorrectAnswers()) {
      return currentScore + scoring;
    }

    return currentScore;
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
    let selectedResultsClass = "unselected";
    const isSelected = selectedIndexes.indexOf(index) > -1;
    const resultsIcon = option.isCorrect ? Icon.Success : Icon.Error;
    if (submitted) {
      selectedResultsClass = isSelected
        ? resultsIcon
        : `unselected-${resultsIcon}`;
      //unselectedResultsClass = option.isCorrect ? "unselected-success" : "";
    }
    return {
      id: optionId,
      value: option.text,
      checked: isSelected,
      className: selectedResultsClass,
      disabled: submitted,
      name: isSingleSelect
        ? `question-${currentId}`
        : `question-${currentId}-${index}`,
      iconType: submitted && resultsIcon,
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
