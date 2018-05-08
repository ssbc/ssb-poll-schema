const positionSchema = require('./position')
const cloneDeep = require('lodash.clonedeep')

const proposalSchema = cloneDeep(positionSchema)

// collapse the details down to be ONLY chooseOne
proposalSchema.properties.details = { $ref: '#/definitions/details/proposal' }

module.exports = proposalSchema
