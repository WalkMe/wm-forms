import React from "react";

import {
  IFormQuestionBE,
  IFormAnswerBE,
} from "../interfaces/form/form.interface";

export interface ISummaryItem {
  question: IFormQuestionBE;
  answerIds: number[];
}

export const fakeSummary = [
  {
    question: {
      id: 9992,
      answers: [
        { id: 28205, isCorrect: true, text: "Correct answer" },
        { id: 28206, isCorrect: false, text: "Distractor option" },
      ],
      description: "",
      title: "Ask the first quiz question",
      type: 0,
    },
    answerIds: [28205], // correct
  },
  {
    question: {
      id: 10150,
      answers: [
        { id: 28605, isCorrect: true, text: "Correct answer" },
        { id: 28606, isCorrect: false, text: "Distractor option" },
        { id: 28607, isCorrect: true, text: "This is also a correct answer" },
        {
          id: 28608,
          isCorrect: false,
          text:
            "This option appears to confuse the user but this is not the a correct answer",
        },
        {
          id: 28609,
          isCorrect: true,
          text: "Select this option (this is also a correct answer)",
        },
        {
          id: 28610,
          isCorrect: false,
          text: "here are many variations of passages of Lorem Ipsum available",
        },
      ],
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable. If you are going to use a passage of Lorem Ipsum",
      title:
        "An example of 190 characters question to check edge cases, using Lorem ipsum as a dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text.",
      type: 1,
    },
    answerIds: [28605, 28608, 28610], // wrong
  },
  {
    question: {
      id: 10151,
      answers: [
        {
          id: 28611,
          isCorrect: true,
          text:
            "Correct answer - The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
        },
        {
          id: 28612,
          isCorrect: false,
          text:
            "Distractor option - The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        },
      ],
      description: "A short description",
      title:
        "This is the third question, you should know the answer, don&#39;t guess",
      type: 0,
    },
    answerIds: [28612], // wrong
  },
  {
    question: {
      id: 10152,
      answers: [
        {
          id: 28613,
          isCorrect: true,
          text: "Correct answer - Lorem Ipsum is simply dummy text",
        },
        { id: 28614, isCorrect: false, text: "Distractor option " },
        {
          id: 28615,
          isCorrect: true,
          text:
            " The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
        },
      ],
      description: "",
      title: "What is Lorem Ipsum?",
      type: 1,
    },
    answerIds: [28614], // wrong
  },
  {
    question: {
      id: 10153,
      answers: [
        {
          id: 28616,
          isCorrect: true,
          text:
            "Correct answer -  If you are going to use a passage of Lorem Ipsum, you need to be sure there isn&#39;t anything embarrassing hidden in the middle of text",
        },
        {
          id: 28617,
          isCorrect: false,
          text:
            "Distractor option - All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
        },
      ],
      description: "",
      title: "How can I use Lorem ipsum?",
      type: 0,
    },
    answerIds: [28616], // correct
  },
];

export default function useSummaryManager() {
  const filterCorrectAnswers = (answers: IFormAnswerBE[]) =>
    answers.filter((answer) => answer.isCorrect);

  const isCorrectAnswer = (answerIds: number[], answers: IFormAnswerBE[]) => {
    const correctAnswers = filterCorrectAnswers(answers);
    const answerIdsMatchAreCorrect = correctAnswers.every((answer) =>
      answerIds.includes(answer.id)
    );

    return (
      answerIdsMatchAreCorrect && correctAnswers.length === answerIds.length
    );
  };

  const getTotalCorrectAnswers = (summaryData: ISummaryItem[]) => {
    const correctAnswersArr =
      summaryData &&
      summaryData.filter((item) => {
        const {
          question: { answers },
          answerIds,
        } = item;

        if (answerIds && isCorrectAnswer(answerIds, answers)) {
          return item;
        }
      });

    return correctAnswersArr;
  };

  const getAnswerIds = (item: ISummaryItem) => {
    const { answerIds } = item;
    return item.question.answers.filter((answer) => {
      if (answerIds.includes(answer.id)) {
        return answer;
      }
    });
  };

  return {
    getAnswerIds,
    getTotalCorrectAnswers,
    isCorrectAnswer,
    filterCorrectAnswers,
  };
}
