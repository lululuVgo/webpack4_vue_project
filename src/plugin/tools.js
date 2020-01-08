/* 项目工具方法 */

/** 时间转换
 *  @params
 *  date 需要转化的日期参数 ex: '2019-1-1'
 *  method 以什么样的格式转化 ex: 'YYYY-MM-DD hh:mm:ss'
 * @return {string | boolean} ex: "2019-01-01 00:00:00"
 * */
const formatDate = function (date, method) {
  let _d = new Date(date);
  if (_d.toString() === 'Invalid Date') {
    //时间无法解析的  无效日期
    return false
  }
  let YYYY = _d.getFullYear();
  let M = (_d.getMonth() + 1).toString();
  let D = _d.getDate().toString();
  let h = _d.getHours().toString();
  let m = _d.getMinutes().toString();
  let s = _d.getSeconds().toString();
  let MM = M.padStart(2, '0');
  let DD = D.padStart(2, '0');
  let hh = h.padStart(2, '0');
  let mm = m.padStart(2, '0');
  let ss = s.padStart(2, '0');
  let time = {YYYY, MM, DD, hh, mm, ss};
  return method.replace(/(YYYY)|(MM)|(DD)|(hh)|(mm)|(ss)/g, key => time[key])
};

/** axios 文件下载
 * @params
 * content 请求返回的2进制文件流
 * filename 当前下载文档的名称 例如:下载实例.doc    不传文件名参数会出错
 * @return
 * 无返回值
 */
const downloadFile = function (content, fileName) {
  const blob = new Blob([content]);
  if ('download' in document.createElement('a')) {
    const elink = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink)
  } else {
    navigator.msSaveBlob(blob, fileName)
  }
};

/** 页面提醒 */
const pageMessage = function (text, type = 'error', duration = 1000) {
  this.$message({
    message: text, // 提示文本
    type: type, // message 类型 info,warning,error,success
    duration: duration, // 过渡时延
    offset: 120
  })
};

/** 抛出错误 */
// const valRequire = function () {
//   throw new Error('Invalid parameter(参数无效!)')
// };

/** 判断数组
 *  ES5及以上才支持Array.isArray
 *  使用方法兼容
 *  @params
 *  val 需要判断的变量
 *  @return
 *  boolean 是数组 true,不是数组 false
 */
const isArray = function (val) {
  if (!Array.isArray) {
    return Object.prototype.toString.call(val) === '[object Array]'
  } else {
    return Array.isArray(val)
  }
};

/** @description 随机16进制颜色生成
 *  @params
 *  @return 返回6位16进制颜色 ex:#ad1s4d
 */
const random16BinaryColor = function () {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
};

export default {
  formatDate,
  downloadFile,
  pageMessage,
  isArray,
  random16BinaryColor
}
