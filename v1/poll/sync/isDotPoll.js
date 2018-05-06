const Validator = require('is-my-json-valid')
const schema = require('../schema/dotPoll')
const validator = Validator(schema, {verbose: true})
const getMsgContent = require('ssb-msg-content')

// server is not used here. Closure pattern is just for consistency of use with other functions.
module.exports = function isDotPoll (obj) {
  const result = validator(getMsgContent(obj))

  // exposes error messages provided by is-my-json-valid
  isDotPoll.errors = validator.errors

  return result
}
