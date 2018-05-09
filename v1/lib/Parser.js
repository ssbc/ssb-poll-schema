const getMsgContent = require('ssb-msg-content')

module.exports = function Parser (checker) {
  return function parser (msg) {
    if (!checker(msg)) return
    const content = getMsgContent(msg)
    return Object.assign({}, msg, content)
  }
}
