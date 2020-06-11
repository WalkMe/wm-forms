import React from "react";

import { IFormAnswerBE } from "../../../interfaces/form/form.interface";
import useSummaryManager, {
  ISummaryItem,
} from "../../../hooks/useSummaryManager";

export default function OverviewListItem({
  item,
  itemCounterPreview,
}: {
  item: ISummaryItem;
  itemCounterPreview: string;
}) {
  const {
    getAnswerIds,
    isCorrectAnswer,
    filterCorrectAnswers,
  } = useSummaryManager();

  return (
    <li className="summary-item">
      <p className="summary-title">
        <span className="counter">{itemCounterPreview}</span>{" "}
        {item.question.title}
      </p>
      <div className="summary-overview">
        <div className="user-selection">
          <span className="sub-title bold">Your Answers</span>
          {getAnswerIds(item).map((answer, index) => {
            return (
              <div
                key={`answer-selection-${itemCounterPreview}-${index}`}
                className={`answer ${answer.isCorrect ? "success" : "error"}`}
              >
                <span className="text">{answer.text}</span>
              </div>
            );
          })}
        </div>
        {!isCorrectAnswer(item.answerIds, item.question.answers) && (
          <div className="correct-answers">
            <span className="sub-title bold">Correct Answers</span>
            {filterCorrectAnswers(item.question.answers).map(
              (answer: IFormAnswerBE, index: number) => {
                return (
                  <div
                    key={`correct-answer-${itemCounterPreview}-${index}`}
                    className="answer success"
                  >
                    <span className="text">{answer.text}</span>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </li>
  );
}
