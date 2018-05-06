const pollSchema = require('./poll')
const cloneDeep = require('lodash.clonedeep')

const dotSchema = cloneDeep(pollSchema)

// collapse the details down to be ONLY chooseOne
dotSchema.properties.details = { $ref: '#/definitions/details/dot' }

module.exports = dotSchema
