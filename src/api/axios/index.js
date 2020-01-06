import axios from 'axios'
import {Loading, Message} from 'element-ui'
import _ from "lodash"

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
/* 声明请求对象 */
let request = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  withCredentials: true,//默认携带cookie
  timeout: 20 * 1000,//请求超时20秒
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'usingLoading': true
  },
  transformRequest: [function (data) {
    let newData = '';
    for (let item in data) {
      if (data.hasOwnProperty(item)) {
        newData += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
      }
    }
    return newData
  }]
});
/* 服务等待对象 */
let loading;
/* 请求池,表示当前请求的数量 */
let requestPoolCounts = 0;
/* 缓存正在请求中的url */
let requestPoolPaths = [];

/** 展示loading */
function showLoading(target, loadText = '加载中...') {
  // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
  // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
  if (requestPoolCounts === 0 && !loading) {
    loading = Loading.service({
      lock: true,
      text: loadText,
      background: 'rgba(255, 255, 255, 0.5)',
      target: target || "body",
      fullscreen: false,
      customClass: 't_unselect'
    });
  }
  requestPoolCounts++;
}

/** 隐藏loading */
function hideLoading(flag = true) {
  if (flag) {
    requestPoolCounts--;
    requestPoolCounts = Math.max(requestPoolCounts, 0);//取回最小0值
    if (requestPoolCounts === 0) {
      executeHideLoading();
    }
  }
}

/* 请求的url重复检测 */
function duplicatePathCheck(url) {
  if (url && requestPoolPaths.indexOf(url) !== -1) {
    /* 找到了相同请求 提醒并返回 */
    Message.warning('请勿连续提交相同请求!');
    return false;
  } else {
    /* 没找到,是新的请求 */
    return true;
  }
}

/* 请求成功后 清除请求 */
function clearFinishedURL(url) {
  for (let i = 0; i < requestPoolPaths.length; i++) {
    if (requestPoolPaths[i] === url) {
      requestPoolPaths.splice(i, 1);
      break;
    }
  }
}

/** 去重loading防抖
 *  允许防抖函数300ms 被调用一次，在300以内调用，会刷新等待事件
 *  */
let executeHideLoading = _.debounce(() => {
  loading.close();
  loading = null
}, 300);

/* 请求出错重置数据
*  重置请求计数
*  重置请求url缓存
*  隐藏loading
*  */
function resetRequest() {
  requestPoolCounts = 0;
  requestPoolPaths = [];
  executeHideLoading();
}

/* 请求拦截器 */
request.interceptors.request.use(config => {
  /* 请求重复判断
   * 新请就放行,且请求数组队列添加此路径
   * 重复请求,则中断请求 */
  let url = config.baseURL + config.url;
  if (duplicatePathCheck(url)) {
    requestPoolPaths.push(url)
  } else {
    config.cancelToken = source.token;
    source.cancel("请勿连续发起重复请求!");
  }
  /* 当请求头 'showLoading 不为 false' 时, 即需要loading时 */
  if (config.headers.usingLoading) {
    /* 使用传入的元素执行loading, 如果没有传入, 默认使用body */
    showLoading(config.headers.loadingTarget);
  }
  return config
}, error => {
  /*
  判断当前请求是否设置了不显示Loading
  error.headers.usingLoading
  */
  resetRequest();
  return Promise.reject(error)
});

/* 响应拦截器 */
request.interceptors.response.use(response => {
  clearFinishedURL(response.config.url);
  /* 如果头文件使用loading 则关闭loading */
  hideLoading(response.config.headers.usingLoading);
  return response
}, error => {
  // console.log(error);
  // if (axios.isCancel(error)) {
  //   console.log('错误信息:', error.message);
  // }
  resetRequest();
  // clearFinishedURL(error.config.url);
  /* 如果头文件使用loading 则关闭loading */
  /* error.config.headers.usingLoading */
  // hideLoading();
  // Message.error("请求错误,请等待刷新后重试,如再出现错误请及时联系系统管理员!");
  return Promise.reject(error)
});

export default request
