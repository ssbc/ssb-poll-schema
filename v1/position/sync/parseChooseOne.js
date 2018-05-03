var msgContent = require('ssb-msg-content')
var isChooseOnePosition = require('./isChooseOnePosition')

function ParseChooseOnePosition (msg) {
  if (!isChooseOnePosition(msg)) return
  const content = msgContent(msg)
  return Object.assign({}, msg, content)
}

module.exports = ParseChooseOnePosition
