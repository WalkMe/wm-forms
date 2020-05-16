import React from "react";
import { IFormContext } from "./FormScreen";
import Button, { ButtonType } from "../../../components/buttons/Button";
import { IFormAnswerBE } from "../../../interfaces/form/form.interface";
import RouteButton from "../../../components/buttons/route-button/RouteButton";

interface IFormFooterProps extends IFormContext {
  onSubmitted: () => void;
  selected: null | IFormAnswerBE;
  submitted: boolean;
}

export default function FormFooter(props: IFormFooterProps) {
  const {
    onSubmitted,
    selected,
    submitted,
    questionsLength,
    currentId,
  } = props;

  const isLastQuestion = currentId >= questionsLength;
  const formCTALabel = isLastQuestion ? "Finish" : "Next";

  const formCTATargetLink = isLastQuestion
    ? "/summary/50" // TODO: calculate passmark for dynamic flow
    : `/form/${currentId + 1}`;

  return (
    <footer className="form-footer">
      {!submitted ? (
        <Button
          id="form-submit"
          tmButtonType={ButtonType.Default}
          buttonClicked={onSubmitted}
          disabled={!Boolean(selected)}
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
