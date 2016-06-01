'use strict'

class Exception
  constructor: (@name = 'Exception', @message, status, props) ->
    @status = status or 500
    @properties = props ? null

    Error.captureStackTrace this, Exception

module.exports = Exception
