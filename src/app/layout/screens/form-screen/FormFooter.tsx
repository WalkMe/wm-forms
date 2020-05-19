import React, { useRef, useEffect } from "react";
import Confetti from "react-dom-confetti";

import { IFormContext } from "./FormScreen";
import Button, { ButtonType } from "../../../components/buttons/Button";
import RouteButton from "../../../components/buttons/route-button/RouteButton";
import useFormManager from "../../../hooks/useFormManager";
import useViewManager from "../../../hooks/useViewManager";

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
  const formCTA = useRef();
  const { onSubmitted } = props;
  const {
    selectedAnswers,
    submitted,
    questionsLength,
    currentId,
    loading,
  } = formContext;

  const { calculateScore, isCorrectAnswers } = useFormManager(formContext);
  const { animateCoreElements } = useViewManager();

  const isLastQuestion = currentId >= questionsLength;
  const formCTALabel = isLastQuestion ? "Finish" : "Next";

  const formCTATargetLink = isLastQuestion
    ? `/summary/${calculateScore()}`
    : `/form/${currentId + 1}/${calculateScore()}`;

  useEffect(() => {
    if (formCTA.current) {
      animateCoreElements({
        elements: [formCTA.current],
        animateClassName: "fadeInUp",
        timeout: 3200,
        remove: true,
      });
    }
  }, [submitted]);

  return (
    <footer className="form-footer">
      <Confetti
        active={submitted && isCorrectAnswers()}
        config={confettiConfig}
      />
      {submitted ? (
        <RouteButton
          linkTo={formCTATargetLink}
          id="form-action"
          buttonType={ButtonType.Default}
          label={formCTALabel}
        />
      ) : (
        <Button
          id="form-submit"
          tmButtonType={ButtonType.Default}
          buttonClicked={onSubmitted}
          disabled={!Boolean(selectedAnswers.length)}
          loading={loading}
        >
          <span className="btn-label">Submit</span>
        </Button>
      )}
    </footer>
  );
}
