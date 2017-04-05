Install with:

```
npm i @justinc/to-validation
```

Exports the following function:

```
function toValidation (isValidation, isFailureLike, toFailure, toSuccess, v) {
  if (isValidation(v)) return v
  if (isFailureLike(v)) return toFailure(v)
  return toSuccess(v)
}
```

with one catch, the function can be invoked using "[FPO-style](https://github.com/getify/fpo)" named-arguments (and it's [multi-curried](https://github.com/getify/fpo/blob/master/docs/core-API.md#fpocurrymultiple)).

This means you can invoke it like this:

```
import toValidation from '@justinc/to-validation'
let toV = toValidation({
  isValidation: v => {
    // your logic for determining if v is a Validation, typically:
    // Validation.hasInstance(v),
    // see tests.
  },
  isFailureLike: (v) => {
    // your logic for determining if v is failure like
  }
})
```

Having supplied the `isValidation` and `isFailureLike` parameters (using named-arguments), we only need to supply three more - `toFailure`, `toSuccess`, and `v` (note how we can split up how we want to supply them since the function is [multi-curried](https://github.com/getify/fpo/blob/master/docs/core-API.md#fpocurrymultiple)):

```
let onlyVLeft = toV({
  toFailure: (v) => // how you'd change v to a Validation.Failure
  toSuccess: () => // how you'd change v to a Validation.Success
})

let asValidation = v => onlyVLeft({ v })
```

- - -

This package is experimental. Only really meant to DRY some code.
