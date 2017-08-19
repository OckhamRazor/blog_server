const jwt = require('jsonwebtoken')
const config = require('../../config/config')

/**
 * 根据用户ID生成token凭证
 * @param {string} userId 用户ID
 * @return {stirng} token 上传凭证
 */
function createUserToken (userId) {
  // 登录时：核对用户名和密码成功后，应用将用户的id（图中的user_id）作为JWT Payload的一个属性
  const token = jwt.sign({
    userId: userId
  }, config.tokenKey, {
    expiresIn: '10h' // 过期时间设置为60s
  })
  return token
}

/**
 * 校验token凭证有效性
 * @param {object} ctx
 * @return {stirng} token 上传凭证
 */
function checkUserToken (ctx, next) {
  const authorization = ctx.get('Authorization')
  if (authorization === '') {
    ctx.throw(401, 'no token detected in http header Authorization')
  }
  const token = authorization.split(' ')[1]
  try {
    jwt.verify(token, config.tokenKey) // 如果token过期或验证失败，将抛出错误
  } catch (err) {
    ctx.throw(401, 'invalid token')
  }
  next()
}

/**
 * 解析Token中携带的信息
 */
function decryptUserToken (token) {
  let data
  try {
    data = jwt.verify(token, config.tokenKey) // 如果token过期或验证失败，将抛出错误
  } catch (err) {
    console.error('token error:', err)
  }

  return data
}

module.exports = {
  createToken: createUserToken,
  checkToken: checkUserToken,
  decryptToken: decryptUserToken
}
