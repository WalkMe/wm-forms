import React from "react";

import useSummaryManager, {
  ISummaryItem,
} from "../../../hooks/useSummaryManager";

export default function OverviewHeader({
  summary,
}: {
  summary: ISummaryItem[];
}) {
  const { getTotalCorrectAnswers } = useSummaryManager();
  return (
    <>
      <h2 className="title">
        <span className="text">Your Quiz Summary </span>
        <span className="details">
          <span className="bold">
            {summary && getTotalCorrectAnswers(summary).length}
          </span>
          /{summary && summary.length}
        </span>
      </h2>
    </>
  );
}
