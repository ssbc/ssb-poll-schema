const nest = require('depnest')

const {SCHEMA_VERSION} = require('./types')

const {
  parseChooseOnePoll,
  parseDotPoll,
  parseRangePoll,
  parseProposalPoll
} = require('./poll/sync/parse')

const {
  parseChooseOnePosition,
  parseDotPosition,
  parseRangePosition,
  parseProposalPosition
} = require('./position/sync/parse')

const pollCheckers = require('./poll/sync/isPoll')
const positionCheckers = require('./position/sync/isPosition')

const depjectifiedPollTypeCheckers = depjectifyTypeCheckers(pollCheckers, firstify)
const depjectifiedPositionTypeCheckers = depjectifyTypeCheckers(positionCheckers, firstify)

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
// depject first keeps looking until something doesn't return undefined
// This stuff converts a validator that returns bools to return true or undefined.
function depjectifyTypeCheckers (checkers, depjectify) {
  return Object.keys(checkers).reduce(function (acc, checker) {
    acc[checker] = depjectify(checkers[checker])
    return acc
  }, {})
}

function firstify (mapper) {
  return function (item) {
    return mapper(item) ? true : undefined
  }
}
