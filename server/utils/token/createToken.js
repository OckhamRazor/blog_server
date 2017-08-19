const jwt = require('jsonwebtoken')
const config = require('../../config/config')

// 登录时：核对用户名和密码成功后，应用将用户的id（图中的user_id）作为JWT Payload的一个属性
module.exports = function (userId) {
  const token = jwt.sign({
    userId: userId
  }, config.tokenKey, {
    expiresIn: '10h' // 过期时间设置为60s
  })
  return token
}
