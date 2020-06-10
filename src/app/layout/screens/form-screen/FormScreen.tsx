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
import useFormManager from "../../../hooks/useFormManager";

type FormParams = { id: string; score: string };

const formAnimationConfig = {
  topSection: 300,
  options: 600,
  footer: 900,
};

export interface IFormScreenProps extends RouteComponentProps<FormParams> {}

export interface IFormContext {
  currentRouteId: number;
  currentIndex: number;
  currentQuestion: IFormQuestionBE;
  questionsLength: number;
  submitted?: boolean;
  loading?: boolean;
  selectedAnswers?: IFormAnswerBE[];
  currentScore?: number;
  selectedIndexes?: number[];
}

export default function FormScreen(props?: IFormScreenProps) {
  const { appState } = useContext(AppContext);
  const {
    data: { questions },
    submit,
  } = appState.formSDK;
  const { id, score } = props.match.params;
  const [selectedAnswers, setSelectedAnswers] = useState([] as IFormAnswerBE[]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentRouteId = parseInt(id);
  const currentIndex = currentRouteId - 1;
  const currentQuestion = questions[currentIndex];

  const formGlobals = {
    currentRouteId,
    currentIndex,
    currentScore: score ? parseInt(score) : 0,
    currentQuestion,
    questionsLength: questions.length,
    selectedAnswers,
    submitted,
    loading,
  };

  const { calculateCompletion } = useFormManager(formGlobals);
  const [percentCompletion, setPercentCompletion] = useState(
    calculateCompletion()
  );

  const form = {
    ...formGlobals,
    percentCompletion,
  };

  const [formData, setFormData] = useState(form);

  const getSelectedAnswersId = () => {
    return selectedAnswers.map((selected) => selected.id);
  };

  const handleSubmitted = () => {
    appState.formSDK.submit(currentQuestion.id, getSelectedAnswersId());

    /**
     * fake loading button
     * Preparation for future asynchronous behavior
     */
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 500);
  };

  const handleSelected = (selected: IFormAnswerBE[]) => {
    setSelectedAnswers(selected);
  };

  /** reset form */
  useEffect(() => {
    setSubmitted(false);
    setSelectedAnswers([]);
  }, [id]);

  /** updating data when each of dependencies change */
  useEffect(() => {
    setFormData(form);
    setPercentCompletion(calculateCompletion());
  }, [id, selectedAnswers, submitted, loading]);

  return (
    <MasterScreen
      isAnimatedScreen
      type={ScreenType.Form}
      header={<FormHeader {...formData} />}
      percentCompletion={percentCompletion}
    >
      <>
        <Form
          formContext={formData}
          props={{
            onSelected: handleSelected,
            animationConfig: formAnimationConfig,
          }}
        />
        <FormFooter
          formContext={formData}
          props={{
            onSubmitted: handleSubmitted,
            animationConfig: formAnimationConfig,
          }}
        />
      </>
    </MasterScreen>
  );
}
