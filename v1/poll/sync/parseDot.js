var msgContent = require('ssb-msg-content')
var isDotPoll = require('./isDotPoll')

function ParseDotPoll (msg) {
  if (!isDotPoll(msg)) return
  const content = msgContent(msg)
  return Object.assign({}, msg, content)
}

module.exports = ParseDotPoll
