const Parser = require('../../lib/Parser')
const checkers = require('./isPoll')

module.exports = {
  parseChooseOnePoll: Parser(checkers.isChooseOne),
  parseDotPoll: Parser(checkers.isDot),
  parseMeetingTimePoll: Parser(checkers.isMeetingTime),
  parseProposalPoll: Parser(checkers.isProposal),
  parseRangePoll: Parser(checkers.isRange)
}
