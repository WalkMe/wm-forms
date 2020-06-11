import React from "react";
import useSummaryManager, {
  ISummaryItem,
} from "../../../hooks/useSummaryManager";
import { IFormAnswerBE } from "../../../interfaces/form/form.interface";

export default function SummaryContent({
  summary,
}: {
  summary: ISummaryItem[];
}) {
  const {
    getAnswerIds,
    isCorrectAnswer,
    filterCorrectAnswers,
  } = useSummaryManager();

  return (
    <div className="overview-summary-list">
      <ul className="list">
        {summary.map((item: ISummaryItem, index: number) => {
          const itemCounter = `${index + 1}. `;
          return (
            <li key={`summary-item-${itemCounter}`} className="summary-item">
              <p className="summary-title">
                <span className="counter">{itemCounter}</span>{" "}
                {item.question.title}
              </p>
              <div className="summary-overview">
                <div className="user-selection">
                  <span className="sub-title bold">Your Answers</span>
                  {getAnswerIds(item).map((answer, index) => {
                    return (
                      <div
                        key={`answer-selection-${itemCounter}-${index}`}
                        className={`answer ${
                          answer.isCorrect ? "success" : "error"
                        }`}
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
                            key={`correct-answer-${itemCounter}-${index}`}
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
        })}
      </ul>
    </div>
  );
}
