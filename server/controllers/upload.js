const createUploadToken = require('../utils/token/upload_token')

module.exports = {
  /**
   * 获取上传token凭证
   * @param  {obejct} ctx 上下文对象
   */
  async getUploadToken (ctx) {
    const token = createUploadToken()
    ctx.body = {
      token: token
    }
  }
}
