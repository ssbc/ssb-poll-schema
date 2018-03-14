var combine = require('depject')
var {first} = require('depject/apply')

var v1 = require('./v1/')
var v2 = require('./v2/')

var sockets = combine([v1, v2])

var parsePoll = first(sockets.poll.parse, 'poll.parse')
var isPoll = first(sockets.poll.isPoll, 'poll.isPoll')
var parsePosition = first(sockets.position.parse, 'position.parse')

module.exports = {
  parsePoll,
  isPoll,
  parsePosition,
  sockets
}
