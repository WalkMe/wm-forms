import React from "react";
import { IFormContext } from "./FormScreen";

export default function FormHeader(
  props: IFormContext & { hideDescription?: boolean }
) {
  const { currentRouteId, questionsLength, currentQuestion } = props;

  return (
    <>
      <div className="pager">
        <span className="text">
          {currentRouteId} of {questionsLength}
        </span>
      </div>
      <h2 className="title">
        <span className="text">{currentQuestion.title}</span>
      </h2>
    </>
  );
}
