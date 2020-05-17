import React, { useContext, useState, useEffect } from "react";
import { ScreenType } from "../../../interfaces/screen/screen.interface";
import MasterScreen from "../master-screen/MasterScreen";
import { RouteComponentProps } from "react-router-dom";
import { AppContext } from "../../../App";
import {
  IFormQuestionBE,
  IFormAnswerBE,
} from "../../../interfaces/form/form.interface";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import Form from "./Form";

type FormParams = { id: string; score: string };

export interface IFormScreenProps extends RouteComponentProps<FormParams> {}

export interface IFormContext {
  currentId: number;
  currentIndex: number;
  currentQuestion: IFormQuestionBE;
  questionsLength: number;
  submitted?: boolean;
  selectedAnswer?: IFormAnswerBE;
  currentScore?: number;
}

export default function FormScreen(props?: IFormScreenProps) {
  const { appState } = useContext(AppContext);
  const { questions } = appState.form;
  const { id, score } = props.match.params;
  const [selectedAnswer, setSelectedAnswer] = useState(null as IFormAnswerBE);
  const [submitted, setSubmitted] = useState(false);

  const currentId = parseInt(id);
  const currentScore = score ? parseInt(score) : 0;
  const currentIndex = currentId - 1;
  const currentQuestion = questions[currentIndex];
  const calculateCompletion = () => {
    // Default current percentages calculation
    let currentPercentages = ((currentId - 1) / questions.length / 1) * 100;

    // current percentages calculation changing id current question submitted
    if (submitted) {
      currentPercentages = (currentId / questions.length / 1) * 100;
    }
    return currentPercentages;
  };

  const [percentCompletion, setPercentCompletion] = useState(
    calculateCompletion()
  );

  const form = {
    currentId,
    currentIndex,
    currentQuestion,
    questionsLength: questions.length,
    selectedAnswer,
    submitted,
    percentCompletion,
    currentScore,
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
    setPercentCompletion(calculateCompletion());
  }, [selectedAnswer, submitted]);

  return (
    <MasterScreen
      isAnimatedScreen
      type={ScreenType.Form}
      header={<FormHeader {...formData} />}
      percentCompletion={percentCompletion}
    >
      <>
        <Form {...formData} onSelected={handleSelected} />
        <FormFooter {...formData} onSubmitted={handleSubmitted} />
      </>
    </MasterScreen>
  );
}
