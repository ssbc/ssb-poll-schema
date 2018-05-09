const { MEETING_TIME } = require('../../../types')
const typeStringPattern = `^${MEETING_TIME}$`

var schema = {
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
