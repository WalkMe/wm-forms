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

// For Checking edge cases
const fakeAnswers = [
  {
    isCorrect: true,
    text:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
  { isCorrect: false, text: "This is not the correct answer" },
  { isCorrect: false, text: "This is not the correct answer" },
  { isCorrect: false, text: "This is not the correct answer" },
];

const fakeFormQuestion = {
  answers: fakeAnswers,
  description:
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages Lorem Ipsum.",
  explanation: "You should have known this...",
  title: "This is a single answer question with a description and explanation",
  type: 1,
};

type FormParams = { id: string; score: string };

export interface IFormScreenProps extends RouteComponentProps<FormParams> {}

export interface IFormContext {
  currentId: number;
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
  const { questions } = appState.form;
  const { id, score } = props.match.params;

  const [selectedAnswers, setSelectedAnswers] = useState([] as IFormAnswerBE[]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentId = parseInt(id);
  const currentIndex = currentId - 1;
  const formGlobals = {
    currentId,
    currentIndex,
    currentScore: score ? parseInt(score) : 0,
    currentQuestion: questions[currentIndex],
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

  const handleSubmitted = () => {
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
        <Form formContext={formData} props={{ onSelected: handleSelected }} />
        <FormFooter
          formContext={formData}
          props={{ onSubmitted: handleSubmitted }}
        />
      </>
    </MasterScreen>
  );
}
