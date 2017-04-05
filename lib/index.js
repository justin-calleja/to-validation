var apply = require('@justinc/fpo-apply')
var curryMultiple = require('@justinc/fpo-curry-multiple')

function toValidation (isValidation, isFailureLike, toFailure, toSuccess, v) {
  if (isValidation(v)) return v
  if (isFailureLike(v)) return toFailure(v)
  return toSuccess(v)
}

module.exports = curryMultiple({
  fn: apply({ fn: toValidation }),
  n: 5
})
