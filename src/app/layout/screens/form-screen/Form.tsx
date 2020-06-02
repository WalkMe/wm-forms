import React, { useState, useEffect } from "react";
import {
  IFormAnswerBE,
  QuestionType,
} from "../../../interfaces/form/form.interface";
import { IFormContext } from "./FormScreen";

import { config } from "../../../config";
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
  const { onSelected } = props;
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const { getInput } = useFormManager({ ...formContext, selectedIndexes });
  const { currentQuestion, currentRouteId } = formContext;
  const { type } = currentQuestion;

  const isSingleSelect = type === QuestionType.SingleSelect;
  const isMultipleSelect = type === QuestionType.MultipleSelect;
  const { multipleSelectMsg } = localization;
  const formClass = isSingleSelect ? "single" : "multiple";

  // In case one of the answers characters greater than configuration property
  const options = currentQuestion.answers;
  const isLongTextAnswer = options.some(
    (option) => option.text.length > config.answerMinimumCharacters
  );

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
  }, [currentRouteId]);

  /** managing   */
  useEffect(() => {
    const selectedAnswers = selectedIndexes.map((index) => {
      return options[index];
    });
    onSelected(selectedAnswers);
  }, [selectedIndexes]);

  return (
    <div className={`form-options ${formClass}`}>
      <MessageContainer message={isMultipleSelect ? multipleSelectMsg : ""} />
      <ul className={`options`}>
        {options.map((option, index) => {
          const inputData = getInput({ type, option, index });
          const input = {
            ...inputData,
            labelType: isLongTextAnswer ? "long-text" : "",
            handleChange: () => handleChange(index),
          };

          return (
            <li className="option" key={`option-${index}`}>
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
