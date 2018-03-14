var nest = require('depnest')

var isV1Position = require('./isPosition')
var Poll = require('./poll/sync/poll')
var isV1Poll = require('./isPoll')

module.exports = {
  gives: nest({
    'poll': [
      'parse',
      'isPoll'
    ],
    'position': [
      'parse',
      'isPosition'
    ]
  }),
  create: function (api) {
    return nest({
      poll: {
        parse: parsePoll,
        isPoll
      },
      position: {
        parse: parsePosition,
        isPosition
      }
    })

    function isPoll (poll) {
      return isV1Poll(poll) ? true : undefined
    }

    function parsePoll ({poll}) {
      if (!isV1Poll(poll)) { return }

      return Poll({poll})
    }

    function isPosition (position) {
      return isV1Position(position) ? true : undefined
    }

    function parsePosition ({position}) {
      if (!isV1Position(position)) {}
    }
  }
}
