var ccap = require('ccap')

var captcha = ccap()

var ary = captcha.get()
var text = ary[0]
var buffer = ary[1]

console.log('text:', text)
console.log('text:', buffer)
