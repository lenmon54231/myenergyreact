import { InitContext } from '@/pages/AnswerPage/index';
import { useContext, useState } from 'react';
import { CheckList } from 'antd-mobile';
import { saveResult } from '../useData/index';
import { questionOption } from '@/pages/AnswerPage/type';

const SingleChoice = () => {
  const { currentQuestion, result, setResult } = useContext(InitContext);
  const [choseValue, setChoseValue] = useState([]);
  console.log('currentQuestion: ', currentQuestion);
  const choseAnswer = (value: Array<questionOption>) => {
    console.log('value: ', currentQuestion, value);
    saveResult(value, result, setResult, currentQuestion);
  };
  return (
    <div>
      {currentQuestion?.options?.map((item) => {
        return <div key={item.id}>{item.content}</div>;
      })}
    </div>
  );
};
export default SingleChoice;
