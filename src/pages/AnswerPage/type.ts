// import { Dispatch, SetStateAction } from 'react';

export type typeCurrentQuestion = {
  id: string;
  questionNum: number;
  type: number;
  title: string;
  questionPaperId: string;
  options: string[];
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
}
