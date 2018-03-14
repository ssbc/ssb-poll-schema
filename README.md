# scuttle-poll-schema

Hahahahh weee wtf? Dunno if this is gonna work

## Adding your schema 

To contribute your schema:

- Publish your schema as a node module
  - It must be a depject module that exports ...
- Add your module as a dependency in this module. 
- Modify index.js so that your module is passed to combine:
```js
var v2 = require('./v2/')
var <your module> = require('<your module>')

var sockets = combine([v1, v2, <your module>])

```

## Updating your schema:

Don't patch schema. Don't use semver. Each time you want to change a schema make a whole new version with a new version number.


RDD:

```js
  module.exports = {
    parsePoll, // tries to parse an object into a poll from any known schema version
    isPoll, // returns true if object is a valid poll of any know schema version

    parsePosition,
    isPosition,

    sockets
  }
```
