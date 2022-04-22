import http from '../../request/index';

function getQuestionInfo(query) {
  return http('get', 'evaluate/v1/question/paper', query);
}
function getSchoolListByKeyWord(query) {
  return http('get', 'evaluate/question/bank/options/search', query);
}

export { getQuestionInfo, getSchoolListByKeyWord };
