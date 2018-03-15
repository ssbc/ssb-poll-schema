[![Build Status](https://travis-ci.org/ssbc/ssb-poll-schema.svg?branch=master)](https://travis-ci.org/ssbc/ssb-poll-schema)

# ssb-poll-schema

> Gives parsers and validators for all known schema versions of ssb-poll messages

## Motivation

As well as this being a useful module for scuttle polls, it's a spec for _how to publish and version schema on ssb_.

## API

### Validators

- `isPoll`,
- `isChooseOnePoll`,

- `isPosition`,
- `isChooseOnePosition`,

### Parsers

- `parsePoll`,
- `parsePosition`,

## Adding your schema 

### Make your schema official

To contribute your schema:

- Publish your schema as a node module
  - It must be a depject module that exports ...
- Add your module as a dependency in this module. 
- Modify index.js so that your module is passed to combine:

```js
var v2 = require('./v2/')
var <your-module> = require('<your-module>')

var sockets = combine([v1, v2, <your module>])
```

### Combine these schema with some of your own in another module

This module exports it's depject combinable schema as `schema` so you could do something like this in your own module:

```js
var pollSchema = require('ssb-poll-schema')
var combine = require('depject')

var yourSchema = require('./your-schema')

var sockets = combine(pollSchema.concat(yourSchema)) 

// do something with your combined depject sockets

```

## Updating your schema:

Don't patch schema. Don't use semver. Each time you want to change a schema make a whole new version with a new version number.
