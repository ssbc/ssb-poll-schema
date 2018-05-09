var nest = require('depnest')

var {SCHEMA_VERSION} = require('./types')

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

var pollCheckers = require('./poll/sync/isPoll')
var positionCheckers = require('./position/sync/isPosition')

var depjectifiedPollTypeCheckers = depjectifyTypeCheckers(pollCheckers, depjectFirstify)
var depjectifiedPositionTypeCheckers = depjectifyTypeCheckers(positionCheckers, depjectFirstify)


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

      pollCheckers.isPoll(poll)

      poll.errors[SCHEMA_VERSION] = pollCheckers.isPoll.errors
      return poll
    }

    function getPositionErrors (postition) {
      if (!postition.errors) { postition.errors = {} }

      positionCheckers.isPosition(postition)

      postition.errors[SCHEMA_VERSION] = positionCheckers.isPosition.errors
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
