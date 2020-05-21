import React, { useState, useEffect } from "react";
import {
  IFormAnswerBE,
  QuestionType,
} from "../../../interfaces/form/form.interface";
import { IFormContext } from "./FormScreen";

import localization from "../../../consts/localization";
import RadioInput from "../../../components/inputs/radio-input/RadioInput";
import CheckboxInput from "../../../components/inputs/checkbox-input/CheckboxInput";
import useFormManager from "../../../hooks/useFormManager";
import MessageContainer from "../../../components/message-container/MessageContainer";

interface IFormProps {
  onSelected: (selected: IFormAnswerBE[]) => void;
}

export default function Form({
  props,
  formContext,
}: {
  props: IFormProps;
  formContext: IFormContext;
}) {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const { getInput } = useFormManager({ ...formContext, selectedIndexes });
  const { onSelected } = props;
  const { currentQuestion, currentId } = formContext;
  const { type } = currentQuestion;
  const isSingleSelect = type === QuestionType.SingleSelect;
  const isMultipleSelect = type === QuestionType.MultipleSelect;
  const { multipleSelectMsg } = localization;
  const formClass = isSingleSelect ? "single" : "multiple";
  // const fakeAnswers = [
  //   {
  //     isCorrect: true,
  //     text:
  //       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  //   },
  //   { isCorrect: false, text: "This is not the correct answer" },
  // ];
  const answers = currentQuestion.answers;
  const isLongTextAnswer = answers.some((answer) => answer.text.length > 50);

  const handleChange = (index: number) => {
    if (isSingleSelect) {
      setSelectedIndexes([index]);
    } else {
      const cloned = [...selectedIndexes];
      const existSelection = Boolean(cloned) ? cloned.indexOf(index) : -1;

      if (existSelection > -1) {
        cloned.splice(existSelection, 1);
        setSelectedIndexes(cloned);
      } else {
        setSelectedIndexes([...cloned, index]);
      }
    }
  };

  useEffect(() => {
    setSelectedIndexes([]);
  }, [currentId]);

  useEffect(() => {
    const selectedAnswers = selectedIndexes.map((index) => {
      return answers[index];
    });
    onSelected(selectedAnswers);
  }, [selectedIndexes]);

  return (
    <div className={`form-answers ${formClass}`}>
      <MessageContainer message={isMultipleSelect ? multipleSelectMsg : ""} />
      <ul className={`options`}>
        {answers.map((answer, index) => {
          const inputData = getInput({ type, option: answer, index });
          const input = {
            ...inputData,
            labelType: isLongTextAnswer ? "long-text" : "",
            handleChange: () => handleChange(index),
          };

          return (
            <li className="option" key={`answer-${index}`}>
              {isSingleSelect ? (
                <RadioInput {...input} />
              ) : (
                <CheckboxInput {...input} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
