const Validator = require('is-my-json-valid')
const schema = require('../schema/poll')
const validator = Validator(schema, {verbose: true})
const getMsgContent = require('../../lib/getMsgContent')
const { CHOOSE_ONE } = require('../../types')

const isChooseOnePoll = require('./isChooseOnePoll')

module.exports = function isPoll (obj) {
  const result = validator(getMsgContent(obj))

  // exposes error messages provided by is-my-json-valid
  isPoll.errors = validator.errors

  return result
}

module.exports[CHOOSE_ONE] = isChooseOnePoll
// isPoll[DOT] = isDotPoll
// isPoll[SCORE] = isScorePoll
