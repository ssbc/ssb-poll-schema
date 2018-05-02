var combine = require('depject')
var {first, reduce} = require('depject/apply')

var v1 = require('./v1/')

var sockets = combine([
  v1
])

var parsePoll = first(sockets.poll.parse, 'poll.parse')
var getPollErrors = (poll) => {
  var errors = reduce(sockets.poll.getErrors, 'poll.getErrors')(poll).errors
  poll.errors = undefined
  return errors
}

var isPoll = first(sockets.poll.isPoll, 'poll.isPoll')
var isChooseOnePoll = first(sockets.poll.isChooseOne, 'poll.isChooseOne')
isPoll.chooseOne = isChooseOnePoll

var parsePosition = first(sockets.position.parse, 'position.parse')
var isPosition = first(sockets.position.isPosition, 'position.isPosition')
var isChooseOnePosition = first(sockets.position.isChooseOne, 'position.isChooseOne')
var getPositionErrors = (position) => {
  var errors = reduce(sockets.position.getErrors, 'position.getErrors')(position).errors
  position.errors = undefined
  return errors
}

var versionStrings = reduce(sockets.version.string, 'version.string')({})

module.exports = {
  parsePoll,
  getPollErrors,
  isChooseOnePoll,
  isPoll,

  parsePosition,
  getPositionErrors,
  isChooseOnePosition,
  isPosition,

  versionStrings,

  sockets,
  schema: [
    v1
  ]
}
