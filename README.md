[![Build Status](https://travis-ci.org/ssbc/ssb-poll-schema.svg?branch=master)](https://travis-ci.org/ssbc/ssb-poll-schema)

# ssb-poll-schema

> Gives parsers and validators for all known schema versions of ssb-poll messages

## Motivation

As well as this being a useful module for scuttle polls, it's a spec for _how to publish and version schema on ssb_.

This module gives you parsers that will return a 'normalised' object, regardless of of the shape of the object to parse.
The `position` and `poll` objects returned by the parsers are defined in `./schema`.

A change in major version of this module means that there is a breaking change to the shape of the 'normalised' object.
An example of a breaking change would be that a required property in the schema was removed. 

A minor version change could be that a new property was added to a schema but that isn't a required field. 

## Example

```js
var { isPoll } = require('ssb-poll-schema')

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

- `isPoll`
- `isChooseOnePoll` (also accessible under `isPoll.chooseOne`)

- `isPosition`
- `isChooseOnePosition` (also accessible under `isPosition.chooseOne`)

### Parsers

- `parsePoll`,
- `parsePosition`,

### Parser Errors (useful for debugging)

- `getPollErrors`,
- `getPositionErrors`,

### Version strings

Returns an object with version string constants useful for publishing messages.

```js
{
  V1_SCHEMA_VERSION_STRING: 'v1'
}
```
## Important note for mantainers of this module or if you add your own schema:

How / when should you modify schema and version numbers:

### You have an existing schema but it's missing a constraint that must be added. You want existing messages to fail validation if they fail the new constraint.

- Modify the schema by adding the constraint. 
- Don't change the schema version number. 
- Bump the patch version of this module.

### You have an existing schema but it has a constraint that must be removed. You want existing messages that would have failed validation to be passed by this new schema.

- Make a whole new schema + parsers with unique version number. e.g. copy the v1 folder to a new v2 folder and wire it up

### You have an existing schema and want to add a new property that is optional (not `required` in the schema).

- Modify the schema by adding the property. 
- Update the parser. 
- Don't change the schema version number. 
- Bump the patch version of this module.

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

