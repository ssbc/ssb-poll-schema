const makeValidatorWithErrors = require('../../lib/ValidatorWithErrors')

const {
  dot,
  range,
  chooseOne,
  meetingTime,
  proposal,

  position
} = require('../schema/position')

module.exports.isPosition = makeValidatorWithErrors(position)

module.exports.isChooseOne = makeValidatorWithErrors(chooseOne)
module.exports.isDot = makeValidatorWithErrors(dot)
module.exports.isRange = makeValidatorWithErrors(range)
module.exports.isProposal = makeValidatorWithErrors(proposal)
module.exports.isMeetingTime = makeValidatorWithErrors(meetingTime)
