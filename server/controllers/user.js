const userService = require('./../services/user')
const userToken = require('../utils/token/user_token')
var request = require('request');

module.exports = {

  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async signIn (ctx) {
    let formData = ctx.request.body
    let result = await userService.signIn(formData)

    ctx.body = result
  },

  /**
   * Github OAuth登录
   * @param {object} ctx 
   */
  async signInByGithub (ctx) {
    let data = ctx.request.body

    let result = await userService.signInByGithub(data.code)
    
    console.log('result:', result)
    ctx.body = result
  },

  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async getLoginUserInfo (ctx) {
    const authorization = ctx.get('Authorization') 
    const token = authorization.split(' ')[1] 
    const tokenInfo = userToken.decryptToken(token) // 解析token获取用户ID
    
    let result = await userService.getUserInfoById(tokenInfo.userId)

    ctx.body = result
  },

  /**
   * 更新用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async updateUserInfo (ctx) {
    let result
    let formData = ctx.request.body

    result = await userService.updateUserInfoById(formData.id, formData)
    ctx.body = result
  }
}
