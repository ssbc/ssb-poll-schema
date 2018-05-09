const { RANGE } = require('../../../types')
const typeStringPattern = `^${RANGE}$`

const schema = {
  type: 'object',
  required: ['type', 'maxChoiceScore', 'choices'],
  properties: {
    type: {
      type: 'string',
      pattern: typeStringPattern
    },
    maxChoiceScore: {
      type: 'integer',
      minimum: 2
    },
    choices: {
      type: 'array'
    }
  }
}

module.exports = schema
