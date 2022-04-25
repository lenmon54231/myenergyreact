import { InitContext } from '@/pages/AnswerPage/index';
import { useContext, useState } from 'react';
import { saveResult } from '../useData/index';
import { questionOption } from '@/pages/AnswerPage/type';
import CheckList from '@/components/Base/BaseCheckList/index';

const MakeChoice = (props: { type: number }) => {
  const { type } = props;
  const { currentQuestion, result, setResult } = useContext(InitContext);
  const [choseValue, setChoseValue] = useState([]);
  console.log('currentQuestion: ', currentQuestion);
  const choseAnswer = (value: Array<questionOption>) => {
    console.log('parentValue: ', value);
    // saveResult(value, result, setResult, currentQuestion);
  };
  return (
    <div>
      <CheckList
        multiple={type === 1 ? false : true} // 2是多选，1是单选
        onChange={(value: Array<questionOption>) => {
          choseAnswer(value);
        }}>
        {currentQuestion?.options?.map((item) => {
          return <div key={item.id}>{item}</div>;
        })}
      </CheckList>
    </div>
  );
};
export default MakeChoice;
