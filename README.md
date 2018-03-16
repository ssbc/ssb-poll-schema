[![Build Status](https://travis-ci.org/ssbc/ssb-poll-schema.svg?branch=master)](https://travis-ci.org/ssbc/ssb-poll-schema)

# ssb-poll-schema

> Gives parsers and validators for all known schema versions of ssb-poll messages

## Motivation

As well as this being a useful module for scuttle polls, it's a spec for _how to publish and version schema on ssb_.

## Example

```js
var validPoll = {
  type: 'poll',
  version: 'v1',
  title: 'what is for dinner',
  body: 'this is really important, please let me know',
  closesAt: '2018-03-15T03:40:06.222Z',
  details: {
    type: 'chooseOne',
    choices: ['lasagne', 'avos', 'tacos']
  }
}

console.log(isPoll(validPoll)) // => true
```

## API

### Validators

- `isPoll`,
- `isChooseOnePoll`,

- `isPosition`,
- `isChooseOnePosition`,

### Parsers

- `parsePoll`,
- `parsePosition`,

### Version strings

Returns an object with version string constants useful for publishing messages.

```js
{
  V1_SCHEMA_VERSION_STRING: 'v1'
}
```
## Important note for mantainers of this module or if you add your own schema:

Don't modify schema!
Don't use semver. Each time you want to change a schema make a whole new version with a new version number.

## Want to use your schema with this project? 

There are two ways you can use your schema with this module. 

### Make your schema official

To contribute your schema:

- Publish your schema as a node module
  - It must be a depject module. Check out `./v1/index.js` for an example. 
- Add your module as a dependency in this module. 
- Modify index.js so that your module is passed to combine:

```js
var sockets = combine([
  require('./v1/'),
  require('./v2/'),
  require('<your-module>') 
])
```

### Combine these schema with some of your own in another module

This module exports it's depject combinable schema as `schema` so you could do something like this in your own module:

```js
var pollSchema = require('ssb-poll-schema')
var combine = require('depject')
var {first} = require('depject/apply')

var yourSchema = require('./your-schema')

var sockets = combine(pollSchema.concat(yourSchema)) 

var isPoll = first(sockets.poll.isPoll, 'poll.isPoll')

console.log(isPoll({})) // => false
```

