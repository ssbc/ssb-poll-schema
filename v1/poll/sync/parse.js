const Parser = require('../../lib/Parser')
const checkers = require('./isPoll')

module.exports = {
  parseChooseOnePoll: Parser(checkers.isChooseOne),
  parseDotPoll: Parser(checkers.isDot),
  parseRangePoll: Parser(checkers.isRange),
  parseProposalPoll: Parser(checkers.isProposal)
}
