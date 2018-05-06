var msgContent = require('ssb-msg-content')
var isRangePoll = require('./isRangePoll')

function ParseRangePoll (msg) {
  if (!isRangePoll(msg)) return
  const content = msgContent(msg)
  return Object.assign({}, msg, content)
}

module.exports = ParseRangePoll
