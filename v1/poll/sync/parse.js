const Parser = require('../../lib/Parser')
const { CHOOSE_ONE, DOT, PROPOSAL, RANGE } = require('../../types')
const checkers = require('./isPoll')

module.exports = {
  parseChooseOnePoll: Parser(checkers[CHOOSE_ONE]),
  parseDotPoll: Parser(checkers[DOT]),
  parseRangePoll: Parser(checkers[RANGE]),
  parseProposalPoll: Parser(checkers[PROPOSAL])
}
