import { IFormQuestionBE } from "./form.interface";

export type FormSummary = Array<QuestionSummary>;

export type QuestionSummary = {
  question: IFormQuestionBE;
  answerIds: Array<number>;
};
