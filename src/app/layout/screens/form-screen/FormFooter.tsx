import React from "react";
import Confetti from "react-dom-confetti";

import { IFormContext } from "./FormScreen";
import Button, { ButtonType } from "../../../components/buttons/Button";
import RouteButton from "../../../components/buttons/route-button/RouteButton";
import useFormManager from "../../../hooks/useFormManager";

interface IFormFooterProps {
  onSubmitted: () => void;
}

const confettiConfig = {
  angle: 90,
  spread: 120,
  colors: ["#348bd8", "#1F569D", "#89d1ef", "#348bd8", "#ACD2ED"],
};

export default function FormFooter({
  props,
  formContext,
}: {
  props: IFormFooterProps;
  formContext: IFormContext;
}) {
  const { onSubmitted } = props;

  const {
    currentQuestion,
    selectedAnswers,
    submitted,
    questionsLength,
    currentId,
  } = formContext;

  const { calculateScore, isCorrectAnswers } = useFormManager(formContext);

  const isLastQuestion = currentId >= questionsLength;
  const formCTALabel = isLastQuestion ? "Finish" : "Next";

  const formCTATargetLink = isLastQuestion
    ? `/summary/${calculateScore()}`
    : `/form/${currentId + 1}/${calculateScore()}`;

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
