import { curryMultiple, apply } from 'fpo'

function toValidation (isValidation, isFailureLike, toFailure, toSuccess, v) {
  if (isValidation(v)) return v
  if (isFailureLike(v)) return toFailure(v)
  return toSuccess(v)
}

export default curryMultiple({
  fn: apply({ fn: toValidation }),
  n: 5
})
