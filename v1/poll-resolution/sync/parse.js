const Parser = require('../../lib/Parser')
const checkers = require('./isPollResolution')

module.exports = {
  parsePollResolution: Parser(checkers.isPollResolution)
}
