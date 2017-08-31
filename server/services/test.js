const request = require('request')
request.get({
  url: 'https://api.github.com/user',
  headers: {
    'User-Agent': 'request'
  },
  qs: {
    access_token: '4aa45f3385ce1fd35f8f4a48232bce69c3664dd7'
  }
}, function (err, httpResponse, body) {
  if (err) {
    console.error('github oauth get user info failed:', error)
  }

  console.log('body:', body)
})