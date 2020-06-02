export enum QuestionType {
  SingleSelect,
  MultipleSelect,
}

export interface IProperties {
  isAvailable?: boolean;
  isDisabled?: boolean;
  isEnabled?: boolean;
  passmark?: number;
  resultsViewActive?: boolean;
  isCompleted?: boolean;
}

export interface IFormAnswerBE {
  id: number;
  isCorrect: boolean;
  text: string;
}

export interface IFormQuestionBE {
  id: number;
  type: QuestionType;
  title: string;
  description: string;
  explanation: string;
  answers: IFormAnswerBE[];
}

export interface IScreenButton {
  text: string;
  id: string;
}

export interface IFormScreenBE {
  title: string;
  description?: string;
  buttonText?: string;
  buttons?: IScreenButton[];
}
export interface IFormBE {
  welcomeScreen: IFormScreenBE;
  successScreen: IFormScreenBE;
  failScreen: IFormScreenBE;
  questions: IFormQuestionBE[];
  properties: IProperties;
}

export type QuizSummary = Array<QuestionSummary>;
export type QuestionSummary = {
  question: IFormQuestionBE;
  answerIds: Array<number>;
};

export interface IFormSDK {
  id: number;
  data: IFormBE;
  submit: (questionId: number, answers: Array<number>) => Promise<void>;
  questions: AsyncIterator<IFormQuestionBE>;
  getSummary: () => Promise<QuizSummary>;
}
