import styles from './index.module.less';
import {
  useState,
  useEffect,
  useContext,
  ReactChild,
  ReactFragment,
  ReactPortal,
} from 'react';
import SingleChoice from './singleChoice';
import MultipleChoice from './multipleChoice';
import GapFill from './gapFilling';
import { InitContext } from '@/pages/AnswerPage/index';

const Answer = (props: {
  currentQuestion: {
    title:
      | boolean
      | ReactChild
      | ReactFragment
      | ReactPortal
      | null
      | undefined;
    type: number;
  };
}) => {
  const { result, setResult } = useContext(InitContext);
  console.log(result, 'result1111');

  return (
    <div className={styles.answerContainer}>
      <h1>
        题干：{props?.currentQuestion?.title}-
        {result[result.length - 1]?.result}
      </h1>
      {props?.currentQuestion?.type === 1 && (
        <SingleChoice currentQuestion={props?.currentQuestion}></SingleChoice>
      )}
      {props?.currentQuestion?.type === 2 && (
        <MultipleChoice
          currentQuestion={props?.currentQuestion}></MultipleChoice>
      )}
      {props?.currentQuestion?.type === 3 && (
        <GapFill currentQuestion={props?.currentQuestion}></GapFill>
      )}
    </div>
  );
};
export default Answer;
