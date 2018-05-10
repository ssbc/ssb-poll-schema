const makeValidatorWithErrors = require('../../lib/ValidatorWithErrors')
const {
  pollUpdate
} = require('../schema/pollUpdate')

module.exports.isPollUpdate = makeValidatorWithErrors(pollUpdate)
