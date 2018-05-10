const combine = require('depject')
const {first, reduce} = require('depject/apply')

const v1 = require('./v1/')

const sockets = combine([
  v1
])

const getPollErrors = (poll) => {
  const errors = reduce(sockets.poll.getErrors, 'poll.getErrors')(poll).errors
  delete poll.errors
  return errors
}

const getPositionErrors = (position) => {
  const errors = reduce(sockets.position.getErrors, 'position.getErrors')(position).errors
  delete position.errors
  return errors
}

const isPoll = first(sockets.poll.isPoll, 'poll.isPoll')
const isPollUpdate = first(sockets.poll.isPollUpdate, 'poll.isPollUpdate')
const isChooseOnePoll = first(sockets.poll.isChooseOne, 'poll.isChooseOne')
const isDotPoll = first(sockets.poll.isDot, 'poll.isDot')
const isRangePoll = first(sockets.poll.isRange, 'poll.isRange')
const isProposalPoll = first(sockets.poll.isProposal, 'poll.isProposal')
const parseChooseOnePoll = first(sockets.poll.parseChooseOne, 'poll.parseChooseOne')
const parseDotPoll = first(sockets.poll.parseDot, 'poll.parseDot')
const parseRangePoll = first(sockets.poll.parseRange, 'poll.parseRange')
const parseProposalPoll = first(sockets.poll.parseProposal, 'poll.parseProposal')

isPoll.chooseOne = isChooseOnePoll
isPoll.dot = isDotPoll
isPoll.range = isRangePoll
isPoll.proposal = isProposalPoll

const isPosition = first(sockets.position.isPosition, 'position.isPosition')
const isChooseOnePosition = first(sockets.position.isChooseOne, 'position.isChooseOne')
const isDotPosition = first(sockets.position.isDot, 'position.isDot')
const isRangePosition = first(sockets.position.isRange, 'position.isRange')
const isProposalPosition = first(sockets.position.isProposal, 'position.isProposal')
const parseChooseOnePosition = first(sockets.position.parseChooseOne, 'position.parseChooseOne')
const parseDotPosition = first(sockets.position.parseDot, 'position.parseDot')
const parseRangePosition = first(sockets.position.parseRange, 'position.parseRange')
const parseProposalPosition = first(sockets.position.parseProposal, 'position.parseProposal')

isPosition.chooseOne = isChooseOnePosition
isPosition.dot = isDotPosition
isPosition.range = isRangePosition
isPosition.proposal = isProposalPosition

const versionStrings = reduce(sockets.version.string, 'version.string')({})

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
  isPollUpdate,
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
