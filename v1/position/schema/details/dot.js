const { DOT } = require('../../../types')
const typeStringPattern = `^${DOT}$`

const schema = {
  type: 'object',
  required: ['type', 'choices'],
  properties: {
    type: {
      type: 'string',
      pattern: typeStringPattern
    },
    choices: {
      type: 'array',
      items: {
        type: 'integer',
        minimum: 0
      }
    }
  }
}

module.exports = schema
