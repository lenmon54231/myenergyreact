import http from '../../request/index';

function login() {
  return http('get', 'auth/v2/basic/mobile-code');
}

export { login };
