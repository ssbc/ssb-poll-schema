var nest = require('depnest')

var {SCHEMA_VERSION, PROPOSAL, DOT, RANGE, CHOOSE_ONE} = require('./types')

var {
  parseChooseOnePoll,
  parseDotPoll,
  parseRangePoll,
  parseProposalPoll
} = require('./poll/sync/parse')

var {
  parseChooseOnePosition,
  parseDotPosition,
  parseRangePosition,
  parseProposalPosition
} = require('./position/sync/parse')

var isPoll = require('./poll/sync/isPoll')
var pollTypeCheckers = {
  isProposal: isPoll[PROPOSAL],
  isDot: isPoll[DOT],
  isRange: isPoll[RANGE],
  isChooseOne: isPoll[CHOOSE_ONE],
  isPoll
}

var depjectifiedPollTypeCheckers = depjectifyTypeCheckers(pollTypeCheckers, depjectFirstify)

var isPosition = require('./position/sync/isPosition')
var positionTypeCheckers = {
  isProposal: isPosition[PROPOSAL],
  isDot: isPosition[DOT],
  isRange: isPosition[RANGE],
  isChooseOne: isPosition[CHOOSE_ONE],
  isPosition
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
