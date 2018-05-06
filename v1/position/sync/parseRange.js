var msgContent = require('ssb-msg-content')
var isRangePosition = require('./isRangePosition')

function ParseRangePosition (msg) {
  if (!isRangePosition(msg)) return
  const content = msgContent(msg)
  return Object.assign({}, msg, content)
}

module.exports = ParseRangePosition
