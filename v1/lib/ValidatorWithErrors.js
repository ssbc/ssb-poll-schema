const Validator = require('is-my-json-valid')
const getMsgContent = require('ssb-msg-content')

// server is not used here. Closure pattern is just for consistency of use with other functions.
module.exports = function makeValidatorWithErrors (schema) {
  const validator = Validator(schema)
  return function validatorWithErrors (obj) {
    const result = validator(getMsgContent(obj))

    // exposes error messages provided by is-my-json-valid
    validatorWithErrors.errors = validator.errors

    return result
  }
}
