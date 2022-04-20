import http from '../../request/index';

function getQuestionInfo(query) {
  return http('get', 'evaluate/v1/question/paper', query);
}

export { getQuestionInfo };
