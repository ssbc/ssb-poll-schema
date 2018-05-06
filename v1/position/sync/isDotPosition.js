const Validator = require('is-my-json-valid')
const schema = require('../schema/dotPosition')
const validator = Validator(schema, {verbose: true})
const getMsgContent = require('ssb-msg-content')

module.exports = function isDotPosition (obj) {
  const result = validator(getMsgContent(obj))

  // exposes error messages provided by is-my-json-valid
  isDotPosition.errors = validator.errors

  return result
}
