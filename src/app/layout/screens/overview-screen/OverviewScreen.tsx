import React, { useContext, useEffect, useState } from "react";

import { ScreenType } from "../../../interfaces/screen/screen.interface";
import {
  IFormQuestionBE,
  IFormAnswerBE,
} from "../../../interfaces/form/form.interface";
import Popup from "../../../components/popup/Popup";
import useSummaryManager from "../../../hooks/useSummaryManager";
import OverviewHeader from "./OverviewHeader";
import SummaryContent from "./OverviewContent";

export interface ISummaryItem {
  question: IFormQuestionBE;
  answerIds: number[];
}
export interface IOverviewScreenProps {
  isVisible: boolean;
  onClose: () => void;
  overviewData: ISummaryItem[];
}

export default function OverviewScreen(props: IOverviewScreenProps) {
  const { isVisible, overviewData, onClose } = props;
  const { getTotalCorrectAnswers } = useSummaryManager();
  const [summary, setSummary] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (overviewData) {
      getTotalCorrectAnswers(overviewData);
      setSummary(overviewData);
    }
  }, [overviewData]);

  useEffect(() => {
    if (summary && isVisible) {
      setShowPopup(true);
    }
  }, [summary, isVisible]);

  return (
    <Popup
      onClose={() => {
        setShowPopup(false);
        onClose();
      }}
      className={ScreenType.Overview}
      isOpen={showPopup}
      header={summary && <OverviewHeader summary={summary} />}
    >
      {summary && <SummaryContent summary={summary} />}
    </Popup>
  );
}
