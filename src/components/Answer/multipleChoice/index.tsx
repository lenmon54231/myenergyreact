import { InitContext } from '@/pages/AnswerPage/index';
import { useContext } from 'react';

const MultipleChoice = () => {
  const { currentQuestion } = useContext(InitContext);
  console.log('currentQuestion: ', currentQuestion);

  return <div>MultipleChoice</div>;
};
export default MultipleChoice;
