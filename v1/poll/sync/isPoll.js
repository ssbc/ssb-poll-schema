const schema = require('../schema/poll')
const makeValidatorWithErrors = require('../../lib/ValidatorWithErrors')

module.exports.isPoll = makeValidatorWithErrors(schema)

module.exports.isChooseOne = makeValidatorWithErrors(require('../schema/chooseOnePoll'))
module.exports.isDot = makeValidatorWithErrors(require('../schema/dotPoll'))
module.exports.isRange = makeValidatorWithErrors(require('../schema/rangePoll'))
module.exports.isProposal = makeValidatorWithErrors(require('../schema/proposalPoll'))
