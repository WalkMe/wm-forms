import React from "react";
import { IFormContext } from "./FormScreen";

export default function FormHeader(props: IFormContext) {
  const { currentId, questionsLength, currentQuestion } = props;
  return (
    <>
      <div className="pager">
        <span className="text">
          {currentId} of {questionsLength}
        </span>
      </div>
      <h2 className="title">
        <span className="text">{currentQuestion.title}</span>
      </h2>
      {currentQuestion.description && (
        <p className="description">{currentQuestion.description}</p>
      )}
    </>
  );
}
