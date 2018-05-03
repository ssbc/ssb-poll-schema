var combine = require('depject')
var {first, reduce} = require('depject/apply')

var v1 = require('./v1/')

var sockets = combine([
  v1
])

var getPollErrors = (poll) => {
  var errors = reduce(sockets.poll.getErrors, 'poll.getErrors')(poll).errors
  delete poll.errors
  return errors
}

var isPoll = first(sockets.poll.isPoll, 'poll.isPoll')
var isChooseOnePoll = first(sockets.poll.isChooseOne, 'poll.isChooseOne')
var parseChooseOnePoll = first(sockets.poll.parseChooseOne, 'poll.parseChooseOne')
isPoll.chooseOne = isChooseOnePoll

var parseChooseOnePosition = first(sockets.position.parseChooseOne, 'position.parseChooseOne')
var isPosition = first(sockets.position.isPosition, 'position.isPosition')
var isChooseOnePosition = first(sockets.position.isChooseOne, 'position.isChooseOne')
var getPositionErrors = (position) => {
  var errors = reduce(sockets.position.getErrors, 'position.getErrors')(position).errors
  delete position.errors
  return errors
}

var versionStrings = reduce(sockets.version.string, 'version.string')({})

module.exports = {
  parseChooseOnePoll,
  getPollErrors,
  isChooseOnePoll,
  isPoll,

  parseChooseOnePosition,
  getPositionErrors,
  isChooseOnePosition,
  isPosition,

  versionStrings,

  sockets,
  schema: [
    v1
  ]
}
