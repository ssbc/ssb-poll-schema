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
      'getErrors',
      'isChooseOne',
      'isDot',
      'isRange',
      'isPoll',
      'isProposal'
    ],
    'position': [
      'parseChooseOne',
      'parseDot',
      'parseRange',
      'parseProposal',
      'getErrors',
      'isChooseOne',
      'isDot',
      'isRange',
      'isPosition',
      'isProposal'
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
        getErrors: getPollErrors,
        isChooseOne: depjectMappify(isV1ChooseOnePoll),
        isDot: depjectMappify(isV1DotPoll),
        isRange: depjectMappify(isV1RangePoll),
        isProposal: depjectMappify(isV1ProposalPoll),
        isPoll: depjectMappify(isV1Poll)
      },
      position: {
        parseChooseOne: parseChooseOnePosition,
        parseDot: parseDotPosition,
        parseRange: parseRangePosition,
        parseProposal: parseProposalPosition,
        getErrors: getPositionErrors,
        isChooseOne: depjectMappify(isV1ChooseOnePosition),
        isDot: depjectMappify(isV1DotPosition),
        isRange: depjectMappify(isV1RangePosition),
        isProposal: depjectMappify(isV1ProposalPosition),
        isPosition: depjectMappify(isV1Position)
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

function depjectMappify (mapper) {
  return function (item) {
    return mapper(item) ? true : undefined
  }
}
