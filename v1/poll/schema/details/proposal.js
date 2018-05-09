const { PROPOSAL } = require('../../../types')
const typeStringPattern = `^${PROPOSAL}$`

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
      items: [
        {
          type: 'string',
          pattern: '^agree$'
        },
        {
          type: 'string',
          pattern: '^disagree$'
        },
        {
          type: 'string',
          pattern: '^abstain$'
        },
        {
          type: 'string',
          pattern: '^block$'
        }
      ]
    }
  }
}

module.exports = schema
