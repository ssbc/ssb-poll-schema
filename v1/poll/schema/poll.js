const dotDetails = require('./details/dot.js')
const proposalDetails = require('./details/proposal.js')
const scoreDetails = require('./details/score.js')
const chooseOneDetails = require('./details/chooseOne.js')

const {SCHEMA_VERSION} = require('../../types')

const ssbSchemaDefintions = require('../../lib/ssbSchemaDefintions')

const schema = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['version', 'type', 'title', 'details', 'closesAt'],
  properties: {
    version: {
      type: 'string',
      pattern: `^${SCHEMA_VERSION}$`
    },
    type: {
      type: 'string',
      pattern: '^poll$'
    },
    title: { type: 'string' },
    details: {
      oneOf: [
        // { $ref: '#/definitions/details/dot'},
        // { $ref: '#/definitions/details/proposal'},
        // { $ref: '#/definitions/details/score'},
        { $ref: '#/definitions/details/chooseOne' }
        // { $ref: '#/definitions/details/rsvp'},
        // { $ref: '#/definitions/details/meeting'},
      ]
    },
    closesAt: { type: 'string', format: 'date-time' },
    body: { type: 'string' },
    mentions: { $ref: '#/definitions/mentions/any' },
    recps: { $ref: '#/definitions/recps' }
  },
  definitions: Object.assign({}, ssbSchemaDefintions, {
    details: {
      type: 'object',
      dot: dotDetails,
      proposal: proposalDetails,
      score: scoreDetails,
      chooseOne: chooseOneDetails
    }
  })
}

module.exports = schema
