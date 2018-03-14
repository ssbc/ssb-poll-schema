var nest = require('depnest')

module.exports = {
  gives: nest({
    'poll': [
      'parse'
    ],
    'position': [
      'parse'
    ]
  }),
  create: function (api) {
    return nest({
      poll: {
        parse: parsePoll
      },
      position: {
        parse: parsePosition
      }
    })

    function parsePoll () {
      return 'a v2!'
    }

    function parsePosition () {

    }
  }
}
