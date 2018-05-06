const pollSchema = require('./poll')
const cloneDeep = require('lodash.clonedeep')

const rangeSchema = cloneDeep(pollSchema)

// collapse the details down to be ONLY chooseOne
rangeSchema.properties.details = { $ref: '#/definitions/details/range' }

module.exports = rangeSchema
