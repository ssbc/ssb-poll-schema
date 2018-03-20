const validator = require('is-my-json-valid')
const schema = require('../schema/position')
const isPositionContent = validator(schema, {verbose: true})
const getMsgContent = require('ssb-msg-content')
const { CHOOSE_ONE } = require('../../types')

const isChooseOnePosition = require('./isChooseOnePosition')

module.exports = function isPosition (obj) {
  const result = isPositionContent(getMsgContent(obj))

  // exposes error messages provided by is-my-json-valid
  isPosition.errors = isPositionContent.errors

  return result
}

module.exports[CHOOSE_ONE] = isChooseOnePosition
