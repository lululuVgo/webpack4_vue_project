
/** 解决浮点数计算精度确实
 *  避免数据相加后小数位数引起的多位数或数据精度缺失
 */

/**
 * 加法
 * @param num1 加数1
 * @param num2 加数2
 */
function numAdd (num1, num2) {
  let baseNum, baseNum1, baseNum2;
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  return (num1 * baseNum + num2 * baseNum) / baseNum
}

/**
 * 减法
 * @param num1 被减数
 * @param num2 减数
 */
function numSub (num1, num2) {
  let baseNum, baseNum1, baseNum2;
  let precision ;// 精度
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
  return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision)
}

/**
 * 乘法
 * @param num1 被乘数
 * @param num2 乘数
 */
function numMulti (num1, num2) {
  let baseNum = 0;
  try {
    baseNum += num1.toString().split('.')[1].length
  } catch (e) {
  }
  try {
    baseNum += num2.toString().split('.')[1].length
  } catch (e) {
  }
  return Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / Math.pow(10, baseNum)
}

/**
 * 除法
 * @param num1 被除数
 * @param num2 除数
 */
function numDiv (num1, num2) {
  let baseNum1 = 0, baseNum2 = 0;
  let baseNum3, baseNum4;
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  // with (Math) {
  //   baseNum3 = Number(num1.toString().replace(".", ""));
  //   baseNum4 = Number(num2.toString().replace(".", ""));
  //   return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
  // }
}

export default {
  numAdd, numSub, numMulti, numDiv
}
