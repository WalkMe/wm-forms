import React, { useContext, createContext, useState } from "react";
import { ScreenType } from "../../../interfaces/screen/screen.interface";
import MasterScreen from "../master-screen/MasterScreen";
import { RouteComponentProps } from "react-router-dom";
import { AppContext } from "../../../App";
import Button, { ButtonType } from "../../../components/buttons/Button";
import { IFormQuestionBE } from "../../../interfaces/form/form.interface";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

type FormParams = { id: string };

export interface IFormScreenProps extends RouteComponentProps<FormParams> {}

export interface IFormContext {
  currentId: number;
  currentIndex: number;
  currentQuestion: IFormQuestionBE;
  questionsLength: number;
}

// export const FormContext = createContext<IFormContext | null>(null);

export default function FormScreen(props?: IFormScreenProps) {
  const { appState } = useContext(AppContext);
  const { questions } = appState.form;
  const { match } = props;
  const [answer, setAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const currentId = parseInt(match.params.id);
  const currentIndex = currentId - 1;
  const currentQuestion = questions[currentIndex];

  const form = {
    currentId,
    currentIndex,
    currentQuestion,
    questionsLength: questions.length,
  };

  const handleSubmitted = () => {
    console.log("handleSubmitted ");
  };

  return (
    <MasterScreen type={ScreenType.Form} header={<FormHeader {...form} />}>
      <>
        <FormFooter onSubmitted={handleSubmitted} />
      </>
    </MasterScreen>
  );
}
