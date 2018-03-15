var combine = require('depject')
var {first} = require('depject/apply')

var v1 = require('./v1/')

var sockets = combine([
  v1
])

var parsePoll = first(sockets.poll.parse, 'poll.parse')
var isChooseOnePoll = first(sockets.poll.isChooseOne, 'poll.isChooseOne')
var isPoll = first(sockets.poll.isPoll, 'poll.isPoll')
var parsePosition = first(sockets.position.parse, 'position.parse')
var isChooseOnePosition = first(sockets.position.isChooseOne, 'position.isChooseOne')
var isPosition = first(sockets.position.isPosition, 'position.isPosition')

module.exports = {
  parsePoll,
  isChooseOnePoll,
  isPoll,

  parsePosition,
  isChooseOnePosition,
  isPosition,

  sockets,
  schema: [
    v1
  ]
}
