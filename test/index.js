import test from 'ava'
import Validation from 'folktale/data/validation'
import noDups from '@justinc/no-dups-validator'
import toValidation from '..'

const { Success, Failure } = Validation

let namedArgValidatorResultToValidation = toValidation({
  isValidation: v => Validation.hasInstance(v),
  isFailureLike: ([ isValid ]) => !isValid,
  toFailure: ([, errors]) => Failure(errors),
  toSuccess: () => Success(true)
})
const validatorResultToValidation = v => namedArgValidatorResultToValidation({ v })

test(t => {
  const value = validatorResultToValidation(noDups([1, 2, 3])())
  t.true(Success.hasInstance(value))
  t.true(value.merge())
})

test(t => {
  const value = validatorResultToValidation(noDups([1, 2, 3, 1])('Found the following duplicates: '))
  t.true(Failure.hasInstance(value))
  const errors = value.merge()
  t.is(errors[0].message, 'Found the following duplicates: 1')
})
