const { PROPOSAL } = require('../../../types')
const typeStringPattern = `^${PROPOSAL}$`

var schema = {
  type: 'object',
  required: ['type', 'choice'],
  properties: {
    type: {
      type: 'string',
      pattern: typeStringPattern
    },
    choice: {
      type: 'integer',
      minimum: 0,
      maximum: 3
    }
  }
}

module.exports = schema
