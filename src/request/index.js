import axios from 'axios';
import { Toast } from 'antd-mobile';
import history from '@/utils/history';
import { whiteUrlList } from './whiteUrlList';
axios.defaults.timeout = 100000;
axios.defaults.baseURL = 'https://alpha-puniversity.wanxue.cn/';

// const router = new BrowserRouter();
/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    const { url } = config;
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json',
      a: 15,
      h: 'wanxue',
      p: 5,
    };

    //当请求路径不是这两个的时候, 添加token请求头
    config.headers.t = sessionStorage.getItem('token') || '';
    if (whiteUrlList.findIndex((item) => item === url) === -1) {
      if (!config.headers.t) {
        history.replace('/login');
        return Promise.reject({
          data: '未登录',
          code: 'unToken',
        });
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        // 关闭进度条
        resolve(response.data);
      },
      (err) => {
        reject(err);
      },
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msg(err);
        reject(err);
      },
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msg(err);
        reject(err);
      },
    );
  });
}

// 统一接口处理，返回数据
const http = (fetch, url, param) => {
  // let _data = ""
  return new Promise((resolve, reject) => {
    switch (fetch) {
      case 'get':
        get(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        break;
      case 'post':
        post(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        break;
      default:
        break;
    }
  });
};

// 失败提示
function msg(err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        Toast(err.response.data.error.details);
        break;
      case 401:
        Toast('未授权，请登录');
        break;

      case 403:
        Toast('拒绝访问');
        break;

      case 404:
        Toast('请求地址出错');
        break;

      case 408:
        Toast('请求超时');
        break;

      case 500:
        Toast('服务器内部错误');
        break;

      case 501:
        Toast('服务未实现');
        break;

      case 502:
        Toast('网关错误');
        break;

      case 503:
        Toast('服务不可用');
        break;

      case 504:
        Toast('网关超时');
        break;

      case 505:
        Toast('HTTP版本不受支持');
        break;
      default:
    }
  }
}

export default http;
