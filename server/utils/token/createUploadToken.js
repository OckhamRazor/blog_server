const qiniu = require('qiniu')
const config = require('../../config/config')

var mac = new qiniu.auth.digest.Mac(config.qiniu.accessKey, config.qiniu.secretKey);
var options = {
  scope: config.qiniu.bucket,
  returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
}

// 生成七牛云上传凭证
module.exports = function (userId) {
  var putPolicy = new qiniu.rs.PutPolicy(options)
  var uploadToken = putPolicy.uploadToken(mac)

  return uploadToken
}
