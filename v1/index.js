var nest = require('depnest')

var {SCHEMA_VERSION} = require('./types')
var parseChooseOnePoll = require('./poll/sync/parseChooseOne')
var parseChooseOnePosition = require('./position/sync/parseChooseOne')

var parseDotPoll = require('./poll/sync/parseDot')
var parseDotPosition = require('./position/sync/parseDot')

var parseRangePoll = require('./poll/sync/parseRange')
var parseRangePosition = require('./position/sync/parseRange')

var parseProposalPoll = require('./poll/sync/parseProposal')
var parseProposalPosition = require('./position/sync/parseProposal')

var pollTypeCheckers = {
  isProposal: require('./poll/sync/isProposalPoll'),
  isDot: require('./poll/sync/isDotPoll'),
  isRange: require('./poll/sync/isRangePoll'),
  isChooseOne: require('./poll/sync/isChooseOnePoll'),
  isPoll: require('./poll/sync/isPoll')
}

var depjectifiedPollTypeCheckers = depjectifyTypeCheckers(pollTypeCheckers, depjectFirstify)

var positionTypeCheckers = {
  isProposal: require('./position/sync/isProposalPosition'),
  isDot: require('./position/sync/isDotPosition'),
  isRange: require('./position/sync/isRangePosition'),
  isChooseOne: require('./position/sync/isChooseOnePosition'),
  isPosition: require('./position/sync/isPosition')
}

var depjectifiedPositionTypeCheckers = depjectifyTypeCheckers(positionTypeCheckers, depjectFirstify)

module.exports = {
  gives: nest({
    'poll': [
      'parseChooseOne',
      'parseDot',
      'parseRange',
      'parseProposal',
      'isChooseOne',
      'isDot',
      'isRange',
      'isProposal',
      'isPoll',
      'getErrors'
    ],
    'position': [
      'parseChooseOne',
      'parseDot',
      'parseRange',
      'parseProposal',
      'isChooseOne',
      'isDot',
      'isRange',
      'isProposal',
      'isPosition',
      'getErrors'
    ],
    'version': [
      'string'
    ]
  }),
  create: function (api) {
    return nest({
      poll: Object.assign(depjectifiedPollTypeCheckers, {
        parseChooseOne: parseChooseOnePoll,
        parseDot: parseDotPoll,
        parseRange: parseRangePoll,
        parseProposal: parseProposalPoll,
        getErrors: getPollErrors
      }),
      position: Object.assign(depjectifiedPositionTypeCheckers, {
        parseChooseOne: parseChooseOnePosition,
        parseDot: parseDotPosition,
        parseRange: parseRangePosition,
        parseProposal: parseProposalPosition,
        getErrors: getPositionErrors
      }),
      version: {
        string: versionString
      }
    })

    function versionString (versions) {
      versions.V1_SCHEMA_VERSION_STRING = SCHEMA_VERSION
      return versions
    }

    function getPollErrors (poll) {
      if (!poll.errors) { poll.errors = {} }

      pollTypeCheckers.isPoll(poll)

      poll.errors[SCHEMA_VERSION] = pollTypeCheckers.isPoll.errors
      return poll
    }

    function getPositionErrors (postition) {
      if (!postition.errors) { postition.errors = {} }

      positionTypeCheckers.isPosition(postition)

      postition.errors[SCHEMA_VERSION] = positionTypeCheckers.isPosition.errors
      return postition
    }
  }
}

function depjectifyTypeCheckers (checkers, depjectify) {
  return Object.keys(checkers).reduce(function (acc, checker) {
    acc[checker] = depjectify(checkers[checker])
    return acc
  }, {})
}

function depjectFirstify (mapper) {
  return function (item) {
    return mapper(item) ? true : undefined
  }
}
