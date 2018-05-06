const Validator = require('is-my-json-valid')
const schema = require('../schema/poll')
const validator = Validator(schema, {verbose: true})
const getMsgContent = require('ssb-msg-content')
const { CHOOSE_ONE, DOT, RANGE } = require('../../types')

const isChooseOnePoll = require('./isChooseOnePoll')
const isRangePoll = require('./isRangePoll')
const isDotPoll = require('./isDotPoll')

module.exports = function isPoll (obj) {
  const result = validator(getMsgContent(obj))

  // exposes error messages provided by is-my-json-valid
  isPoll.errors = validator.errors

  return result
}

module.exports[CHOOSE_ONE] = isChooseOnePoll
module.exports[DOT] = isDotPoll
module.exports[RANGE] = isRangePoll
