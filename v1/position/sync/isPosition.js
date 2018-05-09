const schema = require('../schema/position')
const { CHOOSE_ONE, RANGE, DOT, PROPOSAL } = require('../../types')

var makeValidatorWithErrors = require('../../lib/ValidatorWithErrors')

module.exports = makeValidatorWithErrors(schema)

module.exports[CHOOSE_ONE] = makeValidatorWithErrors(require('../schema/chooseOnePosition'))
module.exports[DOT] = makeValidatorWithErrors(require('../schema/dotPosition'))
module.exports[RANGE] = makeValidatorWithErrors(require('../schema/rangePosition'))
module.exports[PROPOSAL] = makeValidatorWithErrors(require('../schema/proposalPosition'))
