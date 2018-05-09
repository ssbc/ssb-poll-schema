var combine = require('depject')
var {first, reduce} = require('depject/apply')

var v1 = require('./v1/')

var sockets = combine([
  v1
])

var getPollErrors = (poll) => {
  var errors = reduce(sockets.poll.getErrors, 'poll.getErrors')(poll).errors
  delete poll.errors
  return errors
}

var getPositionErrors = (position) => {
  var errors = reduce(sockets.position.getErrors, 'position.getErrors')(position).errors
  delete position.errors
  return errors
}

var isPoll = first(sockets.poll.isPoll, 'poll.isPoll')
var isChooseOnePoll = first(sockets.poll.isChooseOne, 'poll.isChooseOne')
var isDotPoll = first(sockets.poll.isDot, 'poll.isDot')
var isRangePoll = first(sockets.poll.isRange, 'poll.isRange')
var isProposalPoll = first(sockets.poll.isProposal, 'poll.isProposal')
var parseChooseOnePoll = first(sockets.poll.parseChooseOne, 'poll.parseChooseOne')
var parseDotPoll = first(sockets.poll.parseDot, 'poll.parseDot')
var parseRangePoll = first(sockets.poll.parseRange, 'poll.parseRange')
var parseProposalPoll = first(sockets.poll.parseProposal, 'poll.parseProposal')

isPoll.chooseOne = isChooseOnePoll
isPoll.dot = isDotPoll
isPoll.range = isRangePoll
isPoll.proposal = isProposalPoll

var isPosition = first(sockets.position.isPosition, 'position.isPosition')
var isChooseOnePosition = first(sockets.position.isChooseOne, 'position.isChooseOne')
var isDotPosition = first(sockets.position.isDot, 'position.isDot')
var isRangePosition = first(sockets.position.isRange, 'position.isRange')
var isProposalPosition = first(sockets.position.isProposal, 'position.isProposal')
var parseChooseOnePosition = first(sockets.position.parseChooseOne, 'position.parseChooseOne')
var parseDotPosition = first(sockets.position.parseDot, 'position.parseDot')
var parseRangePosition = first(sockets.position.parseRange, 'position.parseRange')
var parseProposalPosition = first(sockets.position.parseProposal, 'position.parseProposal')

isPosition.chooseOne = isChooseOnePosition
isPosition.dot = isDotPosition
isPosition.range = isRangePosition
isPosition.proposal = isProposalPosition

var versionStrings = reduce(sockets.version.string, 'version.string')({})

module.exports = {
  parseChooseOnePoll,
  parseDotPoll,
  parseRangePoll,
  parseProposalPoll,
  isChooseOnePoll,
  isDotPoll,
  isRangePoll,
  isProposalPoll,
  isPoll,
  getPollErrors,

  parseChooseOnePosition,
  parseDotPosition,
  parseRangePosition,
  parseProposalPosition,
  isChooseOnePosition,
  isDotPosition,
  isRangePosition,
  isProposalPosition,
  isPosition,
  getPositionErrors,

  versionStrings,

  sockets,
  schema: [
    v1
  ]
}
