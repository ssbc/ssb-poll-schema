var nest = require('depnest')

var {SCHEMA_VERSION} = require('./types')
var parseChooseOnePoll = require('./poll/sync/parseChooseOne')
var isV1ChooseOnePoll = require('./poll/sync/isChooseOnePoll')
var parseChooseOnePosition = require('./position/sync/parseChooseOne')
var isV1ChooseOnePosition = require('./position/sync/isChooseOnePosition')

var parseDotPoll = require('./poll/sync/parseDot')
var isV1DotPoll = require('./poll/sync/isDotPoll')
var parseDotPosition = require('./position/sync/parseDot')
var isV1DotPosition = require('./position/sync/isDotPosition')

var parseRangePoll = require('./poll/sync/parseRange')
var isV1RangePoll = require('./poll/sync/isRangePoll')
var parseRangePosition = require('./position/sync/parseRange')
var isV1RangePosition = require('./position/sync/isRangePosition')

var parseProposalPoll = require('./poll/sync/parseProposal')
var isV1ProposalPoll = require('./poll/sync/isProposalPoll')
var parseProposalPosition = require('./position/sync/parseProposal')
var isV1ProposalPosition = require('./position/sync/isProposalPosition')

var isV1Position = require('./position/sync/isPosition')
var isV1Poll = require('./poll/sync/isPoll')

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
      poll: {
        parseChooseOne: parseChooseOnePoll,
        parseDot: parseDotPoll,
        parseRange: parseRangePoll,
        parseProposal: parseProposalPoll,
        isChooseOne: depjectFirstify(isV1ChooseOnePoll),
        isDot: depjectFirstify(isV1DotPoll),
        isRange: depjectFirstify(isV1RangePoll),
        isProposal: depjectFirstify(isV1ProposalPoll),
        isPoll: depjectFirstify(isV1Poll),
        getErrors: getPollErrors
      },
      position: {
        parseChooseOne: parseChooseOnePosition,
        parseDot: parseDotPosition,
        parseRange: parseRangePosition,
        parseProposal: parseProposalPosition,
        isChooseOne: depjectFirstify(isV1ChooseOnePosition),
        isDot: depjectFirstify(isV1DotPosition),
        isRange: depjectFirstify(isV1RangePosition),
        isProposal: depjectFirstify(isV1ProposalPosition),
        isPosition: depjectFirstify(isV1Position),
        getErrors: getPositionErrors
      },
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

      isV1Poll(poll)

      poll.errors[SCHEMA_VERSION] = isV1Poll.errors
      return poll
    }

    function getPositionErrors (postition) {
      if (!postition.errors) { postition.errors = {} }

      isV1Position(postition)

      postition.errors[SCHEMA_VERSION] = isV1Position.errors
      return postition
    }
  }
}

function depjectFirstify (mapper) {
  return function (item) {
    return mapper(item) ? true : undefined
  }
}
