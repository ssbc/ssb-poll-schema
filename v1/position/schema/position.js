const cloneDeep = require('lodash.clonedeep')

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
  required: ['version', 'type', 'root', 'branch', 'details'],
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
    branch: {
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

module.exports.position = schema

const chooseOneSchema = cloneDeep(schema)
chooseOneSchema.properties.details = { $ref: '#/definitions/details/chooseOne' }

const dotSchema = cloneDeep(schema)
dotSchema.properties.details = { $ref: '#/definitions/details/dot' }

const meetingTimeSchema = cloneDeep(schema)
meetingTimeSchema.properties.details = { $ref: '#/definitions/details/meetingTime' }

const proposalSchema = cloneDeep(schema)
proposalSchema.properties.details = { $ref: '#/definitions/details/proposal' }

const rangeSchema = cloneDeep(schema)
rangeSchema.properties.details = { $ref: '#/definitions/details/range' }

module.exports.chooseOne = chooseOneSchema
module.exports.dot = dotSchema
module.exports.meetingTime = meetingTimeSchema
module.exports.proposal = proposalSchema
module.exports.range = rangeSchema
