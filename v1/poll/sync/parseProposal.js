var msgContent = require('ssb-msg-content')
var isProposalPoll = require('./isProposalPoll')

function ParseProposalPoll (msg) {
  if (!isProposalPoll(msg)) return
  const content = msgContent(msg)
  return Object.assign({}, msg, content)
}

module.exports = ParseProposalPoll
