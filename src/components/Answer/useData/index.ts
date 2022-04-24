import { typeResult, typeCurrentQuestion } from '@/pages/AnswerPage/type';
export const saveResult = (
  value: any,
  result: Array<typeResult>,
  setResult: (result: Array<typeResult>) => void,
  currentQuestion: typeCurrentQuestion,
) => {
  console.log('value: ', value);
  let arr = [...result];

  value.forEach((element: { id: any; code: any }) => {
    let obj = {
      optionsId: '',
      questionId: '',
      result: '',
      questionNumber: 0,
    };
    switch (currentQuestion.type) {
      case 3:
        Object.assign(obj, {
          optionsId: currentQuestion?.options[0].id,
          questionId: currentQuestion?.id,
          result: JSON.stringify(value[0]),
          questionNumber: currentQuestion?.questionNum,
          isFilterResult: 'id', // 只保留result中的id
        });
        break;
      case 1:
      case 2:
        Object.assign(obj, {
          optionsId: element.id,
          questionId: currentQuestion?.id,
          result: element.code,
          questionNumber: currentQuestion.questionNum,
        });
        break;
      default:
        break;
    }
    arr = changeArr(arr, currentQuestion, obj);
  });

  setResult(arr);
};

const changeArr = (
  arr: Array<typeResult>,
  currentQuestion: typeCurrentQuestion,
  obj: typeResult,
) => {
  if (arr.length === 0) {
    arr.push(obj);
  } else {
    arr.forEach((element, index) => {
      if (
        element.questionId === currentQuestion.id &&
        element.result === obj.result
      ) {
        arr.splice(index, 1, obj);
      } else {
        arr.push(obj);
      }
    });
  }
  return arr;
};
