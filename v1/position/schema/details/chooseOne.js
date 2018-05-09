const { CHOOSE_ONE } = require('../../../types')
const typeStringPattern = `^${CHOOSE_ONE}$`

const schema = {
  type: 'object',
  required: ['type', 'choice'],
  properties: {
    type: {
      type: 'string',
      pattern: typeStringPattern
    },
    choice: {
      type: 'integer',
      minimum: 0
    }
  }
}

module.exports = schema
