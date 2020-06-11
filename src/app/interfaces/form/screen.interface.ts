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
