import React from "react";
import { ISummaryItem } from "../../../hooks/useSummaryManager";
import OverviewListItem from "./OverviewListItem";
import List from "../../../components/list/List";

export default function SummaryContent({
  summary,
}: {
  summary: ISummaryItem[];
}) {
  return (
    <div className="overview-summary-list">
      <List>
        <>
          {summary.map((item: ISummaryItem, index: number) => {
            const itemCounter = `${index + 1}. `;

            return (
              <OverviewListItem
                key={`summary-item-${itemCounter}`}
                item={item}
                itemCounterPreview={itemCounter}
              />
            );
          })}
        </>
      </List>
    </div>
  );
}
