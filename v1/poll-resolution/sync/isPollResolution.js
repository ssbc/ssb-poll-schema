const makeValidatorWithErrors = require('../../lib/ValidatorWithErrors')
const {
  pollResolution
} = require('../schema/pollResolution')

module.exports.isPollResolution = makeValidatorWithErrors(pollResolution)
