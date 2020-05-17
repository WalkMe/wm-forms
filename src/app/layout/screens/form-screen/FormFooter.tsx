import React from "react";
import Confetti from "react-dom-confetti";

import { IFormContext } from "./FormScreen";
import Button, { ButtonType } from "../../../components/buttons/Button";
import RouteButton from "../../../components/buttons/route-button/RouteButton";

interface IFormFooterProps extends IFormContext {
  onSubmitted: () => void;
  submitted: boolean;
}

const confettiConfig = {
  angle: 90,
  spread: 120,
  colors: ["#348bd8", "#1F569D", "#89d1ef", "#348bd8", "#ACD2ED"],
};

export default function FormFooter(props: IFormFooterProps) {
  const {
    currentQuestion,
    onSubmitted,
    selectedAnswers,
    submitted,
    questionsLength,
    currentId,
    currentScore,
  } = props;

  const calculateScore = () => {
    const scoring = 100 / questionsLength;

    if (submitted && selectedAnswers.every((answer) => answer.isCorrect)) {
      return currentScore + scoring;
    }
    return currentScore;
  };

  const isLastQuestion = currentId >= questionsLength;
  const formCTALabel = isLastQuestion ? "Finish" : "Next";

  const formCTATargetLink = isLastQuestion
    ? `/summary/${calculateScore()}`
    : `/form/${currentId + 1}/${calculateScore()}`;

  const isCorrectAnswers = () => {
    const correctAnswers = currentQuestion.answers.filter(
      (answer) => answer.isCorrect
    );

    return selectedAnswers.every((answer) =>
      correctAnswers.some((correct) => correct.text === answer.text)
    );
  };

  return (
    <footer className="form-footer">
      <Confetti
        active={submitted && isCorrectAnswers()}
        config={confettiConfig}
      />
      {!submitted ? (
        <Button
          id="form-submit"
          tmButtonType={ButtonType.Default}
          buttonClicked={onSubmitted}
          disabled={!Boolean(selectedAnswers.length)}
        >
          <span className="btn-label">Submit</span>
        </Button>
      ) : (
        <RouteButton
          linkTo={formCTATargetLink}
          id="form-action"
          buttonType={ButtonType.Default}
          label={formCTALabel}
        />
      )}
    </footer>
  );
}
