import React from "react";
import { IFormContext } from "../layout/screens/form-screen/FormScreen";
import { ISelectInput } from "../components/inputs/input.interface";
import { IFormAnswerBE, QuestionType } from "../interfaces/form/form.interface";

export default function useFormManager(
  props: IFormContext
): {
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
  } = props;

  const calculateCompletion = () => {
    // Default current percentages calculation
    const defaultCalculation = ((currentId - 1) / questionsLength / 1) * 100;

    // current percentages calculation changing id current question submitted
    const submittedCalculation = (currentId / questionsLength / 1) * 100;

    return submitted ? submittedCalculation : defaultCalculation;
  };

  const calculateScore = () => {
    // default scoring
    const scoring = 100 / questionsLength;
    const allAnswersAreCorrect = selectedAnswers.every(
      (answer) => answer.isCorrect
    );

    if (submitted && allAnswersAreCorrect) {
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
    let selectedResultsClass = "";
    let unselectedResultsClass = "";
    const isSelected = selectedIndexes.indexOf(index) > -1;
    const resultsClass = option.isCorrect ? "correct" : "wrong";
    if (submitted) {
      selectedResultsClass = isSelected && resultsClass;
      unselectedResultsClass = option.isCorrect && "unselected-correct";
    }
    return {
      id: optionId,
      value: option.text,
      checked: isSelected,
      className: `${selectedResultsClass} ${unselectedResultsClass}`,
      disabled: submitted,
      name: isSingleSelect
        ? `question-${currentId}`
        : `question-${currentId}-${index}`,
    };
  };

  return {
    calculateCompletion,
    calculateScore,
    getInput: (data: {
      type: QuestionType;
      option: IFormAnswerBE;
      index: number;
    }) => getInputData(data),
  };
}
