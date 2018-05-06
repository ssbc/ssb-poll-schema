const { DOT } = require('../../../types')
const typeStringPattern = `^${DOT}$`

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
