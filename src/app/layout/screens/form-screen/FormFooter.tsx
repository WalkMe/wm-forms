import React from "react";
import { IFormContext } from "./FormScreen";
import Button, { ButtonType } from "../../../components/buttons/Button";

interface IFormFooterProps {
  onSubmitted: () => void;
}

export default function FormFooter(props: IFormFooterProps) {
  const { onSubmitted } = props;

  return (
    <footer className="form-footer">
      <Button
        id="form-submit"
        tmButtonType={ButtonType.Default}
        buttonClicked={onSubmitted}
      >
        <span className="text">Submit</span>
      </Button>
    </footer>
  );
}
