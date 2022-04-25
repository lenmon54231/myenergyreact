import styles from './index.module.less';
import {
  useState,
  useEffect,
  useContext,
  ReactChild,
  ReactFragment,
  ReactPortal,
} from 'react';
import MakeChoice from './makeChoice';
import GapFill from './gapFilling';
import { InitContext } from '@/pages/AnswerPage/index';

const Answer = () => {
  const { currentQuestion } = useContext(InitContext);
  return (
    <div className={styles.answerContainer}>
      <h1>题干：{currentQuestion?.title} </h1>
      {(currentQuestion?.type === 2 || currentQuestion?.type === 1) && (
        <MakeChoice type={currentQuestion?.type}></MakeChoice>
      )}
      {currentQuestion?.type === 3 && <GapFill></GapFill>}
    </div>
  );
};
export default Answer;
