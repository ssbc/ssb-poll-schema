const positionSchema = require('./position')
const cloneDeep = require('lodash.clonedeep')

const rangeSchema = cloneDeep(positionSchema)

// collapse the details down to be ONLY range
rangeSchema.properties.details = { $ref: '#/definitions/details/range' }

module.exports = rangeSchema
