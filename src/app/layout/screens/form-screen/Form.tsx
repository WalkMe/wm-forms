import React, { useState, useEffect, useRef } from "react";
import { IFormContext } from "./FormScreen";
import { IFormAnswerBE } from "../../../interfaces/form/form.interface";

interface IFormProps extends IFormContext {
  onSelected: (selected: IFormAnswerBE) => void;
  submitted: boolean;
}

export default function Form(props: IFormProps) {
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const { onSelected, currentQuestion, currentId, submitted } = props;
  const { answers, type } = currentQuestion;

  const handleChange = (index: number) => {
    onSelected(answers[index]);
    setSelectedIndex(index);
  };

  useEffect(() => {
    setSelectedIndex(undefined);
  }, [currentId]);

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
              type="radio"
              id={optionId}
              value={answer.text}
              checked={selectedIndex === index}
              name={`question-${currentId}`}
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
