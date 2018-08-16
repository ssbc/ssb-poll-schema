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
const isMeetingTimePoll = first(sockets.poll.isMeetingTime, 'poll.isMeetingTime')
const isRangePoll = first(sockets.poll.isRange, 'poll.isRange')
const isProposalPoll = first(sockets.poll.isProposal, 'poll.isProposal')
isPoll.chooseOne = isChooseOnePoll
isPoll.dot = isDotPoll
isPoll.meetingTime = isMeetingTimePoll
isPoll.proposal = isProposalPoll
isPoll.range = isRangePoll
isPoll.update = isPollUpdate
const parseChooseOnePoll = first(sockets.poll.parseChooseOne, 'poll.parseChooseOne')
const parseDotPoll = first(sockets.poll.parseDot, 'poll.parseDot')
const parseRangePoll = first(sockets.poll.parseRange, 'poll.parseRange')
const parseProposalPoll = first(sockets.poll.parseProposal, 'poll.parseProposal')
const parsePollUpdate = first(sockets.poll.parseUpdate, 'poll.parseUpdate')

const isPosition = first(sockets.position.isPosition, 'position.isPosition')
const isChooseOnePosition = first(sockets.position.isChooseOne, 'position.isChooseOne')
const isDotPosition = first(sockets.position.isDot, 'position.isDot')
const isMeetingTimePosition = first(sockets.position.isProposal, 'position.isMeetingTime')
const isProposalPosition = first(sockets.position.isProposal, 'position.isProposal')
const isRangePosition = first(sockets.position.isRange, 'position.isRange')
isPosition.chooseOne = isChooseOnePosition
isPosition.dot = isDotPosition
isPosition.meetingTime = isMeetingTimePosition
isPosition.proposal = isProposalPosition
isPosition.range = isRangePosition
const parseChooseOnePosition = first(sockets.position.parseChooseOne, 'position.parseChooseOne')
const parseDotPosition = first(sockets.position.parseDot, 'position.parseDot')
const parseRangePosition = first(sockets.position.parseRange, 'position.parseRange')
const parseProposalPosition = first(sockets.position.parseProposal, 'position.parseProposal')

const versionStrings = reduce(sockets.version.string, 'version.string')({})

module.exports = {
  parseChooseOnePoll,
  parseDotPoll,
  parseRangePoll,
  parseProposalPoll,
  parsePollUpdate,
  isChooseOnePoll,
  isDotPoll,
  isMeetingTimePoll,
  isProposalPoll,
  isPoll,
  isRangePoll,
  isPollUpdate,
  getPollErrors,

  parseChooseOnePosition,
  parseDotPosition,
  parseRangePosition,
  parseProposalPosition,
  isChooseOnePosition,
  isDotPosition,
  isMeetingTimePosition,
  isProposalPosition,
  isPosition,
  isRangePosition,
  getPositionErrors,

  versionStrings,

  sockets,
  schema: [
    v1
  ]
}
