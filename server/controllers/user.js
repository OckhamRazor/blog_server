const userInfoService = require('./../services/userInfo')
const userToken = require('../utils/token/user_token')

module.exports = {

  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async signIn (ctx) {
    let formData = ctx.request.body
    let result = await userInfoService.signIn(formData)

    ctx.body = result
  },

  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async getLoginUserInfo (ctx) {
    const tokenInfo = userToken.decryptToken(ctx) // 解析token获取用户ID
    let result = await userInfoService.getUserInfoById(tokenInfo.userId)

    ctx.body = result
  },

  /**
   * 更新用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async updateUserInfo (ctx) {
    let result
    let formData = ctx.request.body

    result = await userInfoService.updateUserInfoById(formData.id, formData)
    ctx.body = result
  }
}
