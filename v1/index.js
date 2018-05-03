var nest = require('depnest')

var {SCHEMA_VERSION} = require('./types')
var parseChooseOnePoll = require('./poll/sync/parseChooseOne')
var isV1Poll = require('./poll/sync/isPoll')

var parseChooseOnePosition = require('./position/sync/parseChooseOne')
var isV1ChooseOnePosition = require('./position/sync/isChooseOnePosition')
var isV1Position = require('./position/sync/isPosition')

module.exports = {
  gives: nest({
    'poll': [
      'parseChooseOne',
      'getErrors',
      'isChooseOne',
      'isPoll'
    ],
    'position': [
      'parseChooseOne',
      'getErrors',
      'isChooseOne',
      'isPosition'
    ],
    'version': [
      'string'
    ]
  }),
  create: function (api) {
    return nest({
      poll: {
        parseChooseOne: parseChooseOnePoll,
        getErrors: getPollErrors,
        isChooseOne: isChooseOnePoll,
        isPoll
      },
      position: {
        parseChooseOne: parseChooseOnePosition,
        getErrors: getPositionErrors,
        isChooseOne: isChooseOnePosition,
        isPosition
      },
      version: {
        string: versionString
      }
    })

    function versionString (versions) {
      versions.V1_SCHEMA_VERSION_STRING = SCHEMA_VERSION
      return versions
    }

    function isPoll (poll) {
      return isV1Poll(poll) ? true : undefined
    }

    function isChooseOnePoll (poll) {
      return isV1ChooseOnePoll(poll) ? true : undefined
    }

    function getPollErrors (poll) {
      if (!poll.errors) { poll.errors = {} }

      isV1Poll(poll)

      poll.errors[SCHEMA_VERSION] = isV1Poll.errors
      return poll
    }

    function isPosition (position) {
      return isV1Position(position) ? true : undefined
    }

    function isChooseOnePosition (position) {
      return isV1ChooseOnePosition(position) ? true : undefined
    }

    function getPositionErrors (postition) {
      if (!postition.errors) { postition.errors = {} }

      isV1Position(postition)

      postition.errors[SCHEMA_VERSION] = isV1Position.errors
      return postition
    }
  }
}
