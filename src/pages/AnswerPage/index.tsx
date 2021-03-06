import {  Button } from 'antd-mobile';
import Answer from '@/components/Answer';
import { getQuestionInfo } from '@/api/answer/index';
import { useEffect, useState, createContext, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './index.module.less';
import {
  typeCurrentQuestion,
  typeResult,
  interfaceResultContext,
} from './type';
import TopNavBar from '@/layout/TopNavBar/index';
const result: never[] = [];
const setResult = () => {};
const currentQuestion: typeCurrentQuestion = {
  id: '',
  questionNum: 1,
  type: 0,
  title: '',
  questionPaperId: '',
  options: [],
};
const setCurrentQuestion = () => {};
const isSubmitButtonDisabled = false;
const setIsSubmitButtonDisabled = () => {};
const resultContext: interfaceResultContext = {
  result,
  setResult,
  currentQuestion,
  setCurrentQuestion,
  isSubmitButtonDisabled,
  setIsSubmitButtonDisabled,
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
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false); // 提交按钮是否禁用

  useEffect(() => {
    getQuestionInfo({
      id: searchParams.get('id'),
    }).then((res) => {
      if (res.status === 200) {
        questionList.length = 0;
        setQuestionList(res?.result?.list);
        // res.result.list[1].type = 2;
        // setCurrentQuestion(res?.result?.list[1]);
        setCurrentQuestion(res?.result?.list[0]);
      }
    });
  }, []);

  const submitAnswer = () => {
    console.log(result, 'result');
  };

  const changeCurrentQuestion = (action: string) => {
    const index = questionList.findIndex(
      (item) => item.id === currentQuestion.id,
    );
    console.log('index: ', index);

    if (index === questionList.length) {
      submitAnswer();
    } else {
      if (action === 'next') {
        if (index !== questionList.length - 1) {
          setCurrentQuestion(questionList[index + 1]);
        }
      }
      if (action === 'prev') {
        setCurrentQuestion(questionList[index - 1]);
      }
    }
  };

  const checkFooterButtonStatus = () => {
    let pass = false;
    result.forEach((e) => {
      console.log(e.questionId, currentQuestion.id);
      if (e.questionId === currentQuestion.id) {
        pass = true;
      }
    });
    return pass;
  };

  return (
    <InitContext.Provider
      // value就是通过context 共享的数据 这里是store
      value={{
        result,
        setResult,
        currentQuestion,
        setCurrentQuestion,
        isSubmitButtonDisabled,
        setIsSubmitButtonDisabled,
      }}>
      <div>
        <TopNavBar title='答题页'/> 
        <Answer></Answer>
        <div className={styles.footerContainer}>
          {(currentQuestion?.questionNum as number) > 1 ? (
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
              disabled={
                checkFooterButtonStatus() && !isSubmitButtonDisabled
                  ? false
                  : true
              }
              onClick={() => changeCurrentQuestion('next')}>
              {currentQuestion?.questionNum === questionList.length
                ? '提交'
                : '下一题'}
            </Button>
          </div>
        </div>
      </div>
    </InitContext.Provider>
  );
};

export default AnswerPage;
