const Parser = require('../../lib/Parser')
const checkers = require('./isPosition')

module.exports = {
  parseChooseOnePosition: Parser(checkers.isChooseOne),
  parseDotPosition: Parser(checkers.isDot),
  parseRangePosition: Parser(checkers.isRange),
  parseProposalPosition: Parser(checkers.isProposal)
}
