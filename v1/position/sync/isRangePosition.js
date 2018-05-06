const Validator = require('is-my-json-valid')
const schema = require('../schema/rangePosition')
const validator = Validator(schema, {verbose: true})
const getMsgContent = require('ssb-msg-content')

module.exports = function isRangePosition (obj) {
  const result = validator(getMsgContent(obj))

  // exposes error messages provided by is-my-json-valid
  isRangePosition.errors = validator.errors

  return result
}
