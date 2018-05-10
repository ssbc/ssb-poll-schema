const Parser = require('../../lib/Parser')
const checkers = require('./isPollUpdate')

module.exports = {
  parsePollUpdate: Parser(checkers.isPollUpdate)
}
