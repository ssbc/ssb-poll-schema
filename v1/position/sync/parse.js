const Parser = require('../../lib/Parser')
const { CHOOSE_ONE, DOT, PROPOSAL, RANGE } = require('../../types')
const checkers = require('./isPosition')

module.exports = {
  parseChooseOnePosition: Parser(checkers[CHOOSE_ONE]),
  parseDotPosition: Parser(checkers[DOT]),
  parseRangePosition: Parser(checkers[RANGE]),
  parseProposalPosition: Parser(checkers[PROPOSAL])
}
