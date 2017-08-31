const rules = {
  username: /[a - z0-9\_\ - ] {6, 16}/,
  password: /[\w + ] {6, 16}/
}

module.exports = rules