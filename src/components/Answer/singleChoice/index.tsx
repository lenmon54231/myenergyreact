import { InitContext } from '@/pages/AnswerPage/index';
import { useContext } from 'react';

const SingleChoice = () => {
  const { currentQuestion } = useContext(InitContext);
  console.log('currentQuestion: ', currentQuestion);

  return <div>SingleChoice</div>;
};
export default SingleChoice;
