import { NavBar } from 'antd-mobile';
import Answer from '@/components/Answer';
import { getQuestionInfo } from '@/api/answer/index';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
const AnswerPage = () => {
  const [questionInfo, setQuestionInfo] = useState<any>({});
  const [questionList, setQuestionList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState({});
  useEffect(() => {
    getQuestionInfo({
      id: searchParams.get('id'),
    }).then((res) => {
      if (res.status === 200) {
        questionInfo.length = 0;
        questionList.length = 0;
        setQuestionInfo(res?.result);
        setQuestionList(res?.result?.list);
        setCurrentQuestion(res?.result?.list[0]);
      }
    });
  }, []);
  return (
    <div>
      <NavBar>答题页</NavBar>
      <Answer currentQuestion={currentQuestion}></Answer>
    </div>
  );
};

export default AnswerPage;
