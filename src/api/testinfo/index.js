import http from '../../request/index';

function getTestInfo(query) {
  return http('get', 'evaluate/v1/evaluate/', query);
}

export { getTestInfo };
