const qiniu = require('qiniu')
const config = require('../../config/config')

/**
 * 生成七牛云上传凭证
 * @return {string} 上传token凭证
 */
function createUploadToken () {
  var mac = new qiniu.auth.digest.Mac(config.qiniu.accessKey, config.qiniu.secretKey)
  var options = {
    scope: config.qiniu.bucket,
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
  }
  var putPolicy = new qiniu.rs.PutPolicy(options)
  var uploadToken = putPolicy.uploadToken(mac)

  return uploadToken
}

module.exports = {
  createToken: createUploadToken
}
