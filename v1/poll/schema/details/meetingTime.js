const { MEETING_TIME } = require('../../../types')
const typeStringPattern = `^${MEETING_TIME}$`

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
        type: 'string',
        format: 'date-time'
      }
    }
  }
}

module.exports = schema
