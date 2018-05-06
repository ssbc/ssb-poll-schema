const { CHOOSE_ONE } = require('../../../types')
const typeStringPattern = `^${CHOOSE_ONE}$`

var schema = {
  type: 'object',
  required: ['type', 'choice'],
  properties: {
    type: {
      type: 'string',
      pattern: typeStringPattern
    },
    choices: {
      type: 'array',
      minimum: 0,
      items: {
        type: 'integer',
        minimum: 0
      }
    }
  }
}

module.exports = schema
