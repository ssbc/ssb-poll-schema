const Validator = require('is-my-json-valid')
const schema = require('../schema/chooseOnePosition')
const validator = Validator(schema, {verbose: true})
const getMsgContent = require('../../lib/getMsgContent')

module.exports = function isChooseOnePosition (obj) {
  const result = validator(getMsgContent(obj))

  // exposes error messages provided by is-my-json-valid
  isChooseOnePosition.errors = validator.errors

  return result
}
