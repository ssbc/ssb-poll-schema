const schema = require('../schema/poll')
const { CHOOSE_ONE, RANGE, DOT, PROPOSAL } = require('../../types')

var makeValidatorWithErrors = require('../../lib/ValidatorWithErrors')

module.exports = makeValidatorWithErrors(schema)

module.exports[CHOOSE_ONE] = makeValidatorWithErrors(require('../schema/chooseOnePoll'))
module.exports[DOT] = makeValidatorWithErrors(require('../schema/dotPoll'))
module.exports[RANGE] = makeValidatorWithErrors(require('../schema/rangePoll'))
module.exports[PROPOSAL] = makeValidatorWithErrors(require('../schema/proposalPoll'))
