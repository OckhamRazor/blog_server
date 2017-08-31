const code = {
  // ERROR
  ERROR_USER_NAME: '用户名长度为3-16位',

  ERROR_EMAIL: '请输入正确的邮箱地址',

  ERROR_PASSWORD: '密码长度应该为6-16',

  ERROR_PASSWORD_CONFORM: '两次密码不一致',

  ERROR_SYS: '系统错误',

  // FAIL
  FAIL_EMAIL_IS_EXIST: '邮箱已被注册',

  FAIL_USER_NAME_IS_EXIST: '用户名已被注册',

  FAIL_USER_NAME_OR_PASSWORD_ERROR: '用户名或登录密码错误',

  FAIL_NO_USER_NAME: '用户名不存在',

  FAIL_PASSWORD_ERROR: '密码错误',

  FAIL_USER_NO_LOGIN: '用户未登录',

  FAIL_USER_NO_EXIST: '用户不存在',

  FAIL_USER_INFO_UPDATE: '用户信息更新失败',

  FAILED_USER_INFO_READ: '获取用户信息失败',

  FAILED_USER_WRITE_OFF: '注销账户失败',

  FAILED_USER_CREATE: '创建用户失败',

  FAILED_GITHUB_OAUTH: 'Github 第三方登录失败',

  // SUCCESS
  SUCCESS_USER_CREATE: '创建用户成功',

  SUCCESS_USER_UPDATE: '用户信息更新成功',
  
  SUCCESS_USER_INFO_READ: '获取用户信息成功',

  SUCCESS_USER_SIGN_IN: '登录成功',

  SUCCESS_USER_WRITE_OFF: '注销账户成功'
}

module.exports = code
