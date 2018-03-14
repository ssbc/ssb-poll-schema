var combine = require('depject')
var {first} = require('depject/apply')

var v1 = require('./v1/')
var v2 = require('./v2/')

var sockets = combine([v1, v2])

var parsePoll = first(sockets.poll.parse, 'poll.parse')
var isPoll = first(sockets.poll.isPoll, 'poll.isPoll')
var parsePosition = first(sockets.position.parse, 'position.parse')
var isPosition = first(sockets.position.isPosition, 'position.isPosition')

module.exports = {
  parsePoll,
  isPoll,
  parsePosition,
  isPosition,

  sockets,
  schema: {
    v1,
    v2
  }
}
