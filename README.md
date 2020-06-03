# numerical-computation
A numerical analysis toolkit in Javascript, featuring derivatives, integration, matrices, tetration and more. It will be updated as and when new features are available. Below is a documentation of all the current functions supported.

## Combinatorics
### `numerical.fac(x: number)`
Returns the factorial of a number using a Ramanujan approximation. It also emulates the gamma function for non-integers, but does not work for negative integers or non-integers.
#### Arguments
##### `x: number`
The number to take the factorial of.
#### Usage
```
numerical.fac(3) //6
numerical.fac(9) //362880
numerical.fac(2.5) //3.323402024697955
numerical.fac(-1) //NaN
````