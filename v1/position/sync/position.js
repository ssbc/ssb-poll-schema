const {SCHEMA_VERSION} = require('../../types')

module.exports = function Position ({ poll = {}, details, reason, channel, mentions }) {
  const content = {
    type: 'position',
    root: typeof poll === 'string' ? poll : poll.key,
    version: SCHEMA_VERSION,
    details
  }

  if (reason) content.reason = reason

  if (channel) {
    if (typeof channel !== 'string') { throw new Error('channel must be a string') }
    content.channel = channel
  }

  return content
}
