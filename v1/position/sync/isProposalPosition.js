const Validator = require('is-my-json-valid')
const schema = require('../schema/proposalPosition')
const validator = Validator(schema, {verbose: true})
const getMsgContent = require('ssb-msg-content')

module.exports = function isProposalPosition (obj) {
  const result = validator(getMsgContent(obj))

  // exposes error messages provided by is-my-json-valid
  isProposalPosition.errors = validator.errors

  return result
}
