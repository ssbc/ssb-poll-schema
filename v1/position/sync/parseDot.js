var msgContent = require('ssb-msg-content')
var isDotPosition = require('./isDotPosition')

function ParseDotPosition (msg) {
  if (!isDotPosition(msg)) return
  const content = msgContent(msg)
  return Object.assign({}, msg, content)
}

module.exports = ParseDotPosition
