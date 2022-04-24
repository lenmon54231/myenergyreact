export type questionOption = {
  code: string;
  content: string;
  id: string;
  images: string;
  isOption: number;
};

export type typeCurrentQuestion = {
  id: string;
  questionNum: number;
  type: number;
  title: string;
  questionPaperId: string;
  options: Array<questionOption>;
};

export type typeResult = {
  questionId: string;
  optionsId: string;
  result: string;
  questionNumber: number;
};

export interface interfaceResultContext {
  result: Array<typeResult> | Array<[]>;
  // setResult: Dispatch<SetStateAction<Array<typeResult>>> | null;
  setResult: (result: Array<typeResult>) => void;
  currentQuestion: typeCurrentQuestion;
  setCurrentQuestion: (currentQuestion: typeCurrentQuestion) => void;
  isSubmitButtonDisabled: boolean;
  setIsSubmitButtonDisabled: (isSubmitButtonDisabled: boolean) => void;
}
