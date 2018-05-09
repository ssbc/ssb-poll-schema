const chooseOneDetails = require('./details/chooseOne')
const rangeDetails = require('./details/range')
const dotDetails = require('./details/dot')
const proposalDetails = require('./details/proposal')
const meetingTimeDetails = require('./details/meetingTime')
const {SCHEMA_VERSION} = require('../../types')

const ssbSchemaDefintions = require('../../lib/ssbSchemaDefintions')

const schema = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['version', 'type', 'root', 'details'],
  properties: {
    version: {
      type: 'string',
      pattern: `^${SCHEMA_VERSION}$`
    },
    type: {
      type: 'string',
      pattern: '^position$'
    },
    root: {
      $ref: '#/definitions/messageId'
    },
    reason: { type: 'string' },
    details: {
      oneOf: [
        { $ref: '#/definitions/details/dot' },
        { $ref: '#/definitions/details/range' },
        { $ref: '#/definitions/details/chooseOne' },
        { $ref: '#/definitions/details/proposal' },
        { $ref: '#/definitions/details/meetingTime' }
        // { $ref: '#/definitions/details/rsvp'},
      ]
    },
    mentions: { $ref: '#/definitions/mentions/any' },
    recps: { $ref: '#/definitions/recps' }
  },
  definitions: Object.assign({}, ssbSchemaDefintions, {
    details: {
      type: 'object',
      chooseOne: chooseOneDetails,
      dot: dotDetails,
      range: rangeDetails,
      proposal: proposalDetails,
      meetingTime: meetingTimeDetails
    }
  })
}

module.exports = schema
