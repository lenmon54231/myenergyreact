import http from '../../request/index';

function getTestInfo(id) {
  return http('get', 'evaluate/v1/evaluate/' + id);
}

export { getTestInfo };
