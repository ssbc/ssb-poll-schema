const positionSchema = require('./position')
const cloneDeep = require('lodash.clonedeep')

const dotSchema = cloneDeep(positionSchema)

// collapse the details down to be ONLY dot
dotSchema.properties.details = { $ref: '#/definitions/details/dot' }

module.exports = dotSchema
