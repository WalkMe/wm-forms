import React, { useState, useEffect } from "react";
import { IFormContext } from "./FormScreen";
import {
  IFormAnswerBE,
  QuestionType,
} from "../../../interfaces/form/form.interface";

interface IFormProps extends IFormContext {
  onSelected: (selected: IFormAnswerBE[]) => void;
}

export default function Form(props: IFormProps) {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const { onSelected, currentQuestion, currentId, submitted } = props;
  const { answers, type } = currentQuestion;

  const isSingleSelect = type === QuestionType.SingleSelect;

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
    <ul className="options form-answers">
      {answers.map((answer, index) => {
        const optionId = `option-${index}`;
        let resultsClass = "";

        if (submitted) {
          resultsClass = answer.isCorrect ? "correct" : "wrong";
        }

        return (
          <li className="option" key={`answer-${index}`}>
            <input
              type={isSingleSelect ? "radio" : "checkbox"}
              id={optionId}
              value={answer.text}
              checked={selectedIndexes.indexOf(index) > -1}
              name={
                isSingleSelect
                  ? `question-${currentId}`
                  : `question-${currentId}-${index}`
              }
              className={resultsClass}
              disabled={submitted}
              onChange={() => {
                handleChange(index);
              }}
            />
            <label htmlFor={optionId}>{answer.text}</label>
          </li>
        );
      })}
    </ul>
  );
}
