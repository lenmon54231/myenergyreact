import http from '../../request/index';

function login(query) {
  return http('get', 'auth/v2/basic/mobile-code', query);
}
function getToken(params) {
  return http('post', 'auth/v1/account/message/token', params);
}

export { login, getToken };
