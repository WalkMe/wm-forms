export interface IProperties {
  isAvailable?: boolean;
  isDisabled?: boolean;
  isEnabled?: boolean;
  passmark?: number;
  resultsViewActive?: boolean;
  isCompleted?: boolean;
}

export interface IFormAnswerBE {
  isCorrect: boolean;
  text: string;
}

export interface IFormQuestionBE {
  type: number;
  title: string;
  description: string;
  explanation: string;
  answers: IFormAnswerBE[];
}

export interface IFormScreenBE {
  title: string;
  description?: string;
  buttonText?: string;
}

export interface IFormBE {
  welcomeScreen: IFormScreenBE;
  successScreen: IFormScreenBE;
  failScreen: IFormScreenBE;
  questions: IFormQuestionBE[];
  properties: IProperties;
}
