const userInfoService = require('./../services/userInfo')
const userCode = require('./../codes/user')
const decryptToken = require('../utils/token/decryptToken')

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
    // 解析token获取用户ID
    const tokenInfo = await decryptToken(ctx)
    
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
