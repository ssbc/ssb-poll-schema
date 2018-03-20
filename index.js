var combine = require('depject')
var {first, reduce} = require('depject/apply')

var v1 = require('./v1/')

var sockets = combine([
  v1
])

var parsePoll = first(sockets.poll.parse, 'poll.parse')
var isPoll = first(sockets.poll.isPoll, 'poll.isPoll')
var isChooseOnePoll = first(sockets.poll.isChooseOne, 'poll.isChooseOne')
isPoll.chooseOne = isChooseOnePoll

var parsePosition = first(sockets.position.parse, 'position.parse')
var isPosition = first(sockets.position.isPosition, 'position.isPosition')
var isChooseOnePosition = first(sockets.position.isChooseOne, 'position.isChooseOne')
isPosition.chooseOne

var versionStrings = reduce(sockets.version.string, 'version.string')({})

module.exports = {
  parsePoll,
  isChooseOnePoll,
  isPoll,

  parsePosition,
  isChooseOnePosition,
  isPosition,

  versionStrings,

  sockets,
  schema: [
    v1
  ]
}
