const Parser = require('../../lib/Parser')
const checkers = require('./isPosition')

module.exports = {
  parseChooseOnePosition: Parser(checkers.isChooseOne),
  parseDotPosition: Parser(checkers.isDot),
  parseMeetingTimePosition: Parser(checkers.isMeetingTime),
  parseProposalPosition: Parser(checkers.isProposal),
  parseRangePosition: Parser(checkers.isRange)
}
