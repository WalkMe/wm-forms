import React from "react";
import { IFormContext } from "./FormScreen";
import { IFormAnswerBE } from "../../../interfaces/form/form.interface";

interface IFormProps extends IFormContext {
  onSelected: (selected: IFormAnswerBE) => void;
}

export default function Form(props: IFormProps) {
  const { onSelected, currentQuestion, currentId } = props;
  const { answers, type } = currentQuestion;

  return (
    <ul className="options form-answers">
      {answers.map((answer, index) => {
        return (
          <li className="option" key={`answer-${index}`}>
            <input
              type="radio"
              id={answer.text}
              value={answer.text}
              name={`question-${currentId}`}
              onChange={() => onSelected(answers[index])}
            />
            <label htmlFor={answer.text}>{answer.text}</label>
          </li>
        );
      })}
    </ul>
  );
}
