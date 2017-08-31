/**
 * 将json对象转化为 ',' 分隔的序列字符串
 */
function serializeJSON (obj) {
  let arr = []
  let result
  for (var key in obj) {
    arr.push(key + '="' + obj[key] + '"')
  }
  result = arr.join(',')
  return result
}

/**
 * 数组转字符串
 */
function arrToStr (arr) {
  if (typeof arr === 'undefined' || !(arr instanceof Array)) {
    return ''
  }
  return arr.join(',')
}

/**
 * 字符串转数组
 */
function strToArr (str) {
  if (typeof str === 'undefined' || str === '' || str === null) {
    return []
  }
  return str.split(',')
}

module.exports = {
  serializeJSON,
  arrToStr,
  strToArr
}
