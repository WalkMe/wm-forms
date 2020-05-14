import React from "react";
import { IFormContext } from "./FormScreen";
import Button, { ButtonType } from "../../../components/buttons/Button";
import { IFormAnswerBE } from "../../../interfaces/form/form.interface";

interface IFormFooterProps extends IFormContext {
  onSubmitted: () => void;
  selected: null | IFormAnswerBE;
  submitted: boolean;
}

export default function FormFooter(props: IFormFooterProps) {
  const { onSubmitted, selected, submitted } = props;
  console.log("selected ", selected);
  return (
    <footer className="form-footer">
      {!submitted ? (
        <Button
          id="form-submit"
          tmButtonType={ButtonType.Default}
          buttonClicked={onSubmitted}
          disabled={!Boolean(selected)}
        >
          <span className="text">Submit</span>
        </Button>
      ) : (
        <Button id="next" tmButtonType={ButtonType.Default}>
          <span className="text">Next</span>
        </Button>
      )}
    </footer>
  );
}
