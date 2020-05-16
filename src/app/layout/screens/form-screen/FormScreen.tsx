import React, { useContext, createContext, useState, useEffect } from "react";
import { ScreenType } from "../../../interfaces/screen/screen.interface";
import MasterScreen from "../master-screen/MasterScreen";
import { RouteComponentProps } from "react-router-dom";
import { AppContext } from "../../../App";
import Button, { ButtonType } from "../../../components/buttons/Button";
import {
  IFormQuestionBE,
  IFormAnswerBE,
} from "../../../interfaces/form/form.interface";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import Form from "./Form";

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
  const { id } = props.match.params;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const currentId = parseInt(id);
  const currentIndex = currentId - 1;
  const currentQuestion = questions[currentIndex];
  const form = {
    currentId,
    currentIndex,
    currentQuestion,
    questionsLength: questions.length,
  };
  const [formData, setFormData] = useState(form);

  const handleSubmitted = () => {
    setSubmitted(true);
  };

  const handleSelected = (selected: IFormAnswerBE) => {
    setSelectedAnswer(selected);
  };

  useEffect(() => {
    setSubmitted(false);
    setSelectedAnswer(null);
    setFormData(form);
  }, [id]);

  useEffect(() => {
    setFormData(form);
  }, []);

  console.log("formData ", formData);

  return (
    <MasterScreen
      isAnimatedScreen
      type={ScreenType.Form}
      header={<FormHeader {...form} />}
    >
      <>
        <Form {...form} onSelected={handleSelected} submitted={submitted} />
        <FormFooter
          {...form}
          onSubmitted={handleSubmitted}
          selected={selectedAnswer}
          submitted={submitted}
        />
      </>
    </MasterScreen>
  );
}
