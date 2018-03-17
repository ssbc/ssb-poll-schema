const {SCHEMA_VERSION} = require('../../types')

module.exports = function Position ({ details, root, reason, channel, mentions }) {
  const content = {
    type: 'position',
    root,
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
