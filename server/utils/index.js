/**
 * 将json对象转化为 ',' 分隔的序列字符串
 */
function serializeJSON (obj) {
  let arr = [], result
  for (var key in obj) {
    arr.push(key + '="' + obj[key] + '"')
  }
  
  result = arr.join(',')
  return result
}

module.exports = {
  serializeJSON
}