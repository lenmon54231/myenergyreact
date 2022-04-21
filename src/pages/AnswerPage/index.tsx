import { NavBar, Button } from 'antd-mobile';
import Answer from '@/components/Answer';
import { getQuestionInfo } from '@/api/answer/index';
import { useEffect, useState, createContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './index.module.less';
import type {
  typeCurrentQuestion,
  typeResult,
  interfaceResultContext,
} from './type';

const result: never[] = [];
const setResult = null;

const resultContext: interfaceResultContext = {
  result,
  setResult: (result: Array<typeResult>) => {},
};
export const InitContext = createContext(resultContext);

const AnswerPage = () => {
  const [result, setResult] = useState<Array<typeResult>>([]); // 答题结果列表

  const [questionList, setQuestionList] = useState(
    [] as Array<typeCurrentQuestion>,
  ); //所有试题列表
  const [searchParams, setSearchParams] = useSearchParams(); // 获取路由参数
  const [currentQuestion, setCurrentQuestion] = useState(
    {} as typeCurrentQuestion,
  ); // 当前题目
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1); // 当前题目索引
  useEffect(() => {
    getQuestionInfo({
      id: searchParams.get('id'),
    }).then((res) => {
      if (res.status === 200) {
        questionList.length = 0;
        setQuestionList(res?.result?.list);
        setCurrentQuestion(res?.result?.list[0]);
      }
    });
  }, []);

  const changeCurrentQuestion = (action: string) => {
    const index = questionList.findIndex(
      (item) => item.id === currentQuestion.id,
    );
    if (action === 'next') {
      if (index === questionList.length - 1) {
        setCurrentQuestionIndex(index + 1);
        return;
      } else {
        setCurrentQuestionIndex(index + 2);
        setCurrentQuestion(questionList[index + 1]);
      }
    }
    if (action === 'prev') {
      setCurrentQuestionIndex(index);
      setCurrentQuestion(questionList[index - 1]);
    }
  };

  return (
    <InitContext.Provider
      // value就是通过context 共享的数据 这里是store
      value={{
        result,
        setResult,
      }}>
      <div>
        <NavBar>答题页</NavBar>
        <Answer currentQuestion={currentQuestion}></Answer>
        <div className={styles.footerContainer}>
          {currentQuestionIndex > 1 ? (
            <div className={styles.buttonContainer}>
              <Button
                block
                color="primary"
                onClick={() => changeCurrentQuestion('prev')}>
                上一题
              </Button>
            </div>
          ) : (
            <div></div>
          )}
          <div className={styles.buttonContainer}>
            <Button
              block
              color="primary"
              onClick={() => changeCurrentQuestion('next')}>
              下一题
            </Button>
          </div>
        </div>
      </div>
    </InitContext.Provider>
  );
};

export default AnswerPage;
