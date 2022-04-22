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

const Answer = () => {
  const { currentQuestion } = useContext(InitContext);
  return (
    <div className={styles.answerContainer}>
      <h1>题干：{currentQuestion?.title} </h1>
      {currentQuestion?.type === 1 && <SingleChoice></SingleChoice>}
      {currentQuestion?.type === 2 && <MultipleChoice></MultipleChoice>}
      {currentQuestion?.type === 3 && <GapFill></GapFill>}
    </div>
  );
};
export default Answer;
