const jwt = require('jsonwebtoken')

// 解析token获取用户信息
module.exports = async (ctx, next) => {
  const authorization = ctx.get('Authorization')
  const token = authorization.split(' ')[1]
  
  let _checkToken
  try {
    _checkToken = await jwt.verify(token, '1lover') // 如果token过期或验证失败，将抛出错误
  } catch (err) {
    console.error('token error:', err)
  }

  return _checkToken
}
