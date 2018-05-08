const pollSchema = require('./poll')
const cloneDeep = require('lodash.clonedeep')

const proposalSchema = cloneDeep(pollSchema)

// collapse the details down to be ONLY chooseOne
proposalSchema.properties.details = { $ref: '#/definitions/details/proposal' }

module.exports = proposalSchema
