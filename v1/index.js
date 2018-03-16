var nest = require('depnest')

var {SCHEMA_VERSION} = require('./types')
var Poll = require('./poll/sync/poll')
var isV1ChooseOnePoll = require('./poll/sync/isChooseOnePoll')
var isV1Poll = require('./poll/sync/isPoll')

var Position = require('./position/sync/position')
var isV1ChooseOnePosition = require('./position/sync/isChooseOnePosition')
var isV1Position = require('./position/sync/isPosition')

module.exports = {
  gives: nest({
    'poll': [
      'parse',
      'isChooseOne',
      'isPoll'
    ],
    'position': [
      'parse',
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
        parse: parsePoll,
        isChooseOne: isChooseOnePoll,
        isPoll
      },
      position: {
        parse: parsePosition,
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

    function parsePoll ({poll}) {
      if (!isV1Poll(poll)) { return }

      return Poll({poll})
    }

    function isPosition (position) {
      return isV1Position(position) ? true : undefined
    }

    function isChooseOnePosition (position) {
      return isV1ChooseOnePosition(position) ? true : undefined
    }

    function parsePosition ({position}) {
      if (!isV1Position(position)) { return }

      return Position({position})
    }
  }
}
