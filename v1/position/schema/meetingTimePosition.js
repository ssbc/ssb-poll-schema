const positionSchema = require('./position')
const cloneDeep = require('lodash.clonedeep')

const meetingTimeSchema = cloneDeep(positionSchema)

// collapse the details down to be ONLY chooseOne
meetingTimeSchema.properties.details = { $ref: '#/definitions/details/meetingTime' }

module.exports = meetingTimeSchema
