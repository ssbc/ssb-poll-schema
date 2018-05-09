const { DOT } = require('../../../types')
const typeStringPattern = `^${DOT}$`

const schema = {
  type: 'object',
  required: ['type', 'numDots', 'choices'],
  properties: {
    type: {
      type: 'string',
      pattern: typeStringPattern
    },
    numDots: {
      type: 'integer',
      minimum: 1
    },
    choices: {
      type: 'array'
    }
  }
}

module.exports = schema
