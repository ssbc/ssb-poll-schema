const { RANGE } = require('../../../types')
const typeStringPattern = `^${RANGE}$`

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
      minimum: 0,
      items: {
        type: 'integer',
        minimum: 0
      }
    }
  }
}

module.exports = schema
