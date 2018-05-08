var msgContent = require('ssb-msg-content')
var isProposalPosition = require('./isProposalPosition')

function ParseProposalPosition (msg) {
  if (!isProposalPosition(msg)) return
  const content = msgContent(msg)
  return Object.assign({}, msg, content)
}

module.exports = ParseProposalPosition
