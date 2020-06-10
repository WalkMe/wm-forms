import React, { useState, useEffect, useRef } from "react";
import {
  IFormAnswerBE,
  QuestionType,
} from "../../../interfaces/form/form.interface";
import { IFormContext } from "./FormScreen";
import { IScreenAnimationConfig } from "../master-screen/MasterScreen";

import localization from "../../../consts/localization";
import RadioInput from "../../../components/inputs/radio-input/RadioInput";
import CheckboxInput from "../../../components/inputs/checkbox-input/CheckboxInput";
import useFormManager from "../../../hooks/useFormManager";
import MessageContainer from "../../../components/message-container/MessageContainer";
import useViewManager from "../../../hooks/useViewManager";

interface IFormProps {
  onSelected: (selected: IFormAnswerBE[]) => void;
  animationConfig?: IScreenAnimationConfig;
}

export default function Form({
  props,
  formContext,
}: {
  props: IFormProps;
  formContext: IFormContext;
}) {
  const { onSelected, animationConfig } = props;
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const { animateCoreElements } = useViewManager();
  const { getInput } = useFormManager({ ...formContext, selectedIndexes });
  const { currentQuestion, currentRouteId } = formContext;
  const { type } = currentQuestion;
  const options = currentQuestion.answers;
  const formTopSection = useRef<HTMLDivElement>(null);
  const formOptions = useRef<HTMLDivElement>(null);

  const isSingleSelect = type === QuestionType.SingleSelect;
  const isMultipleSelect = type === QuestionType.MultipleSelect;
  const { multipleSelectMsg } = localization;
  const formClass = isSingleSelect ? "single" : "multiple";

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

  useEffect(() => {
    const selectedAnswers = selectedIndexes.map((index) => {
      return options[index];
    });
    onSelected(selectedAnswers);
  }, [selectedIndexes]);

  useEffect(() => {
    animateCoreElements({
      elements: [formTopSection.current],
      animateClassName: "fadeInDown",
      timeout: animationConfig.topSection,
    });
    animateCoreElements({
      elements: [formOptions.current],
      animateClassName: "fadeInUp",
      timeout: animationConfig.options,
    });
  }, []);

  return (
    <>
      <div ref={formTopSection} className="form-top-section">
        {currentQuestion.description && (
          <p className="description">{currentQuestion.description}</p>
        )}
      </div>
      {isMultipleSelect && (
        <MessageContainer
          message={multipleSelectMsg}
          animateConfig={{
            animateClass: "fadeInDown",
            timeout: animationConfig.topSection,
          }}
        />
      )}
      <div ref={formOptions} className={`form-options ${formClass}`}>
        <ul className={`options`}>
          {options.map((option, index) => {
            const inputData = getInput({ type, option, index });
            const input = {
              ...inputData,
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
    </>
  );
}
