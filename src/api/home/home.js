import http from '../../request/index';

/**
 * 获取首页列表
 */
function getHomeTestList() {
  return http('get', 'evaluate/v1/evaluate/home');
}

export { getHomeTestList };
