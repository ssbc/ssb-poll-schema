const schema = require('../schema/position')
const makeValidatorWithErrors = require('../../lib/ValidatorWithErrors')

module.exports.isPosition = makeValidatorWithErrors(schema)

module.exports.isChooseOne = makeValidatorWithErrors(require('../schema/chooseOnePosition'))
module.exports.isDot = makeValidatorWithErrors(require('../schema/dotPosition'))
module.exports.isRange = makeValidatorWithErrors(require('../schema/rangePosition'))
module.exports.isProposal = makeValidatorWithErrors(require('../schema/proposalPosition'))
module.exports.isMeetingTime = makeValidatorWithErrors(require('../schema/meetingTimePosition'))
