const Validator = require('is-my-json-valid')
const schema = require('../schema/poll')
const validator = Validator(schema, {verbose: true})
const getMsgContent = require('../../lib/getMsgContent')
const { CHOOSE_ONE } = require('../../types')

const isChooseOnePoll = require('./isChooseOnePoll')()

// server is not used here. Closure pattern is just for consistency of use with other functions.
module.exports = function (server) {
  function isPoll (obj) {
    const result = validator(getMsgContent(obj))

    // exposes error messages provided by is-my-json-valid
    isPoll.errors = validator.errors

    return result
  }

  isPoll[CHOOSE_ONE] = isChooseOnePoll
  // isPoll[DOT] = isDotPoll
  // isPoll[SCORE] = isScorePoll

  return isPoll
}
