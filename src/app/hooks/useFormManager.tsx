import React from "react";
import { IFormContext } from "../layout/screens/form-screen/FormScreen";

export default function useFormManager(
  props: IFormContext
): {
  calculateCompletion: () => number;
  calculateScore: () => number;
} {
  const {
    currentId,
    questionsLength,
    submitted,
    currentScore,
    selectedAnswers,
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

  return {
    calculateCompletion,
    calculateScore,
  };
}
