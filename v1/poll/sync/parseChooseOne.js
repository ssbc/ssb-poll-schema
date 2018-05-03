var msgContent = require('ssb-msg-content')
var isChooseOnePoll = require('./isChooseOnePoll')

function ParseChooseOnePoll (msg) {
  if (!isChooseOnePoll(msg)) return
  const content = msgContent(msg)
  return Object.assign({}, msg, content)
}

module.exports = ParseChooseOnePoll
